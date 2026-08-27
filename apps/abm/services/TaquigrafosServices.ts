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

class TaquigrafosService {
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
      const response = await apiClient.get('/taquigrafos/versiones', {
        params: { limit, offset, input },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching taquigrafos versiones:', error);
      throw error;
    }
  }
}
export default new TaquigrafosService();
