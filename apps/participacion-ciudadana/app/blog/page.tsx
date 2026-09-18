import Pagination from "@/components/elements/Pagination";
import Layout from "@/components/layout/Layout";
import Section1 from "@/components/sections/blog/Section1";
import Section7 from "@/components/sections/home/Section7";
import Section8 from "@/components/sections/home/Section8";
import PageHeader from "@/components/sections/PageHeader";
export default function Home() {
    return (
        <>
            <Layout>
                <PageHeader title="Blog" current_page="Blog" />
                <Section1 />
                <Pagination />
                <Section7 />
                <Section8 />
            </Layout>
        </>
    );
}
