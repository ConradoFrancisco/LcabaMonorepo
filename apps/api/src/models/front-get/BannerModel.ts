import pool from '../../db/dbConfig';

class BannerModel {
  public async bannerList({
    section = false,
    homeslide = false,
    offset = 0,
    limit = false,
    datevalidate = false,
    orderby = 'section',
    order = 'DESC',
  }: {
    section?: string | boolean;
    homeslide?: boolean;
    offset?: number;
    limit?: number | boolean;
    datevalidate?: boolean;
    orderby?: string;
    order?: 'ASC' | 'DESC';
  }): Promise<any[] | false> {
    const langid = 2; // Idioma predeterminado
    const PAGEID = 1; // Página fija (ajustar según necesidad)

    let params: any[] = [];
    params.push(langid, PAGEID);
    let filterActions = '';
    let txtslidehome = '';
    let filterDate = '';
    let txtlimit = '';
    let queryOrder = '';

    // Secciones (filtrar por múltiples valores separados por "|")
    if (section) {
      if (typeof section === 'string') {
        const tags = section.toLowerCase().split('|');
        filterActions = `AND lower(section) IN (${tags.map(() => '?').join(', ')})`;
        params.push(...tags);
      }
    }

    // Filtro para slider principal
    if (homeslide) {
      txtslidehome = 'AND show_slide = 1';
    }

    // Validación de fechas
    if (datevalidate) {
      filterDate = `
        AND (date_end IS NULL OR date_end >= NOW())
        AND (date_article IS NULL OR date_article <= NOW())
      `;
    }

    // Límite y desplazamiento
    if (limit !== false) {
      txtlimit = 'LIMIT ? OFFSET ?';
      params.push(limit, offset);
    }

    // Ordenamiento
    if (orderby) {
      queryOrder = `ORDER BY ${orderby} ${order}`;
    } else {
      queryOrder = 'ORDER BY section DESC, orderby ASC, date_ins DESC, title ASC';
    }

    // Consulta SQL
    const query = `
      SELECT 
        *
      FROM banners_vw
      WHERE 1 = 1
      AND lang = ?
      AND fk_pageid = ?
        ${filterActions}
        ${txtslidehome}
        AND status = 1
        ${filterDate}
        ${queryOrder}
        ${txtlimit};
    `;

    try {
      const [rows] = await pool.query(query, params);
      return rows as any[];
    } catch (error) {
      console.error('Error en bannerList:', error);
      throw new Error('Error al obtener la lista de banners');
    }
  }
  public async bannersGetById(id: number, pageId: number): Promise<any[] | false> {
    const langid = 2; // Idioma predeterminado

    try {
      // Configurar el idioma de la base de datos
      await pool.query("SET lc_time_names = 'es_AR';");

      // Consulta SQL
      const query = `
        SELECT 
          *
        FROM banners_vw
        WHERE lang = ?
          AND id = ?
          AND fk_pageid = ?
          AND status = 1;
      `;

      // Ejecutar la consulta con los parámetros
      const [rows] = await pool.query(query, [langid, id, pageId]);

      return rows as any[];
    } catch (error) {
      console.error('Error en bannersGetById:', error);
      throw new Error('Error al obtener el banner');
    }
  }
}

export default new BannerModel();
