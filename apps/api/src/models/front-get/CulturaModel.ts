import pool from '../../db/dbConfig';

class CulturaModel {
  public async culturacategoriasGetById(id: number): Promise<any[]> {
    const langid = 2;
    const query = `
          SELECT *
          FROM cultura_categorias_vw
          WHERE lang = ? 
          AND status = 1
          AND id = ?;
        `;

    try {
      const [rows] = await pool.query(query, [langid, id]);
      return rows as any[];
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      throw new Error('Error al obtener los datos');
    }
  }

  public async culturaCategoriasGetByUrl(url: string): Promise<any[]> {
    const langid = 2;
    const query = `
          SELECT *
          FROM cultura_categorias_vw
          WHERE lang = ? 
          AND status = 1
          AND url = ?;
        `;

    try {
      const [rows] = await pool.query(query, [langid, url]);
      return rows as any[];
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      throw new Error('Error al obtener los datos');
    }
  }
  public async fetchCategoriesCultura({
    categories = false,
    searchsubcat = false,
    desta = false,
    offset = 0,
    limit = false,
  }: {
    categories?: number | false;
    searchsubcat?: boolean;
    desta?: boolean;
    offset?: number;
    limit?: number | false;
  }): Promise<any[]> {
    const langid = 2; // Idioma predeterminado

    let txtlimit = '';
    let params: (number | string)[] = [langid];

    if (typeof limit === 'number') {
      txtlimit = 'LIMIT ? OFFSET ?';
      params.push(limit, offset);
    }

    let orderby = 'ORDER BY orderby DESC, date_ins DESC, title ASC';
    let txtdesta = desta ? 'AND desta = 1' : '';

    if (desta) {
      orderby = 'ORDER BY desta DESC, orderby DESC, date_ins DESC, title ASC';
    }

    let txtcat = '';
    if (categories) {
      txtcat = searchsubcat ? 'AND parentid = ?' : 'AND id = ?';
      params.push(categories);
    }

    const query = `
            SELECT * 
            FROM cultura_categorias_vw
            WHERE lang = ? 
            ${txtdesta}
            ${txtcat}
            AND status = 1
            ${orderby}
            ${txtlimit};
          `;

    try {
      const [rows] = await pool.query(query, params);
      return rows as any[];
    } catch (error) {
      console.error('Error al obtener las categorías:', error);
      throw new Error('Error al obtener las categorías');
    }
  }
  public async getCulturaPostDias({
    fk_idpost,
    status = false,
    offset = 0,
    limit = false,
  }: {
    fk_idpost: number;
    status: number | boolean;
    offset?: number;
    limit?: number | boolean;
  }): Promise<any[]> {
    let txtStatus = '';
    let txtLimit = '';
    let params: any[] = [fk_idpost];

    if (status !== false) {
      txtStatus = 'AND status = ?';
      params.push(status);
    }

    if (typeof limit === 'number') {
      txtLimit = 'LIMIT ? OFFSET ?';
      params.push(limit, offset);
    }

    const query = `
              SELECT *
              FROM cultura_posts_dias
              WHERE fk_idpost = ?
              ${txtStatus}
              ORDER BY day DESC
              ${txtLimit};
            `;

    try {
      const [rows] = await pool.query(query, params);
      return rows as any[];
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      throw new Error('Error al obtener los datos');
    }
  }
  public async cultPostsGetTableByName(id: number, name: string): Promise<any[]> {
    let tableDate = '';

    switch (name) {
      case 'expediente':
        tableDate = 'posts_expediente';
        break;
      case 'legislador':
        tableDate = 'posts_legislador';
        break;
      case 'comision':
        tableDate = 'posts_comision';
        break;
      case 'sesion':
        tableDate = 'posts_sesion';
        break;
      case 'audiencia':
        tableDate = 'posts_audiencia';
        break;
      default:
        return [];
    }

    const columnName = `${name}_id`;
    const query = `
      SELECT ${columnName}
      FROM cultura_${tableDate}
      WHERE fk_idpost = ?
    `;

    try {
      const [rows] = await pool.query(query, [id]);
      return rows as any[];
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      throw new Error('Error al obtener los datos');
    }
  }
  public async getCulturaPosts({
    banner = false,
    desta = false,
    datevalidate = false,
    offset = 0,
    limit = false,
  }: {
    banner?: boolean;
    desta?: boolean;
    datevalidate?: boolean;
    offset?: number;
    limit?: number | false;
  }): Promise<any[]> {
    let query = `SELECT * FROM cultura_posts_vw WHERE status = 1`;
    let params: (number | string)[] = [];

    // Filtro por banner
    if (banner) {
      query += ' AND slider = 1';
    }

    // Filtro por destacado
    if (desta) {
      query += ' AND desta = 1';
      query += ' ORDER BY orderby DESC, COALESCE(date_article, date_ins) DESC';
    } else {
      query += ' ORDER BY RAND(), COALESCE(date_article, date_ins) DESC';
    }

    // Validación de fecha
    if (datevalidate) {
      query += `
        AND (date_end_pub IS NULL OR date_end_pub >= NOW())
        AND (date_article IS NULL OR date_article <= NOW())
      `;
    }

    // Paginación
    if (typeof limit === 'number') {
      query += ' LIMIT ? OFFSET ?';
      params.push(limit, offset);
    }

    try {
      const [rows] = await pool.query(query, params);
      return rows as any[];
    } catch (error) {
      console.error('Error en getCulturaPosts:', error);
      throw new Error('Error al obtener los posts');
    }
  }
  public async getCulturaPostsAgenda({
    type = false,
    desta = false,
    start = false,
    end = false,
  }: {
    type?: number | false;
    desta?: boolean;
    start?: string | false;
    end?: string | false;
  }): Promise<any[]> {
    let query = `
      SELECT 
        cp.id, cp.title, cp.url, cp.shortdesc, cp.subtitle, cp.idcategories, 
        cp.idsubcategories, cp.date_ini, cp.date_end, cpd.day, cpd.date, 
        cpd.hour_start, cpd.hour_end, cpd.date_desc
      FROM cultura_posts_vw cp
      LEFT OUTER JOIN cultura_posts_dias cpd ON cpd.fk_idpost = cp.id
      WHERE (cp.date_ini IS NOT NULL OR cpd.day IS NOT NULL OR cpd.date IS NOT NULL)
      AND cp.status = 1
    `;

    let params: (string | number)[] = [];

    // Filtrar por tipo de post
    if (type) {
      query += ' AND cp.tipo_post_id = ?';
      params.push(type);
    }

    // Filtrar por destacado
    if (desta) {
      query += ' AND cp.desta = 1';
    }

    // Filtrar por fecha
    if (start && end) {
      query += `
        AND (
          ((cp.date_ini >= ?) AND (cp.date_end <= ?)) 
          OR (cpd.date BETWEEN ? AND ?) 
          OR (? BETWEEN cp.date_ini AND cp.date_end)
        )
      `;
      params.push(start, end, start, end, start);
    }

    // Ordenar resultados
    query += ' ORDER BY COALESCE(cp.date_ini, cpd.date) DESC';

    try {
      const [rows] = await pool.query(query, params);
      return rows as any[];
    } catch (error) {
      console.error('Error en getCulturaPostsAgenda:', error);
      throw new Error('Error al obtener los posts de agenda');
    }
  }
  public async getCulturaPostTypes({
    offset = 0,
    limit = false,
  }: {
    offset?: number;
    limit?: number | false;
  }): Promise<any[]> {
    let query = `
      SELECT * 
      FROM cultura_posts_type_vw
      WHERE status = 1
      ORDER BY title DESC
    `;

    let params: number[] = [];

    if (typeof limit === 'number') {
      query += ' LIMIT ? OFFSET ?';
      params.push(limit, offset);
    }

    try {
      const [rows] = await pool.query(query, params);
      return rows as any[];
    } catch (error) {
      console.error('Error en getCulturaPostTypes:', error);
      throw new Error('Error al obtener los tipos de posts');
    }
  }
  public async getCulturaPostTypesByUrl({ url }: { url: string }): Promise<any[]> {
    let query = `
      SELECT * 
      FROM cultura_posts_type_vw
      WHERE status = 1
      and url = ?
      ORDER BY title DESC
    `;

    let params: string[] = [url];

    try {
      const [rows] = await pool.query(query, params);
      return rows as any[];
    } catch (error) {
      console.error('Error en getCulturaPostTypes:', error);
      throw new Error('Error al obtener los tipos de posts');
    }
  }
}

export default new CulturaModel();
