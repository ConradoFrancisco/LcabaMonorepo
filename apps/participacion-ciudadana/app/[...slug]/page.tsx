import { notFound } from "next/navigation";
import Layout from "@/components/layout/Layout";
import SeccionMenuComponent from "@/components/SeccionMenuComponent";
import { PageServices } from "@lcaba/services";

const PAGE_ID = 4; // ID de Participación Ciudadana

interface SeccionPageProps {
    params: { slug: string[] };
}

/**
 * Genera metadata dinámica (título SEO) a partir del ítem de menú encontrado.
 */
export async function generateMetadata({ params }: SeccionPageProps) {
    const slugStr = params.slug.join("/");
    const seccion = await PageServices.getSectionByUrl(slugStr, PAGE_ID);

    const titulo = seccion?.title ?? slugStr.replace(/-/g, " ");
    return {
        title: `${titulo} | Participación Ciudadana`,
        description: seccion?.description ?? `Información sobre ${titulo} en Participación Ciudadana.`,
    };
}

export default async function SeccionMenuPage({ params }: SeccionPageProps) {
    const { slug } = params;
    const slugStr = slug.join("/");

    // Obtener layout común
    const [menuItems, pageVw] = await Promise.all([
        PageServices.getNavMenu(PAGE_ID),
        PageServices.getPageVw(String(PAGE_ID)),
    ]);
    const logo = pageVw?.images?.find((img: any) => img.image_type === "logo");

    // Buscar el ítem de menú que corresponde al slug
    // Primero intenta por URL directa via API, luego busca en el árbol local
    let seccion = await PageServices.getSectionByUrl(slugStr, PAGE_ID);

    if (!seccion) {
        // Fallback: buscar en el árbol de menú cacheado por título
        const slugified = PageServices.slugify.bind(PageServices);
        const findInTree = (items: any[]): any => {
            for (const item of items) {
                if (slug.length === 1 && PageServices.slugify(item.title) === slug[0]) return item;
                if (slug.length === 2) {
                    const parentMatch = PageServices.slugify(item.title) === slug[0];
                    if (parentMatch && item.subItems) {
                        const sub = item.subItems.find((s: any) => PageServices.slugify(s.title) === slug[1]);
                        if (sub) return sub;
                    }
                }
                if (item.subItems) {
                    const found = findInTree(item.subItems);
                    if (found) return found;
                }
            }
            return null;
        };
        seccion = findInTree(menuItems);
    }

    // Si no encontramos nada, 404
    if (!seccion) {
        notFound();
    }

    return (
        <Layout menuItems={menuItems} pageVw={pageVw} logo={logo}>
            <SeccionMenuComponent seccion={seccion} slug={slug} />
        </Layout>
    );
}
