import { Router } from 'express';

import ComprasController from '../../controllers/back-post/ComprasController';
import PrensaController from '../../controllers/back-post/PrensaController';

import { upload } from '../../middlewares/multerMiddleware';

const PrensaRouter = Router();

PrensaRouter.get('/', PrensaController.getAllPosts);
PrensaRouter.get('/types', PrensaController.getAllTypes);
PrensaRouter.get('/suscriptores', PrensaController.getSuscriptores);
PrensaRouter.patch('/edit', upload.none(), PrensaController.editPost);

export default PrensaRouter;
