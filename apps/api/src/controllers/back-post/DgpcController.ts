import { Request, Response } from 'express';
import DgpcModel from '../../models/back-post/DgpcModel';

class DgpcController {
  public async getAllCampañas(req: Request, res: Response): Promise<void> {
    try {
      const response = await DgpcModel.getAllCampañas({
        search: req.query.input as string,
        order: req.query.order as string,
        limit: parseInt(req.query.limit as string),
        offset: parseInt(req.query.offset as string),
      });
      res.status(200);
      res.json(response);
    } catch (error) {
      console.error('Error en getAllCampañas:', error);
      res.status(500).json({ error: 'Error al obtener las campañas' });
    }
  }

  public async getAllTypes(req: Request, res: Response): Promise<void> {
    try {
      const response = await DgpcModel.getAllTypes({
        search: req.query.input as string,
        order: req.query.order as string,
        limit: parseInt(req.query.limit as string),
        offset: parseInt(req.query.offset as string),
      });
      res.status(200);
      res.json(response);
    } catch (error) {
      console.error('Error en getAllCategoriesController:', error);
      res.status(500).json({ error: 'Error al obtener las categorías' });
    }
  }
  public async getAllPosts(req: Request, res: Response): Promise<void> {
    try {
      const response = await DgpcModel.getAllPosts({
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
  public async getAllPostsType(req: Request, res: Response): Promise<void> {
    try {
      const response = await DgpcModel.getPostTypes({
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
export default new DgpcController();
