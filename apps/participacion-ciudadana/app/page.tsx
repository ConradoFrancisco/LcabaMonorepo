import Layout from "@/components/layout/Layout";
import { PageServices, laborServices } from "@lcaba/services";
import AudienciasSection from "@/components/sections/home/AudienciasSection";


export default async function Home() {
    const menuItems = await PageServices.getNavMenu(4);
    const pageVw = await PageServices.getPageVw("4");
    const logo = pageVw?.images?.find((img: any) => img.image_type === "logo");
    const audiencias = await laborServices.getAudiencias();
    console.log(audiencias)
    return (
        <>
            <Layout menuItems={menuItems} pageVw={pageVw} logo={logo}>
                <AudienciasSection audiencias={audiencias?.Data ?? []} />
            </Layout>
        </>
    );
}
