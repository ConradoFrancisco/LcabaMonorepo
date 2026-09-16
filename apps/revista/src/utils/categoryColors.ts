// Mapa de colores por defecto para categorías conocidas
const CATEGORY_COLORS: Record<string, string> = {
  "historias de vida": "#7c3aed",      // violeta / morado
  "nuestros logros": "#84cc16",        // verde claro
  "en casa": "#2563eb",                // azul
  "iniciativas legislativas": "#84cc16",// verde oliva / lima
  "emocional": "#06b6d4",              // celeste / turquesa
  "fisico": "#0ea5e9",                 // celeste / azul
  "físico": "#0ea5e9",                 // celeste / azul
  "laboral": "#14b8a6",                // teal / turquesa
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
  const subcat = post.subcategoria || post.sub_categoria || post.subCategory || post.seteos?.subcategoria;
  if (subcat && String(subcat).trim()) {
    return String(subcat).trim();
  }
  const cat = post.categoria || post.category || post.seteos?.categoria || post.seteos?.cat_name || "";
  return String(cat).trim();
}

export function getCategoryColor(categoryName?: string, fallbackFromMenu?: string): string {
  if (fallbackFromMenu) return fallbackFromMenu;
  if (!categoryName) return "#6366f1";
  const normalized = categoryName.trim().toLowerCase();
  return CATEGORY_COLORS[normalized] || "#6366f1";
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
