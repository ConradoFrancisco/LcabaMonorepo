import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET || 'mi_clave_secreta';

export const verificarToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    res.status(403).json({ mensaje: 'Token requerido' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    if (typeof decoded === 'object' && decoded !== null) {
      req.body = { ...req.body, ...decoded };
    }
    next();
  } catch (error) {
    res.status(401).json({ mensaje: 'Token inválido o expirado' });
    return;
  }
};
