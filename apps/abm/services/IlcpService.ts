import { BaseResponse } from '@/hooks/useData';
import axios from 'axios';
export interface publicacion {
  id: number;
  titulo: string;
  categoria: string;
  tipo: string;
  fecha: string;
  destacado: boolean;
  status: boolean;
  ultimaaccion: string;
  [key: string]: unknown;
}

class IlcpService {
  public async getAllBeneficios({
    offset = 0,
    limit = 0,
    input = undefined,
  }: {
    offset?: number;
    limit?: number;
    input?: string;
    categoria?: number;
  }): Promise<BaseResponse<publicacion>> {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API}/ilcp/beneficios`, {
        params: { limit, offset, input },
      });
      console.log(response);
      return response.data;
    } catch (error: any) {
      console.log(error);
      console.error('Error fetching beneficios de ILCP:', error.message);
      throw error;
    }
  }
  public async getAllCursos({
    offset = 0,
    limit = 0,
    input = undefined,
  }: {
    offset?: number;
    limit?: number;
    input?: string;
  }): Promise<BaseResponse<publicacion>> {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API}/ilcp/cursos`, {
        params: { limit, offset, input },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching ILCP cursos:', error);
      throw error;
    }
  }
  public async getAllDocentes({
    offset = 0,
    limit = 0,
    input = undefined,
  }: {
    offset?: number;
    limit?: number;
    input?: string;
  }): Promise<BaseResponse<publicacion>> {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API}/ilcp/docentes`, {
        params: { limit, offset, input },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching ILCP docentes:', error);
      throw error;
    }
  }
  public async getAllTipos({
    offset = 0,
    limit = 0,
    input = undefined,
  }: {
    offset?: number;
    limit?: number;
    input?: string;
  }): Promise<BaseResponse<publicacion>> {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API}/ilcp/tipos`, {
        params: { limit, offset, input },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching ILCP tipos:', error);
      throw error;
    }
  }
  public async getAllCategorias({
    offset = 0,
    limit = 0,
    input = undefined,
  }: {
    offset?: number;
    limit?: number;
    input?: string;
  }): Promise<BaseResponse<publicacion>> {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API}/ilcp/categorias`, {
        params: { limit, offset, input },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching ILCP categorias:', error);
      throw error;
    }
  }
  public async getAllSalones({
    offset = 0,
    limit = 0,
    input = undefined,
  }: {
    offset?: number;
    limit?: number;
    input?: string;
  }): Promise<BaseResponse<publicacion>> {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API}/ilcp/cursos/salones`, {
        params: { limit, offset, input },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching ILCP salones:', error);
      throw error;
    }
  }
  public async getAllOrigines({
    offset = 0,
    limit = 0,
    input = undefined,
  }: {
    offset?: number;
    limit?: number;
    input?: string;
  }): Promise<BaseResponse<publicacion>> {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API}/ilcp/origenes`, {
        params: { limit, offset, input },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching ILCP origenes:', error);
      throw error;
    }
  }
  public async getAllPosts({
    offset = 0,
    limit = 0,
    input = undefined,
  }: {
    offset?: number;
    limit?: number;
    input?: string;
  }): Promise<BaseResponse<publicacion>> {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API}/ilcp/posts`, {
        params: { limit, offset, input },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching ILCP posts:', error);
      throw error;
    }
  }
  public async getAllPostsTypes({
    offset = 0,
    limit = 0,
    input = undefined,
  }: {
    offset?: number;
    limit?: number;
    input?: string;
  }): Promise<BaseResponse<publicacion>> {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API}/ilcp/post/types`, {
        params: { limit, offset, input },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching ILCP posts types:', error);
      throw error;
    }
  }
  public async getAllModulos({
    offset = 0,
    limit = 0,
    input = undefined,
  }: {
    offset?: number;
    limit?: number;
    input?: string;
  }): Promise<BaseResponse<publicacion>> {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API}/ilcp/modulos`, {
        params: { limit, offset, input },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching ILCP posts modulos:', error);
      throw error;
    }
  }
}
export default new IlcpService();
