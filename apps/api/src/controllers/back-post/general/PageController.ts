import { Request, Response } from 'express';
import PageModel from '../../../models/back-post/general/PageModal';

class PageController {
  public async getAll(req: Request, res: Response) {
    try {
      const response = await PageModel.getAll({
        search: req.query.input as string,
        order: req.query.order as string,
        limit: parseInt(req.query.limit as string),
        offset: parseInt(req.query.offset as string),
      });
      res.status(200);
      res.json(response);
    } catch (error) {
      console.error('Error en getAll:', error);
      res.status(500).json({ error: 'Error al obtener las paginas' });
    }
  }
}
export default new PageController();
