import pool from '../../db/dbConfig';
import EditPrensaPostDTO from '../../DTOS/EditPrensaPostDTO';
import { IsearchParams } from './MagazineModel';

class PrensaModel {
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
      FROM posts_vw a  
      JOIN cm_users_ad d ON d.id_user = a.iduser_upd ${search} ;
    `;

      const dataQuery = `
      SELECT 
        a.id as ID,
        a.title as Titulo,
        a.tipo_post as Tipo,
        a.date_ins_parsed as Fecha,
        a.desta as Destacado,
        a.status as Visible,
        a.url as URL,
        CONCAT(d.name,' ', d.surname) as UltimaAccion
      FROM posts_vw a
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
                FROM posts_type_vw a
                JOIN cm_users_ad b ON b.id_user = a.iduser_upd ${search}
            `;
      const query = `
                SELECT 
                    a.id as id,
                    a.title as titulo,
                    a.status as Visible,
                    a.banner as banner,
                    a.orderby as Orden,
                    a.url as URL,
                    a.date_ins as Fecha,
                    CONCAT(b.name,' ', b.surname) as UltimaAccion 
                FROM posts_type_vw a
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
  public async getSuscriptores(params: IsearchParams): Promise<{ data: any[]; total: number }> {
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
      if (params.offset) {
        limit += ` OFFSET ? `;
        arrayParams.push(params.offset);
      }
    }

    try {
      const countQuery = `
                SELECT COUNT(*) as total
                FROM prensa_suscriptores_vw a
                JOIN cm_users_ad b ON b.id_user = a.iduser_upd ${search}
            `;
      const query = `
                SELECT 
                    a.id as ID,
                    a.name as Nombre,
                    a.lastname as Apellido,
                    a.org as Medio,
                    a.email as Email,
                    CONCAT(b.name,' ', b.surname) as UltimaAccion 
                FROM prensa_suscriptores_vw a
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
      console.error('Error en getAllSuscriptores:', error);
      throw new Error('Error al obtener los suscriptores');
    }
  }
  public async editPost(dto: EditPrensaPostDTO) {

    const table = dto.table || '';
    try {
      // Query para translations
      const translationQuery = `UPDATE ${table}posts_translations 
      SET title = ?, description = ?, extradesc = ?, shortdesc = ?, subtitle = ?
      WHERE fk_id = ?`;
      const translations = dto.getTranslations();
      await pool.query(translationQuery, [
        translations.title,
        translations.description,
        translations.extradesc,
        translations.shortdesc,
        translations.subtitle,
        dto.getId(),
      ]);

      // Query para main post
      const mainPostQuery = `UPDATE ${table}posts 
      SET source = ?, desta = ?, url = ?, status = ?, type = ?,date_efemerides = ?,
          date_article = ?, date_end = ?, orderby = ?, iduser_upd = ?
      WHERE ID = ?`;
      const mainPost = dto.getMainPost();
      await pool.query(mainPostQuery, [
        mainPost.source ?? null,
        mainPost.desta ?? null,
        mainPost.url ?? null,
        mainPost.status ?? null,
        mainPost.type ?? null,

        mainPost.date_efemerides ?? null,
        mainPost.date_article ?? null,
        mainPost.date_end ?? null,
        mainPost.orderby ?? null,
        mainPost.id_userupd ?? null,

        dto.getId(),
      ]);

      const videos = dto.getVideos();
      if (videos.length > 0) {
        await Promise.all(
          videos.map(async (video) => {
            const insertVideoQuery = `INSERT INTO ${table}posts_videos (fk_id, url, title, description, iduser_ins)
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

      return { success: true, message: 'Post editado correctamente' };
    } catch (error) {
      console.error('Error en modelo editPost:', error);
      throw error;
    }
  }
}
export default new PrensaModel();
