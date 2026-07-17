import { Router } from 'express';

import ObrasController from '../../controllers/back-post/ObrasController';

const ObrasRouter = Router();

ObrasRouter.get('/', ObrasController.getAllObras);

export default ObrasRouter;
