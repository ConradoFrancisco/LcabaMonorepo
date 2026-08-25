# Rutas Dinámicas en Next.js desde la DB

## El Problema

Next.js usa file-system routing: necesita archivos `page.tsx` para cada ruta. Sin embargo, el menú de cultura viene de la DB (`menu_vw`), y cada sección tiene su propia `url` (ej: `/institucional`, `/biblioteca`). Si tu jefe agrega una nueva sección desde el ABM, no hay ninguna `page.tsx` para esa URL → 404.

---

## Opción A: Crear archivos físicos desde la API ❌ (NO recomendado)

Cuando se crea un ítem en el ABM, llamar a un endpoint que crea un archivo `.tsx` en disco en la app de Next.

**Problemas:**
- Next.js en producción no hot-reload archivos nuevos — habría que reiniciar el proceso
- Frágil: problemas de permisos, consistencia, y deployment
- Mezcla responsabilidades: la API ahora toca el filesystem del frontend
- En Vercel/contenedores el filesystem es de solo lectura

---

## Opción B ✅ RECOMENDADA — Catch-all Route + Template System

Un único archivo `[[...slug]]/page.tsx` captura **cualquier** URL desconocida. Al recibir el slug, consulta la DB para saber qué sección corresponde y renderiza el template adecuado.

### Cómo funciona

```
/institucional      → slug = ["institucional"]
/biblioteca         → slug = ["biblioteca"]
/biblioteca/cursos  → slug = ["biblioteca", "cursos"]
```

El catch-all busca el slug en `menu_vw.url` → obtiene la sección con su configuración (template, categoría de posts, etc.) → renderiza el componente apropiado.

### Ventajas
- ✅ Cero intervención en el filesystem al agregar secciones
- ✅ Funciona en producción, Vercel, Docker
- ✅ Next.js native — `generateStaticParams` para SSG opcional
- ✅ Una sola fuente de verdad: la DB

---

## Implementación propuesta

### 1. Endpoint nuevo en la API
`GET /nav-menu/by-url?url=/institucional&pageId=3`

Retorna la sección correspondiente con su configuración (template a usar, categorías asociadas, etc.).

### 2. Campo `template` en la tabla `menu`
Se agrega un campo para indicar qué layout usa esa sección:
- `"posts-list"` → lista de publicaciones filtrada por categoría
- `"static-page"` → página con descripción + imágenes (tipo "Institucional")
- `"custom"` → futuro template especial

### 3. Archivo catch-all en cultura

```
apps/cultura/src/app/[[...slug]]/page.tsx
```

```tsx
export default async function DynamicPage({ params }) {
    const slug = params.slug?.join("/") || "";

    // 1. Busca la sección en la DB por URL
    const section = await getSectionByUrl(`/${slug}`, pageId);
    if (!section) notFound();

    // 2. Renderiza el template correspondiente
    switch (section.seteos.template) {
        case "posts-list":   return <PostsListTemplate section={section} />;
        case "static-page":  return <StaticPageTemplate section={section} />;
        default:             return <StaticPageTemplate section={section} />;
    }
}
```

### 4. Rutas estáticas conocidas siguen como archivos

El catch-all **solo actúa cuando ningún otro archivo coincide** — Next.js prioriza archivos explícitos:

```
app/
  page.tsx              → / (home, tiene prioridad)
  publicaciones/
    page.tsx            → /publicaciones (tiene prioridad)
    [id]/page.tsx       → /publicaciones/123
  [[...slug]]/page.tsx  → TODO lo demás (catch-all)
```

---

## Plan de implementación

### Paso 1 — API
- [x] Agregar `GET /nav-menu/by-url` en `navMenuRouter.ts`
- [x] Agregar método `getSectionByUrl({url, pageId})` en `NavMenuModel.ts`
- [x] Strip `.html`/`.htm` de `m.url` en `getNavTree` y `getNavFlat`
- [x] Agregar columna `template` en tabla `menu` (VARCHAR, nullable) — migración ejecutada

### Paso 2 — Next.js (cultura)
- [x] Crear `app/[[...slug]]/page.tsx`
- [x] `PostsListTemplate` — lista de posts filtrada por categoría de la sección
- [x] `StaticPageTemplate` — descripción, imágenes y archivos de la sección
- [x] `generateMetadata` para SEO dinámico

### Paso 3 — ABM
- [x] Agregar selector de "Template" en `SectionSeteos.tsx` (static-page / posts-list)

---

## ✅ Implementación completada

El flujo completo es:
1. El ABM guarda la URL de la sección (ej: `/institucional`) y el template elegido en la DB
2. El usuario navega a `cultura.lcaba.test/institucional`
3. El `[[...slug]]/page.tsx` llama a `GET /nav-menu/by-url?url=/institucional&pageId=3`
4. La API retorna la sección con `template`, `title`, `description`, `images`, etc.
5. Se renderiza el template adecuado (`static-page` o `posts-list`)

### Próximos pasos opcionales
- Agregar más templates según las necesidades (ej: galería, agenda, etc.)
- Aplicar el mismo patrón a otras apps (prensa, revista)
- Agregar `generateStaticParams` para pre-renderizar las secciones conocidas en build time
