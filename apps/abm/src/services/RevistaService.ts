import apiClient from "../../services/apiClient";


class RevistaService {
  public async getSideMenu(): Promise<unknown> {
    try {
      const response = await apiClient.get('/magazine');
      return response.data;
    } catch (error) {
      console.error('Error fetching side menu:', error);
    }
  }
}
// eslint-disable-next-line import/no-anonymous-default-export
export default new RevistaService();
