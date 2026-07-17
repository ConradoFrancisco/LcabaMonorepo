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

class FuncionariosService {
  public async getAll({
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
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API}/funcionarios`, {
        params: { limit, offset, input },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching funcionarios:', error);
      throw error;
    }
  }
  public async getAllCategories({
    offset = 0,
    limit = 0,
    input = undefined,
  }: {
    offset?: number;
    limit?: number;
    input?: string;
  }): Promise<BaseResponse<publicacion>> {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API}/cultura/categories`, {
        params: { limit, offset, input },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching magazine categories:', error);
      throw error;
    }
  }
  public async getAllTypes({
    offset = 0,
    limit = 0,
    input = undefined,
  }: {
    offset?: number;
    limit?: number;
    input?: string;
  }): Promise<BaseResponse<publicacion>> {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API}/funcionarios/types`, {
        params: { limit, offset, input },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching funcionaros types:', error);
      throw error;
    }
  }
}
export default new FuncionariosService();
