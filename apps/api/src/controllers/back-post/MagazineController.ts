import { Request, Response } from 'express';
import MagazineModel from '../../models/back-post/MagazineModel';
import EditMagazinePostDTO from '../../DTOS/EditMagazinePostDTO';

class MagazineController {
  public async getAllPosts(req: Request, res: Response): Promise<void> {
    try {
      const response = await MagazineModel.getAllPosts({
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

  public async getAllIssues(req: Request, res: Response): Promise<void> {
    try {
      const response = await MagazineModel.getAllIssues({
        search: req.query.input as string,
        order: req.query.order as string,
        limit: parseInt(req.query.limit as string),
        offset: parseInt(req.query.offset as string),
      });
      res.status(200);
      res.json(response);
    } catch (error) {
      console.error('Error en getAllIssuesController:', error);
      res.status(500).json({ error: 'Error al obtener los números de revista' });
    }
  }
  public async getAllCategories(req: Request, res: Response): Promise<void> {
    try {
      const response = await MagazineModel.getAllCategories({
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
  public async getById(req: Request, res: Response): Promise<void> {
    try {
      const parsedId = Number(req.params.id);
      console.log(parsedId);
      const response = await MagazineModel.getPostByid(parsedId);
      res.status(200);
      res.json(response);
    } catch (error) {
      console.error('Error en getByid', error);
      res.status(500).json({ error: 'Error al obtener el posteo' });
    }
  }

  public async createPost(req: Request, res: Response): Promise<void> {
    try {
      const { title, issueId, id_user: bodyIdUser } = req.body;
      const id_user = (req as any).user?.id_user || bodyIdUser;
      const idNumber = parseInt(issueId);
      const response = await MagazineModel.createPost({
        title,
        issueId: idNumber,
        id_user,
      });
      res.status(201).json(response);
    } catch (error) {
      console.error('Error en createPost:', error);
      res.status(500).json({ error: 'Error al crear el post' });
    }
  }

  public async editPost(req: Request, res: Response): Promise<void> {
    try {
      const id_userupd = (req as any).user?.id_user || req.body.seteos?.iduser_upd;
      const body = { ...req.body };
      if (body.seteos) {
        body.seteos.iduser_upd = id_userupd;
      }
      const editDto = new EditMagazinePostDTO(body);
      const response = await MagazineModel.editPost(editDto);
      res.status(200).json(response);
    } catch (error) {
      console.error('Error en editPost:', error);
      res.status(500).json({ error: 'Error al editar el post' });
    }
  }
  public async getAllTypes(req: Request, res: Response): Promise<void> {
    try {
      const response = await MagazineModel.getAllTypes({
        search: req.query.input as string,
        order: req.query.order as string,
        limit: parseInt(req.query.limit as string),
        offset: parseInt(req.query.offset as string),
      });
      res.status(200);
      res.json(response);
    } catch (error) {
      console.error('Error en getAllTypesController:', error);
      res.status(500).json({ error: 'Error al obtener los tipos' });
    }
  }

  public async updateVideo(req: Request, res: Response): Promise<void> {
    try {
      const { id, title, description, url, table } = req.body;
      const response = await MagazineModel.updateVideo(id, title, description, url, table);
      res.status(200).json(response);
    } catch (error) {
      console.error('Error en updateVideo (Controller):', error);
      res.status(500).json({ error: 'Error al actualizar el video' });
    }
  }

  public async updateAudio(req: Request, res: Response): Promise<void> {
    try {
      const { id, title, description, url } = req.body;
      const response = await MagazineModel.updateAudio(id, title, description, url);
      res.status(200).json(response);
    } catch (error) {
      console.error('Error en updateAudio (Controller):', error);
      res.status(500).json({ error: 'Error al actualizar el audio' });
    }
  }

  public async deleteAudio(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      if (!id) {
        res.status(400).json({ error: 'ID de audio requerido' });
        return;
      }
      const response = await MagazineModel.deleteAudio(id);
      res.status(200).json(response);
    } catch (error) {
      console.error('Error en deleteAudio (Controller):', error);
      res.status(500).json({ error: 'Error al eliminar el audio' });
    }
  }

  public async deleteVideo(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      if (!id) {
        res.status(400).json({ error: 'ID de video requerido' });
        return;
      }
      const table = (req.query.table ?? req.body?.table) as string | undefined;
      const response = await MagazineModel.deleteVideo(id, table);
      res.status(200).json(response);
    } catch (error) {
      console.error('Error en deleteVideo (Controller):', error);
      res.status(500).json({ error: 'Error al eliminar el video' });
    }
  }
}
export default new MagazineController();
