import { Router } from 'express';
import AreaController from '../../controllers/front-get/AreaController';

export const areaRouter = Router();

areaRouter.get('/', AreaController.areasList);
areaRouter.get('/:id', AreaController.GetById);
areaRouter.get('/areas-url/', AreaController.GetByUrl);
