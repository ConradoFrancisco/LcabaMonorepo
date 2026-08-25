import { unstable_cache } from "next/cache";

export type NavMenuItem = {
    id: number;
    title: string;
    url: string | null;
    subItems?: NavMenuItem[];
    [key: string]: unknown;
};

async function fetchNavMenu(pageId: number): Promise<NavMenuItem[]> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API}/nav-menu/tree?pageId=${pageId}`, { next: { revalidate: 60 } });
        const data = await res.json();
        const menuArray = Array.isArray(data) ? data : data.data || [];
        return menuArray.length > 2 ? menuArray.slice(1, -1) : menuArray;
    } catch (e) {
        console.error("Failed to fetch nav menu:", e);
        return [];
    }
}

const getCachedNavMenu = unstable_cache(
    fetchNavMenu,
    ["cultura-nav-menu"],
    { revalidate: 60 }
);

export function getNavMenu(pageId = 3): Promise<NavMenuItem[]> {
    return getCachedNavMenu(pageId);
}

export function findNavMenuItem(items: NavMenuItem[], title: string): NavMenuItem | undefined {
    for (const item of items) {
        if (item.title.trim().toLocaleLowerCase() === title.trim().toLocaleLowerCase()) {
            return item;
        }

        const nestedItem = item.subItems && findNavMenuItem(item.subItems, title);
        if (nestedItem) return nestedItem;
    }

    return undefined;
}

export function findNavMenuItemByUrl(
    items: NavMenuItem[],
    urlPart: string,
    parent?: NavMenuItem
): { item: NavMenuItem; parent?: NavMenuItem } | undefined {
    for (const item of items) {
        if (item.url?.includes(urlPart)) return { item, parent };

        const match = item.subItems && findNavMenuItemByUrl(item.subItems, urlPart, item);
        if (match) return match;
    }

    return undefined;
}

export function slugify(text: string): string {
    return text
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
}
