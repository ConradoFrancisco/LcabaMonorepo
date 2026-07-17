import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API || 'http://localhost:3000';

class GacetillaService {
  /**
   * Busca publicaciones
   */
  async searchPublications(query: string) {
    const response = await axios.get(`${API_URL}/gacetilla/search-publications`, {
      params: { q: query },
    });
    return response.data;
  }

  /**
   * Busca suscriptores
   */
  async searchSubscribers(query: string) {
    const response = await axios.get(`${API_URL}/gacetilla/search-subscribers`, {
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
    const response = await axios.post(`${API_URL}/gacetilla/send`, data);
    return response.data;
  }
}

export default new GacetillaService();
