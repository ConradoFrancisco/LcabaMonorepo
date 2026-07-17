import pool from '../../db/dbConfig';
import { IsearchParams } from './MagazineModel';

class ComprasModel {
  public async getAllContrataciones(
    params: IsearchParams,
  ): Promise<{ data: any[]; total: number }> {
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
      FROM contrataciones_vw a  
     ${search} ;
    `;

      const dataQuery = `
      SELECT 
        a.id as id,
        a.title as Contratación,
        a.expediente_full as Expediente,
        a.objeto as Objeto,
        a.published_since as ComienzaPublicacion
    
      FROM contrataciones_vw a
      
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
  public async getAllLicitaciones(params: IsearchParams): Promise<{ data: any[]; total: number }> {
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
      FROM licitaciones_vw a  
     ${search} ;
    `;

      const dataQuery = `
      SELECT 
        a.id as id,
        a.title as Licitación,
        a.expediente_full as Expediente,
        a.estado as Estado,
        a.objeto as Objeto,
        a.date_apertura as FechaApertura,
        a.hour_apertura as HoraApertura,
        a.published_since as ComienzaPublicacion

      FROM licitaciones_vw a
        
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
}
export default new ComprasModel();
