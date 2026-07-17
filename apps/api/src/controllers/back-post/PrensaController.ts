import { Request, Response } from 'express';
import PrensaModel from '../../models/back-post/PrensaModel';
import EditPrensaPostDTO from '../../DTOS/EditPrensaPostDTO';

class PrensaController {
  public async getAllPosts(req: Request, res: Response): Promise<void> {
    try {
      const response = await PrensaModel.getAllPosts({
        search: req.query.input as string,
        order: req.query.order as string,
        limit: parseInt(req.query.limit as string),
        offset: parseInt(req.query.offset as string),
      });
      res.status(200);
      res.json(response);
    } catch (error) {
      console.error('Error en getAllPosts:', error);
      res.status(500).json({ error: 'Error al obtener los posts de prensa' });
    }
  }

  public async getAllTypes(req: Request, res: Response): Promise<void> {
    try {
      const response = await PrensaModel.getPostTypes({
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
  public async getSuscriptores(req: Request, res: Response): Promise<void> {
    try {
      const response = await PrensaModel.getSuscriptores({
        search: req.query.input as string,
        order: req.query.order as string,
        limit: parseInt(req.query.limit as string),
        offset: parseInt(req.query.offset as string),
      });
      res.status(200);
      res.json(response);
    } catch (error) {
      console.error('Error en getAllSuscriptoresController:', error);
      res.status(500).json({ error: 'Error al obtener los suscriptores' });
    }
  }
  public async editPost(req: Request, res: Response): Promise<void> {
    try {
      const edit = new EditPrensaPostDTO(req.body);
      const response = await PrensaModel.editPost(edit);
      res.status(200);
      res.json(response);
    } catch (error) {
      console.error('Error en editPostController:', error);
      res.status(500).json({ error: 'Error al editar el post' });
    }
  }
}
export default new PrensaController();
