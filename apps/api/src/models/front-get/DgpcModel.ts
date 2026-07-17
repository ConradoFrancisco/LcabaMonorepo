import pool from '../../db/dbConfig';
class DgpcModel {
  public async DGPCTemporadaInscFechaExists({
    dateStart,
    fkIdInscTipo,
    id,
  }: {
    dateStart: string;
    fkIdInscTipo: number;
    id: number;
  }): Promise<any> {
    let params = [dateStart, fkIdInscTipo];
    let txtIdPropio = '';

    if (id > 0) {
      txtIdPropio = ' AND id <> ? ';
      params.push(id);
    }
    const query = `
     SELECT *
		FROM dgpc_colegios_inscripcion_vw
		where ? between date_start and date_end
        and fk_id_insc_tipo = ?
        ${txtIdPropio}
    `;

    try {
      const [rows] = await pool.query(query, params);
      return rows as any[];
    } catch (error) {
      console.error('Error en Temporada de inscripción:', error);
      throw new Error('Error en Temporada de inscripción:');
    }
  }
  public async getInscripcionesFechaActual({ id = false }: { id: number | false }): Promise<any> {
    let params = [];
    let txtIdPropio = '';
    console.log('aca:', id);
    if (id) {
      txtIdPropio = ' and fk_id_insc_tipo = ?';
      params.push(id);
    }
    const query = `
     SELECT 
                (CASE 
                    WHEN ( '".date("Y-m-d")."' BETWEEN a.date_start and a.date_end ) THEN 'activo'
                    ELSE 'inactivo'
                  END) AS estado ,
                  a.*
                FROM dgpc_colegios_inscripcion_vw a
                where 1 = 1
			${txtIdPropio}
			and a.status = 1
			order by date_end desc
    `;

    try {
      const [rows] = await pool.query(query, params);
      return rows as any[];
    } catch (error) {
      console.error('Error al traer inscripciones', error);
      throw new Error('Error al traer inscripciones');
    }
  }
  public async getConcursoByUrl({ url }: { url: string }): Promise<any[]> {
    let query = `
      SELECT 
             *
            FROM dgpc_colegios_inscripcion_vw
            where url = ?
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
  public async getConcursoById({ id }: { id: number }): Promise<any[]> {
    let query = `
      SELECT 
             *
            FROM dgpc_colegios_inscripcion_vw
            where id = ?
    `;

    let params: any[] = [id];

    try {
      const [rows] = await pool.query(query, params);
      return rows as any[];
    } catch (error) {
      console.error('Error en getCulturaPostTypes:', error);
      throw new Error('Error al obtener los tipos de posts');
    }
  }
  public async getCursoByTupiInsc({ FkId }: { FkId: number }): Promise<any[]> {
    let query = `
      select * 
                from dgpc_colegios_insc_tipo_divisiones_vw
                where 1 = 1
                and fk_id_dgpc_colegios_insc_tipo = ?
                order by title asc
    `;

    let params: any[] = [FkId];

    try {
      const [rows] = await pool.query(query, params);
      return rows as any[];
    } catch (error) {
      console.error('Error al obtener los cursos:', error);
      throw new Error('Error al obtener los cursos:');
    }
  }

  public async getColegiosNiveles({ id = false }: { id: number | false }): Promise<any[]> {
    let extra = '';
    let params: any[] = [];
    if (id) {
      extra = `where id = ?`;
      params.push(id);
    }
    let query = `
      select * from colegios_nivel ${extra}               
      `;
    try {
      const [rows] = await pool.query(query, params);
      return rows as any[];
    } catch (error) {
      console.error('Error al obtener los niveles', error);
      throw new Error('Error al obtener los niveles:');
    }
  }
  //SE VA A ILCP
  /* public async ilcpOrigenInscListDGPC({ idorigen }: { idorigen: number | false }): Promise<any[]> {
    let query = `
      SELECT *
      FROM ilcp_cursos_insc_origen_vw
      WHERE status = 1 AND lang = ?
    `;
    let params: any[] = [2];
    
    if (idorigen) {
      query += " AND id = ?";
      params.push(idorigen);
    }
    
    query += " ORDER BY orderby ASC";

    try {
      const [rows] = await pool.query(query, params);
      return rows as any[];
    } catch (error) {
      console.error("Error en ilcpOrigenInscListDGPC:", error);
      throw new Error("Error al obtener los datos");
    }
  } */
  public async dgpcPostsGetTableByName({ id, name }: { id: number; name: string }): Promise<any[]> {
    const tableMap: Record<string, string> = {
      expediente: 'dgpc_posts_expediente',
      legislador: 'dgpc_posts_legislador',
      comision: 'dgpc_posts_comision',
      sesion: 'dgpc_posts_sesion',
      audiencia: 'dgpc_posts_audiencia',
    };

    const tableDate = tableMap[name] || '';
    if (!tableDate) return [];

    const query = `SELECT ${name}_id FROM ${tableDate} WHERE fk_idpost = ?`;
    try {
      const [rows] = await pool.query(query, [id]);
      return rows as any[];
    } catch (error) {
      console.error('Error en dgpcPostsGetTableByName:', error);
      throw new Error('Error al obtener los datos');
    }
  }
  public async getPostsByTableNameId({ id, name }: { id: number; name: string }): Promise<any[]> {
    const tableMap: Record<string, string> = {
      expediente: 'dgpc_posts_expediente',
      legislador: 'dgpc_posts_legislador',
      comision: 'dgpc_posts_comision',
      sesion: 'dgpc_posts_sesion',
      audiencia: 'dgpc_posts_audiencia',
    };

    const tableDate = tableMap[name];
    if (!tableDate) return [];

    const columnName = `${name}_id`;
    const query = `SELECT * FROM ${tableDate} WHERE ${columnName} = ?`;

    try {
      const [rows] = await pool.query(query, [id]);
      return rows as any[];
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      throw new Error('Error al obtener los datos');
    }
  }
  public async postsGetTypes({
    offset = 0,
    limit = false,
  }: {
    offset?: number;
    limit?: number | boolean;
  }): Promise<any[]> {
    let params: any[] = [];
    let txtLimit = '';
    if (typeof limit === 'number') {
      txtLimit = 'LIMIT ? OFFSET ?';
      params.push(limit, offset);
    }

    let query = `
         SELECT 
              *
            FROM
              dgpc_posts_type_vw
            WHERE 
                1 = 1
                and status = 1
            Order By title asc 
            ${txtLimit}           
        `;
    try {
      const [rows] = await pool.query(query, params);
      return rows as any[];
    } catch (error) {
      console.error('Error al obtener los niveles', error);
      throw new Error('Error al obtener los niveles:');
    }
  }
  public async postsGetTypesByUrl({ url }: { url: string }): Promise<any[]> {
    let params: any[] = [];
    params.push(url);

    let query = `
         SELECT 
              *
            FROM
              dgpc_posts_type_vw
            WHERE 
                1 = 1
            AND url = ?
                and status = 1
            Order By title desc            
        `;
    try {
      const [rows] = await pool.query(query, params);
      return rows as any[];
    } catch (error) {
      console.error('Error al obtener los Posts', error);
      throw new Error('Error al obtener los niveles:');
    }
  }
  public async postsGetTypesById({ id }: { id: number }): Promise<any[]> {
    let params: any[] = [];
    params.push(id);

    let query = `
         SELECT 
              *
            FROM
              dgpc_posts_type_vw
            WHERE 
                1 = 1
            AND id = ?
                and status = 1
            Order By title desc            
        `;
    try {
      const [rows] = await pool.query(query, params);
      return rows as any[];
    } catch (error) {
      console.error('Error al obtener losPosts', error);
      throw new Error('Error al obtener losPosts:');
    }
  }
}

export default new DgpcModel();
