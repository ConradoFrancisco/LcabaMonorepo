import pool from '../../db/dbConfig';
import { IsearchParams } from './IssueModel';
import EditTypeDTO from '../../DTOS/types/EditTypeDTO';

class TypesModel {
  public async createType({
    title,
    table = 'posts_type',
    id_user,
  }: {
    title: string;
    table: string;
    id_user: number;
  }) {
    try {
      const query = `
        INSERT INTO ${table} (iduser_ins, iduser_upd, status)
        VALUES (?, ?, 1)
      `;
      const [result] = (await pool.query(query, [id_user, id_user])) as [
        import('mysql2').ResultSetHeader,
        any,
      ];

      const queryTranslation = `
        INSERT INTO ${table}_translations (fk_id, title, description, shortdesc)
        VALUES (?, ?, '', '')
      `;
      await pool.query(queryTranslation, [result.insertId, title]);

      return { id: result.insertId };
    } catch (error) {
      console.error('Error en createType:', error);
      throw new Error('Error al crear el tipo');
    }
  }

  public async getTypeById(id: number, table: string = 'posts_type') {
    try {
      const query = `
        SELECT *
        FROM ${table}_vw
        WHERE id = ?
      `;
      const [rows] = (await pool.query(query, [id])) as [any[], any];
      return rows[0] ?? null;
    } catch (error) {
      console.error('Error en getTypeById:', error);
      throw new Error('Error al obtener el tipo');
    }
  }

  public async getAllTypes(params: IsearchParams): Promise<{ data: any[]; total: number }> {
    let search = '';
    let order = ' ORDER BY a.id DESC';
    let limit = '';
    const arrayParams: (string | number)[] = [];
    const table = params.table || 'posts_type';

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
        FROM ${table}_vw a 
        LEFT JOIN cm_users_ad b ON b.id_user = a.iduser_upd ${search} ;
      `;

      const dataQuery = `
        SELECT 
            a.id as id,
            a.title as tipo,
            a.url as url,
            a.status as status,
            a.orderby as orden,
            CONCAT(b.name,' ', b.surname) as ultimaAccion 
        FROM ${table}_vw a 
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
      console.error('Error en getAllTypes:', error);
      throw new Error('Error al obtener los tipos');
    }
  }

  public async editType(data: EditTypeDTO) {
    const table = data.PrefixTable || 'posts_type';
    const mainTable = data.mainTable;
    const translationTable = data.translations;

    try {
      const queryTranslations = `
        UPDATE ${table}_translations
        SET title = ?, shortdesc = ?, description = ?
        WHERE fk_id = ?
      `;

      await pool.query(queryTranslations, [
        translationTable.title || '',
        translationTable.shortdesc || '',
        translationTable.description || '',
        data.id,
      ]);

      const fieldsToUpdate: string[] = [];
      const values: any[] = [];

      if (mainTable.url !== undefined) {
        fieldsToUpdate.push('url = ?');
        values.push(mainTable.url || null);
      }
      if (mainTable.bgcolor !== undefined) {
        fieldsToUpdate.push('bgcolor = ?');
        values.push(mainTable.bgcolor || null);
      }
      if (mainTable.textcolor !== undefined) {
        fieldsToUpdate.push('textcolor = ?');
        values.push(mainTable.textcolor || null);
      }
      if (mainTable.status !== undefined) {
        let statusVal = 1;
        if (typeof mainTable.status === 'object' && mainTable.status !== null && 'data' in (mainTable.status as any)) {
          statusVal = (mainTable.status as any).data?.[0] ?? 0;
        } else if (mainTable.status === 0 || mainTable.status === 1) {
          statusVal = Number(mainTable.status);
        } else if (typeof mainTable.status === 'boolean') {
          statusVal = mainTable.status ? 1 : 0;
        }
        fieldsToUpdate.push('status = ?');
        values.push(statusVal);
      }
      if (mainTable.orderby !== undefined) {
        fieldsToUpdate.push('orderby = ?');
        values.push(Number(mainTable.orderby) || 0);
      }
      if (mainTable.banner !== undefined) {
        fieldsToUpdate.push('banner = ?');
        values.push(mainTable.banner ? 1 : 0);
      }
      if (mainTable.parentid !== undefined) {
        fieldsToUpdate.push('parentid = ?');
        values.push(mainTable.parentid ? Number(mainTable.parentid) : null);
      }
      if (mainTable.solo_cultura !== undefined) {
        fieldsToUpdate.push('solo_cultura = ?');
        values.push(mainTable.solo_cultura ? 1 : 0);
      }
      if (mainTable.gacetilla !== undefined) {
        fieldsToUpdate.push('gacetilla = ?');
        values.push(mainTable.gacetilla ? 1 : 0);
      }
      if (mainTable.showincal !== undefined) {
        fieldsToUpdate.push('showincal = ?');
        values.push(mainTable.showincal ? 1 : 0);
      }
      if (mainTable.iduser_upd !== undefined) {
        fieldsToUpdate.push('iduser_upd = ?');
        values.push(mainTable.iduser_upd || null);
      }

      fieldsToUpdate.push('date_upd = NOW()');

      if (fieldsToUpdate.length > 1) {
        const queryMain = `
          UPDATE ${table}
          SET ${fieldsToUpdate.join(', ')}
          WHERE id = ?
        `;
        values.push(data.id);
        await pool.query(queryMain, values);
      }

      return { id: data.id };
    } catch (error) {
      console.error('Error en editType:', error);
      throw new Error('Error al editar el tipo');
    }
  }

  public async updateStatus(id: number, status: number, table: string = 'posts_type') {
    try {
      const query = `UPDATE ${table} SET status = ?, date_upd = NOW() WHERE id = ?`;
      await pool.query(query, [status, id]);
      return { success: true };
    } catch (error) {
      console.error('Error en updateStatus:', error);
      throw new Error('Error al actualizar el estado del tipo');
    }
  }

  public async deleteType(id: number, table: string = 'posts_type') {
    try {
      await pool.query(`DELETE FROM ${table}_translations WHERE fk_id = ?`, [id]);
      await pool.query(`DELETE FROM ${table} WHERE id = ?`, [id]);
      return { success: true };
    } catch (error) {
      console.error('Error en deleteType:', error);
      throw new Error('Error al eliminar el tipo');
    }
  }
}

export default new TypesModel();
