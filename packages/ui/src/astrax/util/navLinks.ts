export function slugify(text: string): string {
    return text
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
}

export function formatNavUrl(item: any, parent?: any): string {
    if (!item.url || item.url === "#") return "#";
    if (item.url.startsWith("http")) return item.url;
    const slug = slugify(item.title);
    return parent ? `/${slugify(parent.title)}/${slug}` : `/${slug}`;
}
