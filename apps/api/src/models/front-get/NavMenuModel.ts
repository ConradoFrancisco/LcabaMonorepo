import pool from '../../db/dbConfig';

/**
 * Interfaz que representa un ítem de menú con sus submenús anidados.
 */
export interface INavMenuItem {
  id: number;
  clientid: number;
  fk_pageid: number;
  parentid: number | null;
  orderby: number | null;
  section: 'cat' | 'menu';
  bgimg: string | null;
  bgcolor: string | null;
  textcolor: string | null;
  newwin: number;
  url: string | null;
  tags: string | null;
  applies_to: 'categorias' | 'productos' | 'all';
  status: number;
  contact_form: number;
  show_top: number;
  show_bottom: number;
  loadcontent: string | null;
  megamenu: number;
  slidemenu: number;
  showrightcol: number;
  showinside: number;
  externallink: number;
  showbanner: number;
  fk_menuid: number | null;
  specialsection: number;
  icon_class: string | null;
  // Campos de traducción (menu_translations)
  title?: string;
  subtitle?: string;
  description?: string;
  shortdesc?: string;
  keywords?: string;
  additional_text?: string;
  lang?: number;
  // Submenús anidados
  subItems: INavMenuItem[];
}

class NavMenuModel {
  /**
   * Retorna el árbol completo de menú para un site (fk_pageid) dado.
   *
   * Estrategia híbrida:
   *  1. Trae los ítems de menú activos (tabla `menu` + `menu_translations`).
   *  2. Trae las relaciones de `menu_tables_rel`: cada fila indica que un ítem de menú
   *     (fk_id) tiene sub-ítems que vienen de una vista externa (`table`) con los IDs
   *     listados en `filter` (varchar separado por comas).
   *  3. Para cada relación, consulta la vista referenciada y agrega los resultados
   *     como `subItems` del ítem padre.
   *  4. Fallback: ítems de menú cuyo `parentid` apunte a otro ítem de menú también
   *     se anidan correctamente (para micrositios que usen la relación directa).
   *
   * @param pageId  ID del micrositio/page (fk_pageid en menu). Si se omite, devuelve todos.
   * @param lang    ID de idioma (default 2 = español).
   */
  public async getNavTree({
    pageId,
    lang = 2,
  }: {
    pageId?: number;
    lang?: number;
  }): Promise<INavMenuItem[]> {
    // Vistas externas permitidas como sub-ítems (whitelist de seguridad)
    const ALLOWED_VIEWS = new Set([
      'cultura_categorias_vw',
      'dgpc_posts_type_vw',
      'magazine_categorias_vw',
      'ilcp_categorias_vw',
      'posts_type_vw',
    ]);

    try {
      // ── 1. Traer todos los ítems de menú activos ──────────────────────────────
      const menuParams: (number | string)[] = [lang, lang];
      let menuWhere = 'WHERE m.status = 1 AND mt.lang = ?';

      if (pageId !== undefined) {
        menuWhere += ' AND m.fk_pageid = ?';
        menuParams.push(pageId);
      }

      const menuQuery = `
        SELECT
          m.id,
          m.clientid,
          m.fk_pageid,
          m.parentid,
          m.orderby,
          m.section,
          m.bgimg,
          m.bgcolor,
          m.textcolor,
          m.newwin,
          m.url,
          m.tags,
          m.applies_to,
          m.status,
          m.contact_form,
          m.show_top,
          m.show_bottom,
          m.loadcontent,
          m.megamenu,
          m.slidemenu,
          m.showrightcol,
          m.showinside,
          m.externallink,
          m.showbanner,
          m.fk_menuid,
          m.specialsection,
          m.icon_class,
          mt.title,
          mt.subtitle,
          mt.description,
          mt.shortdesc,
          mt.keywords,
          mt.additional_text,
          mt.lang
        FROM menu m
        LEFT JOIN menu_translations mt
          ON mt.fk_id = m.id AND mt.lang = ?
        ${menuWhere}
        ORDER BY m.orderby ASC, mt.title ASC
      `;

      const [menuRows] = (await pool.query(menuQuery, menuParams)) as [any[], any];
      if (!menuRows || menuRows.length === 0) return [];

      // ── 2. Indexar ítems por id ───────────────────────────────────────────────
      const itemMap = new Map<number, INavMenuItem>();
      for (const row of menuRows) {
        itemMap.set(row.id, { ...row, subItems: [] });
      }

      const menuIds = Array.from(itemMap.keys());

      // ── 3. Traer relaciones de menu_tables_rel para estos ítems ──────────────
      //      Cada fila dice: el ítem `fk_id` tiene sub-ítems en la vista `table`
      //      con los IDs indicados en `filter` (ej: "70,65,74,76,73,96")
      const placeholders = menuIds.map(() => '?').join(',');
      const relQuery = `
        SELECT fk_id, \`table\`, filter
        FROM menu_tables_rel
        WHERE fk_id IN (${placeholders})
          AND filter IS NOT NULL
          AND filter != ''
          AND status = 1
      `;
      const [relRows] = (await pool.query(relQuery, menuIds)) as [any[], any];

      // ── 4. Para cada relación, consultar la vista y adjuntar como subItems ────
      for (const rel of relRows as Array<{ fk_id: number; table: string; filter: string | null }>) {
        if (!rel.filter || !ALLOWED_VIEWS.has(rel.table)) continue;

        const parent = itemMap.get(rel.fk_id);
        if (!parent) continue;

        // Parsear IDs del campo filter (puede tener comas vacías como ",12")
        const childIds = rel.filter
          .split(',')
          .map((s) => parseInt(s.trim(), 10))
          .filter((n) => !isNaN(n) && n > 0);

        if (childIds.length === 0) continue;

        // Las vistas de navegación comparten estos campos descriptivos y de enlace.
        // Se usa FIELD() para respetar el orden definido en filter
        const idPlaceholders = childIds.map(() => '?').join(',');
        const subQuery = `
          SELECT id, title, description, url, orderby
          FROM \`${rel.table}\`
          WHERE id IN (${idPlaceholders})
          ORDER BY FIELD(id, ${childIds.join(',')})
        `;

        const [subRows] = (await pool.query(subQuery, childIds)) as [any[], any];
        // Marcar de dónde vienen los sub-ítems para uso en el front
        parent.subItems = (subRows as any[]).map((r) => ({
          ...r,
          _sourceTable: rel.table,
          subItems: [],
        }));
      }

      // ── 5. Fallback: ítems de menú con parentid (relación directa menu→menu) ──
      //      Para micrositios que usen parentid en lugar de menu_tables_rel.
      const childIdsSet = new Set<number>();

      for (const item of itemMap.values()) {
        if (item.subItems.length > 0) continue; // ya tiene hijos vía menu_tables_rel
        if (item.parentid && item.parentid !== 0) {
          const parent = itemMap.get(item.parentid);
          if (parent) {
            parent.subItems.push(item);
            childIdsSet.add(item.id);
          }
        }
      }

      // ── 6. Raíces: ítems que no son hijos de otro ítem de menú ───────────────
      const rootItems: INavMenuItem[] = [];
      for (const item of itemMap.values()) {
        if (!childIdsSet.has(item.id)) {
          rootItems.push(item);
        }
      }

      rootItems.sort((a, b) => (a.orderby ?? 999) - (b.orderby ?? 999));
      return rootItems;
    } catch (error) {
      console.error('Error en getNavTree:', error);
      throw new Error('Error al obtener el árbol de menú de navegación');
    }
  }


  /**
   * Versión flat (sin anidamiento) de todos los ítems de menú para un page.
   * Útil para depuración o cuando el front prefiere construir el árbol en el cliente.
   */
  public async getNavFlat({
    pageId,
    lang = 2,
  }: {
    pageId?: number;
    lang?: number;
  }): Promise<any[]> {
    try {
      const params: (number | string)[] = [lang, lang];
      let where = 'WHERE m.status = 1 AND mt.lang = ?';

      if (pageId !== undefined) {
        where += ' AND m.fk_pageid = ?';
        params.push(pageId);
      }

      const query = `
        SELECT
          m.id,
          m.fk_pageid,
          m.parentid,
          m.orderby,
          m.section,
          m.url,
          m.megamenu,
          m.slidemenu,
          m.externallink,
          m.icon_class,
          m.newwin,
          m.show_top,
          m.show_bottom,
          m.showinside,
          m.showbanner,
          m.fk_menuid,
          mt.title,
          mt.subtitle,
          mt.description,
          mt.shortdesc
        FROM menu m
        LEFT JOIN menu_translations mt
          ON mt.fk_id = m.id AND mt.lang = ?
        ${where}
        ORDER BY m.orderby ASC, mt.title ASC
      `;

      const [rows] = (await pool.query(query, params)) as [any[], any];
      return rows as any[];
    } catch (error) {
      console.error('Error en getNavFlat:', error);
      throw new Error('Error al obtener el menú plano de navegación');
    }
  }

  /**
   * DIAGNÓSTICO: devuelve los datos crudos de menu_tables_rel sin ningún filtro.
   * Útil para ver qué valores reales tiene la columna `table` y los `fk_id`.
   * Solo debe usarse en desarrollo — no exponer en producción.
   */
  public async debugRelations({ pageId }: { pageId?: number } = {}): Promise<any> {
    try {
      // Sin filtros: ver TODO lo que hay en menu_tables_rel
      const rawQuery = `SELECT * FROM menu_tables_rel LIMIT 50`;
      const [rawRows] = (await pool.query(rawQuery)) as [any[], any];

      // Valores distintos en la columna `table`
      const distinctTableQuery = `SELECT DISTINCT \`table\`, COUNT(*) as total FROM menu_tables_rel GROUP BY \`table\``;
      const [distinctRows] = (await pool.query(distinctTableQuery)) as [any[], any];

      // Si se pasa pageId, mostrar las filas para los IDs de menú de esa page
      let pageRows: any[] = [];
      if (pageId !== undefined) {
        const [pRows] = (await pool.query(
          `SELECT mtr.* FROM menu_tables_rel mtr
           WHERE mtr.fk_id IN (SELECT id FROM menu WHERE fk_pageid = ?)
           LIMIT 50`,
          [pageId]
        )) as [any[], any];
        pageRows = pRows;
      }

      return {
        distinctTableValues: distinctRows,
        sampleRaw: rawRows,
        rowsForPageId: pageRows,
      };
    } catch (error) {
      console.error('Error en debugRelations:', error);
      throw new Error('Error en diagnóstico de relaciones');
    }
  }
}

export default new NavMenuModel();
