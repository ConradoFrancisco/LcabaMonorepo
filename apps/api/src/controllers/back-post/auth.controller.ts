import { Request, Response } from 'express';
import jwt, { SignOptions, Secret } from 'jsonwebtoken';
import { findUser, verifyPassword } from '../../services/ldap.service';
import users from '../../models/back-post/Users';

const { JWT_SECRET, JWT_EXPIRES, LDAP_GROUP_REQUIRED } = process.env;

type TokenPayload = {
  sub: string;
  dn: string;
  name?: string;
  surname?: string;
  email?: string;
  groups: string[];
  id_user?: number;
  username?: string;
};

export async function login(req: Request, res: Response) {
  try {
    const { username, password } = req.body as {
      username?: string;
      password?: string;
    };
    if (!username || !password) {
      res.status(400).json({ ok: false, message: 'Usuario y contraseña requeridos' });
      return;
    }
    const userinfo = await users.findUser(username);
    console.log(userinfo);
    // Secret JWT
    const secret: Secret = JWT_SECRET as string;
    if (!secret || typeof secret !== 'string') {
      console.error('[AUTH] JWT_SECRET no configurado');
      res.status(500).json({ ok: false, message: 'Configuración JWT faltante' });
      return;
    }

    // expiresIn compatible con tipos estrictos (string o number)
    const computedExpiresIn = (() => {
      const raw = (JWT_EXPIRES ?? '').trim();
      if (!raw) return '1d';
      const asNum = Number(raw);
      return Number.isFinite(asNum) ? asNum : (raw as unknown);
    })() as SignOptions['expiresIn'];

    const signOptions: SignOptions = { expiresIn: computedExpiresIn };

    console.log(`[AUTH] intento de login para: ${username}`);

    const user = await findUser(username);
    console.log(`[AUTH] detalle: ${JSON.stringify(user)}`);
    if (!user?.dn) {
      console.log(`[AUTH] user no encontrado: ${username}`);
      res.status(401).json({ ok: false, message: 'Usuario y/contraseña erróneos' });
      return;
    }

    const valid = await verifyPassword(user.dn, password);
    if (!valid) {
      console.log(`[AUTH] password inválido para: ${username}`);
      res.status(401).json({ ok: false, message: 'Usuario y/contraseña erróneos' });
      return;
    }

    if (LDAP_GROUP_REQUIRED) {
      const inGroup = (user.memberOf || []).some((dn) => dn === LDAP_GROUP_REQUIRED);
      if (!inGroup) {
        console.log(`[AUTH] sin grupo requerido: ${username}`);
        res.status(403).json({ ok: false, message: 'Usuario no autorizado' });
        return;
      }
    }

    const payload: TokenPayload = {
      sub: (user.sAMAccountName ?? user.userPrincipalName ?? user.dn) as string,
      dn: user.dn,
      name: (userinfo?.name ??
        (Array.isArray(user.displayName) ? user.displayName[0] : user.displayName) ??
        user.sAMAccountName) as string | undefined,
      surname: userinfo?.surname as string | undefined,
      email: user.mail as string | undefined,
      groups: (user.memberOf || []) as string[],
      id_user: userinfo?.id_user as number | undefined,
      username: username as string | undefined,
    };

    const token = jwt.sign(payload, secret, signOptions);

    console.log(`[AUTH] login OK: ${username}`);
    res.json({ ok: true, token, user: payload });
  } catch (err) {
    console.error('Auth error:', err);
    res.status(500).json({ ok: false, message: 'Error interno' });
  }
}
