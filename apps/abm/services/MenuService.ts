import apiClient from './apiClient';

class MenuService {
  public async getSideMenu(): Promise<unknown> {
    try {
      const response = await apiClient.get('/cmMenu');
      return response.data;
    } catch (error) {
      console.error('Error fetching side menu:', error);
    }
  }
  public async getAll(pageId?: number): Promise<any[]> {
    try {
      const response = await apiClient.get('/cmMenu/full', { params: { pageId } });
      return response.data;
    } catch (error) {
      console.error('Error fetching menus', error);
      throw error;
    }
  }
}
// eslint-disable-next-line import/no-anonymous-default-export
export default new MenuService();
