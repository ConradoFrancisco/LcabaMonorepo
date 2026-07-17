import { Router } from 'express';
import CulturaController from '../../controllers/back-post/CulturaController';
import { upload } from '../../middlewares/multerMiddleware';

export const culturaRouterb = Router();

culturaRouterb.get('/', CulturaController.getAllPosts);
culturaRouterb.post('/create', CulturaController.createPost);
culturaRouterb.get('/categories', CulturaController.getAllCategories);
culturaRouterb.get('/types', CulturaController.getAllTypes);
culturaRouterb.get('/post/:id', CulturaController.getById);
culturaRouterb.post('/post/:id/expediente', CulturaController.postExpediente);
culturaRouterb.post('/post/:id/comision', CulturaController.postComision);
culturaRouterb.post('/post/:id/audiencia', CulturaController.postAudiencia);
culturaRouterb.post('/post/:id/sesion', CulturaController.postSesion);
/* culturaRouterb.post('/post/:id/legisladores', CulturaController.postLegisladores) */
culturaRouterb.delete('/post/:id/expediente', CulturaController.deleteExpediente);
culturaRouterb.delete('/post/:id/comision', CulturaController.deleteComision);
culturaRouterb.delete('/post/:id/audiencia', CulturaController.deleteAudiencia);
culturaRouterb.delete('/post/:id/sesion', CulturaController.deleteSesion);
/* culturaRouterb.delete('/post/:id/legisladores', CulturaController.deleteLegisladores) */
culturaRouterb.patch('/post/edit', upload.none(), CulturaController.editPost);
/* 
culturaRouter.get("/categories",CulturaController.getAllCategories); */
