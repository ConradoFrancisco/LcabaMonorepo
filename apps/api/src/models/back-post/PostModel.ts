import pool from '../../db/dbConfig';
import { IsearchParams } from './MagazineModel';
import LaborservicesModel from './LaborServiceModel';
import {
  buildPublicUrlGeneral,
  buildPublicUrlLaRevista,
  createFinalData,
  formatFecha,
  normalizarTitulo,
} from '../../helpers/functions';

export const URLS = {
  magazine_: process.env.REVISTA_URL,
  cultura_: process.env.CULTURA_URL,
};

class PostModel {
  public async getAllPosts(
    params: IsearchParams,
  ): Promise<{ data: any[]; total: number; categorias: any[]; types: any[] }> {
    let search = '';
    let order = ' ORDER BY a.id DESC';
    let limit = '';
    let slider = ''
    let status = ''
    const arrayParamsCount: any[] = [];
    const arrayParamsData: any[] = [];
    if (params.search) {
      search += ` AND a.title LIKE ? `;
      arrayParamsCount.push(`%${params.search}%`);
      arrayParamsData.push(`%${params.search}%`);
    }

    if (params.status) {
      status += ` AND a.status = 1 `;
    }
    if (params.order) {
      order = ` ORDER BY ${params.order}`;
    }

    if (params.slider) {
      slider += ` AND a.slider = 1 `;
    }

    if (params.filtros?.tipo) {
      search += ` AND a.type = ? `;
      arrayParamsCount.push(parseInt(params.filtros.tipo));
      arrayParamsData.push(parseInt(params.filtros.tipo));
    }

    if (
      params.filtros?.categorias &&
      Array.isArray(params.filtros.categorias) &&
      params.filtros.categorias.length > 0
    ) {
      search += ` AND a.fk_idcat IN (?) `;
      arrayParamsCount.push(params.filtros.categorias);
      arrayParamsData.push(params.filtros.categorias);
    }

    if (params.filtros?.status) {
      search += ` AND a.status = ? `;
      const statusVal = parseInt(params.filtros.status);
      arrayParamsCount.push(statusVal);
      arrayParamsData.push(statusVal);
    }

    if (params.filtros?.destacado) {
      search += ` AND a.desta= ? `;
      const destacadoVal = parseInt(params.filtros.destacado);
      arrayParamsCount.push(destacadoVal);
      arrayParamsData.push(destacadoVal);
    }

    if (params.filtros?.fechaDesde) {
      search += ` AND a.date_ins >= ? `;
      let fechaDesde = params.filtros.fechaDesde;
      fechaDesde = formatFecha(fechaDesde);
      arrayParamsCount.push(fechaDesde);
      arrayParamsData.push(fechaDesde);
    }

    if (params.filtros?.fechaHasta) {
      search += ` AND a.date_ins <= ? `;
      let fechaHasta = params.filtros.fechaHasta;
      fechaHasta = formatFecha(fechaHasta);
      arrayParamsCount.push(fechaHasta);
      arrayParamsData.push(fechaHasta);
    }

    if (params.limit) {
      limit = ` LIMIT ?`;
      arrayParamsData.push(params.limit);
      if (params.offset) {
        limit += ` OFFSET ? `;
        arrayParamsData.push(params.offset);
      }
    }

    try {
      let categorias: any[] = [];
      let types: any[] = [];
      let catQuery = '';
      let categoriasQuery = `SELECT * from ${params.table}categorias_translations`;
      let typesQuery = `SELECT fk_id as id,title from ${params.table}posts_type_translations`;
      const [typeRows] = (await pool.query(typesQuery)) as [any[], any];
      types = typeRows;

      const hasCategorias = params.table !== '' && params.table !== 'evidencias_';

      if (hasCategorias) {
        try {
          const [catRows] = (await pool.query(categoriasQuery)) as [any[], any];
          categorias = catRows;
          catQuery = `left JOIN ${params.table}categorias_translations b ON a.fk_idcat = b.fk_id`;
        } catch (catErr) {
          console.warn(`No se pudieron cargar categorías para ${params.table}:`, catErr);
        }
      }

      const countQuery = `
        SELECT COUNT(*) as total
        FROM ${params.table}posts_vw a  
        ${catQuery}
        JOIN cm_users_ad d ON d.id_user = a.iduser_upd 
        WHERE 1 = 1 ${search} ;
      `;

      const dataQuery = `
        SELECT 
          a.id as id,
          a.date_ins as fecha,
          a.title as titulo,
          ${hasCategorias ? 'b.title as categoria,' : ''}
          a.status as status,
          ${hasCategorias ? 'a.fk_idcat as idcat,' : ''}
          a.tipo_post as tipo,
          a.desta as destacado,
          a.url as url,
          CONCAT(d.name," ", d.surname) as ultimaAccion 
        FROM ${params.table}posts_vw a
        ${catQuery}
       
        JOIN cm_users_ad d ON d.id_user = a.iduser_upd
        WHERE 1 = 1 ${search}${status}  ${slider} ${order} ${limit} 
        ;
      `;
      console.log('hola')
      console.log(dataQuery, 'query');
      console.log(arrayParamsData, 'arrayParamsData');
      const [countRows] = (await pool.query(countQuery, arrayParamsCount)) as [any[], any];
      const total = countRows[0]?.total ?? 0;
      const [data] = (await pool.query(dataQuery, arrayParamsData)) as [any[], any];
      let finalData = data;

      if (params.table !== '') {
        finalData = createFinalData(data, params);
      }

      if (params.withImages && finalData.length > 0) {
        const newData = [];
        for (const post of finalData) {
          const images = await this.getImages({ postId: post.id, table: params.table ?? '' });
          newData.push({ ...post, images });
        }
        finalData = newData;
      }

      return {
        data: finalData as any[],
        total: Number(total),
        categorias,
        types,
      };
    } catch (error) {
      console.error('Error en getAllPosts:', error);
      throw new Error('Error al obtener los posts');
    }
  }

  public async getTypes(table: string, gacetilla: boolean = false): Promise<any[]> {
    let queryGacetilla = '';
    if (gacetilla) {
      queryGacetilla = ' WHERE gacetilla = 1 ';
    }
    let query = `SELECT * from ${table}posts_type_vw ${queryGacetilla}`;

    console.log(query, 'aca');
    try {
      const [rows] = (await pool.query(query)) as [any[], any];
      return rows;
    } catch (e) {
      console.error(e);
      throw new Error('Error al obtener los tipos de post');
    }
  }

  //PARA EDITAR POST
  private async getImages({ postId, table }: { postId: number; table: string }) {
    const query = `SELECT * from 
      ${table}posts_docs
      inner join docs on ${table}posts_docs.fk_iddoc = docs.id
      where ${table}posts_docs.fk_id = ? `;
    try {
      const [rows] = await pool.query(query, [postId]);
      return rows;
    } catch (e) {
      console.error(e);
      throw new Error('Error al obtener las imagenes del post');
    }
  }

  private async getFiles({ postId, table }: { postId: number; table: string }) {
    const query = `SELECT * from 
      ${table}posts_files
      inner join docs on ${table}posts_files.fk_iddoc = docs.id
      where ${table}posts_files.fk_id = ?`;
    try {
      const [rows] = await pool.query(query, [postId]);
      return rows;
    } catch (e) {
      console.error(e);
      throw new Error('Error al obtener las imagenes del post');
    }
  }

  private async getDays({ postId, table }: { postId: number; table: string }) {
    const query = `SELECT * from 
      ${table}posts_dias
      where fk_idpost = ?`;
    try {
      const [rows] = await pool.query(query, [postId]);
      return rows;
    } catch (e) {
      console.error(e);
      throw new Error('Error al obtener los días del post');
    }
  }

  private async getVideos({ postId, table }: { postId: number; table: string }) {
    const query = `SELECT * from 
      ${table}posts_videos
   where fk_id = ? `;
    try {
      const [rows] = await pool.query(query, [postId]);
      return rows;
    } catch (e) {
      console.error(e);
      throw new Error('Error al obtener las imagenes del post');
    }
  }

  private async getAudios({ postId, table }: { postId: number; table: string }) {
    const query = `SELECT * from 
      ${table}posts_audios
   where fk_id = ? `;
    try {
      const [rows] = await pool.query(query, [postId]);
      return rows;
    } catch (e) {
      console.error(e);
      throw new Error('Error al obtener las imagenes del post');
    }
  }
  //LABOR PARLAMENTARIA

  private async getExpedientes({
    postId,
    table,
  }: {
    postId: number;
    table: string;
  }): Promise<any[]> {
    const query = `SELECT * from 
      ${table}posts_expediente
      where fk_idpost = ?`;
    try {
      const [rows] = (await pool.query(query, [postId])) as [any[], any];

      const proyectos = rows as any[];
      const proyectosConDetalles = await Promise.all(
        proyectos.map(async (proyecto) => {
          if (!proyecto.expediente_id) return proyecto;

          const detalle = await LaborservicesModel.getExpedienteById({
            id: proyecto.expediente_id,
          });
          const expedienteBasicos = detalle?.ArrayOfExpedienteBasicos?.expedienteBasicos || null;

          const proyectoDetallado = {
            ...proyecto,
            detalleExpediente: expedienteBasicos, // ✅ limpio
          };
          return proyectoDetallado;
        }),
      );
      return proyectosConDetalles;
    } catch (e) {
      console.error(e);
      throw new Error('Error al obtener los proyectos del post');
    }
  }

  public async getPostByid(id: number, table: string) {
    let data = {};
    let audios = [];
    if (table !== ' ' && table !== 'evidencias_' && table !== '') {
      try {
        const dias = await this.getDays({ postId: id, table });
        data = { dias };
      } catch (err) {
        console.warn(`No se pudieron obtener días para la tabla ${table}:`, err);
      }
    }

    try {
      if (isNaN(id)) {
        console.error('getPostByid: id is NaN');
        return null;
      }
      const query = `SELECT * FROM ${table}posts_vw WHERE id = ?`;
      const [rows] = (await pool.query(query, [id])) as [any[], any];
      const row = rows[0];
      if (!row) return null;
      if (table === 'magazine_') {
        const audios = await this.getAudios({ postId: id, table });
        data = { ...data, audios };
      }
      const images = await this.getImages({ postId: id, table });
      const archivos = await this.getFiles({ postId: id, table });
      const videos = await this.getVideos({ postId: id, table });
      const proyectos = await this.getExpedientes({ postId: id, table });
      const comisiones = await this.getComisiones({ postId: id, table });
      const audiencias = await this.getAudiencias({ postId: id, table });
      const legisladores = await this.getLegisladores({ postId: id, table });
      const sesiones = await this.getSesiones({ postId: id, table });
      const infoParlamentaria = {
        proyectos,
        comisiones,
        audiencias,
        legisladores,
        sesiones,
      };

      const {
        title,
        description,
        url,
        url_ext,
        shortdesc,
        extradesc,
        subtitle,

        ...seteos
      } = row;
      const textos = {
        title,
        description,
        shortdesc,
        extradesc,
        subtitle,
        url_ext,
        url,
      };

      data = {
        ...data,
        seteos,
        textos,
        images,
        archivos,
        videos,
        infoParlamentaria,
      };
      return data;
    } catch (e) {
      console.error(e);
    }
  }

  private async getComisiones({
    postId,
    table,
  }: {
    postId: number;
    table: string;
  }): Promise<any[]> {
    const query = `SELECT * from 
    ${table}posts_comision
    where fk_idpost = ?`;
    try {
      const [rows] = (await pool.query(query, [postId])) as [any[], any];

      const comision = rows as any[];
      const comisionConDetalles = await Promise.all(
        comision.map(async (comision) => {
          if (!comision.comision_id) return comision;

          const detalle = await LaborservicesModel.getComisionById(comision.comision_id as string);

          const comisionDetallada = {
            ...comision,
            detalleComision: detalle,
          };
          return comisionDetallada;
        }),
      );
      return comisionConDetalles;
    } catch (e) {
      console.error(e);
      throw new Error('Error al obtener los proyectos del post');
    }
  }
  private async getAudiencias({
    postId,
    table,
  }: {
    postId: number;
    table: string;
  }): Promise<any[]> {
    const query = `SELECT * from 
    ${table}posts_audiencia
    where fk_idpost = ?`;
    try {
      const [rows] = (await pool.query(query, [postId])) as [any[], any];

      const audiencia = rows as any[];

      const audienciaConDetalles = await Promise.all(
        audiencia.map(async (audiencia) => {
          if (!audiencia.audiencia_id) return audiencia;

          const detalle = await LaborservicesModel.getAudienciaById(
            audiencia.audiencia_id as string,
          );

          const audienciaDetallada = {
            ...audiencia,
            detalleAudiencia: detalle?.RespuestaOfAudiencia?.Listado.Audiencia,
          };
          return audienciaDetallada;
        }),
      );
      return audienciaConDetalles;
    } catch (e) {
      console.error(e);
      throw new Error('Error al obtener las audiencias del post');
    }
  }
  private async getLegisladores({
    postId,
    table,
  }: {
    postId: number;
    table: string;
  }): Promise<any[]> {
    const query = `SELECT * from 
    ${table}posts_legislador
    where fk_idpost = ?`;
    try {
      const [rows] = (await pool.query(query, [postId])) as [any[], any];

      const legislador = rows as any[];

      const legisladorConDetalles = await Promise.all(
        legislador.map(async (legislador) => {
          if (!legislador.legislador_id) return legislador;

          const detalle = await LaborservicesModel.getDiputadosbyId(
            legislador.legislador_id as string,
          );

          const legisladorDetallado = {
            ...legislador,
            detalleLegislador: detalle?.ArrayOfDiputados?.diputados || null,
          };
          return legisladorDetallado;
        }),
      );
      return legisladorConDetalles;
    } catch (e) {
      console.error(e);
      throw new Error('Error al obtener los legisladores del post');
    }
  }

  private async getSesiones({ postId, table }: { postId: number; table: string }): Promise<any[]> {
    const query = `SELECT * from 
    ${table}posts_sesion
    where fk_idpost = ?`;

    try {
      const [rows] = (await pool.query(query, [postId])) as [any[], any];

      const sesiones = rows as any[];

      const sesionesConDetalles = await Promise.all(
        sesiones.map(async (sesion) => {
          if (!sesion.sesion_id) return sesion;

          const detalle = await LaborservicesModel.getSesionById(sesion.sesion_id as string);
          const sesionDetallada = {
            ...sesion,
            detalleSesion: detalle?.ArrayOfSesiones?.sesiones, // ✅ limpio
          };
          return sesionDetallada;
        }),
      );
      return sesionesConDetalles;
    } catch (e) {
      console.error(e);
      throw new Error('Error al obtener las sesiones del post');
    }
  }

  //insert data
  public async postExpediente(idPost: number, idExpediente: number, idUser: number, table: string) {
    const query = `INSERT INTO ${table}posts_expediente (fk_idpost, expediente_id, iduser_ins) VALUES (?, ?, ?)`;
    try {
      await pool.query(query, [idPost, idExpediente, idUser]);
      const detalle = await this.getExpedientes({ postId: idPost, table });
      return {
        success: true,
        message: 'Expediente agregado correctamente',
        data: detalle,
      };
    } catch (e) {
      console.error(e);
      return {
        success: false,
        message: 'Error al agregar el expediente al post',
      };
    }
  }

  public async deleteExpediente(idPost: number, idExpediente: number, table: string) {
    const query = `DELETE FROM ${table}posts_expediente WHERE fk_idpost = ? AND expediente_id = ?`;
    try {
      await pool.query(query, [idPost, idExpediente]);
      const detalle = await this.getExpedientes({ postId: idPost, table });
      return {
        success: true,
        message: 'Expediente eliminado correctamente',
        data: detalle,
      };
    } catch (e) {
      console.error(e);
      return {
        success: false,
        message: 'Error al eliminar el expediente del post',
      };
    }
  }
  public async postComision(idPost: number, idComision: number, idUser: number, table: string) {
    const query = `INSERT INTO ${table}posts_comision (fk_idpost, comision_id, iduser_ins) VALUES (?, ?, ?)`;
    try {
      await pool.query(query, [idPost, idComision, idUser]);
      const detalle = await this.getComisiones({ postId: idPost, table });
      return {
        success: true,
        message: 'Comisión agregada correctamente',
        data: detalle,
      };
    } catch (e) {
      console.error(e);
      return {
        success: false,
        message: 'Error al agregar la comisión al post',
      };
    }
  }

  public async deleteComision(idPost: number, idComision: number, table: string) {
    const query = `DELETE FROM ${table}posts_comision WHERE fk_idpost = ? AND comision_id = ?`;
    try {
      await pool.query(query, [idPost, idComision]);
      const detalle = await this.getComisiones({ postId: idPost, table });
      return {
        success: true,
        message: 'Comisión eliminada correctamente',
        data: detalle,
      };
    } catch (e) {
      console.error(e);
      return {
        success: false,
        message: 'Error al eliminar la comisión del post',
      };
    }
  }

  public async postLegislador(idPost: number, idLegislador: number, idUser: number, table: string) {
    const query = `INSERT INTO ${table}posts_legislador (fk_idpost, legislador_id, iduser_ins) VALUES (?, ?, ?)`;
    try {
      await pool.query(query, [idPost, idLegislador, idUser]);
      const detalle = await this.getLegisladores({ postId: idPost, table });
      return {
        success: true,
        message: 'Legislador agregado correctamente',
        data: detalle,
      };
    } catch (e) {
      console.error(e);
      return {
        success: false,
        message: 'Error al agregar el legislador al post',
      };
    }
  }

  public async deleteLegislador(idPost: number, idLegislador: number, table: string) {
    const query = `DELETE FROM ${table}posts_legislador WHERE fk_idpost = ? AND legislador_id = ?`;
    try {
      await pool.query(query, [idPost, idLegislador]);
      const detalle = await this.getLegisladores({ postId: idPost, table });
      return {
        success: true,
        message: 'Legislador eliminado correctamente',
        data: detalle,
      };
    } catch (e) {
      console.error(e);
      return {
        success: false,
        message: 'Error al eliminar el legislador del post',
      };
    }
  }
  public async postSesion(idPost: number, idSesion: number, idUser: number, table: string) {
    const query = `INSERT INTO ${table}posts_sesion (fk_idpost, sesion_id, iduser_ins) VALUES (?, ?, ?)`;
    try {
      await pool.query(query, [idPost, idSesion, idUser]);
      const detalle = await this.getSesiones({ postId: idPost, table });
      return {
        success: true,
        message: 'Sesión agregada correctamente',
        data: detalle,
      };
    } catch (e) {
      console.error(e);
      return { success: false, message: 'Error al agregar la sesión al post' };
    }
  }
  public async deleteSesion(idPost: number, idSesion: number, table: string) {
    const query = `DELETE FROM ${table}posts_sesion WHERE fk_idpost = ? AND sesion_id = ?`;
    try {
      await pool.query(query, [idPost, idSesion]);
      const detalle = await this.getSesiones({ postId: idPost, table });
      return {
        success: true,
        message: 'Sesión eliminada correctamente',
        data: detalle,
      };
    } catch (e) {
      console.error(e);
      return {
        success: false,
        message: 'Error al eliminar la sesión del post',
      };
    }
  }
  public async createPost(
    title: string,
    tipoId: number,
    idUser: number,
    table: string = '',
    categoryId?: number,
  ) {
    const slug = normalizarTitulo(title);
    const url = `${table}posts/${slug}.html`;
    const typeQuery = `INSERT INTO ${table}posts (type, iduser_ins, iduser_upd, url, status) VALUES (?, ?, ?, ?, 0)`;
    const translationQuery = `INSERT INTO ${table}posts_translations (fk_id, title, description, extradesc, shortdesc, subtitle) VALUES (?, ?, ?, ?, ?, ?)`;

    const [result] = (await pool.query(typeQuery, [tipoId || 0, idUser, idUser, url])) as [
      import('mysql2').ResultSetHeader,
      any,
    ];
    await pool.query(translationQuery, [result.insertId, title, '', '', '', '']);

    if (categoryId) {
      const categoryQuery = `INSERT INTO ${table}posts_categories (fk_idpost, fk_idcategory, fk_idcat, iduser_ins) VALUES (?, ?, ?, ?)`;
      await pool.query(categoryQuery, [result.insertId, categoryId, categoryId, idUser]);
    }

    return { id: result.insertId };
  }
  public async postAudiencia(idPost: number, idAudiencia: number, idUser: number, table: string) {
    const query = `INSERT INTO ${table}posts_audiencia (fk_idpost, audiencia_id, iduser_ins) VALUES (?, ?, ?)`;
    try {
      await pool.query(query, [idPost, idAudiencia, idUser]);
      const detalle = await this.getAudiencias({ postId: idPost, table });
      return {
        success: true,
        message: 'Audiencia agregada correctamente',
        data: detalle,
      };
    } catch (e) {
      console.error(e);
      return {
        success: false,
        message: 'Error al agregar la audiencia al post',
      };
    }
  }

  public async deleteAudiencia(idPost: number, idAudiencia: number, table: string) {
    const query = `DELETE FROM ${table}posts_audiencia WHERE fk_idpost = ? AND audiencia_id = ?`;
    try {
      await pool.query(query, [idPost, idAudiencia]);
      const detalle = await this.getAudiencias({ postId: idPost, table });
      return {
        success: true,
        message: 'Audiencia eliminada correctamente',
        data: detalle,
      };
    } catch (e) {
      console.error(e);
      return {
        success: false,
        message: 'Error al eliminar la audiencia del post',
      };
    }
  }
  public async deletePost(id: number, table: string) {
    const query = `DELETE FROM ${table}posts WHERE id = ?`;
    try {
      await pool.query(query, [id]);
      return {
        success: true,
        message: 'Post eliminado correctamente',
      };
    } catch (e) {
      console.error(e);
      return {
        success: false,
        message: 'Error al eliminar el post',
      };
    }
  }
  public async editOipPost(dto: import('../../DTOS/EditOipPostDTO').default) {
    try {
      const translationQuery = `UPDATE evidencias_posts_translations 
      SET title = ?, description = ?, extradesc = ?, shortdesc = ?, subtitle = ?, keywords = ?
      WHERE fk_id = ?`;
      const translations = dto.getTranslations();
      await pool.query(translationQuery, [
        translations.title,
        translations.description,
        translations.extradesc,
        translations.shortdesc,
        translations.subtitle,
        translations.keywords,
        dto.getId(),
      ]);

      const mainPostQuery = `UPDATE evidencias_posts 
      SET source = ?, desta = ?, fk_menuid = ?, url = ?, status = ?, comments = ?, loadcontent = ?, type = ?, removed = ?,
          date_end = ?, date_article = ?, orderby = ?, iduser_upd = ?, date_upd = NOW()
      WHERE id = ?`;
      const mainPost = dto.getMainPost();
      await pool.query(mainPostQuery, [
        mainPost.source,
        mainPost.desta,
        mainPost.fk_menuid,
        mainPost.url,
        mainPost.status,
        mainPost.comments,
        mainPost.loadcontent,
        mainPost.type,
        mainPost.removed,
        mainPost.date_end,
        mainPost.date_article,
        mainPost.orderby,
        mainPost.iduser_upd,
        dto.getId(),
      ]);

      const videos = dto.getVideos();
      if (videos.length > 0) {
        await Promise.all(
          videos.map(async (video) => {
            const insertVideoQuery = `INSERT INTO evidencias_posts_videos (fk_id, url, title, description, iduser_ins)
            VALUES (?, ?, ?, ?, ?)`;
            await pool.query(insertVideoQuery, [
              dto.getId(),
              video.url,
              video.title,
              video.description,
              video.iduser_ins,
            ]);
          }),
        );
      }

      return { success: true, message: 'Informe editado correctamente' };
    } catch (error) {
      console.error('Error en editOipPost:', error);
      throw error;
    }
  }
  public async updateStatePost(id: number, status: number, table: string) {
    const query = `UPDATE ${table}posts SET status = ? WHERE id = ?`;
    try {
      await pool.query(query, [status, id]);
      return {
        success: true,
        message: 'Estado del post actualizado correctamente',
      };
    } catch (e) {
      console.error(e);
      return {
        success: false,
        message: 'Error al actualizar el estado del post',
      };
    }
  }
}

export default new PostModel();
