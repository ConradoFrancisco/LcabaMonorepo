import { Request, Response } from 'express';
import IssueModel from '../../models/back-post/IssueModel';
import EditIssueDTO from '../../DTOS/issue/EditIssueDTO';

class IssueController {
    public async getAllIssues(req: Request, res: Response): Promise<void> {
        try {
            const response = await IssueModel.getAllIssues({
                search: req.query.input as string,
                order: req.query.order as string,
                limit: parseInt(req.query.limit as string),
                offset: parseInt(req.query.offset as string),
                table: req.query.table as string,
            });
            res.status(200).json(response);
        } catch (error) {
            console.error('Error en getAllIssues:', error);
            res.status(500).json({ error: 'Error al obtener los issues' });
        }
    }

    public async getIssueById(req: Request, res: Response): Promise<void> {
        try {
            const id = Number(req.params.id);
            const table = (req.query.table as string) || 'magazine';
            const response = await IssueModel.getIssueById(id, table);
            res.status(200).json(response);
        } catch (error) {
            console.error('Error en getIssueById:', error);
            res.status(500).json({ success: false, message: 'Error al obtener el issue' });
        }
    }

    public async createIssue(req: Request, res: Response): Promise<void> {
        try {
            const { title, magazine_number, table } = req.body;
            const id_user = req.body.id_user || (req as any).user?.id_user || 0;
            const response = await IssueModel.createIssue({
                title,
                magazine_number,
                id_user,
                table,
            });
            res.status(200).json({ success: true, message: 'Issue creado exitosamente', data: response });
        } catch (error) {
            console.error('Error en createIssue:', error);
            res.status(500).json({ success: false, message: 'Error al crear el issue' });
        }
    }

    public async editIssue(req: Request, res: Response): Promise<void> {
        try {
            const dto = new EditIssueDTO(req.body);
            const response = await IssueModel.editIssue(dto);
            res.status(200).json({ success: true, message: 'Issue editado exitosamente', data: response });
        } catch (error) {
            console.error('Error en editIssue:', error);
            res.status(500).json({ success: false, message: 'Error al editar el issue' });
        }
    }

    public async updateStatus(req: Request, res: Response): Promise<void> {
        try {
            const id = Number(req.params.id);
            const { status } = req.body;
            const table = (req.query.table as string) || 'magazine_issue';
            const response = await IssueModel.updateStatus(id, status, table);
            res.status(200).json(response);
        } catch (error) {
            console.error('Error en updateStatus:', error);
            res.status(500).json({ success: false, message: 'Error al actualizar el estado' });
        }
    }

    public async deleteIssue(req: Request, res: Response): Promise<void> {
        try {
            const id = Number(req.params.id);
            const table = (req.query.table as string) || 'magazine_issue';
            const response = await IssueModel.deleteIssue(id, table);
            res.status(200).json(response);
        } catch (error) {
            console.error('Error en deleteIssue:', error);
            res.status(500).json({ success: false, message: 'Error al eliminar el issue' });
        }
    }
}

export default new IssueController();