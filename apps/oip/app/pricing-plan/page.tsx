import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/sections/PageHeader";
import Section1 from "@/components/sections/pricing-plan/Section1";
import Section2 from "@/components/sections/pricing-plan/Section2";
import Section6 from "@/components/sections/about/Section6";
import Section5 from "@/components/sections/about/Section5";
export default function Home() {
    return (
        <>
            <Layout>
                <PageHeader title="Pricing Plans" current_page="Pricing Plans" />
                <Section1 />
                <Section2 />
                <Section5 />
                <Section6 />
            </Layout>
        </>
    );
}
