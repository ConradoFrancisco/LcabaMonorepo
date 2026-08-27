import { BaseResponse } from '@/hooks/useData';
import apiClient from './apiClient';
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

class DgpcService {
  public async getAllVersiones({
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
      const response = await apiClient.get('/dgpc', {
        params: { limit, offset, input },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching dgpc:', error);
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
    categoria?: number;
  }): Promise<BaseResponse<publicacion>> {
    try {
      const response = await apiClient.get('/dgpc/types', {
        params: { limit, offset, input },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching dgpc:', error);
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
    categoria?: number;
  }): Promise<BaseResponse<publicacion>> {
    try {
      const response = await apiClient.get('/dgpc/posts', {
        params: { limit, offset, input },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching dgpc:', error);
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
    categoria?: number;
  }): Promise<BaseResponse<publicacion>> {
    try {
      const response = await apiClient.get('/dgpc/posts/types', {
        params: { limit, offset, input },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching dgpc:', error);
      throw error;
    }
  }
}
export default new DgpcService();
