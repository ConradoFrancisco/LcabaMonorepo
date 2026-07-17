// \Lcaba-Admin-API\src\routes\front-get\auth.routes.ts

import { Router } from 'express';
import { me } from '../../controllers/front-get/auth.me.controller';
import { authJwt } from '../../middlewares/authJwt';

const router = Router();
router.get('/me', authJwt, me);

export default router;
