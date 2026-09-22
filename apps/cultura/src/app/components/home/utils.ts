export interface HomePost {
  id: number;
  title?: string;
  titulo?: string;
  shortdesc?: string;
  copete?: string;
  description?: string;
  content?: string;
  texto?: string;
  date_ins?: string;
  fecha?: string;
  categoria?: string;
  cat_name?: string;
  category?: string;
  images?: { location: string; filename: string; image_type?: string }[];
}

export interface NavItem {
  id: number;
  title: string;
  url: string | null;
  subItems?: NavItem[];
  show_top?: unknown;
  show_bottom?: unknown;
}

export interface Social {
  id: number;
  url: string;
  icon: string;
}

export function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Mismas reglas que el Header compartido: el slug sale del título; los hijos cuelgan del padre.
export function formatNavUrl(item: NavItem, parent?: NavItem): string {
  if (!item.url || item.url === "#") return "#";
  if (item.url.startsWith("http")) return item.url;
  const slug = slugify(item.title);
  return parent ? `/${slugify(parent.title)}/${slug}` : `/${slug}`;
}

export interface HeaderNavItem {
  id: number | string;
  title: string;
  href: string;
  subItems?: HeaderNavItem[];
}

// El CMS marca en cada ítem dónde se muestra (`show_top` = header, `show_bottom` = footer).
// Los flags llegan como Buffer de MySQL ({ type: "Buffer", data: [1] }), a veces como número o booleano.
function isFlagOn(value: unknown): boolean {
  if (value === undefined || value === null) return true; // sin flag: se muestra
  if (typeof value === "object" && "data" in value) {
    return Number((value as { data: number[] }).data?.[0]) === 1;
  }
  return Number(value) === 1 || value === true;
}

export const showInHeader = (item: NavItem) => isFlagOn(item.show_top);
export const showInFooter = (item: NavItem) => isFlagOn(item.show_bottom);

// Menú del header: solo los ítems marcados `show_top`, con los títulos y submenús tal como vienen de la API.
export function buildHeaderNav(menuItems: NavItem[]): HeaderNavItem[] {
  return menuItems.filter(showInHeader).map((item) => ({
    id: item.id,
    title: item.title.trim(),
    href: formatNavUrl(item),
    subItems: (item.subItems ?? []).map((sub) => ({
      id: sub.id,
      title: sub.title.trim(),
      href: formatNavUrl(sub, item),
    })),
  }));
}

export function isExternal(href: string): boolean {
  return href.startsWith("http");
}

const imageUrl = (img: { location: string; filename: string }) => {
  const base = process.env.NEXT_PUBLIC_IMAGES;
  const key = process.env.NEXT_PUBLIC_FILESERVER_KEY;
  return `${base}/${img.location}/${img.filename}${key ? `?key=${key}` : ""}`;
};

// URLs candidatas de una publicación, en orden: primero los tipos preferidos y después el resto.
// "render" es la pieza gráfica de la publicación (suele traer texto incrustado);
// "slider" es la foto pensada para fondos anchos como el hero.
export function buildImageUrls(
  images: HomePost["images"],
  preferredTypes: string[] = ["render"],
): string[] {
  if (!images) return [];
  const typeOf = (i: { image_type?: string }) => String(i.image_type || "").toLowerCase();
  const rank = (i: { image_type?: string }) => {
    const idx = preferredTypes.indexOf(typeOf(i));
    return idx === -1 ? preferredTypes.length : idx;
  };
  return images
    .filter((i) => i.location && i.filename)
    .sort((a, b) => rank(a) - rank(b)) // sort estable: conserva el orden original dentro de cada grupo
    .map(imageUrl);
}

export function buildImageUrl(
  images: HomePost["images"],
  preferredTypes?: string[],
): string | null {
  return buildImageUrls(images, preferredTypes)[0] ?? null;
}

const HTML_ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  aacute: "á",
  eacute: "é",
  iacute: "í",
  oacute: "ó",
  uacute: "ú",
  Aacute: "Á",
  Eacute: "É",
  Iacute: "Í",
  Oacute: "Ó",
  Uacute: "Ú",
  ntilde: "ñ",
  Ntilde: "Ñ",
  uuml: "ü",
  Uuml: "Ü",
  laquo: "«",
  raquo: "»",
  hellip: "…",
};

function decodeHtmlEntities(text: string): string {
  return text.replace(/&(#x?[0-9a-fA-F]+|[a-zA-Z]+);/g, (match, entity) => {
    if (entity[0] === "#") {
      const code =
        entity[1] === "x" || entity[1] === "X"
          ? parseInt(entity.slice(2), 16)
          : parseInt(entity.slice(1), 10);
      return Number.isNaN(code) ? match : String.fromCharCode(code);
    }
    return HTML_ENTITIES[entity] ?? match;
  });
}

export function excerpt(html: string, maxLen = 170): string {
  const text = decodeHtmlEntities(html.replace(/<[^>]*>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
  if (!text) return "";
  return text.length > maxLen ? `${text.slice(0, maxLen).trim()}…` : text;
}

export function postTitle(post: HomePost): string {
  return post.title || post.titulo || "";
}

export function postExcerpt(post: HomePost, maxLen?: number): string {
  return excerpt(
    post.shortdesc ||
      post.copete ||
      post.description ||
      post.content ||
      post.texto ||
      "",
    maxLen,
  );
}

export function postCategory(post: HomePost): string {
  return post.categoria || post.cat_name || post.category || "";
}

// Acepta "DD/MM/AAAA" o cualquier fecha que entienda Date (ISO, "AAAA-MM-DD hh:mm:ss").
function parseDate(value?: string): Date | null {
  if (!value) return null;
  const text = value.trim();
  const dmy = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(text);
  const date = dmy
    ? new Date(Number(dmy[3]), Number(dmy[2]) - 1, Number(dmy[1]))
    : new Date(text);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function postDate(post: HomePost): { iso: string; label: string } | null {
  const d = parseDate(post.fecha || post.date_ins);
  if (!d) return null;
  return {
    iso: d.toISOString(),
    label: d.toLocaleDateString("es-AR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
  };
}

export const postHref = (post: HomePost) => `/publicaciones/${post.id}`;
