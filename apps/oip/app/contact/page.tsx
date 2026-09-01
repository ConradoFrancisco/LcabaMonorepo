import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/sections/PageHeader";
import Section1 from "@/components/sections/contact/Section1";
import Section6 from "@/components/sections/about/Section6";
export default function Home() {
    return (
        <>
            <Layout>
                <PageHeader title="Contact Us" current_page="Contact Us" />
                <Section1 />
                <Section6 />
            </Layout>
        </>
    );
}
