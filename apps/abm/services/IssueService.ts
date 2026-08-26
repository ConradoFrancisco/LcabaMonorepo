import axios from 'axios';

export interface CategoriesServiceMagazine {
    id: number;
    titulo: string;
    categoria: string;
    tipo: string;
    fecha: string;
    destacado: boolean;
    revista: string;
    status: boolean;
    ultimaaccion: string;
    [key: string]: unknown;
}

class IssueService {
    public async getAll(params: {
        offset?: number;
        limit?: number;
        input?: string;
        table?: string;
        [key: string]: any;
    }): Promise<any> {
        const { offset = 0, limit = 0, input = undefined, table = 'magazine_issue' } = params;
        console.log(table)
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API}/issue`, {
                params: { limit, offset, input, table },
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching magazine categories:', error);
            throw error;
        }
    }

    public async createCategory({
        title,
        id_user,
        table,
    }: {
        title: string;
        id_user: number;
        table: string;
    }): Promise<{ data: { id: number } }> {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API}/categories/create`, {
                title,
                id_user,
                table,
            });
            return response.data;
        } catch (error) {
            console.error('Error creating Post:', error);
            throw error;
        }
    }
}
export default new IssueService();
