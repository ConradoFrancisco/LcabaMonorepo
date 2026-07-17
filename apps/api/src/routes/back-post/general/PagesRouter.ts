import { Router } from 'express';
import PageController from '../../../controllers/back-post/general/PageController';

const PagesRouter = Router();

/* PagesRouter.post("/", PageController.create);
PagesRouter.put("/", PageController.update); */
PagesRouter.get('/', PageController.getAll);
export default PagesRouter;
