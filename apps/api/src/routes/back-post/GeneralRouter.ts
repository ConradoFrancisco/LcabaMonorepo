import { Router } from 'express';
import GeneralController from '../../controllers/back-post/GeneralController';

const GeneralRouter = Router();

GeneralRouter.get('/pages', GeneralController.getAllPages);
GeneralRouter.get('/pages/:id', GeneralController.getPageById);
GeneralRouter.post('/pages/create', GeneralController.createPage);
GeneralRouter.put('/pages/:id/edit', GeneralController.editPage);
GeneralRouter.get('/sections', GeneralController.getAllPageSections);
GeneralRouter.put('/sections/:id/status', GeneralController.changeSectionStatus);
GeneralRouter.get('/banners', GeneralController.getAllBanners);

export default GeneralRouter;
