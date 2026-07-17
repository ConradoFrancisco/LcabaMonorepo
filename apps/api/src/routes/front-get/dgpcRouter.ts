import { Router } from 'express';
import DgpcController from '../../controllers/front-get/DgpcController';
import { verificarToken } from '../../middlewares/authMiddleware';

export const dgpcRouter = Router();

dgpcRouter.get('/insc', verificarToken, DgpcController.inscFecha);
dgpcRouter.get('/insc-actuales', verificarToken, DgpcController.getInscripcionesActuales);
dgpcRouter.get('/posts/table', verificarToken, DgpcController.getPostTableByName);
dgpcRouter.get('/posts/table-id', verificarToken, DgpcController.getPostsByTableNameId);
dgpcRouter.get('/posts/url', verificarToken, DgpcController.getPostsTypesByUrl);
dgpcRouter.get('/posts/:id', verificarToken, DgpcController.getPostsTypesById);
dgpcRouter.get('/inscripciones/niveles', verificarToken, DgpcController.getColegiosNiveles);
dgpcRouter.get('/inscripciones', verificarToken, DgpcController.getConcursoByUrl);
dgpcRouter.get('/inscripciones-tipo/:id', verificarToken, DgpcController.getCursosTipoInsc);
dgpcRouter.get('/inscripciones/:id', verificarToken, DgpcController.getConcursoById);
