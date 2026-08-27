import apiClient from './apiClient';

export interface IssueMagazine {
    id: number;
    numero: number;
    titulo: string;
    fecha: string;
    status: boolean | { type: string; data: number[] };
    ultimaAccion: string;
    [key: string]: unknown;
}

class IssueService {
    public async getAll(params: {
        offset?: number;
        limit?: number;
        input?: string;
        table?: string;
        filtros?: any;
        [key: string]: any;
    }): Promise<any> {
        const { offset = 0, limit = 0, input = undefined, table = 'magazine', filtros } = params;
        try {
            const response = await apiClient.get('/issue', {
                params: {
                    limit,
                    offset,
                    input,
                    table,
                    ...(filtros && Object.keys(filtros).length > 0
                        ? { filtros: JSON.stringify(filtros) }
                        : {}),
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching issues:', error);
            throw error;
        }
    }

    public async getIssueById(id: string | number, table: string = 'magazine'): Promise<any | null> {
        try {
            const response = await apiClient.get(`/issue/${id}`, {
                params: { table },
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching issue by ID:', error);
            return null;
        }
    }

    public async createIssue({
        title,
        magazine_number,
        id_user,
        table = 'magazine_issue',
    }: {
        title: string;
        magazine_number?: number;
        id_user: number;
        table?: string;
    }): Promise<{ success: boolean; data: { id: number } }> {
        try {
            const response = await apiClient.post('/issue/create', {
                title,
                magazine_number,
                id_user,
                table,
            });
            return response.data;
        } catch (error) {
            console.error('Error creating issue:', error);
            throw error;
        }
    }

    public async editIssue(payload: any): Promise<any> {
        try {
            const response = await apiClient.put('/issue/edit-full', payload);
            return response.data;
        } catch (error) {
            console.error('Error editing issue:', error);
            throw error;
        }
    }

    public async updateStatus(id: number | string, status: number, table: string = 'magazine_issue'): Promise<any> {
        try {
            const response = await apiClient.patch(`/issue/${id}/status`, { status }, {
                params: { table },
            });
            return response.data;
        } catch (error) {
            console.error('Error updating issue status:', error);
            throw error;
        }
    }

    public async deleteIssue(id: number | string, table: string = 'magazine_issue'): Promise<any> {
        try {
            const response = await apiClient.delete(`/issue/${id}`, {
                params: { table },
            });
            return response.data;
        } catch (error) {
            console.error('Error deleting issue:', error);
            throw error;
        }
    }
}

export default new IssueService();
