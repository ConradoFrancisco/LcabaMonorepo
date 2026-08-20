export type NavMenuItem = {
    id: number;
    title: string;
    url: string | null;
    subItems?: NavMenuItem[];
    [key: string]: unknown;
};

export async function getNavMenu(pageId = 3): Promise<NavMenuItem[]> {
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

export function slugify(text: string): string {
    return text
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
}
