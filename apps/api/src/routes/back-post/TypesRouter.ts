import { Router } from 'express';
import TypesController from '../../controllers/back-post/TypesController';

const TypesRouter = Router();

TypesRouter.get('/', TypesController.getAllTypes);
TypesRouter.get('/:id', TypesController.getTypeById);
TypesRouter.post('/create', TypesController.createType);
TypesRouter.put('/edit-full', TypesController.editType);
TypesRouter.patch('/:id/status', TypesController.updateStatus);
TypesRouter.put('/:id/status', TypesController.updateStatus);
TypesRouter.delete('/:id', TypesController.deleteType);

export default TypesRouter;
