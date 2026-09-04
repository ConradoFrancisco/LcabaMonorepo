import { unstable_cache } from "next/cache";

// ── Types ──────────────────────────────────────────────────────────────────────

export type NavMenuItem = {
    id: number;
    title: string;
    url: string | null;
    subItems?: NavMenuItem[];
    [key: string]: unknown;
};

// ── Fetch ──────────────────────────────────────────────────────────────────────

async function fetchNavMenu(pageId: number): Promise<NavMenuItem[]> {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API}/nav-menu/tree?pageId=${pageId}`,
            { next: { revalidate: 60 } } as any
        );
        const data = await res.json();
        const menuArray = Array.isArray(data) ? data : data.data || [];
        return menuArray.length > 2 ? menuArray.slice(1, -1) : menuArray;
    } catch (e) {
        console.error("Failed to fetch nav menu:", e);
        return [];
    }
}

// ── Cache ──────────────────────────────────────────────────────────────────────

const getCachedNavMenu = unstable_cache(
    fetchNavMenu,
    ["lcaba-nav-menu"],
    { revalidate: 60 }
);

// ── Public API ─────────────────────────────────────────────────────────────────

class PageServices {

    async getPageVw(id: string): Promise<any> {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API}/general/pages/${id}`,
                { next: { revalidate: 60 } } as any
            );
            return res.json();
        } catch (e) {
            console.error("Failed to fetch page vw:", e);
            return null;
        }
    }

    async getPosts(table: string, destacado: boolean = false, offset?: number, limit?: number, withImages?: boolean, front?: boolean, categoria?: number | string | null, status?: string) {
        try {
            // Build query params
            const params = new URLSearchParams();
            params.set('table', table);
            if (limit !== undefined) params.set('limit', String(limit));
            if (offset !== undefined) params.set('offset', String(offset));
            if (withImages) params.set('withImages', 'true');
            if (front) params.set('front', 'true');
            if (destacado) params.set('filtros[destacado]', '1');
            if (categoria) params.set('categoria', String(categoria));
            if (status) params.set('status', status);

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API}/posts?${params.toString()}`,
                { next: { revalidate: 60 }, method: 'GET' } as any
            );
            if (!res.ok) throw new Error(`HTTP error ${res.status}`);
            
            const data = await res.json();
            const posts = Array.isArray(data) ? data : data.data || [];
            const total = data.total ?? posts.length;
            
            return { data: posts, total };
        } catch (e) {
            console.error("Failed to fetch posts:", e);
            return { data: [], total: 0 };
        }
    }
    /**
     * Obtiene los datos de una sección/item de menú a partir de su URL relativa.
     * @param slug   - Segmento(s) de URL, ej. "normativa/marco-legal"
     * @param pageId - ID de la página (ej. 3 = Cultura, 7 = OIP)
     */
    async getSectionByUrl(slug: string, pageId: number): Promise<any> {
        try {
            const url = `/${slug}`;
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API}/nav-menu/by-url?url=${encodeURIComponent(url)}&pageId=${pageId}`,
                { next: { revalidate: 60 } } as any
            );
            if (!res.ok) return null;
            return res.json();
        } catch {
            return null;
        }
    }

    /**
     * Obtiene un post por ID junto con todas sus relaciones (imágenes, archivos, etc.)
     * @param id    - ID del post
     * @param table - Prefijo de tabla (ej. "evidencias_")
     */
    async getPostById(id: number, table: string): Promise<any> {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API}/posts/post/${id}?table=${encodeURIComponent(table)}`,
                { next: { revalidate: 60 } } as any
            );
            if (!res.ok) return null;
            return res.json();
        } catch (e) {
            console.error('Failed to fetch post by id:', e);
            return null;
        }
    }

    /**
     * Obtiene el menú de navegación de una página dada.
     * @param pageId - ID de la página en menu_vw (default: 3 = Cultura)
     */
    getNavMenu(pageId = 3): Promise<NavMenuItem[]> {
        return getCachedNavMenu(pageId);
    }

    /**
     * Busca un item del menú por título (case-insensitive).
     */
    findNavMenuItem(items: NavMenuItem[], title: string): NavMenuItem | undefined {
        for (const item of items) {
            if (item.title.trim().toLocaleLowerCase() === title.trim().toLocaleLowerCase()) {
                return item;
            }
            const nested = item.subItems && this.findNavMenuItem(item.subItems, title);
            if (nested) return nested;
        }
        return undefined;
    }

    /**
     * Busca un item del menú cuya URL contenga `urlPart`.
     */
    findNavMenuItemByUrl(
        items: NavMenuItem[],
        urlPart: string,
        parent?: NavMenuItem
    ): { item: NavMenuItem; parent?: NavMenuItem } | undefined {
        for (const item of items) {
            if (item.url?.includes(urlPart)) return { item, parent };
            const match = item.subItems && this.findNavMenuItemByUrl(item.subItems, urlPart, item);
            if (match) return match;
        }
        return undefined;
    }

    /**
     * Convierte un texto a slug URL-friendly (sin tildes ni caracteres especiales).
     */
    slugify(text: string): string {
        return text
            .normalize("NFD")
            .replace(/\p{Diacritic}/gu, "")
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");
    }
}

export default new PageServices();
