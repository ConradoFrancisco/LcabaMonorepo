import Layout from "@/components/layout/Layout";
import RegisterComponent from "@/components/RegisterComponent";
import { PageServices } from "@lcaba/services";

export const metadata = {
    title: "Registrate | Participación Ciudadana",
    description: "Creá tu cuenta para participar activamente en las iniciativas ciudadanas de la Legislatura de Buenos Aires.",
};

export default async function RegisterPage() {
    const menuItems = await PageServices.getNavMenu(4);
    const pageVw = await PageServices.getPageVw("4");
    const logo = pageVw?.images?.find((img: any) => img.image_type === "logo");


    return (
        <Layout menuItems={menuItems} pageVw={pageVw} logo={logo}>
            <RegisterComponent menuItems={menuItems} logo={logo} />
        </Layout>
    );
}

