import pool from '../../db/dbConfig';

class BannerModel {
  public async areasList({
    section = false,
    offset = 0,
    limit = false,
  }: {
    section?: string | boolean;
    offset?: number;
    limit?: number | boolean;
  }): Promise<any[] | false> {
    let txtsql = '';

    let txtlimit = '';
    const params: any[] = [];
    const langid = 2;

    // Condiciones dinámicas
    if (section) {
      txtsql = ' AND area = ?';
      params.push(section);
    }

    if (typeof limit === 'number') {
      txtlimit = 'LIMIT ? OFFSET ?';
      params.push(limit, offset);
    }

    const orderby = 'ORDER BY orderby_interno ASC, title ASC';

    // Consulta SQL
    const query = `
          SELECT 
            *
          FROM listado_funcionarios_vw
          WHERE 1 = 1
          AND lang = ?
          AND status = 1
          ${txtsql}
        
          ${orderby}
          ${txtlimit};
        `;
    console.log(query);
    // Agregar langid como parámetro obligatorio
    params.unshift(langid);

    try {
      const [rows] = await pool.query(query, params);
      return rows as any[];
    } catch (error) {
      console.error('Error en areasList:', error);
      throw new Error('Error al obtener las áreas');
    }
  }

  public async GetById(id: number): Promise<any[] | false> {
    const langid = 2; // Idioma predeterminado

    try {
      // Configurar el idioma de la base de datos (si es necesario)
      await pool.query("SET lc_time_names = 'es_AR'");

      // Consulta SQL
      const query = `
            SELECT 
              *
            FROM listado_funcionarios_vw
            WHERE lang = ? 
              AND status = 1
              AND id = ?;
          `;

      // Ejecutar la consulta
      const [rows] = await pool.query(query, [langid, id]);

      return rows as any[];
    } catch (error) {
      console.error('Error en bannersGetById:', error);
      throw new Error('Error al obtener los banners');
    }
  }
  public async getByUrl(url: string): Promise<any[] | false> {
    const langid = 2; // Idioma predeterminado

    try {
      // Configurar el idioma de la base de datos (si es necesario)
      await pool.query("SET lc_time_names = 'es_AR'");

      // Consulta SQL
      const query = `
            SELECT 
              *
            FROM listado_funcionarios_vw
            WHERE lang = ? 
              AND status = 1
              AND url = ?;
          `;

      // Ejecutar la consulta
      const [rows] = await pool.query(query, [langid, url]);

      return rows as any[];
    } catch (error) {
      console.error('Error en bannersGetByUrl:', error);
      throw new Error('Error al obtener los banners');
    }
  }
}
export default new BannerModel();
