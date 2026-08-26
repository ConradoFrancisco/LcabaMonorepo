import { Request, Response } from 'express';

import CategoriesModel from '../../models/back-post/CategoriesModel';

class CategoriesController {
    public async createCategory(req: Request, res: Response): Promise<void> {
        try {
            const { title, table } = req.body;
            const response = await CategoriesModel.createCategory({ title, table });
            res.status(200);
            res.json({ success: true, message: 'Categoría creada exitosamente', data: response });
        } catch (error) {
            console.error('Error en createCategory:', error);
            res.status(500).json({ success: false, message: 'Error al crear la categoría' });
        }
    }
}
export default new CategoriesController();
