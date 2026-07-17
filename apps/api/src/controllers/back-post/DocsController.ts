import { Response, Request } from 'express';
import DocsModel from '../../models/back-post/DocsModel';

class DocsController {
  public async saveImages(req: Request, res: Response): Promise<void> {
    try {
      if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
        res.status(400).json({ message: 'No files uploaded' });
        return;
      }

      const filesData = (req.files as Express.Multer.File[]).map((file) => ({
        originalname: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
        buffer: file.buffer,
      }));

      const section = req.query.table as string;
      const usuario =
        (req as any).user?.username ||
        (req as any).user?.name ||
        (req.query.username as string) ||
        '-';
      console.log('👤 usuario (token o query):', usuario);

      const response = await DocsModel.saveImages(
        filesData,
        section,
        req.query.table as string,
        Number(req.query.postId),
        usuario,
      );

      res.status(201).json({ message: 'Files saved successfully', files: response });
    } catch (error) {
      console.error('Error saving files:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  public async saveFiles(req: Request, res: Response): Promise<void> {
    try {
      if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
        res.status(400).json({ message: 'No files uploaded' });
        return;
      }

      const filesData = (req.files as Express.Multer.File[]).map((file) => ({
        originalname: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
        buffer: file.buffer,
      }));

      const section = req.query.table as string;
      const usuario =
        (req as any).user?.username ||
        (req as any).user?.name ||
        (req.query.username as string) ||
        '-';

      const response = await DocsModel.saveFiles(
        filesData,
        section,
        req.query.table as string,
        Number(req.query.postId),
        usuario,
      );

      res.status(201).json({ message: 'Files saved successfully', files: response });
    } catch (error) {
      console.error('Error saving files:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  public async updateImage(req: Request, res: Response): Promise<void> {
    try {
      const { id, type, fk_iddoc, title } = req.body;
      const response = await DocsModel.updateImage({
        fk_iddoc,
        table: req.query.table as string,
        postId: id,
        type,
        title,
      });
      res.status(200).json({ message: 'Image updated successfully', response });
    } catch (error) {
      console.error('Error updating image:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  public async deleteImage(req: Request, res: Response): Promise<void> {
    try {
      const { fk_iddoc, table, postId } = req.body;
      const response = await DocsModel.deleteImage({ fk_iddoc, table, postId });
      res.status(200).json({ message: 'Image deleted successfully', response });
    } catch (error) {
      console.error('Error deleting image:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
  public async updateFile(req: Request, res: Response): Promise<void> {
    try {
      const { id, fk_iddoc, title, desc, type, status } = req.body;
      const response = await DocsModel.updateFile({
        fk_iddoc,
        table: req.query.table as string,
        postId: id,
        type,
        title,
        desc,
        status,
      });
      res.status(200).json({ message: 'File updated successfully', response });
    } catch (error) {
      console.error('Error updating file:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  public async deleteFile(req: Request, res: Response): Promise<void> {
    try {
      const { fk_iddoc, table, postId } = req.body;
      const response = await DocsModel.deleteFile({ fk_iddoc, table, postId });
      res.status(200).json({ message: 'File deleted successfully', response });
    } catch (error) {
      console.error('Error deleting file:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

export default new DocsController();
