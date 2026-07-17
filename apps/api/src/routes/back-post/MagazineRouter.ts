import { Router } from 'express';
import MagazineController from '../../controllers/back-post/MagazineController';
import { upload } from '../../middlewares/multerMiddleware';
import { authJwt } from '../../middlewares/authJwt';

export const magazineRouter = Router();

magazineRouter.get('/', MagazineController.getAllPosts);
magazineRouter.post('/', MagazineController.createPost);
magazineRouter.get('/issues', MagazineController.getAllIssues);
magazineRouter.get('/categories', MagazineController.getAllCategories);
magazineRouter.get('/types', MagazineController.getAllTypes);
magazineRouter.get('/post/:id', MagazineController.getById);
magazineRouter.patch('/post/edit', upload.none(), MagazineController.editPost);
magazineRouter.put('/video', MagazineController.updateVideo);
magazineRouter.put('/audio', MagazineController.updateAudio);
magazineRouter.delete('/audio/:id', MagazineController.deleteAudio);
magazineRouter.delete('/video/:id', MagazineController.deleteVideo);
