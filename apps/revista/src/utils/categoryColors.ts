export function normalizeCategory(value?: string): string {
  return (value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();
}

// Mapa de colores por defecto para categorías conocidas
const CATEGORY_COLORS: Record<string, string> = {
  "historias de vida": "#7c3aed",      // violeta / morado
  "nuestros logros": "#84cc16",        // verde claro
  "en casa": "#2563eb",                // azul
  "iniciativas legislativas": "#84cc16",// verde oliva / lima
  "emocional": "#10b981",              // hereda bienestar por defecto
  "fisico": "#10b981",                 // hereda bienestar por defecto
  "físico": "#10b981",                 // hereda bienestar por defecto
  "laboral": "#10b981",                // hereda bienestar por defecto
  "libro del mes": "#0284c7",          // azul cian
  "somos": "#9333ea",                  // púrpura
  "proyectos": "#eab308",              // amarillo / dorado
  "bienestar": "#10b981",              // esmeralda
  "formacion": "#f97316",              // naranja
  "formación": "#f97316",              // naranja
  "agenda": "#ec4899",                 // rosa
};

export function resolvePostCategory(post: any): string {
  if (!post) return "";
  const subcat =
    post.subcategoria ||
    post.sub_categoria ||
    post.subCategory ||
    post.seteos?.subcategoria ||
    post.seteos?.sub_categoria;
  if (subcat && String(subcat).trim()) {
    return String(subcat).trim();
  }
  const cat =
    post.categoria ||
    post.category ||
    post.cat_name ||
    post.seteos?.categoria ||
    post.seteos?.cat_name ||
    "";
  return String(cat).trim();
}

export function resolveParentCategory(post: any): string {
  if (!post) return "";
  const cat =
    post.categoria ||
    post.category ||
    post.cat_name ||
    post.seteos?.categoria ||
    post.seteos?.cat_name ||
    "";
  return String(cat).trim();
}

export function getCategoryColor(categoryName?: string, fallbackFromMenu?: string): string {
  if (fallbackFromMenu) return fallbackFromMenu;
  if (!categoryName) return "#6366f1";
  const normalized = categoryName.trim().toLowerCase();
  const unaccented = normalizeCategory(categoryName);
  return CATEGORY_COLORS[normalized] || CATEGORY_COLORS[unaccented] || "#6366f1";
}

/**
 * Construye un mapa de colores normalizado a partir de los ítems del menú.
 * Si una subcategoría no tiene color asignado, hereda el color del padre.
 */
export function buildCategoryColorMap(menuItems: any[] = []): Record<string, string> {
  const map: Record<string, string> = {};

  menuItems.forEach((item: any) => {
    const parentTitle = item.menu_title || item.title || "";
    const parentColor = item.color;
    const parentCatId = item.cat_id || item.category_id || item.id;

    if (parentTitle && parentColor) {
      map[parentTitle.trim().toLowerCase()] = parentColor;
      map[normalizeCategory(parentTitle)] = parentColor;
    }
    if (parentCatId && parentColor) {
      map[String(parentCatId)] = parentColor;
    }

    const submenus = item.submenus || item.subItems || [];
    if (Array.isArray(submenus)) {
      submenus.forEach((sub: any) => {
        const subTitle = sub.submenu_title || sub.title || "";
        // Regla: Si la subcategoría no tiene color propio, toma el color del padre
        const subColor = sub.color || parentColor;
        const subCatId = sub.cat_id || sub.category_id || sub.id;

        if (subTitle && subColor) {
          map[subTitle.trim().toLowerCase()] = subColor;
          map[normalizeCategory(subTitle)] = subColor;
        }
        if (subCatId && subColor) {
          map[String(subCatId)] = subColor;
        }
      });
    }

    // Regla especial para Bienestar: subcategorías históricas heredan el color de Bienestar
    if (normalizeCategory(parentTitle) === "bienestar" && parentColor) {
      ["emocional", "fisico", "físico", "laboral"].forEach((subName) => {
        if (!map[subName]) {
          map[subName] = parentColor;
        }
      });
    }
  });

  return map;
}

/**
 * Resuelve el color para un posteo considerando:
 * 1. Color asignado a la subcategoría (por nombre o id)
 * 2. Si no tiene, color del padre (por nombre, id o relación de menú)
 * 3. Fallbacks correspondientes
 */
export function getPostCategoryColor(
  post: any,
  categoryColorMap: Record<string, string> = {}
): string {
  if (!post) return "#6366f1";

  const category = resolvePostCategory(post);
  const parentCategory = resolveParentCategory(post);

  const catId =
    post.cat_id ||
    post.category_id ||
    post.idcategories ||
    post.seteos?.cat_id ||
    post.seteos?.idcategories;
  const subcatId =
    post.subcat_id ||
    post.idsubcategories ||
    post.seteos?.idsubcategories ||
    post.seteos?.subcat_id;

  // 1. Probar por nombre de subcategoría / categoría en el mapa dinámico
  if (category) {
    const directColor =
      categoryColorMap[category.toLowerCase()] ||
      categoryColorMap[normalizeCategory(category)];
    if (directColor) return directColor;
  }

  // 2. Probar por id de subcategoría en el mapa
  if (subcatId && categoryColorMap[String(subcatId)]) {
    return categoryColorMap[String(subcatId)];
  }

  // 3. Si no tiene color la subcategoría, tomar el color del padre por nombre
  if (parentCategory) {
    const parentColor =
      categoryColorMap[parentCategory.toLowerCase()] ||
      categoryColorMap[normalizeCategory(parentCategory)];
    if (parentColor) return parentColor;
  }

  // 4. Probar por id de categoría padre en el mapa
  if (catId && categoryColorMap[String(catId)]) {
    return categoryColorMap[String(catId)];
  }

  // 5. Casos de subcategorías conocidas cuyo padre es Bienestar
  const normCat = normalizeCategory(category);
  if (["emocional", "fisico", "laboral"].includes(normCat)) {
    const bienestarColor =
      categoryColorMap["bienestar"] ||
      categoryColorMap[normalizeCategory("bienestar")];
    if (bienestarColor) return bienestarColor;
  }

  // 6. Fallback a color por defecto del padre si existe
  if (parentCategory) {
    const parentFallback = getCategoryColor(parentCategory);
    if (parentFallback && parentFallback !== "#6366f1") {
      return parentFallback;
    }
  }

  // 7. Fallback final a categoría
  return getCategoryColor(category);
}

export function buildImageUrl(images: any[]): string | null {
  if (!images || images.length === 0) return null;
  const img =
    images.find((i: any) => String(i.image_type || "").toLowerCase() === "render") ||
    images[0];
  if (!img || !img.location || !img.filename) return null;
  const base = process.env.NEXT_PUBLIC_IMAGES || "http://10.51.0.29/files-api/files";
  const key = process.env.NEXT_PUBLIC_FILESERVER_KEY;
  return `${base}/${img.location}/${img.filename}${key ? `?key=${key}` : ""}`;
}
