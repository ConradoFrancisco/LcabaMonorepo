import { Request, Response } from 'express';
import Funcionarios from '../../models/back-post/Funcionarios';
class FuncionariosController {
  public async getAllFuncionarios(req: Request, res: Response): Promise<void> {
    try {
      const funcionarios = await Funcionarios.getAllFuncionarios({
        search: req.query.input as string,
        order: req.query.order as string,
        limit: parseInt(req.query.limit as string),
        offset: parseInt(req.query.offset as string),
      });
      res.status(200).json(funcionarios);
    } catch (error) {
      console.error('Error en getAllFuncionarios:', error);
      res.status(500).json({ message: 'Error al obtener los funcionarios' });
    }
  }
  public async getAllTypes(req: Request, res: Response): Promise<void> {
    try {
      const funcionariosTypes = await Funcionarios.getAllTypes({
        search: req.query.input as string,
        order: req.query.order as string,
        limit: parseInt(req.query.limit as string),
        offset: parseInt(req.query.offset as string),
      });
      res.status(200).json(funcionariosTypes);
    } catch (error) {
      console.error('Error en getAllTypes:', error);
      res.status(500).json({ message: 'Error al obtener los tipos de funcionarios' });
    }
  }
}
export default new FuncionariosController();
