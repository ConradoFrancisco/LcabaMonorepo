import axios from 'axios';
import { BaseNextResponse } from 'next/dist/server/base-http';

class MenuService {
  public async getSideMenu(): Promise<unknown> {
    try {
      const response = await axios.get(`http://10.151.1.114:3000/cmMenu`);
      return response.data;
    } catch (error) {
      console.error('Error fetching side menu:', error);
    }
  }
  public async getAll(): Promise<any[]> {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API}/cmMenu/full`);
      return response.data;
    } catch (error) {
      console.error('Error fetching menus', error);
      throw error;
    }
  }
}
// eslint-disable-next-line import/no-anonymous-default-export
export default new MenuService();
