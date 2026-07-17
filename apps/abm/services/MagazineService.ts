import { BaseResponse } from '@/hooks/useData';
import { EditComponentState, MagazinePost } from '@/types/postTypes';
import axios from 'axios';

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

class MagazineService {
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
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API}/magazine`, {
        params: { limit, offset, input },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching magazines:', error);
      throw error;
    }
  }

  public async getAllIssues({
    offset = 0,
    limit = 0,
    input = undefined,
  }: {
    offset?: number;
    limit?: number;
    input?: string;
  }): Promise<BaseResponse<Magazine>> {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API}/magazine/issues`, {
        params: { limit, offset, input },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching magazine issues:', error);
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
  }): Promise<BaseResponse<Magazine>> {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API}/magazine/categories`, {
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
  }): Promise<BaseResponse<Magazine>> {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API}/magazine/types`, {
        params: { limit, offset, input },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching magazine types:', error);
      throw error;
    }
  }

  public async create({
    issueId,
    title,
    id_user,
  }: {
    issueId: string;
    title: string;
    id_user: number;
  }): Promise<unknown> {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API}/magazine`, {
        issueId,
        title,
        id_user,
      });
      return response.data;
    } catch (error) {
      console.error('Error creating Post:', error);
      throw error;
    }
  }

  public async getPostById(id: string): Promise<MagazinePost | null> {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API}/magazine/post/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching post by ID:', error);
      return null;
    }
  }

  public async editPost(formData: EditComponentState) {
    console.log(formData);
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API}/magazine/post/edit/`,
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
export default new MagazineService();
