import { Router } from 'express';

import ComprasController from '../../controllers/back-post/ComprasController';

const ComprasRouter = Router();

ComprasRouter.get('/contrataciones', ComprasController.getAllContrataciones);
ComprasRouter.get('/licitaciones', ComprasController.getAllLicitaciones);

export default ComprasRouter;
