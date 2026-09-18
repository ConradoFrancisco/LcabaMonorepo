import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/sections/PageHeader";
import Section1 from "@/components/sections/services/Section1";
import Section2 from "@/components/sections/services/Section2";
import Section3 from "@/components/sections/services/Section3";
import Section7 from "@/components/sections/home/Section7";
import Section8 from "@/components/sections/home/Section8";
export default function Home() {
    return (
        <>
            <Layout>
                <PageHeader title="Services" current_page="Services" />
                <Section1 />
                <Section2 />
                <Section3 />
                <Section7 />
                <Section8 />
            </Layout>
        </>
    );
}
