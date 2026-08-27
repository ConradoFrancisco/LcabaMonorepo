import { BaseResponse } from '@/hooks/useData';
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

class ObrasService {
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
      const response = await apiClient.get('/obras', {
        params: { limit, offset, input },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching obras:', error);
      throw error;
    }
  }
}
// eslint-disable-next-line import/no-anonymous-default-export
export default new ObrasService();
