import pool from '../../db/dbConfig';

class ContratacionModel {
  public async getAll({
    offset = 0,
    limit = false,
  }: {
    offset?: number;
    limit?: number | boolean;
  }): Promise<any[]> {
    let txtlimit = '';
    let params: (number | string)[] = [];
    if (typeof limit === 'number') {
      txtlimit = 'LIMIT ? OFFSET ?';
      params.push(limit, offset);
    }
    let query: string = `SELECT 
                  *
                FROM
                  contrataciones_full_vw
                Order By c_date_ins desc ${txtlimit}`;

    try {
      const [rows] = await pool.query(query, params);
      return rows as any[];
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      throw new Error('Error al obtener los datos');
    }
  }
  public async getById({ id }: { id: number }) {
    const query = `SELECT 
                  *
                FROM
                  contrataciones_full_vw c
                WHERE
                  c.c_id = ?`;

    try {
      const [rows] = await pool.query(query, [id]);
      return rows as any;
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      throw new Error('Error al obtener los datos');
    }
  }
}

export default new ContratacionModel();
