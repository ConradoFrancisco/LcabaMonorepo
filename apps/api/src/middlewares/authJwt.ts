// \Lcaba-Admin-API\src\middlewares\authJwt.ts

import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

const { JWT_SECRET } = process.env;

export function authJwt(req: Request, res: Response, next: NextFunction) {
  const hdr = req.headers.authorization || '';
  const token = hdr.startsWith('Bearer ') ? hdr.slice(7) : null;

  if (!token) {
    res.status(401).json({ ok: false, message: 'Token requerido' });
    return;
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET as string) as JwtPayload | string;
    (req as any).user = payload;
    next();
  } catch {
    res.status(401).json({ ok: false, message: 'Token inválido' });
  }
}
