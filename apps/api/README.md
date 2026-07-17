# Backend Legis API

API de gestión administrativa para la Legislatura de la CABA.

## Características

- Escrito en **TypeScript**.
- Arquitectura basada en **Controladores y Rutas**.
- Autenticación vía **LDAP (Active Directory)**.
- Persistencia en **MySQL**.

## Estructura de Rutas

### Rutas de Usuario Final (GET)

- `/menu`: Gestión del menú de navegación.
- `/area`: Datos de las diferentes áreas legislativas.
- `/culturas`: Contenidos del área de Cultura.
- `/banner`: Gestión de banners principales.

### Rutas Administrativas (POST/BACK)

- `/auth`: Login y validación de tokens.
- `/magazine`: Gestión de artículos de la revista.
- `/dgpc`: Administración de planeamiento.
- `/upload`: Servicio centralizado de subida de archivos/documentos.

## Configuración de Entorno (.env)

| Variable      | Descripción                                     |
| :------------ | :---------------------------------------------- |
| `DB_HOST`     | Host de la base de datos MySQL (Ej: 10.51.0.29) |
| `AD_HOST`     | Host del Active Directory para LDAP             |
| `JWT_SECRET`  | Clave secreta para firmar tokens JWT            |
| `CORS_ORIGIN` | URL permitida para peticiones desde el Frontend |

## Scripts Disponibles

- `npm run dev`: Inicia el servidor con `nodemon` para desarrollo.
- `npm run build`: Compila el código TypeScript a JavaScript en la carpeta `dist`.
- `npm start`: Ejecuta la versión compilada en `dist/index.js`.
