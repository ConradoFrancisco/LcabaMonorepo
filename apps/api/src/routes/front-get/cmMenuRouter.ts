import { Router } from 'express';
import CmMenuController from '../../controllers/front-get/CmMenuController';

export const cmMenuRouter = Router();

cmMenuRouter.get('/', CmMenuController.sideBarMenuList);
cmMenuRouter.get('/full', CmMenuController.fullMenuList);
