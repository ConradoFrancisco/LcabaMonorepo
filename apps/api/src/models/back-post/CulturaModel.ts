import pool from '../../db/dbConfig';
import EditCulturaPostDTO from '../../DTOS/EditCulturaPostDTO';
import LaborservicesModel from './LaborServiceModel';
import { EditParams, IsearchParams } from './MagazineModel';

class CulturaModel {
  public async getAllPosts(params: IsearchParams): Promise<{ data: any[]; total: number }> {
    let search = '';
    let order = ' ORDER BY a.id DESC';
    let limit = '';
    const arrayParams: (string | number)[] = [];
    if (params.search) {
      search = ` WHERE a.title LIKE ? `;
      arrayParams.push(`%${params.search}%`);
    }

    if (params.order) {
      order = ` ORDER BY ${params.order}`;
    }

    if (params.limit) {
      limit = ` LIMIT ?`;
      arrayParams.push(params.limit);
    }
    if (params.offset) {
      limit += ` OFFSET ? `;
      arrayParams.push(params.offset);
    } else {
      limit += ` OFFSET 0 `;
    }
    try {
      const countQuery = `
      SELECT COUNT(*) as total
      FROM cultura_posts_vw a  
      JOIN cultura_categorias_translations b ON a.fk_idcat = b.fk_id 
      JOIN cm_users_ad d ON d.id_user = a.iduser_upd ${search} ;
    `;

      const dataQuery = `
      SELECT 
        a.id as id,
        a.date_ins as fecha,
        a.title as titulo,
        b.title as categoria,
        a.status as status,
        a.tipo_post as tipo,
        a.desta as destacado,
        a.status as visible,
        a.url as url,
        CONCAT(d.name,' ', d.surname) as ultimaAccion 
      FROM cultura_posts_vw a
      JOIN cultura_categorias_translations b ON a.fk_idcat = b.fk_id 
      JOIN cm_users_ad d ON d.id_user = a.iduser_upd    
        ${search} ${order} ${limit} 
      ;
    `;

      const [countRows] = (await pool.query(countQuery, arrayParams)) as [any[], any];
      const total = countRows[0]?.total ?? 0;
      const [data] = (await pool.query(dataQuery, arrayParams)) as [any[], any];

      return {
        data: data as any[],
        total: Number(total),
      };
    } catch (error) {
      console.error('Error en getAllPosts:', error);
      throw new Error('Error al obtener los posts');
    }
  }
  public async getAllCategories(params: IsearchParams): Promise<{ data: any[]; total: number }> {
    let search = '';
    let order = ' ORDER BY a.title ASC';
    let limit = '';
    const arrayParams: (string | number)[] = [];
    if (params.search) {
      search = ` WHERE a.title LIKE ? `;
      arrayParams.push(`%${params.search}%`);
    }

    if (params.order) {
      order = ` ORDER BY ${params.order}`;
    }

    if (params.limit) {
      limit = ` LIMIT ?`;
      arrayParams.push(params.limit);
    }
    if (params.offset) {
      limit += ` OFFSET ? `;
      arrayParams.push(params.offset);
    } else {
      limit += ` OFFSET 0 `;
    }

    try {
      const countQuery = `
                SELECT COUNT(*) as total
                FROM cultura_categorias_vw a
                JOIN cm_users_ad b ON b.id_user = a.iduser_upd ${search}
            `;
      const query = `
                SELECT 
                    a.id as id,
                    a.menu as menu,
                    a.title as titulo,
                    a.status as status,
                    a.desta as destacado,
                    a.cantidad_posts_principal as cantidadPosts,
                    a.cantidad_posts_subcat as PostsSubcat,
                    a.orderby as orden,
                    a.url as url,
                    a.date_ins as fecha,
                    CONCAT(b.name,' ', b.surname) as ultimaAccion 
                FROM cultura_categorias_vw a
                JOIN cm_users_ad b ON b.id_user = a.iduser_upd
                 ${search} ${order} ${limit} ;
            `;
      const [countRows] = (await pool.query(countQuery, arrayParams)) as [any[], any];
      const total = countRows[0]?.total ?? 0;
      const [data] = (await pool.query(query, arrayParams)) as [any[], any];
      return {
        data: data as any[],
        total: Number(total),
      };
    } catch (error) {
      console.error('Error en getAllCategories:', error);
      throw new Error('Error al obtener las categorias');
    }
  }

  public async getPostTypes(params: IsearchParams): Promise<{ data: any[]; total: number }> {
    let search = '';
    let order = ' ORDER BY a.id DESC';
    let limit = '';
    const arrayParams: (string | number)[] = [];
    if (params.search) {
      search = ` WHERE a.title LIKE ? `;
      arrayParams.push(`%${params.search}%`);
    }

    if (params.order) {
      order = ` ORDER BY ${params.order}`;
    }

    if (params.limit) {
      limit = ` LIMIT ?`;
      arrayParams.push(params.limit);
    }
    if (params.offset) {
      limit += ` OFFSET ? `;
      arrayParams.push(params.offset);
    } else {
      limit += ` OFFSET 0 `;
    }

    try {
      const countQuery = `
                SELECT COUNT(*) as total
                FROM cultura_posts_type_vw a
                JOIN cm_users_ad b ON b.id_user = a.iduser_upd ${search}
            `;
      const query = `
                SELECT 
                    a.id as id,
                    a.title as tipo,
                    a.title as titulo,
                    a.status as status,
                    a.banner as banner,
                    a.orderby as orden,
                    a.url as url,
                    a.date_ins as fecha,
                    CONCAT(b.name,' ', b.surname) as ultimaAccion 
                FROM cultura_posts_type_vw a
                JOIN cm_users_ad b ON b.id_user = a.iduser_upd
                 ${search} ${order} ${limit} ;
            `;
      const [countRows] = (await pool.query(countQuery, arrayParams)) as [any[], any];
      const total = countRows[0]?.total ?? 0;
      const [data] = (await pool.query(query, arrayParams)) as [any[], any];
      return {
        data: data as any[],
        total: Number(total),
      };
    } catch (error) {
      console.error('Error en getAlltypes:', error);
      throw new Error('Error al obtener los tipos');
    }
  }

  private async getImages({ postId }: { postId: number }) {
    const query = `SELECT * from 
      cultura_posts_docs
      inner join docs on cultura_posts_docs.fk_iddoc = docs.id
      where cultura_posts_docs.fk_id = ? `;
    try {
      const [rows] = await pool.query(query, [postId]);
      return rows;
    } catch (e) {
      console.error(e);
      throw new Error('Error al obtener las imagenes del post');
    }
  }

  private async getFiles({ postId }: { postId: number }) {
    const query = `SELECT * from 
      cultura_posts_files
      inner join docs on cultura_posts_files.fk_iddoc = docs.id
      where cultura_posts_files.fk_id = ?`;
    try {
      const [rows] = await pool.query(query, [postId]);
      return rows;
    } catch (e) {
      console.error(e);
      throw new Error('Error al obtener las imagenes del post');
    }
  }

  private async getDays({ postId }: { postId: number }) {
    const query = `SELECT * from 
      cultura_posts_dias
      where fk_idpost = ?`;
    try {
      const [rows] = await pool.query(query, [postId]);
      return rows;
    } catch (e) {
      console.error(e);
      throw new Error('Error al obtener los días del post');
    }
  }

  private async getVideos({ postId }: { postId: number }) {
    const query = `SELECT * from 
    cultura_posts_videos
    where fk_id = ? `;
    try {
      const [rows] = await pool.query(query, [postId]);
      return rows;
    } catch (e) {
      console.error(e);
      throw new Error('Error al obtener las imagenes del post');
    }
  }

  private async getExpedientes({ postId }: { postId: number }): Promise<any[]> {
    const query = `SELECT * from 
      cultura_posts_expediente
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

  private async getComisiones({ postId }: { postId: number }): Promise<any[]> {
    const query = `SELECT * from 
    cultura_posts_comision
    where fk_idpost = ?`;
    try {
      const [rows] = (await pool.query(query, [postId])) as [any[], any];
      const comisiones = rows as any[];
      const comisionesConDetalles = await Promise.all(
        comisiones.map(async (comision) => {
          if (!comision.comision_id) return comision;
          const detalle = await LaborservicesModel.getComisionById(comision.comision_id as string);
          return {
            ...comision,
            detalleComision: detalle, // ✅ limpio
          };
        }),
      );
      return comisionesConDetalles;
    } catch (e) {
      console.error(e);
      throw new Error('Error al obtener las comisiones del post');
    }
  }

  private async getAudiencias({ postId }: { postId: number }): Promise<any[]> {
    const query = `SELECT * from 
    cultura_posts_audiencia
    where fk_idpost = ?`;
    try {
      const [rows] = (await pool.query(query, [postId])) as [any[], any];
      const audiencias = rows as any[];

      const audienciasConDetalles = await Promise.all(
        audiencias.map(async (audiencia) => {
          if (!audiencia.audiencia_id) return audiencia;
          const detalle = await LaborservicesModel.getAudienciaById(
            audiencia.audiencia_id as string,
          );
          return {
            ...audiencia,
            detalleAudiencia: detalle?.RespuestaOfAudiencia?.Listado.Audiencia, // ✅ limpio
          };
        }),
      );
      return audienciasConDetalles;
    } catch (e) {
      console.error(e);
      throw new Error('Error al obtener las audiencias del post');
    }
  }

  private async getSesiones({ postId }: { postId: number }): Promise<any[]> {
    const query = `SELECT * from 
    cultura_posts_sesion
    where fk_idpost = ?`;

    try {
      const [rows] = (await pool.query(query, [postId])) as [any[], any];
      const sesiones = rows as any[];

      const sesionesConDetalles = await Promise.all(
        sesiones.map(async (sesion) => {
          if (!sesion.sesion_id) return sesion;
          const detalle = await LaborservicesModel.getSesionById(sesion.sesion_id as string);
          return {
            ...sesion,
            detalleSesion: detalle?.ArrayOfSesiones?.sesiones,
          };
        }),
      );
      return sesionesConDetalles;
    } catch (e) {
      console.error(e);
      throw new Error('Error al obtener las sesiones del post');
    }
  }

  public async getPostByid(id: number) {
    try {
      const query = 'SELECT * FROM cultura_posts_vw WHERE id = ?';
      const [rows] = (await pool.query(query, [id])) as [any[], any];
      const row = rows[0];
      if (!row) return null;

      const images = await this.getImages({ postId: id });
      const archivos = await this.getFiles({ postId: id });
      const videos = await this.getVideos({ postId: id });
      const dias = await this.getDays({ postId: id });
      const proyectos = await this.getExpedientes({ postId: id });
      const comisiones = await this.getComisiones({ postId: id });
      const audiencias = await this.getAudiencias({ postId: id });
      const sesiones = await this.getSesiones({ postId: id });
      const infoParlamentaria = { proyectos, comisiones, audiencias, sesiones };
      const { title, description, url, url_ext, shortdesc, extradesc, subtitle, ...seteos } = row;

      const textos = { title, description, shortdesc, extradesc, subtitle };

      return {
        textos,
        seteos,
        images,
        archivos,
        videos,
        dias,
        infoParlamentaria,
      };
    } catch (e) {
      console.error(e);
    }
  }

  public async postExpediente(idPost: number, idExpediente: number, idUser: number) {
    const query = `INSERT INTO cultura_posts_expediente (fk_idpost, expediente_id, iduser_ins) VALUES (?, ?, ?)`;
    try {
      await pool.query(query, [idPost, idExpediente, idUser]);
      const detalle = await this.getExpedientes({ postId: idPost });
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

  public async postComision(idPost: number, idComision: number, idUser: number) {
    const query = `INSERT INTO cultura_posts_comision (fk_idpost, comision_id, iduser_ins) VALUES (?, ?, ?)`;
    try {
      await pool.query(query, [idPost, idComision, idUser]);
      const detalle = await this.getComisiones({ postId: idPost });
      return {
        success: true,
        message: 'Comision agregada correctamente',
        data: detalle,
      };
    } catch (e) {
      console.error(e);
      return {
        success: false,
        message: 'Error al agregar la comision al post',
      };
    }
  }

  public async postAudiencia(idPost: number, idAudiencia: number, idUser: number) {
    try {
      const audiencias = await this.getAudiencias({ postId: idPost });
      const existe = audiencias.find((a) => a.audiencia_id == idAudiencia);
      if (existe) {
        return {
          success: false,
          message: 'La audiencia ya se encuentra relacionada al post',
          status: 400,
        };
      }
      const query = `INSERT INTO cultura_posts_audiencia (fk_idpost, audiencia_id, iduser_ins) VALUES (?, ?, ?)`;
      await pool.query(query, [idPost, idAudiencia, idUser]);
      const detalle = await this.getAudiencias({ postId: idPost });
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

  // DELETE RELATIONSHIPS
  public async deleteExpediente(idPost: number, idExpediente: number, idUser: number) {
    const query = `DELETE FROM cultura_posts_expediente WHERE fk_idpost = ? AND expediente_id = ?`;
    try {
      await pool.query(query, [idPost, idExpediente]);
      const detalle = await this.getExpedientes({ postId: idPost });
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

  public async deleteComision(idPost: number, idComision: number, idUser: number) {
    const query = `DELETE FROM cultura_posts_comision WHERE fk_idpost = ? AND comision_id = ?`;
    try {
      await pool.query(query, [idPost, idComision]);
      const detalle = await this.getComisiones({ postId: idPost });
      return {
        success: true,
        message: 'Comision eliminada correctamente',
        data: detalle,
      };
    } catch (e) {
      console.error(e);
      return {
        success: false,
        message: 'Error al eliminar la comision del post',
      };
    }
  }

  public async deleteAudiencia(idPost: number, idAudiencia: number, idUser: number) {
    const query = `DELETE FROM cultura_posts_audiencia WHERE fk_idpost = ? AND audiencia_id = ?`;
    try {
      await pool.query(query, [idPost, idAudiencia]);
      const detalle = await this.getAudiencias({ postId: idPost });
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

  public async postSesion(idPost: number, idSesion: number, idUser: number) {
    const query = `INSERT INTO cultura_posts_sesion (fk_idpost, sesion_id, iduser_ins) VALUES (?, ?, ?)`;
    try {
      await pool.query(query, [idPost, idSesion, idUser]);
      const detalle = await this.getSesiones({ postId: idPost });
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

  public async deleteSesion(idPost: number, idSesion: number, idUser: number) {
    const query = `DELETE FROM cultura_posts_sesion WHERE fk_idpost = ? AND sesion_id = ?`;
    try {
      await pool.query(query, [idPost, idSesion]);
      const detalle = await this.getSesiones({ postId: idPost });
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

  public async updatePost(dto: EditCulturaPostDTO) {
    const { id, translations, mainPost, videos } = dto;

    console.log('Actualizando post:', id, dto);

    const query = `UPDATE cultura_posts_translations SET title = ?, description = ?, shortdesc = ?, extradesc = ?, subtitle = ? WHERE fk_id = ?`;
    const query2 = `UPDATE cultura_posts SET source = ?, type = ?, date_ini = ? , date_end = ? , iduser_upd = ?, orderby = ? WHERE id = ?`;
    try {
      await pool.query(query, [
        translations.title,
        translations.description,
        translations.shortdesc,
        translations.extradesc,
        translations.subtitle,
        id,
      ]);
      const toMysqlDate = (v?: string) => (v ? v.slice(0, 10) : null);
      await pool.query(query2, [
        mainPost?.source,
        toMysqlDate(mainPost?.date_ini),
        toMysqlDate(mainPost?.date_end),
        mainPost?.id_userupd,
        mainPost?.orderby,
        id,
      ]);

      // Eliminar categorias viejas e insertar las nuevas mapeadas desde el DTO
      await pool.query(`DELETE FROM cultura_posts_categorias WHERE fk_idpost = ?`, [id]);
      if (dto.mappedCategories && dto.mappedCategories.length > 0) {
        const insertCategoryQuery = `INSERT INTO cultura_posts_categorias (fk_idpost, fk_idcategory, fk_idsubcategoria, fk_idcat, iduser_ins) VALUES (?, ?, ?, ?, ?)`;
        await Promise.all(
          dto.mappedCategories.map((cat) =>
            pool.query(insertCategoryQuery, [
              id,
              cat.fk_idcategory,
              cat.fk_idsubcategoria,
              cat.fk_idcat,
              mainPost?.id_userupd ?? null,
            ]),
          ),
        );
      }
      // Insertar videos nuevos (los existentes se editan/eliminan vía /magazine/video)
      if (videos && videos.length > 0) {
        const insertVideoQuery = `INSERT INTO cultura_posts_videos (fk_id, url, title, description, iduser_ins)
          VALUES (?, ?, ?, ?, ?)`;
        await Promise.all(
          videos.map((video) =>
            pool.query(insertVideoQuery, [
              id,
              video.url,
              video.title,
              video.description,
              video.iduser_ins ?? mainPost?.id_userupd ?? null,
            ]),
          ),
        );
      }

      return { success: true, message: 'Post actualizado correctamente' };
    } catch (e) {
      console.error(e);
      return { success: false, message: 'Error al actualizar el post' };
    }
  }

  public async createPost({
    title,
    categoryId,
    id_user,
  }: {
    title: string;
    categoryId: number;
    id_user: number;
  }) {
    console.log('Creando post con título:', title, 'y categoría:', categoryId);
    const query = 'INSERT INTO cultura_posts (iduser_ins,iduser_upd) VALUES (?,?)';
    const translationQuery =
      'INSERT INTO cultura_posts_translations (fk_id,title,description,extradesc,shortdesc) VALUES ( ?, ?, ?, ?, ?)';
    const categoryQuery =
      'INSERT INTO cultura_posts_categorias (fk_idpost, fk_idcategory, fk_idcat, iduser_ins) VALUES (?,?,?,?)';
    try {
      const [result] = (await pool.query(query, [id_user, id_user])) as [
        import('mysql2').ResultSetHeader,
        any,
      ];

      console.log('Post creado con ID:', result.insertId);
      await pool.query(translationQuery, [result.insertId, title, '', '', '']);
      await pool.query(categoryQuery, [result.insertId, categoryId, categoryId, id_user]);

      return { id: result.insertId };
    } catch (e) {
      console.error(e);
      return { success: false, message: 'Error al crear el post' };
    }
  }
}

export default new CulturaModel();
