import { Request, Response } from 'express';
import CategoriesModel from '../../models/back-post/CategoriesModel';
import EditCategoriesDTO from '../../DTOS/categories/EditCategoriesDTO';

class CategoriesController {
    public async createCategory(req: Request, res: Response): Promise<void> {
        try {
            const { title, table } = req.body;
            const id_user = req.body.id_user
            const response = await CategoriesModel.createCategory({ title, table, id_user });
            res.status(200);
            res.json({ success: true, message: 'Categoría creada exitosamente', data: response });
        } catch (error) {
            console.error('Error en createCategory:', error);
            res.status(500).json({ success: false, message: 'Error al crear la categoría' });
        }
    }

    public async getCategoryById(req: Request, res: Response): Promise<void> {
        try {
            const id = Number(req.params.id);
            const response = await CategoriesModel.getCategoryById(id, req.query.table as string);
            res.status(200);
            res.json(response);
        } catch (error) {
            console.error('Error en getCategoryById:', error);
            res.status(500).json({ success: false, message: 'Error al obtener la categoría' });
        }
    }

    public async getAllCategories(req: Request, res: Response): Promise<void> {
        try {
            const filtrosRaw = req.query.filtros;
            let filtros: any = {};
            if (filtrosRaw && typeof filtrosRaw === 'string') {
                try { filtros = JSON.parse(filtrosRaw); } catch { filtros = {}; }
            }
            const response = await CategoriesModel.getAllCategories({
                table: req.query.table as string,
                search: req.query.input as string,
                order: req.query.order as string,
                limit: parseInt(req.query.limit as string),
                offset: parseInt(req.query.offset as string),
                filtros,
            });
            res.status(200);
            res.json(response);
        } catch (error) {
            console.error('Error en getAllCategoriesController:', error);
            res.status(500).json({ error: 'Error al obtener las categorías' });
        }
    }

    public async editCategorie(req: Request, res: Response): Promise<void> {
        try {
            const dto = new EditCategoriesDTO(req.body);
            const response = await CategoriesModel.editCategorie(dto);
            res.status(200).json({ success: true, message: 'Categoría editada exitosamente', data: response });
        } catch (error) {
            console.error('Error en editCategorie:', error);
            res.status(500).json({ success: false, message: 'Error al editar la categoría' });
        }
    }
}
export default new CategoriesController();
