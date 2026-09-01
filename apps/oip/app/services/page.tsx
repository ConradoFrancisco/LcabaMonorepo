import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/sections/PageHeader";
import Section1 from "@/components/sections/services/Section1";
import Section4 from "@/components/sections/home/Section4";
import Section2 from "@/components/sections/services/Section2";
import Section6 from "@/components/sections/about/Section6";
export default function Home() {
    return (
        <>
            <Layout>
                <PageHeader title="Our Services" current_page="Our Services" />
                <Section1 />
                <Section4 />
                <Section2 />
                <Section6 />
            </Layout>
        </>
    );
}
