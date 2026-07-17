import { Request, Response } from 'express';
import PostModel from '../../models/back-post/PostModel';

class PostController {
  public async getAllPosts(req: Request, res: Response): Promise<void> {
    try {
      const response = await PostModel.getAllPosts({
        search: req.query.input as string,
        order: req.query.order as string,
        limit: parseInt(req.query.limit as string),
        offset: parseInt(req.query.offset as string),
        table: req.query.table as string,
        filtros: req.query.filtros as [],
      });
      res.status(200);
      res.json(response);
    } catch (error) {
      console.error('Error en getAllPosts:', error);
      res.status(500).json({ error: 'Error al obtener los posts' });
    }
  }
  public async getTypes(req: Request, res: Response): Promise<void> {
    try {
      const response = await PostModel.getTypes(
        req.query.table as string,
        req.query.gacetilla as any,
      );
      res.status(200);
      res.json(response);
    } catch (error) {
      console.error('Error en getTypes:', error);
      res.status(500).json({ error: 'Error al obtener los tipos de post' });
    }
  }
  public async getById(req: Request, res: Response): Promise<void> {
    try {
      const response = await PostModel.getPostByid(
        parseInt(req.params.id as string),
        req.query.table as string,
      );
      res.status(200);
      res.json(response);
    } catch (error) {
      console.error('Error en getById:', error);
      res.status(500).json({ error: 'Error al obtener el post' });
    }
  }
  public async postLegisladores(req: Request, res: Response): Promise<void> {
    try {
      const idLegislador = Number(req.body.idLegislador);
      const idPost = Number(req.params.id);
      const idUser = Number(req.body.UserId);
      const table = req.query.table as string;
      const response = await PostModel.postLegislador(idPost, idLegislador, idUser, table);
      res.status(200);
      res.json({
        data: response,
        message: 'Legislador agregado correctamente',
      });
    } catch (error) {
      console.error('Error en postLegislador', error);
      res.status(500).json({ error: 'Error al agregar el legislador al post' });
    }
  }
  public async deleteLegislador(req: Request, res: Response): Promise<void> {
    try {
      const idLegislador = Number(req.query.idLegislador);
      const idPost = Number(req.params.id);
      const table = req.query.table as string;
      const response = await PostModel.deleteLegislador(idPost, idLegislador, table);
      res.status(200);
      res.json({
        data: response,
        message: 'Legislador eliminado correctamente',
      });
    } catch (error) {
      console.error('Error en deleteLegislador', error);
      res.status(500).json({ error: 'Error al eliminar el legislador del post' });
    }
  }
  public async postSesion(req: Request, res: Response): Promise<void> {
    try {
      const idSesion = Number(req.body.idSesion);
      const idPost = Number(req.params.id);
      const idUser = Number(req.body.UserId);
      const table = req.query.table as string;
      const response = await PostModel.postSesion(idPost, idSesion, idUser, table);
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
      const table = req.query.table as string;
      const response = await PostModel.deleteSesion(idPost, idSesion, table);
      res.status(200);
      res.json({ data: response, message: 'Sesión eliminada correctamente' });
    } catch (error) {
      console.error('Error en deleteSesion', error);
      res.status(500).json({ error: 'Error al eliminar la sesión del post' });
    }
  }
  public async createPost(req: Request, res: Response): Promise<void> {
    console.log('PostController.createPost: Received request body:', req.body);
    try {
      const { title, typeId, id_user } = req.body;
      const parsedTypeId = parseInt(typeId);
      const parsedIdUser = parseInt(id_user);

      console.log(
        `PostController.createPost: Parsed data - title: "${title}", parsedTypeId: ${parsedTypeId}, parsedIdUser: ${parsedIdUser}`,
      );

      if (isNaN(parsedTypeId) || isNaN(parsedIdUser)) {
        console.warn('PostController.createPost: Validation failed - typeId or id_user is NaN');
        res.status(400).json({
          error: `typeId (${typeId}) e id_user (${id_user}) deben ser números válidos`,
        });
        return;
      }

      const response = await PostModel.createPost(title, parsedTypeId, parsedIdUser);
      console.log('PostController.createPost: Model createPost successful, response:', response);
      res.status(200);
      res.json(response);
    } catch (error) {
      console.error('PostController.createPost: Exception during creation:', error);
      res.status(500).json({
        error: 'Error al crear el post',
        detailedError: error instanceof Error ? error.message : String(error),
      });
    }
  }
  public async postExpediente(req: Request, res: Response): Promise<void> {
    try {
      const idExpediente = Number(req.body.idExpediente);
      const idPost = Number(req.params.idPost);
      const idUser = Number(req.body.UserId);
      const table = req.body.table as string;
      const response = await PostModel.postExpediente(idPost, idExpediente, idUser, table);
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
  public async deleteExpediente(req: Request, res: Response): Promise<void> {
    try {
      const idExpediente = Number(req.body.idExpediente);
      const idPost = Number(req.params.idPost);
      const table = req.body.table as string;
      const response = await PostModel.deleteExpediente(idPost, idExpediente, table);
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
  public async postComision(req: Request, res: Response): Promise<void> {
    try {
      const idComision = Number(req.body.idComision);
      const idPost = Number(req.params.idPost);
      const idUser = Number(req.body.UserId);
      const table = req.body.table as string;
      const response = await PostModel.postComision(idPost, idComision, idUser, table);
      res.status(200);
      res.json({ data: response, message: 'Comisión agregada correctamente' });
    } catch (error) {
      console.error('Error en postComision', error);
      res.status(500).json({ error: 'Error al agregar la comisión al post' });
    }
  }
  public async deleteComision(req: Request, res: Response): Promise<void> {
    try {
      const idComision = Number(req.body.idComision);
      const idPost = Number(req.params.idPost);
      const table = req.body.table as string;
      const response = await PostModel.deleteComision(idPost, idComision, table);
      res.status(200);
      res.json({ data: response, message: 'Comisión eliminada correctamente' });
    } catch (error) {
      console.error('Error en deleteComision', error);
      res.status(500).json({ error: 'Error al eliminar la comisión del post' });
    }
  }
  public async postAudiencia(req: Request, res: Response): Promise<void> {
    try {
      const idAudiencia = Number(req.body.idAudiencia);
      const idPost = Number(req.params.idPost);
      const idUser = Number(req.body.UserId);
      const table = req.body.table as string;
      const response = await PostModel.postAudiencia(idPost, idAudiencia, idUser, table);
      res.status(200);
      res.json({ data: response, message: 'Audiencia agregada correctamente' });
    } catch (error) {
      console.error('Error en postAudiencia', error);
      res.status(500).json({ error: 'Error al agregar la audiencia al post' });
    }
  }
  public async deleteAudiencia(req: Request, res: Response): Promise<void> {
    try {
      const idAudiencia = Number(req.body.idAudiencia);
      const idPost = Number(req.params.idPost);
      const table = req.body.table as string;
      const response = await PostModel.deleteAudiencia(idPost, idAudiencia, table);
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
  public async deletePost(req: Request, res: Response): Promise<void> {
    try {
      const idPost = Number(req.params.id);
      const table = req.query.table as string;
      const response = await PostModel.deletePost(idPost, table);
      res.status(200);
      res.json({ data: response, message: response.message });
    } catch (error) {
      console.error('Error en deletePost', error);
      res.status(500).json({ error: 'Error al eliminar el post' });
    }
  }
  public async updateStatePost(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const { table } = req.query;

      const result = await PostModel.updateStatePost(Number(id), Number(status), table as string);

      res.json({ success: true, data: result });
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar el estado del post' });
    }
  }
}
export default new PostController();
