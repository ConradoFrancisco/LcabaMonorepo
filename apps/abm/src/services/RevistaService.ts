import axios from 'axios';

export const API_URL = process.env.NEXT_PUBLIC_API || 'http://localhost:3000';
class RevistaService {
  public async getSideMenu(): Promise<unknown> {
    try {
      const response = await axios.get(`${API_URL}/magazine`);
      return response.data;
    } catch (error) {
      console.error('Error fetching side menu:', error);
    }
  }
}
// eslint-disable-next-line import/no-anonymous-default-export
export default new RevistaService();
