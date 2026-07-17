import axios from 'axios';

class DocService {
  public async uploadFiles(
    seccion?: string,
    postId?: number,
    auth?: any,
    formData?: FormData,
    fileType?: string,
  ) {
    const endpointType = fileType === 'files' ? 'upload-files' : 'upload-images';
    const URL = `${process.env.NEXT_PUBLIC_API}/upload/${endpointType}`;
    try {
      const response = await axios.post(URL, formData, {
        params: {
          username: auth.user?.username,
          table: seccion,
          type: fileType,
          postId,
        },
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      return response.data;
    } catch (error) {
      console.error('Error al subir imágenes', error);
      throw error;
    }
  }
  public async updateImage(id: number, type: string, fk_iddoc: number, title: string) {
    const URL = `${process.env.NEXT_PUBLIC_API}/upload/update-image`;
    try {
      const response = await axios.put(
        URL,
        {
          id,
          type,
          fk_iddoc,
          title,
        },
        {
          headers: { 'Content-Type': 'application/json' },
        },
      );

      return response.data;
    } catch (error) {
      console.error('Error al actualizar la imagen', error);
      throw error;
    }
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new DocService();
