import { Router } from 'express';
import CulturaController from '../../controllers/front-get/CulturaController';
import { verificarToken } from '../../middlewares/authMiddleware';

export const culturaRouter = Router();

culturaRouter.get('/categoria/:id', verificarToken, CulturaController.culturaCategoriasGetById);
culturaRouter.get('/categoria', verificarToken, CulturaController.culturaCategoriasGetByUrl);
culturaRouter.get('/categorias', verificarToken, CulturaController.fetchCategoriesCultura);
culturaRouter.get('/post-dias', verificarToken, CulturaController.getCulturaPostDias);
culturaRouter.get(
  '/table-name/:id/:name',
  verificarToken,
  CulturaController.culturaPostsGetByTableName,
);
culturaRouter.get('/all', verificarToken, CulturaController.cultPostsAll);
culturaRouter.get('/agenda', verificarToken, CulturaController.cultPostsAgenda);
culturaRouter.get('/types', verificarToken, CulturaController.getCulturaPostTypes);
culturaRouter.get('/typesurl', verificarToken, CulturaController.getCulturaPostTypesByUrl);
