// \Lcaba-Admin-API\src\controllers\back-post\FileServerController.ts

import { Response, Request } from 'express';
import {
  listFiles,
  uploadFromBuffer,
  downloadFile,
  deleteFile,
} from '../../services/fileServerService';

class FileServerController {
  public async list(req: Request, res: Response): Promise<void> {
    try {
      const files = await listFiles();
      res.status(200).json(files);
    } catch (error) {
      console.error('Error listing files:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  public async upload(req: Request, res: Response): Promise<void> {
    try {
      if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
        res.status(400).json({ message: 'No files uploaded' });
        return;
      }

      const section = (req.query.section as string) || 'otros';
      const user = (req as any).user?.sub || (req as any).user?.name || '-';

      const results = await Promise.all(
        req.files.map((file: Express.Multer.File) =>
          uploadFromBuffer(file.buffer, file.originalname, section, user),
        ),
      );

      res.status(201).json({ message: 'Files uploaded successfully', files: results });
    } catch (error) {
      console.error('Error uploading files:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  public async download(req: Request, res: Response): Promise<void> {
    try {
      const filename = req.params.filename as string;
      const buffer = await downloadFile(filename);
      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
      res.setHeader('Content-Type', 'application/octet-stream');
      res.status(200).send(buffer);
    } catch (error) {
      console.error('Error downloading file:', error);
      res.status(404).json({ message: 'File not found' });
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const filename = req.params.filename as string;
      const result = await deleteFile(filename);
      res.status(200).json(result);
    } catch (error) {
      console.error('Error deleting file:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

export default new FileServerController();
