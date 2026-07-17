// routes/uploadTest.ts
import { Router } from 'express';
import { upload } from '../../middlewares/multers';
import { authJwt } from '../../middlewares/authJwt';
import DocsController from '../../controllers/back-post/DocsController';

export const docsRouter = Router();

docsRouter.post('/test', upload.single('file'), (req, res) => {
  if (!req.file) {
    res.status(400).json({ message: 'No file uploaded' });
    return;
  }

  res.json({
    message: 'File uploaded successfully',
    file: req.file,
  });
});

docsRouter.post('/upload-images', upload.array('file', 10), DocsController.saveImages);
docsRouter.post('/upload-files', upload.array('file', 10), DocsController.saveFiles);
docsRouter.put('/update-image', DocsController.updateImage);
docsRouter.put('/update-file', DocsController.updateFile);
docsRouter.delete('/delete-image', DocsController.deleteImage);
docsRouter.delete('/delete-file', DocsController.deleteFile);
