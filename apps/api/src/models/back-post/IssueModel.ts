import pool from "../../db/dbConfig";
import EditIssueDTO from "../../DTOS/issue/EditIssueDTO";

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
        const table = params.table || 'magazine';

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
              FROM ${table}_issue_vw a 
              LEFT JOIN cm_users_ad b ON b.id_user = a.iduser_upd ${search} ;
          `;

            const dataQuery = `
              SELECT 
                  a.id as id,
                  a.magazine_number as numero,
                  a.title as titulo,
                  a.date_ins as fecha,
                  a.status as status,
                  CONCAT(b.name,' ', b.surname) as ultimaAccion 
              FROM ${table}_issue_vw a 
              LEFT JOIN cm_users_ad b ON b.id_user = a.iduser_upd  
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

    public async getIssueById(id: number, table: string = 'magazine') {
        try {
            const query = `
                SELECT *
                FROM ${table}_issue_vw
                WHERE id = ?
            `;
            const [rows] = (await pool.query(query, [id])) as [any[], any];
            const issue = rows[0] ?? null;
            if (!issue) return null;

            let images: any[] = [];
            try {
                const imagesQuery = `
                    SELECT *
                    FROM ${table}_issue_docs
                    INNER JOIN docs ON ${table}_issue_docs.fk_iddoc = docs.id
                    WHERE ${table}_issue_docs.fk_id = ?
                `;
                const [imgRows] = (await pool.query(imagesQuery, [id])) as [any[], any];
                images = imgRows ?? [];
            } catch (err) {
                console.error('Error fetching issue images:', err);
            }

            let archivos: any[] = [];
            try {
                const filesQuery = `
                    SELECT *
                    FROM ${table}_issue_files
                    INNER JOIN docs ON ${table}_issue_files.fk_iddoc = docs.id
                    WHERE ${table}_issue_files.fk_id = ?
                `;
                const [fileRows] = (await pool.query(filesQuery, [id])) as [any[], any];
                archivos = fileRows ?? [];
            } catch (err) {
                console.error('Error fetching issue files:', err);
            }

            return {
                ...issue,
                images,
                archivos,
            };
        } catch (error) {
            console.error('Error en getIssueById:', error);
            throw new Error('Error al obtener el issue');
        }
    }

    public async createIssue({
        title,
        magazine_number,
        id_user,
        table = 'magazine_issue',
    }: {
        title: string;
        magazine_number?: number;
        id_user: number;
        table?: string;
    }) {
        try {
            const query = `
                INSERT INTO ${table} (magazine_number, iduser_ins, iduser_upd, status)
                VALUES (?, ?, ?, 1)
            `;
            const [result] = (await pool.query(query, [
                magazine_number ?? 0,
                id_user,
                id_user,
            ])) as [import('mysql2').ResultSetHeader, any];

            const queryTranslation = `
                INSERT INTO ${table}_translations (fk_id, title, description, shortdesc)
                VALUES (?, ?, ?, ?)
            `;
            await pool.query(queryTranslation, [
                result.insertId,
                title,
                '',
                '',
            ]);

            return { id: result.insertId };
        } catch (error) {
            console.error('Error en createIssue:', error);
            throw new Error('Error al crear el issue');
        }
    }

    public async editIssue(data: EditIssueDTO) {
        const mainTable = data.mainTable;
        const translationTable = data.translations;
        const prefix = data.PrefixTable || 'magazine_issue';

        try {
            const queryTranslations = `
                UPDATE ${prefix}_translations
                SET title = ?, shortdesc = ?, description = ?, keywords = ?
                WHERE fk_id = ?
            `;

            let keywordsValue = '';
            if (typeof translationTable.keywords === 'string') {
                keywordsValue = translationTable.keywords;
            } else if (Array.isArray(translationTable.keywords)) {
                keywordsValue = translationTable.keywords.join(',');
            }

            await pool.query(queryTranslations, [
                translationTable.title,
                translationTable.shortdesc || '',
                translationTable.description || '',
                keywordsValue,
                translationTable.fk_id,
            ]);

            let statusVal = 1;
            if (typeof mainTable.status === 'object' && mainTable.status !== null && 'data' in (mainTable.status as any)) {
                statusVal = (mainTable.status as any).data?.[0] ?? 0;
            } else if (mainTable.status === 0 || mainTable.status === 1) {
                statusVal = Number(mainTable.status);
            } else if (typeof mainTable.status === 'boolean') {
                statusVal = mainTable.status ? 1 : 0;
            }

            const queryMain = `
                UPDATE ${prefix}
                SET
                    magazine_number = ?,
                    url             = ?,
                    bgcolor         = ?,
                    textcolor       = ?,
                    status          = ?,
                    iduser_upd      = ?,
                    date_upd        = NOW()
                WHERE id = ?
            `;
            await pool.query(queryMain, [
                mainTable.magazine_number ?? 0,
                mainTable.url ?? null,
                mainTable.bgcolor ?? null,
                mainTable.textcolor ?? null,
                statusVal,
                mainTable.iduser_upd ?? null,
                data.id,
            ]);

            return { id: data.id };
        } catch (error) {
            console.error('Error en editIssue:', error);
            throw new Error('Error al editar el issue');
        }
    }

    public async updateStatus(id: number, status: number, table: string = 'magazine_issue') {
        try {
            const query = `UPDATE ${table} SET status = ?, date_upd = NOW() WHERE id = ?`;
            await pool.query(query, [status, id]);
            return { success: true };
        } catch (error) {
            console.error('Error en updateStatus:', error);
            throw new Error('Error al actualizar el estado');
        }
    }

    public async deleteIssue(id: number, table: string = 'magazine_issue') {
        try {
            await pool.query(`DELETE FROM ${table}_translations WHERE fk_id = ?`, [id]);
            await pool.query(`DELETE FROM ${table} WHERE id = ?`, [id]);
            return { success: true };
        } catch (error) {
            console.error('Error en deleteIssue:', error);
            throw new Error('Error al eliminar el issue');
        }
    }
}

export default new IssueModel();