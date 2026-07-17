import pool from '../../db/dbConfig';
import { IsearchParams } from './MagazineModel';

class IlcpModel {
  public async getAllBeneficios(params: IsearchParams): Promise<any> {
    try {
      let arrayParamsCount: any[] = [];
      let arrayParamsData: any[] = [];
      let search = '';
      let order = ' ORDER BY a.id DESC';
      let limit = '';

      if (params.search) {
        search = ` WHERE a.title LIKE ? `;
        const searchTerm = `%${params.search}%`;
        arrayParamsCount.push(searchTerm, searchTerm);
        arrayParamsData.push(searchTerm, searchTerm);
      }

      if (params.order) {
        order = ` ORDER BY ${params.order}`;
        arrayParamsData.push(params.order);
      }

      if (params.limit) {
        limit = ` LIMIT ?`;
        arrayParamsData.push(params.limit);
      }
      if (params.offset) {
        limit += ` OFFSET ? `;
        arrayParamsData.push(params.offset);
      } else {
        limit += ` OFFSET 0 `;
      }

      const countQuery = `
            SELECT COUNT(*) as total
            FROM ilcp_beneficios_vw a
            JOIN cm_users_ad b ON b.id_user = a.iduser_upd ${search}
            `;
      const query = `
            SELECT 
            a.id as id,
            a.title as titulo,
            a.orderby as orden,
            a.status as status,
            a.desta as destacado,
            a.orderby as orden,
            a.discount as beneficio,
            a.url as url,
            a.date_ins as fecha,
            CONCAT(b.name,' ', b.surname) as ultimaAccion 
            FROM ilcp_beneficios_vw a
            JOIN cm_users_ad b ON b.id_user = a.iduser_upd
            ${search} ${order} ${limit};
            `;
      const [countRows] = (await pool.query(countQuery, arrayParamsCount)) as [any[], any];
      const total = countRows[0]?.total ?? 0;
      const [data] = (await pool.query(query, arrayParamsData)) as [any[], any];
      return {
        data: data as any[],
        total: Number(total),
      };
    } catch (error) {
      console.error('Error en getAllBeneficios:', error);
      throw new Error('Error al obtener los Beneficios del ilcp');
    }
  }

  public async getAllCursos(params: IsearchParams): Promise<{ data: any[]; total: number }> {
    try {
      let arrayParamsCount: any[] = [];
      let arrayParamsData: any[] = [];
      let search = '';
      let order = ' ORDER BY a.id DESC';
      let limit = '';

      if (params.search) {
        search = ` WHERE a.title LIKE ? `;
        const searchTerm = `%${params.search}%`;
        arrayParamsCount.push(searchTerm, searchTerm);
        arrayParamsData.push(searchTerm, searchTerm);
      }

      if (params.order) {
        order = ` ORDER BY ${params.order}`;
        arrayParamsData.push(params.order);
      }

      if (params.limit) {
        limit = ` LIMIT ?`;
        arrayParamsData.push(params.limit);
      }
      if (params.offset) {
        limit += ` OFFSET ? `;
        arrayParamsData.push(params.offset);
      } else {
        limit += ` OFFSET 0 `;
      }

      const countQuery = `
            SELECT COUNT(*) as total
            FROM ilcp_cursos_vw a
            JOIN cm_users_ad b ON b.id_user = a.iduser_upd ${search}
            `;
      const query = `
            SELECT 
            a.id as id,
            a.title as curso,
            a.nivel as tipo,
            a.status as status,
            a.desta as destacado,
            a.lcaba_only as interno,
            a.url as url,
            a.date_ins as fecha,
            CONCAT(b.name,' ', b.surname) as ultimaAccion 
            FROM ilcp_cursos_vw a
            JOIN cm_users_ad b ON b.id_user = a.iduser_upd
            ${search} ${order} ${limit};
            `;
      const [countRows] = (await pool.query(countQuery, arrayParamsCount)) as [any[], any];
      const total = countRows[0]?.total ?? 0;
      const [data] = (await pool.query(query, arrayParamsData)) as [any[], any];
      return {
        data: data as any[],
        total: Number(total),
      };
    } catch (error) {
      console.error('Error en getAllBeneficios:', error);
      throw new Error('Error al obtener los Beneficios del ilcp');
    }
  }

  public async getAllDocentes(params: IsearchParams): Promise<{ data: any[]; total: number }> {
    try {
      const arrayParams: (string | number)[] = [];
      let search = '';
      let order = ' ORDER BY a.id DESC';
      let limit = '';

      if (params.search) {
        search = ` WHERE a.title LIKE ? `;
        const searchTerm = `%${params.search}%`;
        arrayParams.push(searchTerm, searchTerm);
      }

      if (params.order) {
        order = ` ORDER BY ${params.order}`;
        arrayParams.push(params.order);
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

      const countQuery = `
            SELECT COUNT(*) as total
            FROM ilcp_docentes_vw a
            JOIN cm_users_ad b ON b.id_user = a.iduser_upd ${search}
            `;
      const query = `
            SELECT 
            a.id as id,
            a.surname as apellido,
            a.name as nombre,
            a.docente_externo as externo,
            a.status as status,
            a.date_ins as fecha,
            CONCAT(b.name,' ', b.surname) as ultimaAccion 
            FROM ilcp_docentes_vw a
            JOIN cm_users_ad b ON b.id_user = a.iduser_upd
            ${search} ${order} ${limit};
            `;
      const [countRows] = (await pool.query(countQuery, arrayParams)) as [any[], any];
      const total = countRows[0]?.total ?? 0;
      const [data] = (await pool.query(query, arrayParams)) as [any[], any];
      console.log(query, arrayParams);
      return {
        data: data as any[],
        total: Number(total),
      };
    } catch (error) {
      console.error('Error en getAllDocentes:', error);
      throw new Error('Error al obtener los Docentes del ilcp');
    }
  }

  public async getAllCursosTipo(params: IsearchParams): Promise<{ data: any[]; total: number }> {
    try {
      let arrayParamsCount: any[] = [];
      let arrayParamsData: any[] = [];
      let search = '';
      let order = ' ORDER BY a.id DESC';
      let limit = '';

      if (params.search) {
        search = ` WHERE a.title LIKE ? `;
        const searchTerm = `%${params.search}%`;
        arrayParamsCount.push(searchTerm, searchTerm);
        arrayParamsData.push(searchTerm, searchTerm);
      }

      if (params.order) {
        order = ` ORDER BY ${params.order}`;
        arrayParamsData.push(params.order);
      }

      if (params.limit) {
        limit = ` LIMIT ?`;
        arrayParamsData.push(params.limit);
      }
      if (params.offset) {
        limit += ` OFFSET ? `;
        arrayParamsData.push(params.offset);
      } else {
        limit += ` OFFSET 0 `;
      }

      const countQuery = `
            SELECT COUNT(*) as total
            FROM ilcp_cursos_tipo_vw a
            JOIN cm_users_ad b ON b.id_user = a.iduser_upd ${search}
            `;
      const query = `
            SELECT 
            a.id as id,
            a.title as titulo,
            a.url as url,
            a.date_ins as fecha,
            CONCAT(b.name,' ', b.surname) as ultimaAccion 
            FROM ilcp_cursos_tipo_vw a
            JOIN cm_users_ad b ON b.id_user = a.iduser_upd
            ${search} ${order} ${limit};
            `;
      const [countRows] = (await pool.query(countQuery, arrayParamsCount)) as [any[], any];
      const total = countRows[0]?.total ?? 0;
      const [data] = (await pool.query(query, arrayParamsData)) as [any[], any];
      return {
        data: data as any[],
        total: Number(total),
      };
    } catch (error) {
      console.error('Error en getAllBeneficios:', error);
      throw new Error('Error al obtener los Beneficios del ilcp');
    }
  }
  public async getAllCategorias(params: IsearchParams): Promise<{ data: any[]; total: number }> {
    try {
      let arrayParamsCount: any[] = [];
      let arrayParamsData: any[] = [];
      let search = '';
      let order = ' ORDER BY a.id DESC';
      let limit = '';

      if (params.search) {
        search = ` WHERE a.title LIKE ? `;
        const searchTerm = `%${params.search}%`;
        arrayParamsCount.push(searchTerm, searchTerm);
        arrayParamsData.push(searchTerm, searchTerm);
      }

      if (params.order) {
        order = ` ORDER BY ${params.order}`;
        arrayParamsData.push(params.order);
      }

      if (params.limit) {
        limit = ` LIMIT ?`;
        arrayParamsData.push(params.limit);
      }
      if (params.offset) {
        limit += ` OFFSET ? `;
        arrayParamsData.push(params.offset);
      } else {
        limit += ` OFFSET 0 `;
      }

      const countQuery = `
            SELECT COUNT(*) as total
            FROM ilcp_categorias_vw a
            JOIN cm_users_ad b ON b.id_user = a.iduser_upd ${search}
            `;
      const query = `
            SELECT 
            a.id as id,
            a.title as titulo,
            a.title_principal as principal,
            a.desta as destacada,
            a.cantidad_cursos_principal as CursosPrinc,
            a.cantidad_cursos_subcat as CursosSubcat,
            a.url as url,
            a.date_ins as fecha,
            CONCAT(b.name,' ', b.surname) as ultimaAccion 
            FROM ilcp_categorias_vw a
            JOIN cm_users_ad b ON b.id_user = a.iduser_upd
            ${search} ${order} ${limit};
            `;
      const [countRows] = (await pool.query(countQuery, arrayParamsCount)) as [any[], any];
      const total = countRows[0]?.total ?? 0;
      const [data] = (await pool.query(query, arrayParamsData)) as [any[], any];
      return {
        data: data as any[],
        total: Number(total),
      };
    } catch (error) {
      console.error('Error en getAllCategorias:', error);
      throw new Error('Error al obtener los categorias del ilcp');
    }
  }
  public async getAllSalones(params: IsearchParams): Promise<{ data: any[]; total: number }> {
    try {
      let arrayParamsCount: any[] = [];
      let arrayParamsData: any[] = [];
      let search = '';
      let order = ' ORDER BY a.id DESC';
      let limit = '';

      if (params.search) {
        search = ` WHERE a.title LIKE ? `;
        const searchTerm = `%${params.search}%`;
        arrayParamsCount.push(searchTerm, searchTerm);
        arrayParamsData.push(searchTerm, searchTerm);
      }

      if (params.order) {
        order = ` ORDER BY ${params.order}`;
        arrayParamsData.push(params.order);
      }

      if (params.limit) {
        limit = ` LIMIT ?`;
        arrayParamsData.push(params.limit);
      }
      if (params.offset) {
        limit += ` OFFSET ? `;
        arrayParamsData.push(params.offset);
      } else {
        limit += ` OFFSET 0 `;
      }

      const countQuery = `
            SELECT COUNT(*) as total
            FROM ilcp_cursos_salones_vw a
            JOIN cm_users_ad b ON b.id_user = a.iduser_upd ${search}
            `;
      const query = `
            SELECT 
            a.id as id,
            a.title as titulo,
            a.url as url,
            a.date_ins as fecha,
            CONCAT(b.name,' ', b.surname) as ultimaAccion 
            FROM ilcp_cursos_salones_vw a
            JOIN cm_users_ad b ON b.id_user = a.iduser_upd
            ${search} ${order} ${limit};
            `;
      const [countRows] = (await pool.query(countQuery, arrayParamsCount)) as [any[], any];
      const total = countRows[0]?.total ?? 0;
      const [data] = (await pool.query(query, arrayParamsData)) as [any[], any];
      return {
        data: data as any[],
        total: Number(total),
      };
    } catch (error) {
      console.error('Error en getAllSalones:', error);
      throw new Error('Error al obtener los salones del ilcp');
    }
  }
  public async getAllOrigenInscripto(
    params: IsearchParams,
  ): Promise<{ data: any[]; total: number }> {
    try {
      let arrayParamsCount: any[] = [];
      let arrayParamsData: any[] = [];
      let search = '';
      let order = ' ORDER BY a.id DESC';
      let limit = '';

      if (params.search) {
        search = ` WHERE a.title LIKE ? `;
        const searchTerm = `%${params.search}%`;
        arrayParamsCount.push(searchTerm, searchTerm);
        arrayParamsData.push(searchTerm, searchTerm);
      }

      if (params.order) {
        order = ` ORDER BY ${params.order}`;
        arrayParamsData.push(params.order);
      }

      if (params.limit) {
        limit = ` LIMIT ?`;
        arrayParamsData.push(params.limit);
      }
      if (params.offset) {
        limit += ` OFFSET ? `;
        arrayParamsData.push(params.offset);
      } else {
        limit += ` OFFSET 0 `;
      }

      const countQuery = `
            SELECT COUNT(*) as total
            FROM ilcp_cursos_insc_origen_vw a
            JOIN cm_users_ad b ON b.id_user = a.iduser_upd ${search}
            `;
      const query = `
            SELECT 
            a.id as id,
            a.title as titulo,
            a.url as url,
            a.orderby as orden,
            a.date_ins as fecha,
            CONCAT(b.name,' ', b.surname) as ultimaAccion 
            FROM ilcp_cursos_insc_origen_vw a
            JOIN cm_users_ad b ON b.id_user = a.iduser_upd
            ${search} ${order} ${limit};
            `;
      const [countRows] = (await pool.query(countQuery, arrayParamsCount)) as [any[], any];
      const total = countRows[0]?.total ?? 0;
      const [data] = (await pool.query(query, arrayParamsData)) as [any[], any];
      return {
        data: data as any[],
        total: Number(total),
      };
    } catch (error) {
      console.error('Error en getAllOrigenes:', error);
      throw new Error('Error al obtener los origenes de inscripcion del ilcp');
    }
  }
  public async getAllPosts(params: IsearchParams): Promise<{ data: any[]; total: number }> {
    try {
      let arrayParamsCount: any[] = [];
      let arrayParamsData: any[] = [];
      let search = '';
      let order = ' ORDER BY a.id DESC';
      let limit = '';

      if (params.search) {
        search = ` WHERE a.title LIKE ? `;
        const searchTerm = `%${params.search}%`;
        arrayParamsCount.push(searchTerm, searchTerm);
        arrayParamsData.push(searchTerm, searchTerm);
      }

      if (params.order) {
        order = ` ORDER BY ${params.order}`;
        arrayParamsData.push(params.order);
      }

      if (params.limit) {
        limit = ` LIMIT ?`;
        arrayParamsData.push(params.limit);
      }
      if (params.offset) {
        limit += ` OFFSET ? `;
        arrayParamsData.push(params.offset);
      } else {
        limit += ` OFFSET 0 `;
      }

      const countQuery = `
            SELECT COUNT(*) as total
            FROM ilcp_posts_vw a
            JOIN cm_users_ad b ON b.id_user = a.iduser_upd ${search}
            `;
      const query = `
            SELECT 
            a.id as id,
            c.title as tipo,
            a.title as titulo,
            a.url as url,
            a.banner as banner,
            a.desta as destacado,
            a.date_ins as fecha,
            a.status as status,
            CONCAT(b.name,' ', b.surname) as ultimaAccion 
            FROM ilcp_posts_vw a
            JOIN cm_users_ad b ON b.id_user = a.iduser_upd
            join ilcp_posts_type_vw c ON c.id = a.type
            ${search} ${order} ${limit};
            `;
      const [countRows] = (await pool.query(countQuery, arrayParamsCount)) as [any[], any];
      const total = countRows[0]?.total ?? 0;
      const [data] = (await pool.query(query, arrayParamsData)) as [any[], any];
      return {
        data: data as any[],
        total: Number(total),
      };
    } catch (error) {
      console.error('Error en getAllPosts:', error);
      throw new Error('Error al obtener los posts del ilcp');
    }
  }
  public async getAllPostsType(params: IsearchParams): Promise<{ data: any[]; total: number }> {
    try {
      let arrayParamsCount: any[] = [];
      let arrayParamsData: any[] = [];
      let search = '';
      let order = ' ORDER BY a.id DESC';
      let limit = '';

      if (params.search) {
        search = ` WHERE a.title LIKE ? `;
        const searchTerm = `%${params.search}%`;
        arrayParamsCount.push(searchTerm, searchTerm);
        arrayParamsData.push(searchTerm, searchTerm);
      }

      if (params.order) {
        order = ` ORDER BY ${params.order}`;
        arrayParamsData.push(params.order);
      }

      if (params.limit) {
        limit = ` LIMIT ?`;
        arrayParamsData.push(params.limit);
      }
      if (params.offset) {
        limit += ` OFFSET ? `;
        arrayParamsData.push(params.offset);
      } else {
        limit += ` OFFSET 0 `;
      }

      const countQuery = `
            SELECT COUNT(*) as total
            FROM ilcp_posts_type_vw a
            JOIN cm_users_ad b ON b.id_user = a.iduser_upd ${search}
            `;
      const query = `
            SELECT 
            a.id as id,
            a.title as titulo,
            a.url as url,
            a.banner as banner,
            a.date_ins as fecha,
            a.status as status,
            a.orderby as orden,
            CONCAT(b.name,' ', b.surname) as ultimaAccion 
            FROM ilcp_posts_type_vw a
            JOIN cm_users_ad b ON b.id_user = a.iduser_upd
            
            ${search} ${order} ${limit};
            `;
      const [countRows] = (await pool.query(countQuery, arrayParamsCount)) as [any[], any];
      const total = countRows[0]?.total ?? 0;
      const [data] = (await pool.query(query, arrayParamsData)) as [any[], any];
      return {
        data: data as any[],
        total: Number(total),
      };
    } catch (error) {
      console.error('Error en getAllPosts:', error);
      throw new Error('Error al obtener los posts del ilcp');
    }
  }
  public async getAllModulos(params: IsearchParams): Promise<{ data: any[]; total: number }> {
    try {
      let arrayParamsCount: any[] = [];
      let arrayParamsData: any[] = [];
      let search = '';
      let order = ' ORDER BY a.id DESC';
      let limit = '';

      if (params.search) {
        search = ` WHERE a.title LIKE ? `;
        const searchTerm = `%${params.search}%`;
        arrayParamsCount.push(searchTerm, searchTerm);
        arrayParamsData.push(searchTerm, searchTerm);
      }

      if (params.order) {
        order = ` ORDER BY ${params.order}`;
        arrayParamsData.push(params.order);
      }

      if (params.limit) {
        limit = ` LIMIT ?`;
        arrayParamsData.push(params.limit);
      }
      if (params.offset) {
        limit += ` OFFSET ? `;
        arrayParamsData.push(params.offset);
      } else {
        limit += ` OFFSET 0 `;
      }

      const countQuery = `
            SELECT COUNT(*) as total
            FROM ilcp_c_modules_vw a
            JOIN cm_users_ad b ON b.id_user = a.iduser_upd ${search}
            `;
      const query = `
            SELECT 
            a.id as id,
            a.title_curso as curso,
            a.title as modulo,
            a.date_ini_parsed as fechaInicio,
            a.url as url,
            a.desta as destacado,
            a.date_ins as fecha,
            a.status as status,
            CONCAT(b.name,' ', b.surname) as ultimaAccion 
            FROM ilcp_c_modules_vw a
            JOIN cm_users_ad b ON b.id_user = a.iduser_upd
            
            ${search} ${order} ${limit};
            `;
      const [countRows] = (await pool.query(countQuery, arrayParamsCount)) as [any[], any];
      const total = countRows[0]?.total ?? 0;
      const [data] = (await pool.query(query, arrayParamsData)) as [any[], any];
      return {
        data: data as any[],
        total: Number(total),
      };
    } catch (error) {
      console.error('Error en getAllModulos:', error);
      throw new Error('Error al obtener los modulos del ilcp');
    }
  }
}
export default new IlcpModel();
