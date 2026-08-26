import pool from '../../db/dbConfig';

class CategoriesModel {
    public async createCategory({ title, table }: { title: string, table: string }) {
        try {
            const query = `
        INSERT INTO ${table} (title)
        VALUES (?)
      `;
            const [result] = (await pool.query(query, [title])) as [any[], any];
            return result;
        } catch (error) {
            console.error('Error en createCategory:', error);
            throw new Error('Error al crear la categoría');
        }
    }
}
export default new CategoriesModel();
