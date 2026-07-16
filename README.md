# LCABA Monorepo 🏛️

Monorepo de micrositios de la Legislatura de la Ciudad Autónoma de Buenos Aires.

## Stack

- **Turborepo** — Gestión del monorepo y builds cacheados
- **Next.js** — Framework de frontend para todos los micrositios
- **Node.js / Express** — API compartida (`back-api.legislatura.gob.ar`)
- **TypeScript** — En todos los paquetes y apps
- **Bootstrap** — Sistema de diseño / template compartido

## Estructura

```
LcabaMonorepo/
├── apps/
│   ├── micrositio-base/        ← Template base para nuevos micrositios
│   ├── micrositio-cultura/     ← (próximamente)
│   ├── micrositio-prensa/      ← (próximamente)
│   └── ...
│
└── packages/
    ├── ui/                     ← Componentes compartidos (Header, Footer, Bootstrap theme)
    ├── typescript-config/      ← tsconfig base
    └── eslint-config/          ← eslint base
```

## Scopes de paquetes

Todos los paquetes internos usan el scope `@lcaba/*`:
- `@lcaba/ui`
- `@lcaba/typescript-config`
- `@lcaba/eslint-config`

## Comandos

```bash
# Instalar dependencias de todo el monorepo
npm install

# Levantar todos los micrositios en desarrollo
npm run dev

# Levantar solo un micrositio específico
npx turbo dev --filter=@lcaba/micrositio-base

# Buildear todo
npm run build

# Buildear solo una app
npx turbo build --filter=@lcaba/micrositio-base
```

## Agregar un nuevo micrositio

1. Copiá `apps/micrositio-base` y renombralo: `apps/micrositio-[nombre]`
2. Actualizá el `name` en su `package.json`: `@lcaba/micrositio-[nombre]`
3. Cambiá el puerto en `dev`: `next dev --port XXXX`
4. ¡Listo!

## API

Los micrositios consumen la API en `back-api.legislatura.gob.ar` a través de la variable de entorno:

```env
NEXT_PUBLIC_API=http://localhost:3000
```
