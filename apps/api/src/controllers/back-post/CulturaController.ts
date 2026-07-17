import { Request, Response } from 'express';
import CulturaModel from '../../models/back-post/CulturaModel';
import EditCulturaPostDTO from '../../DTOS/EditCulturaPostDTO';

class CulturaController {
  public async getAllPosts(req: Request, res: Response): Promise<void> {
    try {
      const response = await CulturaModel.getAllPosts({
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
  public async getAllCategories(req: Request, res: Response): Promise<void> {
    try {
      const response = await CulturaModel.getAllCategories({
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
  public async getAllTypes(req: Request, res: Response): Promise<void> {
    try {
      const response = await CulturaModel.getPostTypes({
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
      const response = await CulturaModel.getPostByid(parsedId);
      res.status(200);
      res.json(response);
    } catch (error) {
      console.error('Error en getByid', error);
      res.status(500).json({ error: 'Error al obtener el posteo' });
    }
  }
  public async postExpediente(req: Request, res: Response): Promise<void> {
    try {
      const idExpediente = Number(req.body.idExpediente);
      const idPost = Number(req.params.id);
      const idUser = Number(req.body.UserId);
      const response = await CulturaModel.postExpediente(idPost, idExpediente, idUser);
      res.status(200);
      res.json({
        data: response,
        message: 'Expediente agregado correctamente',
      });
    } catch (error) {
      console.error('Error en postExpediente', error);
      res.status(500).json({ error: 'Error al agregar el expediente al post' });
    }
  }
  public async postComision(req: Request, res: Response): Promise<void> {
    try {
      const idComision = Number(req.body.idComision);
      const idPost = Number(req.params.id);
      const idUser = Number(req.body.UserId);
      const response = await CulturaModel.postComision(idPost, idComision, idUser);
      res.status(200);
      res.json({ response, message: 'Comision agregada correctamente' });
    } catch (error) {
      console.error('Error en postComision', error);
      res.status(500).json({ error: 'Error al agregar la comision al post' });
    }
  }
  public async postAudiencia(req: Request, res: Response): Promise<void> {
    try {
      const idAudiencia = Number(req.body.idAudiencia);
      const idPost = Number(req.params.id);
      const idUser = Number(req.body.UserId);
      const response = await CulturaModel.postAudiencia(idPost, idAudiencia, idUser);

      if (response.status === 400) {
        res.status(response.status);
        return;
      }
      res.status(200);
      res.json({ data: response, message: 'Audiencia agregada correctamente' });
    } catch (error) {
      console.error('Error en postAudiencia', error);
      res.status(500).json({ error: 'Error al agregar la audiencia al post' });
    }
  }

  //DELETE RELATIONS
  public async deleteExpediente(req: Request, res: Response): Promise<void> {
    try {
      const idExpediente = Number(req.body.idExpediente);
      const idPost = Number(req.params.id);
      const idUser = Number(req.body.UserId);
      const response = await CulturaModel.deleteExpediente(idPost, idExpediente, idUser);
      res.status(200);
      res.json({
        data: response,
        message: 'Expediente eliminado correctamente',
      });
    } catch (error) {
      console.error('Error en deleteExpediente', error);
      res.status(500).json({ error: 'Error al eliminar el expediente del post' });
    }
  }
  public async deleteComision(req: Request, res: Response): Promise<void> {
    try {
      const idComision = Number(req.body.idComision);
      const idPost = Number(req.params.id);
      const idUser = Number(req.body.UserId);
      const response = await CulturaModel.deleteComision(idPost, idComision, idUser);
      res.status(200);
      res.json({
        comisiones: response,
        message: 'Comision eliminada correctamente',
      });
    } catch (error) {
      console.error('Error en deleteComision', error);
      res.status(500).json({ error: 'Error al eliminar la comision del post' });
    }
  }
  public async deleteAudiencia(req: Request, res: Response): Promise<void> {
    try {
      const idAudiencia = Number(req.body.idAudiencia);
      const idPost = Number(req.params.id);
      const idUser = Number(req.body.UserId);
      const response = await CulturaModel.deleteAudiencia(idPost, idAudiencia, idUser);
      res.status(200);
      res.json({
        data: response,
        message: 'Audiencia eliminada correctamente',
      });
    } catch (error) {
      console.error('Error en deleteAudiencia', error);
      res.status(500).json({ error: 'Error al eliminar la audiencia del post' });
    }
  }
  public async postSesion(req: Request, res: Response): Promise<void> {
    try {
      const idSesion = Number(req.body.idSesion);
      const idPost = Number(req.params.id);
      const idUser = Number(req.body.UserId);
      const response = await CulturaModel.postSesion(idPost, idSesion, idUser);
      res.status(200);
      res.json({ data: response, message: 'Sesión agregada correctamente' });
    } catch (error) {
      console.error('Error en postSesion', error);
      res.status(500).json({ error: 'Error al agregar la sesión al post' });
    }
  }
  public async deleteSesion(req: Request, res: Response): Promise<void> {
    try {
      const idSesion = Number(req.body.idSesion);
      const idPost = Number(req.params.id);
      const idUser = Number(req.body.UserId);
      const response = await CulturaModel.deleteSesion(idPost, idSesion, idUser);
      res.status(200);
      res.json({ data: response, message: 'Sesión eliminada correctamente' });
    } catch (error) {
      console.error('Error en deleteSesion', error);
      res.status(500).json({ error: 'Error al eliminar la sesión del post' });
    }
  }
  public async editPost(req: Request, res: Response): Promise<void> {
    try {
      const dto = new EditCulturaPostDTO(req.body);
      const response = await CulturaModel.updatePost(dto);
      res.status(200);
      res.json({ data: response, message: 'Post editado correctamente' });
    } catch (error) {
      console.error('Error en editPost', error);
      res.status(500).json({ error: 'Error al editar el post' });
    }
  }

  public async createPost(req: Request, res: Response): Promise<void> {
    try {
      const { title, categoryId, id_user: bodyIdUser } = req.body;
      const id_user = (req as any).user?.id_user || bodyIdUser;
      const response = await CulturaModel.createPost({
        title,
        categoryId,
        id_user,
      });
      res.status(201).json(response);
    } catch (error) {
      console.error('Error en createPost:', error);
      res.status(500).json({ error: 'Error al crear el post' });
    }
  }
}
export default new CulturaController();
