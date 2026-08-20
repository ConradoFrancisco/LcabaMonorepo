import Layout from "@lcaba/ui/astrax/components/layout/Layout";
import HeroSlider from "@lcaba/ui/astrax/components/sections/home/HeroSlider";
import MenuButtons from "@lcaba/ui/astrax/components/sections/home/MenuButtons";
import NewsSection from "@lcaba/ui/astrax/components/sections/home/NewsSection";
import { getNavMenu } from "@/lib/navMenu";

async function getPostsSlider() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API}/posts?slider=true&table=cultura_&limit=2&status=true&withImages=true`, {
            next: { revalidate: 60 }
        });
        const data = await res.json();
        const postArray = Array.isArray(data) ? data : (data.data || []);
        return postArray;
    } catch (e) {
        console.error("Failed to fetch posts slider:", e);
        return [];
    }
}

async function getPosts() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API}/posts?table=cultura_&limit=8&status=true&withImages=true`, {
            next: { revalidate: 60 }
        });
        const data = await res.json();
        const postArray = Array.isArray(data) ? data : (data.data || []);
        return postArray;
    } catch (e) {
        console.error("Failed to fetch posts:", e);
        return [];
    }
}

async function getSocials() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API}/general/pages/3/socials`, { next: { revalidate: 60 } });
        const data = await res.json();
        // endpoint returns { value: [...], Count: N }
        if (Array.isArray(data)) return data;
        if (data.value && Array.isArray(data.value)) return data.value;
        return [];
    } catch (e) {
        console.error("Failed to fetch socials:", e);
        return [];
    }
}

export default async function Home() {
    const menuItems = await getNavMenu();
    const socials = await getSocials();
    const postSlider = await getPostsSlider();
    const posts = await getPosts();
    return (
        <>
            <Layout menuItems={menuItems} socials={socials}>
                <HeroSlider posts={postSlider} />
                <MenuButtons />
                <NewsSection posts={posts} title="Últimas Noticias" />
            </Layout>
        </>
    );
}
