import Layout from "@/components/layout/Layout";
import Section1 from "@/components/sections/about/Section1";
import Section2 from "@/components/sections/about/Section2";
import Section3 from "@/components/sections/about/Section3";
import Section4 from "@/components/sections/about/Section4";
import Section5 from "@/components/sections/about/Section5";
import Section6 from "@/components/sections/home/Section6";
import Section7 from "@/components/sections/home/Section7";
import Section8 from "@/components/sections/home/Section8";
import PageHeader from "@/components/sections/PageHeader";
export default function Home() {
    return (
        <>
            <Layout>
                <PageHeader title="About Us" current_page="About Us" />
                <Section1 />
                <Section2 />
                <Section3 />
                <Section6 background="bg-secondary-2" />
                <Section4 />
                <Section5 />
                <Section7 />
                <Section8 />
            </Layout>
        </>
    );
}
