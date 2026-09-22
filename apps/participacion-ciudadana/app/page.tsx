import Layout from "@/components/layout/Layout";
import { PageServices } from "@lcaba/services";

export default async function Home() {
    const menuItems = await PageServices.getNavMenu(4);
    const pageVw = await PageServices.getPageVw("4");
    const logo = pageVw?.images?.find((img: any) => img.image_type === "logo");

    return (
        <>
            <Layout menuItems={menuItems} pageVw={pageVw} logo={logo}>
            </Layout>
        </>
    );
}
