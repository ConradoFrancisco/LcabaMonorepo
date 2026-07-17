import pool from '../../db/dbConfig';
import EditPrensaPostDTO from '../../DTOS/EditPrensaPostDTO';

export interface IsearchParams {
  limit?: number;
  offset?: number;
  search?: string;
  order?: string;
}

class TaquigrafosModel {
  public async getAllVersionesTaquigraficas(
    params: IsearchParams,
  ): Promise<{ data: any[]; total: number }> {
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
            from taquigraficas_vw a
            JOIN cm_users_ad d ON d.id_user = a.iduser_upd
            ${search};
            `;

      const dataQuery = `
            SELECT 
                a.id as ID,
                a.title as Titulo,
                a.fk_typetitle as Tipo,
                a.date_rel_parsed as Fecha,
                CONCAT(d.name,' ', d.surname) as ultimaAccion 
            FROM taquigraficas_vw a
            
            JOIN cm_users_ad d ON d.id_user = a.iduser_upd
            ${search}
            ${order}
            ${limit};
            `;
      const [countRows] = (await pool.query(countQuery, arrayParamsCount)) as [any[], any];
      const total = countRows[0]?.total ?? 0;

      const [data] = (await pool.query(dataQuery, arrayParamsData)) as [any[], any];

      return {
        data: data as any[],
        total: Number(total),
      };
    } catch (error) {
      console.error('Error en getAll versiones taquigraficas:', error);
      throw new Error('Error al obtener las versiones taquigraficas');
    }
  }
}
export default new TaquigrafosModel();
