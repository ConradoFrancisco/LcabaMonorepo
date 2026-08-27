import { Router } from 'express';

import CategoriesController from '../../controllers/back-post/CategoriesController';

const CategoriesRouter = Router();

CategoriesRouter.post('/create', CategoriesController.createCategory);
CategoriesRouter.get('/:id', CategoriesController.getCategoryById);
CategoriesRouter.patch('/edit', CategoriesController.editCategory);

export default CategoriesRouter;
