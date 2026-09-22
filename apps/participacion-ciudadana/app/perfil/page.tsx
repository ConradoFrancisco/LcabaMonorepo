import Layout from "@/components/layout/Layout";
import PerfilComponent from "@/components/PerfilComponent";
import { PageServices } from "@lcaba/services";

export const metadata = {
    title: "Mi Perfil | Participación Ciudadana",
    description: "Gestión de perfil y datos personales de Participación Ciudadana.",
};

export default async function PerfilPage() {
    const pageId = 4;
    const [menuItems, pageVw] = await Promise.all([
        PageServices.getNavMenu(pageId),
        PageServices.getPageVw(String(pageId)),
    ]);
    const logo = pageVw?.images?.find((img: any) => img.image_type === "logo");

    return (
        <Layout menuItems={menuItems} pageVw={pageVw} logo={logo}>
            <PerfilComponent menuItems={menuItems} pageVw={pageVw} logo={logo} />
        </Layout>
    );
}
