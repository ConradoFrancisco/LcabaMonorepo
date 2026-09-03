# Despliegue de LcabaMonorepo

## Repositorio local
`C:\Users\sacastro\Documents\proyects\legislatura\LcabaMonorepo`

## Proceso de deploy (resumen)

1. En la PC local, dentro del repo, correr `npm run build`.
2. Subir por WinSCP solo las carpetas/archivos indicados abajo (por app).
3. En el servidor, verificar el estado de los servicios:
   - `sudo systemctl status lcaba-admin`
   - `sudo systemctl status lcaba-api`
   - `sudo systemctl status lcaba-cultura`

## URLs de verificación

- ABM (admin): http://web.backend.lcaba.test:3001/login
- API: http://web.backend.lcaba.test:3000/

## Qué subir y qué no, por app

### apps/abm → lcaba-admin (puerto 3001)

**Subir:**
- `.next/` **sin** `.next/cache` (el cache pesa ~449 MB de los ~469 MB totales; es solo caché de build, no sirve en runtime y no hay que subirlo)
- `public/`
- `next.config.ts`
- `package.json` y `package-lock.json` (por si cambiaron dependencias)

**No subir:**
- `node_modules` (mejor `npm ci` en el servidor)
- `src/`, `test/`, `.turbo`
- `.env` y `.env.production` (tienen secrets: `FILE_SERVER_ADMIN_KEY`, `NEXT_PUBLIC_FILESERVER_KEY`, etc. — no pisar el `.env` que ya está en el servidor)
- `README.md`, `LICENSE`, `.git`

### apps/api → lcaba-api (puerto 3000)

**Subir:**
- `dist/` (lo que corre `node dist/index.js`, pesa apenas ~636 KB)
- `package.json` y `package-lock.json`

**No subir:**
- `node_modules` — **importante**: `bcrypt` y `sharp` son módulos nativos compilados para Windows en la PC local; si se copian tal cual al servidor Linux, se rompen. Instalar en el servidor con `npm ci --omit=dev`.
- `src/`, `test-db.js`, `testDb.ts`, `tsconfig.json`, `nodemon.json` (son de desarrollo, no hacen falta en runtime)
- `.env` (tiene `DB_PASSWORD`, `JWT_SECRET`, `AD_PASSWORD`, `SMTP_PASS` — no pisarlo)
- `.turbo`, `.git`

### apps/cultura → lcaba-cultura

**Subir:**
- `.next/` sin `.next/cache`
- `public/`
- `next.config.ts`
- `package.json` y `package-lock.json`

**No subir:**
- `node_modules`, `.env`, `.turbo`
- `AGENTS.md`, `CLAUDE.md`, `README.md`, `.git`

Nota: `cultura` usa `@lcaba/ui` (paquete del workspace en `packages/ui`) vía `transpilePackages`, pero como queda compilado adentro de `.next` al hacer el build local, no hace falta subir `packages/` — solo sería necesario si se corre `npm install`/build directamente en el servidor.

### apps/micrositio-base (puerto 3003)

Existe en el repo pero no hay un `systemctl status` asociado confirmado — falta confirmar si se despliega y bajo qué service.

## Qué nunca subir (a nivel repo, en general)

`.git`, `.turbo`, `node_modules` del root, `package-lock.json` del root, `implementation_plan.md`, `informe`, `README.md` del root.

## Mejora a futuro (opcional)

Configurar `output: 'standalone'` en los `next.config.ts` de las tres apps Next (abm, cultura, micrositio-base) generaría una carpeta autocontenida con un `node_modules` mínimo ya pruneado, simplificando el deploy a subir una sola carpeta por app sin preocuparse por excluir cache ni instalar nada en el servidor.

## Servicios systemd conocidos

- `lcaba-admin`
- `lcaba-api`
- `lcaba-cultura`
