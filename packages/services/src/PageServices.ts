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
            { next: { revalidate: 60 } }
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
                { next: { revalidate: 60 } }
            );
            const data = await res.json();
            console.log(data);
            return data;
        } catch (e) {
            console.error("Failed to fetch nav menu:", e);
            return [];
        }
    }

    async getPosts(table: string, destacado: boolean = false, offset?: number, limit?: number, withImages?: boolean) {
        try {

            // Build query params
            const params = new URLSearchParams();
            params.set('table', table);
            if (limit !== undefined) params.set('limit', String(limit));
            if (offset !== undefined) params.set('offset', String(offset));
            if (withImages) params.set('withImages', 'true');
            if (destacado) params.set('filtros[destacado]', '1');

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API}/posts?${params.toString()}`,
                { next: { revalidate: 60 }, method: 'GET' }
            );
            if (!res.ok) throw new Error(`HTTP error ${res.status}`);
            const data = await res.json();
            return data;
        } catch (e) {
            console.error("Failed to fetch posts:", e);
            return { data: [], total: 0 };
        }
    };

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
