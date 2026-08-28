import { Request, Response } from 'express';
import TypesModel from '../../models/back-post/TypesModel';
import EditTypeDTO from '../../DTOS/types/EditTypeDTO';

class TypesController {
  public async createType(req: Request, res: Response): Promise<void> {
    try {
      const { title, table } = req.body;
      const id_user = req.body.id_user;
      const response = await TypesModel.createType({ title, table, id_user });
      res.status(200).json({ success: true, message: 'Tipo creado exitosamente', data: response });
    } catch (error) {
      console.error('Error en createType:', error);
      res.status(500).json({ success: false, message: 'Error al crear el tipo' });
    }
  }

  public async editType(req: Request, res: Response): Promise<void> {
    try {
      const dto = new EditTypeDTO(req.body);
      const response = await TypesModel.editType(dto);
      res.status(200).json({ success: true, message: 'Tipo editado exitosamente', data: response });
    } catch (error) {
      console.error('Error en editType:', error);
      res.status(500).json({ success: false, message: 'Error al editar el tipo' });
    }
  }

  public async getTypeById(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const table = (req.query.table as string) || 'posts_type';
      const response = await TypesModel.getTypeById(id, table);
      res.status(200).json(response);
    } catch (error) {
      console.error('Error en getTypeById:', error);
      res.status(500).json({ success: false, message: 'Error al obtener el tipo' });
    }
  }

  public async getAllTypes(req: Request, res: Response): Promise<void> {
    try {
      const table = (req.query.table as string) || 'posts_type';
      const response = await TypesModel.getAllTypes({
        table,
        search: req.query.input as string,
        order: req.query.order as string,
        limit: req.query.limit ? parseInt(req.query.limit as string) : undefined,
        offset: req.query.offset ? parseInt(req.query.offset as string) : undefined,
      });
      res.status(200).json(response);
    } catch (error) {
      console.error('Error en getAllTypes Controller:', error);
      res.status(500).json({ error: 'Error al obtener los tipos' });
    }
  }

  public async updateStatus(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const { status } = req.body;
      const table = (req.query.table as string) || (req.body.table as string) || 'posts_type';
      const response = await TypesModel.updateStatus(id, status, table);
      res.status(200).json(response);
    } catch (error) {
      console.error('Error en updateStatus Controller:', error);
      res.status(500).json({ error: 'Error al actualizar el estado' });
    }
  }

  public async deleteType(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const table = (req.query.table as string) || 'posts_type';
      const response = await TypesModel.deleteType(id, table);
      res.status(200).json(response);
    } catch (error) {
      console.error('Error en deleteType Controller:', error);
      res.status(500).json({ error: 'Error al eliminar el tipo' });
    }
  }
}

export default new TypesController();
