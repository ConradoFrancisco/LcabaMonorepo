import { Router } from 'express';
import MagazineController from '../../controllers/back-post/MagazineController';
import { upload } from '../../middlewares/multerMiddleware';

export const magazineRouter = Router();

magazineRouter.post('/', MagazineController.createPost);
magazineRouter.get('/types', MagazineController.getAllTypes);
magazineRouter.patch('/post/edit', upload.none(), MagazineController.editPost);
magazineRouter.put('/video', MagazineController.updateVideo);
magazineRouter.put('/audio', MagazineController.updateAudio);
magazineRouter.delete('/audio/:id', MagazineController.deleteAudio);
magazineRouter.delete('/video/:id', MagazineController.deleteVideo);
