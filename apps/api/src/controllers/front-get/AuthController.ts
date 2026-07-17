import { Request, Response } from 'express';

import { bindServiceUser, createLdapClient } from '../../models/front-get/Ad';

class AuthController {
  private ldapUrl = 'ldap://LCABA-SVR01';
  private baseDN = 'DC=lcaba,DC=test';
  private serviceUser = 'dirivero';
  private servicePass = 'P.20278607446';

  public login = async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({ message: 'Faltan credenciales' });
      return;
    }

    const client = createLdapClient(this.ldapUrl);

    const bind = await bindServiceUser(client, this.serviceUser, this.servicePass);
    if (!bind) {
      res.status(500).json({ message: 'Error al conectar con el servidor LDAP' });
      return;
    }
  };
}

export default new AuthController();
