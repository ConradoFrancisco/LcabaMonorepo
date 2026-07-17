# Lcaba-Admin

Panel de administración de contenidos para la **Legislatura de la Ciudad Autónoma de Buenos Aires**. Permite gestionar publicaciones, cursos, banners, funcionarios, licitaciones y más, a través de una interfaz unificada con autenticación institucional.

---

## Stack

- **Next.js 15** (App Router + React Server Components)
- **React 19** + **TypeScript 5**
- **Tailwind CSS v4**
- **Axios** — cliente HTTP para la API REST del backend
- **ApexCharts** — gráficos de línea y barra
- **Tiptap** — editor de texto enriquecido
- **Formik + Yup** — formularios y validación
- **Flatpickr** — selector de fechas
- **FullCalendar** — vista de calendario
- **jsPDF + XLSX** — exportación a PDF y Excel
- **React Dropzone** — carga de archivos

---

## Variables de entorno

Crear un archivo `.env.local` en la raíz con las siguientes variables:

```env
NEXT_PUBLIC_API=http://localhost:3000
NEXT_PUBLIC_IMAGES=http://10.51.0.29/files-api/files/
NEXT_PUBLIC_FILESERVER_KEY=<token_hex>
NEXT_PUBLIC_CULTURA_URL=<url_sitio_cultura>
NEXT_PUBLIC_REVISTA_URL=<url_sitio_revista>
NEXT_PUBLIC_PRENSA_URL=<url_sitio_prensa>
```

---

## Instalación

```bash
npm install
npm run dev     # Inicia en http://localhost:3001
```

---

## Módulos

| Módulo           | Ruta base       | Descripción                                     |
| ---------------- | --------------- | ----------------------------------------------- |
| **Cultura**      | `/cultura`      | Publicaciones, categorías y tipos culturales    |
| **Prensa**       | `/prensa`       | Gacetillas, publicaciones, suscriptores y tipos |
| **Revista**      | `/revista`      | Revistas, publicaciones, categorías y tipos     |
| **DGPC**         | `/dgpc`         | Instituciones, publicaciones y tipos del área   |
| **ILCP**         | `/ilcp`         | Cursos, docentes, módulos, posts y beneficios   |
| **General**      | `/general`      | Banners, páginas y secciones del sitio          |
| **Compras**      | `/compras`      | Licitaciones y contrataciones                   |
| **Funcionarios** | `/funcionarios` | Listado de funcionarios y tipos                 |
| **Obras**        | `/obras`        | Proyectos de obra pública                       |
| **Taquígrafos**  | `/taquigrafos`  | Gestión del personal taquígrafo                 |

---

## Autenticación

- Login via `/login` con usuario y contraseña institucional
- El token JWT se almacena en `localStorage`
- **Cierre de sesión automático** por:
  - Expiración del token (calculada desde el claim `exp`)
  - Inactividad de 30 minutos (detectada por eventos de mouse, teclado y scroll)
- Los grupos del usuario (`groups[]`) determinan los permisos de acceso

---

## Estructura del proyecto

```
src/
├── app/          # Rutas y páginas (App Router)
├── components/   # Componentes reutilizables
├── context/      # AuthContext, ThemeContext, SidebarContext
├── hooks/        # Custom hooks
├── services/     # 18 servicios de API (uno por módulo)
├── types/        # Tipos TypeScript globales
└── utils/        # Funciones utilitarias
```

---

## Scripts

```bash
npm run dev      # Servidor de desarrollo (puerto 3001)
npm run build    # Build de producción
npm run start    # Servidor de producción
npm run lint     # Linting con ESLint
```
