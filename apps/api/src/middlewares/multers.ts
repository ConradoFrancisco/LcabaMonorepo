// middlewares/multer.ts
import multer from 'multer';

export const storage = multer.memoryStorage();

export const upload = multer({
  storage,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB limit
  },
});

export const uploadMemory = multer({ storage: multer.memoryStorage() });
