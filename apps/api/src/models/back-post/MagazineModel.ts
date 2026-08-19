import e from 'express';
import pool from '../../db/dbConfig';
import { PoolConnection, ResultSetHeader } from 'mysql2/promise';
import EditMagazinePostDTO, { VideoItem, AudioItem } from '../../DTOS/EditMagazinePostDTO';
import { formatDayForFront } from '../../helpers/functions';

export interface IsearchParams {
  limit?: number;
  offset?: number;
  search?: string;
  order?: string;
  table?: string;
  filtros?: any;
  slider?: number | boolean;
  pageId?: number;
  status?: number | boolean;
  withImages?: boolean;
}
export interface ICreatePostData {
  title: string;
  body: string;
  shortDesc: string;
  extraDesc: string;
  imagenes: File[];
  archivos: File[];
}

export interface Iday {
  dia?: string;
  desde?: string;
  hasta?: string;
  date?: string;
  descripcion?: string;
}
export type EditParams = {
  textos: {
    title: string;
    subtitle: string;
    shortdesc: string;
    extradesc: string;
    url: string;
    url_ext: string;
    description: string;
  };
  seteos: { id: number;[key: string]: any };
  nuevasImagenes: File[];
  nuevosArchivos: File[];
  newVideos: VideoItem[];
  newAudios: AudioItem[];
  newDays: Iday[];
};
class MagazineModel {
  public async getAllPosts(params: IsearchParams): Promise<{ data: any[]; total: number }> {
    const arrayParamsCount: (string | number)[] = [];
    const arrayParamsData: (string | number)[] = [];

    let search = '';
    let order = ' ORDER BY a.id DESC';
    let limit = '';

    if (params.search) {
      search = ` WHERE a.title LIKE ? OR c.title LIKE ?`;
      const searchTerm = `%${params.search}%`;
      arrayParamsCount.push(searchTerm, searchTerm);
      arrayParamsData.push(searchTerm, searchTerm);
    }

    if (params.order) {
      order = ` ORDER BY ${params.order}`;
    }

    if (params.limit) {
      limit = ` LIMIT ?`;
      arrayParamsData.push(params.limit);
    }

    if (params.offset !== undefined) {
      limit += ` OFFSET ?`;
      arrayParamsData.push(params.offset);
    } else {
      limit += ` OFFSET 0`;
    }

    try {
      const countQuery = `
            SELECT COUNT(*) as total
            FROM magazine_posts_vw a  
            JOIN magazine_categorias_translations b ON a.fk_idcat = b.fk_id 
            JOIN magazine_issue_vw c ON c.fk_id = a.fk_id_magazine_issue 
            JOIN cm_users_ad d ON d.id_user = a.iduser_upd
            ${search};
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
                c.title as revista,
                a.status as visible,
                a.url as url,
                CONCAT(d.name,' ', d.surname) as ultimaAccion 
            FROM magazine_posts_vw a
            left JOIN magazine_categorias_translations b ON a.fk_idcat = b.fk_id 
            left JOIN magazine_issue_vw c ON c.fk_id = a.fk_id_magazine_issue 
            left JOIN cm_users_ad d ON d.id_user = a.iduser_upd
            ${search}
            ${order}
            ${limit};
            `;
      console.log(dataQuery);
      const [countRows] = (await pool.query(countQuery, arrayParamsCount)) as [any[], any];
      const total = countRows[0]?.total ?? 0;
      const [data] = (await pool.query(dataQuery, arrayParamsData)) as [any[], any];
      return {
        data: data as any[],
        total: Number(total),
      };
    } catch (error) {
      console.error('Error en getAllPosts:', error);
      throw new Error('Error al obtener los posts');
    }
  }
  public async getAllIssues(params: IsearchParams): Promise<{ data: any[]; total: number }> {
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
              FROM magazine_issue_vw a 
              JOIN cm_users_ad b ON b.id_user = a.iduser_upd ${search} ;
          `;

      const dataQuery = `
              SELECT 
                  a.id as id,
                  a.magazine_number as numero,
                  a.title as titulo,
                  a.date_ins as fecha,
                  a.status as status,
                  CONCAT(b.name,' ', b.surname) as ultimaAccion 
              FROM magazine_issue_vw a 
              JOIN cm_users_ad b ON b.id_user = a.iduser_upd  
              ${search} ${order} ${limit} ;
          `;

      const [countRows] = (await pool.query(countQuery, arrayParams)) as [any[], any];
      const total = countRows[0]?.total ?? 0;
      const [data] = (await pool.query(dataQuery, arrayParams)) as [any[], any];

      return {
        data: data as any[],
        total: Number(total),
      };
    } catch (error) {
      console.error('Error en getAllIssues:', error);
      throw new Error('Error al obtener los issues');
    }
  }
  public async getAllTypes(params: IsearchParams): Promise<{ data: any[]; total: number }> {
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
              FROM magazine_posts_type_vw a 
              LEFT JOIN cm_users_ad b ON b.id_user = a.iduser_upd ${search} ;
          `;

      const dataQuery = `
              SELECT 
                  a.id as id,
                  a.title as tipo,
                  a.url as url,
                  a.status as status,
                  a.orderby as orden,
                  CONCAT(b.name,' ', b.surname) as ultimaAccion 
              FROM magazine_posts_type_vw a 
              LEFT JOIN cm_users_ad b ON b.id_user = a.iduser_upd  
              ${search} ${order} ${limit} ;
          `;

      const [countRows] = (await pool.query(countQuery, arrayParams)) as [any[], any];
      const total = countRows[0]?.total ?? 0;
      const [data] = (await pool.query(dataQuery, arrayParams)) as [any[], any];

      return {
        data: data as any[],
        total: Number(total),
      };
    } catch (error) {
      console.error('Error en getAllIssues:', error);
      throw new Error('Error al obtener los issues');
    }
  }

  public async getAllCategories(params: IsearchParams): Promise<{ data: any[]; total: number }> {
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
              FROM magazine_categorias_vw a
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
              FROM magazine_categorias_vw a
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

  private async getImages({ postId }: { postId: number }) {
    const query = `SELECT * from 
    magazine_posts_docs
    inner join docs on magazine_posts_docs.fk_iddoc = docs.id
    where magazine_posts_docs.fk_id = ? `;
    try {
      const [rows] = await pool.query(query, [postId]);
      return rows;
    } catch (e) {
      console.error(e);
      throw new Error('Error al obtener las imagenes del post');
    }
  }
  private async getVideos({ postId }: { postId: number }) {
    const query = `SELECT * from 
    magazine_posts_videos
   where fk_id = ? `;
    try {
      const [rows] = await pool.query(query, [postId]);
      return rows;
    } catch (e) {
      console.error(e);
      throw new Error('Error al obtener las imagenes del post');
    }
  }
  private async getAudios({ postId }: { postId: number }) {
    const query = `SELECT * from 
    magazine_posts_audios
   where fk_id = ? `;
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
      magazine_posts_files
      inner join docs on magazine_posts_files.fk_iddoc = docs.id
      where magazine_posts_files.fk_id = ?`;
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
      magazine_posts_dias
      where fk_idpost = ?`;
    try {
      const [rows] = await pool.query(query, [postId]);
      return rows;
    } catch (e) {
      console.error(e);
      throw new Error('Error al obtener los días del post');
    }
  }

  public async getPostByid(id: number) {
    try {
      const query = 'select * from magazine_posts_vw where id = ?';
      const images = await this.getImages({ postId: id });
      const archivos = await this.getFiles({ postId: id });
      const videos = await this.getVideos({ postId: id });
      const days = await this.getDays({ postId: id });
      const audios = await this.getAudios({ postId: id });

      const dias = formatDayForFront(days);

      const [rows] = (await pool.query(query, [id])) as [any[], any];
      const row = rows[0];

      if (!row) return null;

      const { title, description, url, url_ext, shortdesc, extradesc, subtitle, ...seteos } = row;

      const textos = { title, description, shortdesc, extradesc, subtitle };
      // Creamos los dos objetos

      return { textos, seteos, images, archivos, videos, dias, audios };
    } catch (e) {
      console.error(e);
    }
  }

  public async createPost({
    title,
    issueId,
    id_user,
  }: {
    title: string;
    issueId: number;
    id_user: number;
  }) {
    const query =
      'INSERT INTO magazine_posts (fk_id_magazine_issue,iduser_ins,iduser_upd,status,type) VALUES (?,?,?,?,12)';
    const translationQuery =
      'INSERT INTO magazine_posts_translations (fk_id,title,description,extradesc,shortdesc) VALUES (?, ?, ?, ?, ?)';
    try {
      const [result] = (await pool.query(query, [issueId, id_user, id_user, 0])) as [
        import('mysql2').ResultSetHeader,
        any,
      ];
      await pool.query(translationQuery, [result.insertId, title, '', '', '']);
      return { id: result.insertId };
    } catch (error) {
      console.error('Error en createPost:', error);
      throw new Error('Error al crear el post');
    }
  }

  public async editPost(dto: EditMagazinePostDTO) {
    const connection: PoolConnection = await pool.getConnection();
    const postId = dto.getId();
    try {
      await connection.beginTransaction();

      // 1. Update translations
      const translationQuery = `UPDATE magazine_posts_translations 
      SET title = ?, description = ?, extradesc = ?, shortdesc = ?, subtitle = ?
      WHERE fk_id = ?`;
      const translations = dto.getTranslations();
      await connection.query(translationQuery, [
        translations.title,
        translations.description,
        translations.extradesc,
        translations.shortdesc,
        translations.subtitle,
        postId,
      ]);

      // 2. Update main post
      const mainPostQuery = `UPDATE magazine_posts 
      SET fk_id_magazine_issue = ?, source = ?, slider = ?, desta = ?, url = ?, status = ?, 
          iduser_ins = ?, date_ini = ?, date_end = ?, orderby = ?, iduser_upd = ?, url_ext = ?, date_article = ?
      WHERE ID = ?`;
      const mainPost = dto.getMainPost();
      await connection.query(mainPostQuery, [
        mainPost.fk_id_magazine_issue,
        mainPost.source,
        mainPost.slider,
        mainPost.desta,
        mainPost.url,
        mainPost.status,
        mainPost.iduser_ins,
        mainPost.date_ini,
        mainPost.date_end,
        mainPost.orderby,
        mainPost.id_userupd,
        mainPost.url_ext,
        mainPost.date_article,
        postId,
      ]);

      // 3. Update Categories (Clear and Insert)
      const categories = dto.getCategories();
      await connection.query(`DELETE FROM magazine_posts_categorias WHERE fk_idpost = ?`, [postId]);

      if (
        categories &&
        (categories.fk_idcategory || categories.fk_idsubcategoria || categories.fk_idcat)
      ) {
        const insertCategoryQuery = `INSERT INTO magazine_posts_categorias (fk_idpost, fk_idcategory, fk_idsubcategoria, fk_idcat)
                                     VALUES (?, ?, ?, ?)`;
        await connection.query(insertCategoryQuery, [
          postId,
          categories.fk_idcategory,
          categories.fk_idsubcategoria,
          categories.fk_idcat,
        ]);
      }

      // 4. Multimedia (Videos) - Sync (Clear and Insert)
      const videos = dto.getVideos();
      /*  await connection.query(`DELETE FROM magazine_posts_videos WHERE fk_id = ?`, [postId]); */
      if (videos.length > 0) {
        const insertVideoQuery = `INSERT INTO magazine_posts_videos (fk_id, url, title, description, iduser_ins) VALUES ?`;
        const videoValues = videos.map((v) => [
          postId,
          v.url,
          v.title,
          v.description,
          v.iduser_ins,
        ]);
        await connection.query(insertVideoQuery, [videoValues]);
      }

      // 5. Multimedia (Audios) - Sync (Clear and Insert)
      const audios = dto.getAudios();
      /*  await connection.query(`DELETE FROM magazine_posts_audios WHERE fk_id = ?`, [postId]); */
      if (audios.length > 0) {
        const insertAudioQuery = `INSERT INTO magazine_posts_audios (fk_id, url, title, description, iduser_ins) VALUES ?`;
        const audioValues = audios.map((a) => [
          postId,
          a.url,
          a.title,
          a.description,
          a.iduser_ins,
        ]);
        const [result] = await connection.query(insertAudioQuery, [audioValues]);
        console.log('Resultado inserción audios:', result);
      }

      // 6. Days/Agenda - Sync (Update, Insert, Delete)
      const dias = dto.getDays();

      const existingIds = dias.filter((d) => !d.isNew && d.id).map((d) => d.id);
      if (existingIds.length > 0) {
        await connection.query(
          `DELETE FROM magazine_posts_dias WHERE fk_idpost = ? AND id NOT IN (?)`,
          [postId, existingIds],
        );
      } else {
        await connection.query(`DELETE FROM magazine_posts_dias WHERE fk_idpost = ?`, [postId]);
      }

      const existingDays = dias.filter((d) => !d.isNew && d.id);
      for (const d of existingDays) {
        const updateDiaQuery = `UPDATE magazine_posts_dias SET day = ?, date = ?, hour_start = ?, hour_end = ?, date_desc = ?, status = ?, iduser_upd = ?, date_upd = NOW() WHERE id = ?`;
        await connection.query(updateDiaQuery, [
          d.day,
          d.date,
          d.hour_start,
          d.hour_end,
          d.date_desc,
          d.status,
          d.id_user_upd,
          d.id,
        ]);
      }

      const newDays = dias.filter((d) => d.isNew);
      if (newDays.length > 0) {
        const insertDiaQuery = `INSERT INTO magazine_posts_dias (fk_idpost, day, date, hour_start, hour_end, date_desc, status, iduser_ins) VALUES ?`;
        const diaValues = newDays.map((d) => [
          postId,
          d.day,
          d.date,
          d.hour_start,
          d.hour_end,
          d.date_desc,
          d.status,
          d.id_user_ins,
        ]);
        await connection.query(insertDiaQuery, [diaValues]);
      }

      await connection.commit();
      return { success: true, message: 'Post editado correctamente' };
    } catch (error) {
      await connection.rollback();
      console.error('Error en modelo editPost (Transaction Rolled Back):', error);
      throw error;
    } finally {
      connection.release();
    }
  }

  // Resuelve y valida el prefijo de tabla por sección para evitar SQL injection
  // (el prefijo se interpola en la query, no se parametriza).
  // Prensa -> posts_videos | Cultura -> cultura_posts_videos | Revista -> magazine_posts_videos
  private resolveVideoTable(table?: string): string {
    const prefix = (table ?? 'magazine_').trim();
    const allowed: Record<string, string> = {
      '': 'posts_videos',
      cultura_: 'cultura_posts_videos',
      magazine_: 'magazine_posts_videos',
    };
    const tableName = allowed[prefix];
    if (!tableName) {
      throw new Error(`Tabla de videos no permitida: "${table}"`);
    }
    return tableName;
  }

  public async updateVideo(
    id: number,
    title: string,
    description: string,
    url: string,
    table?: string,
  ) {
    try {
      const tableName = this.resolveVideoTable(table);
      const query = `UPDATE ${tableName} SET title = ?, description = ?, url = ? WHERE id = ?`;
      await pool.query(query, [title, description, url, id]);
      return { success: true };
    } catch (error) {
      console.error('Error en updateVideo (Model):', error);
      throw error;
    }
  }

  public async updateAudio(id: number, title: string, description: string, url: string) {
    try {
      const query = `UPDATE magazine_posts_audios SET title = ?, description = ?, url = ? WHERE id = ?`;
      await pool.query(query, [title, description, url, id]);
      return { success: true };
    } catch (error) {
      console.error('Error en updateAudio (Model):', error);
      throw error;
    }
  }

  public async deleteAudio(id: number) {
    try {
      const query = `DELETE FROM magazine_posts_audios WHERE id = ?`;
      await pool.query(query, [id]);
      return { success: true };
    } catch (error) {
      console.error('Error en deleteAudio (Model):', error);
      throw error;
    }
  }

  public async deleteVideo(id: number, table?: string) {
    try {
      const tableName = this.resolveVideoTable(table);
      const query = `DELETE FROM ${tableName} WHERE id = ?`;
      await pool.query(query, [id]);
      return { success: true };
    } catch (error) {
      console.error('Error en deleteVideo (Model):', error);
      throw error;
    }
  }
}
export default new MagazineModel();
