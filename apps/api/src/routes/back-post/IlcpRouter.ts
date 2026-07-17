import { Router } from 'express';
import IlcpController from '../../controllers/back-post/IlcpController';

const IlcpRouter = Router();

IlcpRouter.get('/beneficios', IlcpController.getAllBeneficios);
IlcpRouter.get('/cursos', IlcpController.getAllCursos);
IlcpRouter.get('/docentes', IlcpController.getAllDocentes);
IlcpRouter.get('/tipos', IlcpController.getAllCursosTipo);
IlcpRouter.get('/categorias', IlcpController.getAllCategorias);
IlcpRouter.get('/cursos/salones', IlcpController.getAllSalones);
IlcpRouter.get('/origenes', IlcpController.getAllOrigenes);
IlcpRouter.get('/posts', IlcpController.getAllPosts);
IlcpRouter.get('/post/types', IlcpController.getAllTipos);
IlcpRouter.get('/modulos', IlcpController.getAllModulos);

export default IlcpRouter;
