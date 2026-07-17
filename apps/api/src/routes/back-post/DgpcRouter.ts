import { Router } from 'express';

import DgpcController from '../../controllers/back-post/DgpcController';

export const DgpcRouter = Router();

DgpcRouter.get('/', DgpcController.getAllCampañas);
DgpcRouter.get('/types', DgpcController.getAllTypes);
DgpcRouter.get('/posts/types', DgpcController.getAllPostsType);
DgpcRouter.get('/posts', DgpcController.getAllPosts);
