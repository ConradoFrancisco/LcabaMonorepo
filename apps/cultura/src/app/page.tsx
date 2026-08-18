import Layout from "@lcaba/ui/astrax-elearning/components/layout/Layout";
import Section1 from "@lcaba/ui/astrax-elearning/components/sections/home1/Section1";
import Section2 from "@lcaba/ui/astrax-elearning/components/sections/home1/Section2";
import Section3 from "@lcaba/ui/astrax-elearning/components/sections/home1/Section3";
import Section4 from "@lcaba/ui/astrax-elearning/components/sections/home1/Section4";
import Section5 from "@lcaba/ui/astrax-elearning/components/sections/home1/Section5";
import Section6 from "@lcaba/ui/astrax-elearning/components/sections/home1/Section6";
import Section7 from "@lcaba/ui/astrax-elearning/components/sections/home1/Section7";
import Section8 from "@lcaba/ui/astrax-elearning/components/sections/home1/Section8";
import Section9 from "@lcaba/ui/astrax-elearning/components/sections/home1/Section9";

async function getNavMenu() {
    try {
        const res = await fetch("http://localhost:3000/nav-menu/tree?pageId=3", { next: { revalidate: 60 } });
        const data = await res.json();
        const menuArray = Array.isArray(data) ? data : (data.data || []);
        return menuArray.length > 2 ? menuArray.slice(1, -1) : menuArray;
    } catch (e) {
        console.error("Failed to fetch nav menu:", e);
        return [];
    }
}
export default async function Home() {
    const menuItems = await getNavMenu();
    return (
        <>
            <Layout menuItems={menuItems}>
                <Section1 />
                <Section2 />
                <Section3 />
                <Section4 />
                <Section5 />
                <Section6 />
                <Section7 />
                <Section8 />
                <Section9 />
            </Layout>
        </>
    );
}
