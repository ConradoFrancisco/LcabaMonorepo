import pool from '../../../db/dbConfig';
import { IsearchParams } from '../MagazineModel';

class PageModel {
  public async getAll(searchParams: IsearchParams) {
    try {
      let search = '';
      let order = ' ORDER BY a.id DESC';
      let limit = '';
      const arrayParams: (string | number)[] = [];
      const countQuery = `
            SELECT COUNT(*) as total
            FROM page_vw  a
            JOIN cm_users_ad d ON d.id_user = a.iduser_upd
            ;
            `;

      const dataQuery = `
            SELECT 
            a.id as id,
            a.title as Title,
            a.description as Descripcion,
            a.url as url,
             CONCAT(d.name,' ', d.surname) as ultimaAccion 
            FROM page_vw a
            left JOIN cm_users_ad d ON d.id_user = a.iduser_upd
            ${search}
            ${order}
            ${limit};`;
      const [countRows] = (await pool.query(countQuery, arrayParams)) as [any[], any];
      const total = countRows[0]?.total ?? 0;

      const [data] = (await pool.query(dataQuery, arrayParams)) as [any[], any];

      return {
        data: data as any[],
        total: Number(total),
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export default new PageModel();
