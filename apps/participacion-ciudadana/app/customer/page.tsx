import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/sections/PageHeader";
import Section1 from "@/components/sections/customer/Section1";
import Section2 from "@/components/sections/customer/Section2";
import Section8 from "@/components/sections/home/Section8";
export default function Home() {
    return (
        <>
            <Layout>
                <PageHeader title="Client Testimonials" current_page="Client Testimonials" />
                <Section1 />
                <Section2 />
                <Section8 />
            </Layout>
        </>
    );
}
