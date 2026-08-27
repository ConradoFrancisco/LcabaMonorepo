import pool from "../../db/dbConfig";
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

class IssueModel {
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
              FROM ${params.table}_issue_vw a 
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
              FROM ${params.table}_issue_vw a 
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
}

export default new IssueModel();