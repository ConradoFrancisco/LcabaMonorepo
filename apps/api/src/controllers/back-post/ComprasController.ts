import { Request, Response } from 'express';

import ComprasModel from '../../models/back-post/ComprasModel';

class ComprasController {
  public async getAllContrataciones(req: Request, res: Response): Promise<void> {
    try {
      const response = await ComprasModel.getAllContrataciones({
        search: req.query.input as string,
        order: req.query.order as string,
        limit: parseInt(req.query.limit as string),
        offset: parseInt(req.query.offset as string),
      });
      res.status(200);
      res.json(response);
    } catch (error) {
      console.error('Error en getAll:', error);
      res.status(500).json({ error: 'Error al obtener las contrataciones' });
    }
  }
  public async getAllLicitaciones(req: Request, res: Response): Promise<void> {
    try {
      const response = await ComprasModel.getAllLicitaciones({
        search: req.query.input as string,
        order: req.query.order as string,
        limit: parseInt(req.query.limit as string),
        offset: parseInt(req.query.offset as string),
      });
      res.status(200);
      res.json(response);
    } catch (error) {
      console.error('Error en getAllLicitaciones:', error);
      res.status(500).json({ error: 'Error al obtener las licitaciones' });
    }
  }
}
export default new ComprasController();
