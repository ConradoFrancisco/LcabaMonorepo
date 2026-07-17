export interface LdapUser {
  cn?: string;
  mail?: string;
  givenName?: string;
  sn?: string;
  userPrincipalName?: string;
  [key: string]: any;
}
