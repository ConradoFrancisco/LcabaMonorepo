import { Router } from 'express';
import BannerController from '../../controllers/front-get/BannerController';

export const bannerRouter = Router();

bannerRouter.get('/', BannerController.bannerList);
