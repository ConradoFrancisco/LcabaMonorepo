import pool from '../../db/dbConfig';

class Users {
  public async findUser(username: string): Promise<any> {
    try {
      const query = `
            SELECT 
                * from cm_users_ad where user_ad = ? LIMIT 1`;

      const [data] = (await pool.query(query, username)) as [any[], any];
      return data[0];
    } catch (error) {
      console.error('Error en FindUser:', error);
      throw error;
    }
  }
}
export default new Users();
