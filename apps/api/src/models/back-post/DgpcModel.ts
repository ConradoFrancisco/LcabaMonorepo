import pool from '../../db/dbConfig';
import { IsearchParams } from './MagazineModel';

class DgpcModel {
  public async getAllCampañas(params: IsearchParams): Promise<{ data: any[]; total: number }> {
    let search = '';
    let order = ' ORDER BY id DESC';
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
                FROM dgpc_colegios_inscripcion_vw a
                JOIN cm_users_ad d ON d.id_user = a.iduser_upd
                 ${search}
            `;
      const query = `
                SELECT 
                    a.id as ID,
                    a.tipo as Tipo,  
                    a.title as Titulo,
                    a.date_start_converted as Inicio,
                    a.date_end_converted as Fin,
                    a.inscriptos as Inscriptos,
                    CONCAT(d.name,' ', d.surname) as ultimaAccion 
                FROM dgpc_colegios_inscripcion_vw a
                JOIN cm_users_ad d ON d.id_user = a.iduser_upd
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
      console.error('Error en getAll campañas:', error);
      throw new Error('Error al obtener las campañas');
    }
  }
  public async getAllTypes(params: IsearchParams): Promise<{ data: any[]; total: number }> {
    let search = '';
    let order = ' ORDER BY id DESC';
    let limit = '';
    const arrayParams: (string | number)[] = [];
    if (params.search) {
      search = ` WHERE title LIKE ? `;
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
                FROM dgpc_colegios_insc_tipo_vw a
                 ${search}
            `;
      const query = `
                SELECT 
                    a.id,
                    a.title Tipo,  
                    a.shortdesc as Descripcion,
                    a.status as estado,
                   
                    CONCAT(b.name,' ', b.surname) as ultimaAccion
                FROM dgpc_colegios_insc_tipo_vw a
                left JOIN cm_users_ad b ON b.id_user = a.iduser_upd

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
      console.error('Error en getAll types:', error);
      throw new Error('Error al obtener los tipos');
    }
  }
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
      FROM dgpc_posts_vw a  
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
      FROM dgpc_posts_vw a
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
                FROM dgpc_posts_type_vw a
                JOIN cm_users_ad b ON b.id_user = a.iduser_upd ${search}
            `;
      const query = `
                SELECT 
                    a.id as ID,
                    a.title as Tipo,
                    a.status as Estado,
                    a.banner as banner,
                    a.url as URL,
                    a.orderby as Orden,
                    a.date_ins as Fecha,
                    CONCAT(b.name,' ', b.surname) as UltimaAccion 
                FROM dgpc_posts_type_vw a
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
}
export default new DgpcModel();
