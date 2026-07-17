import pool from '../../db/dbConfig';
import { IsearchParams } from './MagazineModel';

class GeneralModel {
  public async getAllPages(params: IsearchParams): Promise<{ data: any[]; total: number }> {
    let search = '';
    let order = ' ORDER BY id DESC';
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
                FROM page_vw a
                JOIN cm_users_ad d ON d.id_user = a.iduser_upd
                 ${search}
            `;
      const query = `
                SELECT 
                    a.id as id,
                    a.title as Titulo,  
                    a.description as Descripcion,
                    a.url as URL,
                    CONCAT(d.name,' ', d.surname) as ultimaAccion 
                FROM page_vw a
                JOIN cm_users_ad d ON d.id_user = a.iduser_upd
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
      console.error('Error en getAll campañas:', error);
      throw new Error('Error al obtener las campañas');
    }
  }
  public async getAllPageSections(params: IsearchParams): Promise<{ data: any[]; total: number }> {
    let search = '';
    let where = '';
    let order = ' ORDER BY id DESC';
    let limit = '';
    const arrayParams: (string | number)[] = [];
    if (params.pageId) {
      where = ` AND a.fk_pageid = ? `;
      arrayParams.push(params.pageId);
    }
    if (params.search) {
      search = ` AND a.title LIKE ? `;
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
                FROM menu_vw a WHERE 1 = 1 
                ${where} ${search}
            `;
      const query = `
                SELECT 
                    a.id,
                    a.title as Titulo,  
                    a.title_principal as Principal,
                    orderby as Orden,
                    title_page as Pagina,
                    a.status as Estado,
                    CONCAT(b.name,' ', b.surname) as ultimaAccion
                FROM menu_vw a 
                left JOIN cm_users_ad b ON b.id_user = a.iduser_upd WHERE 1 = 1 

                 ${where} ${search} ${order} ${limit} ;
            `;
      const [countRows] = (await pool.query(countQuery, arrayParams)) as [any[], any];
      const total = countRows[0]?.total ?? 0;
      const [data] = (await pool.query(query, arrayParams)) as [any[], any];
      return {
        data: data as any[],
        total: Number(total),
      };
    } catch (error) {
      console.error('Error en getAllSecciones :', error);
      throw new Error('Error al obtener las secciones');
    }
  }
  public async getAllBanners(params: IsearchParams): Promise<{ data: any[]; total: number }> {
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
      FROM banners_vw a  
      JOIN cm_users_ad d ON d.id_user = a.iduser_upd ${search} ;
    `;

      const dataQuery = `
      SELECT 
        a.id as ID,
        a.title as Titulo,
        a.orderby as Orden,
        a.section as Ubicación, 
        a.date_article_parsed as fecha_publicación, 
        a.status as Estado,
        a.title_page as sitio,
        a.url as URL,
        CONCAT(d.name,' ', d.surname) as UltimaAccion
      FROM banners_vw a
      JOIN cm_users_ad d ON d.id_user = a.iduser_upd    
        ${search} ${order} ${limit} 
      ;
    `;

      const [countRows] = (await pool.query(countQuery, arrayParams)) as [any[], any];
      const total = countRows[0]?.total ?? 0;
      const [data] = (await pool.query(dataQuery, arrayParams)) as [any[], any];

      return {
        data: data as any[],
        total: Number(total),
      };
    } catch (error) {
      console.error('Error en getAllBanners:', error);
      throw new Error('Error al obtener los banners');
    }
  }
  public async getPostTypes(params: IsearchParams): Promise<{ data: any[]; total: number }> {
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
                FROM dgpc_posts_type_vw a
                JOIN cm_users_ad b ON b.id_user = a.iduser_upd ${search}
            `;
      const query = `
                SELECT 
                    a.id as ID,
                    a.title as Tipo,
                    a.status as Estado,
                    a.banner as banner,
                    a.url as URL,
                    a.orderby as Orden,
                    a.date_ins as Fecha,
                    CONCAT(b.name,' ', b.surname) as UltimaAccion 
                FROM dgpc_posts_type_vw a
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
      console.error('Error en getAlltypes:', error);
      throw new Error('Error al obtener los tipos');
    }
  }

  public async createPage({ title, id_user }: { title: string; id_user: number }) {
    const query = 'INSERT INTO page (iduser_ins,iduser_upd,status) VALUES (?,?,0)';
    const translationQuery = 'INSERT INTO page_translations (fk_id,title) VALUES (?, ?)';
    try {
      const [result] = (await pool.query(query, [id_user, id_user, 0])) as [
        import('mysql2').ResultSetHeader,
        any,
      ];
      await pool.query(translationQuery, [result.insertId, title]);
      return { id: result.insertId };
    } catch (error) {
      console.error('Error en createPage:', error);
      throw new Error('Error al crear la página');
    }
  }

  public async getPageById({ id }: { id: string }) {
    const queryRedes = `select * from page_socialnet where fk_id = ?`;
    const [redes] = (await pool.query(queryRedes, [id])) as [any[], any];
    const files = await this.getPageFiles({ pageId: id });
    const images = await this.getPageImages({ pageId: id });
    const query = 'SELECT * FROM page_vw WHERE id = ?';
    try {
      const [result] = (await pool.query(query, [id])) as [any[], any];
      const row = result[0];

      const {
        title,
        description,
        url,
        url_ext,
        shortdesc,
        extradesc,
        subtitle,
        abbreviation,
        text_footer,
        keywords,
        shipping_info,
        ...seteos
      } = row;
      const data = {
        textos: {
          title,
          description,
          url_ext,
          shortdesc,
          extradesc,
          subtitle,
          abbreviation,
          text_footer,
          keywords,
          shipping_info,
        },
        archivos: files,
        images,
        seteos,
        redes,
      };
      return data;
    } catch (error) {
      console.error('Error en getPageById:', error);
      throw new Error('Error al obtener la página');
    }
  }

  private async getPageFiles({ pageId }: { pageId: string }) {
    const query = `SELECT * from
      page_files
      inner join docs on page_files.fk_iddoc = docs.id where page_files.fk_id = ? `;
    try {
      const [rows] = await pool.query(query, [pageId]);
      return rows;
    } catch (e) {
      console.error(e);
      throw new Error('Error al obtener los archivos de la página');
    }
  }

  private async getPageImages({ pageId }: { pageId: string }) {
    const query = `SELECT * from
      page_docs
      inner join docs on page_docs.fk_iddoc = docs.id
      where page_docs.fk_id = ? `;
    try {
      const [rows] = await pool.query(query, [pageId]);
      return rows;
    } catch (e) {
      console.error(e);
      throw new Error('Error al obtener las imagenes de la página');
    }
  }

  public async editPage({
    mainData,
    translations,
    redes,
  }: {
    mainData: Record<string, any>;
    translations: Record<string, any>;
    redes?: any[];
  }) {
    const { id, fk_id, lang, ...mainFields } = mainData;
    const pageId = id ?? fk_id;

    // Construir UPDATE dinámico para page
    const mainEntries = Object.entries(mainFields).filter(([, v]) => v !== undefined && v !== null);
    const mainSetClause = mainEntries.map(([k]) => `${k} = ?`).join(', ');
    const mainValues = mainEntries.map(([, v]) => v);

    // Construir UPDATE dinámico para page_translations
    const { fk_id: transFkId, lang: transLang, ...transFields } = translations;
    const transEntries = Object.entries(transFields).filter(
      ([, v]) => v !== undefined && v !== null,
    );
    const transSetClause = transEntries.map(([k]) => `${k} = ?`).join(', ');
    const transValues = transEntries.map(([, v]) => v);
    const translationLang = transLang ?? lang ?? 2;

    try {
      if (mainSetClause) {
        const queryMain = `UPDATE page SET ${mainSetClause} WHERE id = ?`;
        await pool.query(queryMain, [...mainValues, pageId]);
      }

      if (transSetClause) {
        const queryTrans = `UPDATE page_translations SET ${transSetClause} WHERE fk_id = ? AND lang = ?`;
        await pool.query(queryTrans, [...transValues, pageId, translationLang]);
      }

      if (redes) {
        await pool.query('DELETE FROM page_socialnet WHERE fk_id = ?', [pageId]);
        for (const red of redes) {
          const queryRedes = `
            INSERT INTO page_socialnet (fk_id, icon, title, url, iduser_ins) 
            VALUES (?, ?, ?, ?, ?)
          `;
          await pool.query(queryRedes, [
            pageId,
            red.icono || '',
            red.red || '',
            red.url || '',
            mainData.iduser_upd || 0,
          ]);
        }
      }

      return { id: pageId };
    } catch (error) {
      console.error('Error en editPage:', error);
      throw new Error('Error al editar la página');
    }
  }

  public async changeSectionStatus({ id, status }: { id: number; status: number }) {
    const query = 'UPDATE menu SET status = ? WHERE id = ?';
    try {
      await pool.query(query, [status, id]);
      return { success: true };
    } catch (error) {
      console.error('Error en changeSectionStatus:', error);
      throw new Error('Error al cambiar el estado de la sección');
    }
  }
}
export default new GeneralModel();
