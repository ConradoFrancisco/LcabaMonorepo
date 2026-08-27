import { BaseResponse } from '@/hooks/useData';
import apiClient from './apiClient';
import { EditComponentState, Post } from '@/types/postTypes';

class PostService {
  public async getAll({
    offset = 0,
    limit = 0,
    input = undefined,
    table = 'posts',
    filtros = {},
  }: {
    offset?: number;
    limit?: number;
    input?: string;
    table?: string;
    filtros?: Record<string, any>;
  }): Promise<BaseResponse<Post[]>> {
    try {
      const response = await apiClient.get('/posts', {
        params: { limit, offset, input, table, filtros },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching posts', error);
      throw error;
    }
  }
  public async getPostById(id: string, table: string): Promise<any | null> {
    try {
      const response = await apiClient.get(`/posts/post/${id}`, {
        params: { table },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching post by ID:', error);
      return null;
    }
  }
  public async getTypes(table: string, gacetilla: boolean): Promise<any[] | null> {
    try {
      const response = await apiClient.get('/posts/types', {
        params: { table, gacetilla },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching types:', error);
      return null;
    }
  }
  public async PostLegislador(
    idPost: string | number,
    idLegislador: string | number,
    userId?: number,
    table?: string,
  ): Promise<any | null> {
    try {
      const response = await apiClient.post(
        `/posts/post/${idPost}/legislador`,
        {
          idLegislador: idLegislador,
          UserId: userId,
        },
        {
          params: { table },
        },
      );
      return response.data;
    } catch (error) {
      console.error('Error adding legislador to post:', error);
      return null;
    }
  }

  public async deleteLegislador(
    idPost: string | number,
    idLegislador: string | number,
    userId?: number,
    table?: string,
  ): Promise<any | null> {
    try {
      const response = await apiClient.delete(
        `/posts/post/${idPost}/legislador`,
        {
          params: { idLegislador, UserId: userId, table },
        },
      );
      return response.data;
    } catch (error) {
      console.error('Error deleting legislador from post:', error);
      throw error;
    }
  }
  public async insertSesion(
    idPost: string | number,
    idSesion: string | number,
    userId?: number,
    table?: string,
  ): Promise<any | null> {
    try {
      const response = await apiClient.post(
        `/posts/post/${idPost}/sesion`,
        { idSesion, UserId: userId },
        { params: { table } },
      );
      return response.data;
    } catch (error) {
      console.error('Error inserting sesion:', error);
      return null;
    }
  }
  public async postAudiencia(
    idPost: number,
    idAudiencia: number,
    UserId?: number,
    table?: string,
  ): Promise<any> {
    try {
      const response = await apiClient.post(
        `/posts/post/${idPost}/audiencia`,
        { idAudiencia, UserId, table },
        {},
      );
      return response.data;
    } catch (error) {
      console.error('Error agregando audiencia:', error);
      throw error;
    }
  }

  public async deleteAudiencia(
    idPost: number,
    idAudiencia: number | string,
    UserId?: number,
    table?: string,
  ): Promise<any> {
    try {
      const response = await apiClient.delete(
        `/posts/post/${idPost}/audiencia`,
        {
          data: { idAudiencia, UserId, table },
        },
      );
      return response.data;
    } catch (error) {
      console.error('Error eliminando audiencia:', error);
      throw error;
    }
  }
  public async deleteSesion(
    idPost: string | number,
    idSesion: string | number,
    userId?: number,
    table?: string,
  ): Promise<any | null> {
    try {
      const response = await apiClient.delete(
        `/posts/post/${idPost}/sesion`,
        {
          data: { idSesion, UserId: userId },
          params: { table },
        },
      );
      return response.data;
    } catch (error) {
      console.error('Error deleting sesion:', error);
      return null;
    }
  }

  public async create(data: {
    typeId: string;
    title: string;
    id_user: number;
  }): Promise<any | null> {
    console.log('PostService.create: Sending data to backend:', data);
    try {
      const response = await apiClient.post('/posts/post/create', data);
      console.log('PostService.create: Backend response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error creating post:', error);
      return null;
    }
  }
  public async getAllTypes(table: string): Promise<any[] | null> {
    try {
      const response = await apiClient.get('/posts/types', {
        params: { table },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching types:', error);
      return null;
    }
  }
  public async postExpediente(
    idPost: number,
    idExpediente: number,
    UserId?: number,
    table?: string,
  ): Promise<any> {
    try {
      const response = await apiClient.post(
        `/posts/post/${idPost}/expediente`,
        { idExpediente, UserId, table },
        {},
      );
      return response.data;
    } catch (error) {
      console.error('Error agregando expediente:', error);
      throw error;
    }
  }
  public async deleteExpediente(
    idPost: number,
    idExpediente: number | string,
    UserId?: number,
    table?: string,
  ): Promise<any> {
    try {
      const response = await apiClient.delete(
        `/posts/post/${idPost}/expediente`,
        {
          data: { idExpediente, UserId, table },
        },
      );
      return response.data;
    } catch (error) {
      console.error('Error eliminando expediente:', error);
      throw error;
    }
  }

  public async postComision(
    idPost: number,
    idComision: number,
    UserId?: number,
    table?: string,
  ): Promise<any> {
    try {
      const response = await apiClient.post(
        `/posts/post/${idPost}/comision`,
        { idComision, UserId, table },
        {},
      );
      return response.data;
    } catch (error) {
      console.error('Error agregando comision:', error);
      throw error;
    }
  }

  public async deleteComision(
    idPost: number,
    idComision: number | string,
    UserId?: number,
    table?: string,
  ): Promise<any> {
    try {
      const response = await apiClient.delete(
        `/posts/post/${idPost}/comision`,
        {
          data: { idComision, UserId, table },
        },
      );
      return response.data;
    } catch (error) {
      console.error('Error eliminando comisión:', error);
      throw error;
    }
  }
  public async editPost(formData: EditComponentState) {
    console.log(formData);
    try {
      const response = await apiClient.patch(
        '/magazine/post/edit/',
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
  public async deletePost(idPost: string | number, table: string): Promise<any> {
    try {
      const response = await apiClient.delete(`/posts/post/${idPost}`, {
        params: { table },
      });
      return response.data;
    } catch (error) {
      console.error('Error deleting post:', error);
      throw error;
    }
  }

  public async updatePostStatus(
    idPost: string | number,
    status: number,
    table: string,
  ): Promise<any> {
    try {
      const response = await apiClient.patch(
        `/posts/post/${idPost}/status`,
        { status },
        { params: { table } },
      );
      return response.data;
    } catch (error) {
      console.error('Error updating post status:', error);
      throw error;
    }
  }
  public async updatePostType(
    idPost: string | number,
    typeId: number,
    table: string,
  ): Promise<any> {
    try {
      const response = await apiClient.patch(
        `/posts/post/${idPost}`,
        { typeId },
        { params: { table } },
      );
      return response.data;
    } catch (error) {
      console.error('Error updating post type:', error);
      throw error;
    }
  }
}

export default new PostService();
