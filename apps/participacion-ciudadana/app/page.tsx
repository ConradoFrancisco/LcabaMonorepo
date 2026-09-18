import Layout from "@/components/layout/Layout";
import Section1 from "@/components/sections/home/Section1";
import Section2 from "@/components/sections/home/Section2";
import Section3 from "@/components/sections/home/Section3";
import Section4 from "@/components/sections/home/Section4";
import Section5 from "@/components/sections/home/Section5";
import Section6 from "@/components/sections/home/Section6";
import Section7 from "@/components/sections/home/Section7";
import Section8 from "@/components/sections/home/Section8";
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
