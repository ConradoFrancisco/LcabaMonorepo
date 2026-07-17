import { Router } from 'express';

import TaquigrafosController from '../../controllers/back-post/TaquigrafosController';

const TaquigrafosRouter = Router();

TaquigrafosRouter.get('/versiones', TaquigrafosController.getAllVersionesTaquigraficas);

export default TaquigrafosRouter;
