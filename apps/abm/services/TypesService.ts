import apiClient from './apiClient';

export interface TypeItem {
  id: number;
  tipo?: string;
  titulo?: string;
  url?: string;
  status?: boolean | number;
  orden?: number;
  orderby?: number;
  banner?: boolean | number;
  ultimaAccion?: string;
  [key: string]: unknown;
}

class TypesService {
  public async getAll(params: {
    offset?: number;
    limit?: number;
    input?: string;
    table?: string;
    filtros?: any;
    [key: string]: any;
  }): Promise<any> {
    const { offset = 0, limit = 0, input = undefined, table = 'posts_type', filtros } = params;
    try {
      const response = await apiClient.get('/types', {
        params: {
          limit,
          offset,
          input,
          table,
          ...(filtros && Object.keys(filtros).length > 0
            ? { filtros: JSON.stringify(filtros) }
            : {}),
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching types:', error);
      throw error;
    }
  }

  public async getTypeById(id: string | number, table: string = 'posts_type'): Promise<any | null> {
    try {
      const response = await apiClient.get(`/types/${id}`, {
        params: { table },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching type by ID:', error);
      return null;
    }
  }

  public async createType({
    title,
    id_user,
    table = 'posts_type',
  }: {
    title: string;
    id_user: number;
    table?: string;
  }): Promise<{ success: boolean; data: { id: number } }> {
    try {
      const response = await apiClient.post('/types/create', {
        title,
        id_user,
        table,
      });
      return response.data;
    } catch (error) {
      console.error('Error creating type:', error);
      throw error;
    }
  }

  public async editType(payload: any): Promise<any> {
    try {
      const response = await apiClient.put('/types/edit-full', payload);
      return response.data;
    } catch (error) {
      console.error('Error editing type:', error);
      throw error;
    }
  }

  public async updateStatus(
    id: number | string,
    status: number,
    table: string = 'posts_type'
  ): Promise<any> {
    try {
      const response = await apiClient.patch(
        `/types/${id}/status`,
        { status },
        {
          params: { table },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error updating type status:', error);
      throw error;
    }
  }

  public async deleteType(id: number | string, table: string = 'posts_type'): Promise<any> {
    try {
      const response = await apiClient.delete(`/types/${id}`, {
        params: { table },
      });
      return response.data;
    } catch (error) {
      console.error('Error deleting type:', error);
      throw error;
    }
  }
}

export default new TypesService();
