import { Router } from 'express';
import FuncionariosController from '../../controllers/back-post/FuncionariosController';

export const funcionariosRouter = Router();

funcionariosRouter.get('/', FuncionariosController.getAllFuncionarios);
funcionariosRouter.get('/types', FuncionariosController.getAllTypes);
