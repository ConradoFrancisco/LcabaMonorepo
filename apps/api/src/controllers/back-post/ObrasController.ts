import { Request, Response } from 'express';

import ObrasModel from '../../models/back-post/ObrasModel';

class ObrasController {
  public async getAllObras(req: Request, res: Response): Promise<void> {
    try {
      const response = await ObrasModel.getAllObras({
        search: req.query.input as string,
        order: req.query.order as string,
        limit: parseInt(req.query.limit as string),
        offset: parseInt(req.query.offset as string),
      });
      res.status(200);
      res.json(response);
    } catch (error) {
      console.error('Error en getAllPosts:', error);
      res.status(500).json({ error: 'Error al obtener los posts' });
    }
  }
}
export default new ObrasController();
