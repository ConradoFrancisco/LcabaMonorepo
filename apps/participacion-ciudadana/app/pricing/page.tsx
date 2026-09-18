import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/sections/PageHeader";
import Section1 from "@/components/sections/pricing/Section1";
import Section2 from "@/components/sections/pricing/Section2";
import Section8 from "@/components/sections/home/Section8";
export default function Home() {
    return (
        <>
            <Layout>
                <PageHeader title="Pricing Plan" current_page="Pricing Plan" />
                <Section1 />
                <Section2 />
                <Section8 />
            </Layout>
        </>
    );
}
