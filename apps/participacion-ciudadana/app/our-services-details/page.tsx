import Layout from "@/components/layout/Layout";
import Section1 from "@/components/sections/our-services-details/Section1";
import Section8 from "@/components/sections/home/Section8";
import PageHeader from "@/components/sections/PageHeader";
import Section6 from "@/components/sections/home/Section6";
import Section4 from "@/components/sections/about/Section4";
export default function Home() {
    return (
        <>
            <Layout>
                <PageHeader title="Customized Desks" current_page="Customized Desks" />
                <Section1 />
                <Section6 background="bg-secondary-2" />
                <Section4 />
                <Section8 />
            </Layout>
        </>
    );
}
