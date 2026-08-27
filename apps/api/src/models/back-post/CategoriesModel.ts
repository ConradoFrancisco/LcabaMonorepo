import pool from '../../db/dbConfig';
import { IsearchParams } from './MagazineModel';

interface FormDataCategory {
    id: number;
    title: string;
    shortdesc: string;
    description: string;
    fk_pageid: number;
    bgcolor: string;
    fgcolor: string;
    keywords: string[];
    status: number;
    table: string;
    orderby: number;
}

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

    public async editCategoryTitle({ id, title, table, id_user }: { id: number, title: string, table: string, id_user: number }) {
        try {
            const queryTranslation = `
        UPDATE ${table}_translations
        SET title = ?
        WHERE fk_id = ?
      `;
            await pool.query(queryTranslation, [title, id]);

            const query = `
        UPDATE ${table}
        SET iduser_upd = ?
        WHERE id = ?
      `;
            await pool.query(query, [id_user, id]);

            return { id };
        } catch (error) {
            console.error('Error en editCategoryTitle:', error);
            throw new Error('Error al editar la categoría');
        }
    }

    public async editCategory(data: FormDataCategory) {
        try {
            const query = `
        UPDATE ${data.table}
        SET title = ?,shortdesc = ?,description = ?,fk_pageid = ?,bgcolor = ?,fgcolor = ?,keywords = ?,status = ?
        WHERE id = ?
      `;
            const [result] = (await pool.query(query, [
                data.title,
                data.shortdesc,
                data.description,
                data.fk_pageid,
                data.bgcolor,
                data.fgcolor,
                data.keywords,
                data.status,
                data.id,
            ])) as [any[], any];
            return result;
        } catch (error) {
            console.error('Error en editCategory:', error);
            throw new Error('Error al editar la categoría');
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
              FROM ${params.table}_vw a
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
              FROM ${params.table}_vw a
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
}
export default new CategoriesModel();
