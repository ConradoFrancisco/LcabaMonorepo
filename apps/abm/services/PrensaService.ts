import { BaseResponse } from '@/hooks/useData';
import { EditComponentState } from '@/types/postTypes';
import apiClient from './apiClient';

export interface Magazine {
  id: number;
  titulo: string;
  categoria: string;
  tipo: string;
  fecha: string;
  destacado: boolean;
  revista: string;
  status: boolean;
  ultimaaccion: string;
  [key: string]: unknown;
}

class PrensaService {
  public async getAll({
    offset = 0,
    limit = 0,
    input = undefined,
  }: {
    offset?: number;
    limit?: number;
    input?: string;
    categoria?: number;
  }): Promise<BaseResponse<Magazine>> {
    try {
      const response = await apiClient.get('/prensa', {
        params: { limit, offset, input },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching Posteos de prensa:', error);
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
  }): Promise<BaseResponse<Magazine>> {
    try {
      const response = await apiClient.get('/prensa/types', {
        params: { limit, offset, input },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching Posteos de prensa:', error);
      throw error;
    }
  }
  public async getAllSuscriptores({
    offset = 0,
    limit = 0,
    input = undefined,
  }: {
    offset?: number;
    limit?: number;
    input?: string;
    categoria?: number;
  }): Promise<BaseResponse<Magazine>> {
    try {
      const response = await apiClient.get('/prensa/suscriptores', {
        params: { limit, offset, input },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching los sucriptores de prensa:', error);
      throw error;
    }
  }
  public async editPost(formData: EditComponentState) {
    console.log(formData, 'acaformData');
    try {
      const response = await apiClient.patch('/prensa/edit', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error editing Post:', error);
      throw error;
    }
  }
}
export default new PrensaService();
