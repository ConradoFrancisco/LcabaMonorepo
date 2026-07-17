import ldap from 'ldapjs';

export const createLdapClient = (url: string): ldap.Client => {
  return ldap.createClient({
    url: url,
    reconnect: true,
    timeout: 5000,
    connectTimeout: 10000,
  });
};

export const bindServiceUser = async (
  client: ldap.Client,
  serviceUser: string,
  servicePass: string,
): Promise<boolean> => {
  return new Promise((resolve) => {
    client.bind(serviceUser, servicePass, (err) => {
      if (err) {
        console.error('Error al conectar con el servidor LDAP:', err);
        resolve(false);
      } else {
        console.log('Conexión exitosa al servidor LDAP');
        resolve(true);
      }
    });
  });
};
