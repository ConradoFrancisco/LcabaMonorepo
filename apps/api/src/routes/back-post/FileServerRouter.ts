// \Lcaba-Admin-API\src\routes\back-post\FileServerRouter.ts

import { Router } from 'express';
import { uploadMemory } from '../../middlewares/multers';
import FileServerController from '../../controllers/back-post/FileServerController';
import { authJwt } from '../../middlewares/authJwt';

export const fileServerRouter = Router();

fileServerRouter.get('/list', authJwt, FileServerController.list);
fileServerRouter.post(
  '/upload',
  authJwt,
  uploadMemory.array('files', 10),
  FileServerController.upload,
);
fileServerRouter.get('/download/:filename', authJwt, FileServerController.download);
fileServerRouter.delete('/:filename', authJwt, FileServerController.delete);
