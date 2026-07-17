import { Router } from 'express';
import ContratacionController from '../../controllers/front-get/ContratacionController';
import { verificarToken } from '../../middlewares/authMiddleware';

export const contratacionRouter = Router();

contratacionRouter.get('/', verificarToken, ContratacionController.getAll);
contratacionRouter.get('/:id', ContratacionController.GetById);
