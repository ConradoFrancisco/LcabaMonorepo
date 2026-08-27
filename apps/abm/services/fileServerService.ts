// \Lcaba-Admin\services\fileServerService.ts
import apiClient from './apiClient';

class FileServerService {
  // Listar archivos
  public async listFiles() {
    try {
      const response = await apiClient.get('/fileserver/list');
      return response.data;
    } catch (error: any) {
      if (error.response) return error.response.data;
      throw error;
    }
  }

  // Subir uno o varios archivos
  public async uploadFiles(files: File[]) {
    try {
      const formData = new FormData();
      files.forEach((file) => formData.append('files', file));

      const response = await apiClient.post('/fileserver/_pagedata', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error: any) {
      if (error.response) return error.response.data;
      throw error;
    }
  }

  // Descargar archivo
  public async downloadFile(filename: string) {
    try {
      const response = await apiClient.get(
        `/fileserver/download/${encodeURIComponent(filename)}`,
        {
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
    } catch (error: any) {
      if (error.response) return error.response.data;
      throw error;
    }
  }

  // Eliminar archivo
  public async deleteFile(filename: string) {
    try {
      const response = await apiClient.delete(`/fileserver/${encodeURIComponent(filename)}`);
      return response.data;
    } catch (error: any) {
      if (error.response) return error.response.data;
      throw error;
    }
  }
}

export default new FileServerService();
