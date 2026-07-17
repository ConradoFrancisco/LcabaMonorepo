import pool from '../../db/dbConfig';
import { IsearchParams } from './MagazineModel';

class ObrasModel {
  public async getAllObras(params: IsearchParams): Promise<{ data: any[]; total: number }> {
    let search = '';
    let order = ' ORDER BY id DESC';
    let limit = '';
    const arrayParams: (string | number)[] = [];
    if (params.search) {
      search = ` WHERE titular LIKE ? `;
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
                FROM lici_obras_vw
                 ${search}
            `;
      const query = `
                SELECT 
                    a.id,
                    a.title as Licitación,  
                    a.expediente_full as Expediente,
                    a.estado as Estado,
                    a.objeto as Objeto,
                    a.published_since as ComienzaPublicacion
                FROM lici_obras_vw a
                
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
      console.error('Error en licitaciones de obra:', error);
      throw new Error('Error al obtener las licitaciones de obra');
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
                FROM listado_funcionarios_type_vw 
                 ${search}
            `;
      const query = `
                SELECT 
                    a.id,
                    a.title as AreaTipo,  
                    a.status as visible,
                    a.url,
                    
                    a.orderby as orden,
                    a.date_ins as fecha,
                    CONCAT(b.name,' ', b.surname) as ultimaAccion
                FROM listado_funcionarios_type_vw a
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
      console.error('Error en getAllFuncionarios:', error);
      throw new Error('Error al obtener los funcionarios');
    }
  }
}
export default new ObrasModel();
