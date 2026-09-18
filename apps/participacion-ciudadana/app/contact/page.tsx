import Layout from "@/components/layout/Layout";
import Section1 from "@/components/sections/contact/Section1";
import Section8 from "@/components/sections/home/Section8";
import PageHeader from "@/components/sections/PageHeader";
export default function Home() {
    return (
        <>
            <Layout>
                <PageHeader title="Contact Us" current_page="Contact Us" />
                <Section8 />
                <Section1 />
            </Layout>
        </>
    );
}
