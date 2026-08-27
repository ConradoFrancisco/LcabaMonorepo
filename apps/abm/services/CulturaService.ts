import { BaseResponse } from '@/hooks/useData';
import { CulturaPost, EditComponentState } from '@/types/postTypes';
import apiClient from './apiClient';

export interface Cultura {
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

class CulturaService {
  public async getAllTypes({
    offset = 0,
    limit = 0,
    input = undefined,
  }: {
    offset?: number;
    limit?: number;
    input?: string;
  }): Promise<BaseResponse<Cultura>> {
    try {
      const response = await apiClient.get('/cultura/types', {
        params: { limit, offset, input },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching cultura types:', error);
      throw error;
    }
  }

  public async create({
    categoryId,
    title,
    id_user,
  }: {
    categoryId: number;
    title: string;
    id_user: number;
  }): Promise<unknown> {
    try {
      const response = await apiClient.post('/cultura/create', {
        categoryId,
        title,
        id_user,
      });
      return response.data;
    } catch (error) {
      console.error('Error creating Post:', error);
      throw error;
    }
  }

  public async getPostById(id: string): Promise<CulturaPost | null> {
    try {
      const response = await apiClient.get(`/cultura/post/${id}`);

      return response.data;
    } catch (error) {
      console.error('Error fetching post by ID:', error);
      return null;
    }
  }

  public async editPost(formData: EditComponentState) {
    try {
      const response = await apiClient.patch(
        '/cultura/post/edit',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      return response.data;
    } catch (error) {
      console.error('Error editing Post:', error);
      throw error;
    }
  }
}
// eslint-disable-next-line import/no-anonymous-default-export
export default new CulturaService();
