// \Lcaba-Admin\services\fileServerService.ts
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API;

function getToken() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
}

function authHeaders() {
  return { Authorization: `Bearer ${getToken()}` };
}

class FileServerService {
  // Listar archivos
  public async listFiles() {
    try {
      const response = await axios.get(`${API_URL}/fileserver/list`, {
        headers: authHeaders(),
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) return error.response.data;
      throw error;
    }
  }

  // Subir uno o varios archivos
  public async uploadFiles(files: File[]) {
    try {
      const formData = new FormData();
      files.forEach((file) => formData.append('files', file));

      const response = await axios.post(`${API_URL}/fileserver/_pagedata`, formData, {
        headers: {
          ...authHeaders(),
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) return error.response.data;
      throw error;
    }
  }

  // Descargar archivo
  public async downloadFile(filename: string) {
    try {
      const response = await axios.get(
        `${API_URL}/fileserver/download/${encodeURIComponent(filename)}`,
        {
          headers: authHeaders(),
          responseType: 'blob',
        },
      );

      // Dispara la descarga en el navegador
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) return error.response.data;
      throw error;
    }
  }

  // Eliminar archivo
  public async deleteFile(filename: string) {
    try {
      const response = await axios.delete(`${API_URL}/fileserver/${encodeURIComponent(filename)}`, {
        headers: authHeaders(),
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) return error.response.data;
      throw error;
    }
  }
}

export default new FileServerService();
