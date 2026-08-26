import axios from 'axios';

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
  public async createCategory({
    title,
    id_user,
    table,
  }: {
    title: string;
    id_user: number;
    table: string;
  }): Promise<unknown> {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API}/categories/create`, {
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
}
export default new CategoriesService();
