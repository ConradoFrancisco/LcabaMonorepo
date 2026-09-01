import Layout from "@/components/layout/Layout";
import Section1 from "@/components/sections/our-blog/Section1";
import Section2 from "@/components/sections/our-blog/Section2";
import Section6 from "@/components/sections/about/Section6";
import PageHeader from "@/components/sections/PageHeader";
import Pagination from "@/components/elements/Pagination";
export default function Home() {
    return (
        <>
            <Layout>
                <PageHeader title="Our Inside" current_page="Blog" />
                <Section1 />
                <Section2 />
                <Pagination />
                <Section6 />
            </Layout>
        </>
    );
}
