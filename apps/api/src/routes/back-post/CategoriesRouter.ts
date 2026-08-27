import { Router } from 'express';

import CategoriesController from '../../controllers/back-post/CategoriesController';

const CategoriesRouter = Router();
CategoriesRouter.get('/', CategoriesController.getAllCategories);
CategoriesRouter.post('/create', CategoriesController.createCategory);
CategoriesRouter.put('/edit-full', CategoriesController.editCategorie);
CategoriesRouter.get('/:id', CategoriesController.getCategoryById);

export default CategoriesRouter;
