import apiClient from './apiClient';

class GacetillaService {
  /**
   * Busca publicaciones
   */
  async searchPublications(query: string) {
    const response = await apiClient.get('/gacetilla/search-publications', {
      params: { q: query },
    });
    return response.data;
  }

  /**
   * Busca suscriptores
   */
  async searchSubscribers(query: string) {
    const response = await apiClient.get('/gacetilla/search-subscribers', {
      params: { q: query },
    });
    return response.data;
  }

  /**
   * Envía la gacetilla
   */
  async sendGacetilla(data: {
    subscribers: any[];
    subject: string;
    message: string;
    publicationId?: number;
  }) {
    const response = await apiClient.post('/gacetilla/send', data);
    return response.data;
  }
}

export default new GacetillaService();
