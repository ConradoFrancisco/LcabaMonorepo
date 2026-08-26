import { Router } from 'express';

import CategoriesController from '../../controllers/back-post/CategoriesController';

const CategoriesRouter = Router();

CategoriesRouter.post('/create', CategoriesController.createCategory);

export default CategoriesRouter;
