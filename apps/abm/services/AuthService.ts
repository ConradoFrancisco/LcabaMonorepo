import axios from 'axios';

class AuthService {
  public async login(username: string, password: string) {
    console.log(process.env.NEXT_PUBLIC_API);
    try {
      // Usamos axios en lugar de fetch para mantener la consistencia con otros servicios
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API}/auth/login`, {
        username,
        password,
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return error.response.data;
      }
      throw error;
    }
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new AuthService();
