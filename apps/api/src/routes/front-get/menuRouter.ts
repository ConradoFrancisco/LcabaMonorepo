import { Router } from 'express';
import MenuController from '../../controllers/front-get/MenuController';

export const menuRouter = Router();

menuRouter.get('/a', MenuController.getByUrl);
menuRouter.get('/menu-list', MenuController.menuList);
menuRouter.get('/:id', MenuController.menuGetById);
menuRouter.get('/url/:id', MenuController.getUrlById);
