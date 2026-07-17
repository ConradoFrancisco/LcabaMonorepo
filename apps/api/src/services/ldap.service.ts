// \Lcaba-Admin-API\src\services\ldap.service.ts

import { Client, SearchOptions } from 'ldapts';

const { AD_HOST, AD_PORT, AD_BASE_DN, AD_USER, AD_PASSWORD, LDAP_USER_FILTER } = process.env;

// Para LDAPS cambiar a ldaps://HOST:636 y habilitar tlsOptions.
const LDAP_URL = `ldap://${AD_HOST}:${AD_PORT}`;

export type LdapUser = {
  dn: string;
  sAMAccountName?: string;
  userPrincipalName?: string;
  displayName?: string;
  mail?: string;
  memberOf?: string[];
};

async function withClient<T>(fn: (client: Client) => Promise<T>) {
  const client = new Client({
    url: LDAP_URL,
    timeout: 5000,
    connectTimeout: 5000,
    // tlsOptions: { rejectUnauthorized: true }, // si usás LDAPS con CA instalada
  });
  try {
    return await fn(client);
  } finally {
    await client.unbind().catch(() => {});
  }
}

export async function findUser(username: string): Promise<LdapUser | null> {
  return withClient(async (client) => {
    await client.bind(AD_USER!, AD_PASSWORD!);

    const tpl = LDAP_USER_FILTER || '(sAMAccountName={{username}})';
    const filterUser = tpl.replace(/{{username}}/g, username);

    const opts: SearchOptions = {
      scope: 'sub',
      filter: `(&(objectCategory=person)${filterUser})`,
      attributes: ['dn', 'sAMAccountName', 'userPrincipalName', 'displayName', 'mail', 'memberOf'],
      sizeLimit: 2,
      paged: { pageSize: 2 },
    };

    const { searchEntries } = await client.search(AD_BASE_DN!, opts);
    if (!searchEntries?.length) return null;

    const e = searchEntries[0] as any;
    const memberOf = Array.isArray(e.memberOf) ? e.memberOf : e.memberOf ? [e.memberOf] : [];

    return {
      dn: e.dn,
      sAMAccountName: e.sAMAccountName,
      userPrincipalName: e.userPrincipalName,
      displayName: e.displayName,
      mail: e.mail,
      memberOf,
    };
  });
}

export async function verifyPassword(userDn: string, password: string): Promise<boolean> {
  return withClient(async (client) => {
    try {
      await client.bind(userDn, password);
      return true;
    } catch {
      return false;
    }
  });
}
