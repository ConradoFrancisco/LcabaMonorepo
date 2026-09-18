import Layout from "@/components/layout/Layout";
import Section1 from "@/components/sections/blog-details/Section1";
import Section2 from "@/components/sections/blog-details/Section2";
import Section8 from "@/components/sections/home/Section8";
export default function Home() {
    return (
        <>
            <Layout>
                <Section1 />
                <Section2 />
                <Section8 />
            </Layout>
        </>
    );
}
