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

class GeneralService {
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
      const response = await apiClient.get('/general/pages', {
        params: { limit, offset, input },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching obras:', error);
      throw error;
    }
  }

  public async createPage(data: { title: string; id_user: number }): Promise<any> {
    try {
      const response = await apiClient.post(
        '/general/pages/create',
        data,
      );
      return response.data;
    } catch (error) {
      console.error('Error creating page:', error);
      throw error;
    }
  }

  public async getAllSections({
    offset = 0,
    limit = 0,
    input = undefined,
    pageId = undefined,
  }: {
    offset?: number;
    limit?: number;
    input?: string;
    pageId?: number;
  }): Promise<BaseResponse<Magazine>> {
    try {
      const response = await apiClient.get('/general/sections', {
        params: { limit, offset, input, pageId },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching obras:', error);
      throw error;
    }
  }
  public async getAllBanners({
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
      const response = await apiClient.get('/general/banners', {
        params: { limit, offset, input },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching obras:', error);
      throw error;
    }
  }

  public async getPageById(id: string): Promise<BaseResponse<Magazine>> {
    try {
      const response = await apiClient.get(`/general/pages/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching page:', error);
      throw error;
    }
  }

  public async editPage(data: Record<string, any>): Promise<any> {
    const id = data?.seteos?.id;
    try {
      const response = await apiClient.put(
        `/general/pages/${id}/edit`,
        data
      );
      return response.data;
    } catch (error) {
      console.error('Error editing page:', error);
      throw error;
    }
  }

  public async getSectionById(id: string): Promise<any> {
    try {
      const response = await apiClient.get(`/general/sections/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching section:', error);
      throw error;
    }
  }

  public async editSection(data: Record<string, any>): Promise<any> {
    const id = data?.seteos?.id;
    try {
      const response = await apiClient.put(
        `/general/sections/${id}/edit`,
        data
      );
      return response.data;
    } catch (error) {
      console.error('Error editing section:', error);
      throw error;
    }
  }

  public async changeSectionStatus(id: number, status: number): Promise<any> {
    try {
      const response = await apiClient.put(
        `/general/sections/${id}/status`,
        { status }
      );
      return response.data;
    } catch (error) {
      console.error('Error changing section status:', error);
      throw error;
    }
  }
}
// eslint-disable-next-line import/no-anonymous-default-export
export default new GeneralService();
