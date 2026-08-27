import pool from '../../db/dbConfig';
import EditCategoriesDTO from '../../DTOS/categories/EditCategoriesDTO';
import { IsearchParams } from './MagazineModel';

class CategoriesModel {
    public async createCategory({ title, table, id_user }: { title: string, table: string, id_user: number }) {
        try {

            const query = `
        INSERT INTO ${table} (iduser_ins,iduser_upd,section)
        VALUES (?,?,?)
      `
            const [result] = (await pool.query(query, [id_user, id_user, 'cat'])) as [
                import('mysql2').ResultSetHeader,
                any,
            ];
            const queryTranslation = `
                INSERT INTO ${table}_translations (fk_id, title,description)
            VALUES (?,?,?)
      `;
            const [resultTranslation] = (await pool.query(queryTranslation, [result.insertId, title, 'desc'])) as [
                import('mysql2').ResultSetHeader,
                any,
            ];
            return { id: result.insertId };
        } catch (error) {
            console.error('Error en createCategory:', error);
            throw new Error('Error al crear la categoría');
        }
    }

    public async getCategoryById(id: number, table: string) {
        try {
            const query = `
        SELECT *
        FROM ${table}_vw
        WHERE id = ?
      `;
            const [rows] = (await pool.query(query, [id])) as [any[], any];
            return rows[0] ?? null;
        } catch (error) {
            console.error('Error en getCategoryById:', error);
            throw new Error('Error al obtener la categoría');
        }
    }

    public async getAllCategories(params: IsearchParams): Promise<{ data: any[]; total: number }> {
        let filters = '';
        let order = ' ORDER BY a.id DESC';
        let limit = '';
        const arrayParamsCount: any[] = [];
        const arrayParamsData: any[] = [];

        if (params.search) {
            filters += ` AND a.title LIKE ? `;
            arrayParamsCount.push(`%${params.search}%`);
            arrayParamsData.push(`%${params.search}%`);
        }

        if (params.filtros?.status) {
            filters += ` AND a.status = ? `;
            const statusVal = parseInt(params.filtros.status);
            arrayParamsCount.push(statusVal);
            arrayParamsData.push(statusVal);
        }

        if (params.filtros?.destacado !== undefined && params.filtros?.destacado !== null) {
            filters += ` AND a.desta = ? `;
            const destacadoVal = parseInt(params.filtros.destacado);
            arrayParamsCount.push(destacadoVal);
            arrayParamsData.push(destacadoVal);
        }

        if (params.filtros?.fechaDesde) {
            filters += ` AND a.date_ins >= ? `;
            arrayParamsCount.push(params.filtros.fechaDesde);
            arrayParamsData.push(params.filtros.fechaDesde);
        }

        if (params.filtros?.fechaHasta) {
            filters += ` AND a.date_ins <= ? `;
            arrayParamsCount.push(params.filtros.fechaHasta);
            arrayParamsData.push(params.filtros.fechaHasta);
        }

        if (params.order) {
            order = ` ORDER BY ${params.order}`;
        }

        if (params.limit) {
            limit = ` LIMIT ?`;
            arrayParamsData.push(params.limit);
        }
        if (params.offset) {
            limit += ` OFFSET ? `;
            arrayParamsData.push(params.offset);
        } else {
            limit += ` OFFSET 0 `;
        }

        try {
            const countQuery = `
              SELECT COUNT(*) as total
              FROM ${params.table}_vw a
              JOIN cm_users_ad b ON b.id_user = a.iduser_upd
              WHERE 1=1 ${filters}
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
              FROM ${params.table}_vw a
              JOIN cm_users_ad b ON b.id_user = a.iduser_upd
              WHERE 1=1 ${filters} ${order} ${limit} ;
          `;
            const [countRows] = (await pool.query(countQuery, arrayParamsCount)) as [any[], any];
            const total = countRows[0]?.total ?? 0;
            const [data] = (await pool.query(query, arrayParamsData)) as [any[], any];
            return {
                data: data as any[],
                total: Number(total),
            };
        } catch (error) {
            console.error('Error en getAllCategories:', error);
            throw new Error('Error al obtener las categorias');
        }
    }


    public async editCategorie(data: EditCategoriesDTO) {
        const mainTable = data.mainTable;
        const TranslationTable = data.translations;
        try {
            const queryTranslations = `
                UPDATE ${data.PrefixTable}_translations
                SET title = ?, shortdesc = ?, description = ?, keywords = ?
                WHERE fk_id = ?
            `;
            await pool.query(queryTranslations, [
                TranslationTable.title,
                TranslationTable.shortdesc,
                TranslationTable.description,
                JSON.stringify(TranslationTable.keywords ?? []),
                TranslationTable.fk_id,
            ]);

            const queryMain = `
                UPDATE ${data.PrefixTable}
                SET
                    orderby    = ?,
                    section    = ?,
                    bgcolor    = ?,
                    fgcolor    = ?,
                    parentid   = ?,
                    url        = ?,
                    desta      = ?,
                    status     = ?,
                    fk_menuid  = ?,
                    iduser_upd = ?,
                    date_upd   = NOW()
                WHERE id = ?
            `;
            await pool.query(queryMain, [
                mainTable.orderby   ?? null,
                mainTable.section   ?? null,
                mainTable.bgColor   ?? null,
                mainTable.fgColor   ?? null,
                mainTable.parentid  ?? null,
                mainTable.url       ?? null,
                mainTable.desta     ?? null,
                mainTable.status    ?? null,
                mainTable.fk_menuid ?? null,
                mainTable.iduser_upd ?? null,
                data.id,
            ]);

            return { id: data.id };
        } catch (error) {
            console.error('Error en editCategorie:', error);
            throw new Error('Error al editar la categoría');
        }
    }
}
export default new CategoriesModel();
