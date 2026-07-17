// \Lcaba-Admin-API\src\routes\back-post\auth.routes.ts

import { Router } from 'express';
import { login } from '../../controllers/back-post/auth.controller';

const router = Router();
router.post('/login', login);

export default router;
