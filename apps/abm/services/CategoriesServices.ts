import apiClient from './apiClient';

export interface CategoriesServiceMagazine {
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

class CategoriesService {
  public async getAllCategories(params: {
    offset?: number;
    limit?: number;
    input?: string;
    table?: string;
    filtros?: any;
    [key: string]: any;
  }): Promise<any> {
    const { offset = 0, limit = 0, input = undefined, table = undefined, filtros } = params;
    try {
      const response = await apiClient.get('/categories', {
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
      console.error('Error fetching magazine categories:', error);
      throw error;
    }
  }

  public async createCategory({
    title,
    id_user,
    table,
  }: {
    title: string;
    id_user: number;
    table: string;
  }): Promise<{ data: { id: number } }> {
    try {
      const response = await apiClient.post('/categories/create', {
        title,
        id_user,
        table,
      });
      return response.data;
    } catch (error) {
      console.error('Error creating Post:', error);
      throw error;
    }
  }

  public async getCategoryById(
    id: string,
    table: string,
  ): Promise<{ id: number; titulo: string; status: number; table: string } | null> {
    try {
      const response = await apiClient.get(`/categories/${id}`, { params: { table } });
      return response.data;
    } catch (error) {
      console.error('Error fetching category by ID:', error);
      return null;
    }
  }

  public async editCategory(payload: any): Promise<unknown> {
    try {
      const response = await apiClient.put('/categories/edit-full', payload);
      return response.data;
    } catch (error) {
      console.error('Error editing category:', error);
      throw error;
    }
  }
}
export default new CategoriesService();
