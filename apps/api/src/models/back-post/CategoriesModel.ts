import pool from '../../db/dbConfig';

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
            return resultTranslation.insertId;
        } catch (error) {
            console.error('Error en createCategory:', error);
            throw new Error('Error al crear la categoría');
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
}
export default new CategoriesModel();
