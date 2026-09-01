import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/sections/PageHeader";
import Section1 from "@/components/sections/projects/Section1";
import Section6 from "@/components/sections/about/Section6";
import Section8 from "@/components/sections/home/Section8";
export default function Home() {
    return (
        <>
            <Layout>
                <PageHeader title="Completed Projects" current_page="Projects" />
                <Section1 />
                <Section8 />
                <Section6 />
            </Layout>
        </>
    );
}
