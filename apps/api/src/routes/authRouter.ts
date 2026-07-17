import { Router } from 'express';
import postRoutes from './back-post/auth.routes';
import getRoutes from './front-get/auth.routes';

export const authRouter = Router();
authRouter.use(postRoutes); // POST /auth/login
authRouter.use(getRoutes); // GET  /auth/me
