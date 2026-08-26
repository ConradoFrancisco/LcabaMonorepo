import { Request, Response } from 'express';
import IssueModel from '../../models/back-post/IssueModel';


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
            res.status(200);
            res.json(response);
        } catch (error) {
            console.error('Error en getAllPosts:', error);
            res.status(500).json({ error: 'Error al obtener los posts' });
        }
    }
}
export default new IssueController();