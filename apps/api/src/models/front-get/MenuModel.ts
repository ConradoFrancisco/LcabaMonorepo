import pool from '../../db/dbConfig';

class MenuModel {
  public async menuList({
    princ = 0,
    limit = false,
    offset = 0,
  }: {
    princ: number;
    limit: number | boolean;
    offset: number;
  }): Promise<any[]> {
    const langid = 2;
    let txtsql = 'WHERE status = 1 AND lang = ?';
    let params: (number | string)[] = [langid];
    let txtlimit = '';
    const orderby = 'ORDER BY orderby ASC, date_ins DESC, title ASC';

    if (princ === 0) {
      txtsql += ' AND (parentid IS NULL OR parentid = 0)';
    } else {
      txtsql += ' AND parentid = ?';
      params.push(princ);
    }

    if (typeof limit === 'number') {
      txtlimit = 'LIMIT ? OFFSET ?';
      params.push(limit, offset);
    }

    const query = `
      SELECT 
        *
      FROM menu_vw
      ${txtsql}
      ${orderby}
      ${txtlimit};
    `;

    try {
      const [rows] = await pool.query(query, params);
      return rows as any[];
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      throw new Error('Error al obtener los datos');
    }
  }

  public async menuGetById({ id }: { id: number }) {
    // ESTE METODO FUNCIONA
    const langid = 2;
    const query = `SELECT 
                *
            FROM  menu_vw
            where lang = ? 
            and id = ?
            and status = 1`;

    let params: (number | string)[] = [langid];
    params.push(id);
    try {
      const [rows] = await pool.query(query, params);
      return rows as any[];
    } catch (error) {
      console.error(error);
    }
  }

  public async menuGetUrlById({ id }: { id: number }) {
    // ESTE METODO FUNCIONA

    const query = `SELECT 
                url
            FROM  menu_vw
            where id = ?
           `;

    let params: (number | string)[] = [];
    params.push(id);
    try {
      const [rows] = await pool.query(query, params);
      return rows as any[];
    } catch (error) {
      console.error(error);
    }
  }

  public async menuGetByUrl({ url }: { url: string }) {
    // ESTE METODO FUNCIONA

    const query = `SELECT 
                *
            FROM  menu_vw
            where url = ?
            and status = 1					
            and lang = 2	
           `;

    let params: string[] = [];
    params.push(url);
    try {
      const [rows] = await pool.query(query, params);
      return rows as any[];
    } catch (error) {
      console.error(error);
    }
  }
}

export default new MenuModel();
