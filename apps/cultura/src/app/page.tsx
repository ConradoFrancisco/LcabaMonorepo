import Layout from "@lcaba/ui/astrax/components/layout/Layout";
import HeroSlider from "@lcaba/ui/astrax/components/sections/home/HeroSlider";
import MenuButtons from "@lcaba/ui/astrax/components/sections/home/MenuButtons";
import NewsSection from "@lcaba/ui/astrax/components/sections/home/NewsSection";
import { PageServices } from "@lcaba/services";

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

export async function getPosts(limit = 8, offset = 0, images: boolean = true) {
    try {
        const params = new URLSearchParams({
            table: "cultura_",
            limit: String(limit),
            offset: String(offset),
            status: "true",
            withImages: String(images),
        });
        const res = await fetch(`${process.env.NEXT_PUBLIC_API}/posts?${params.toString()}`, {
            next: { revalidate: 60 }
        });
        const data = await res.json();
        const posts = Array.isArray(data) ? data : (data.data || []);
        const total = data.total ?? data.Total ?? posts.length;
        return { posts, total };
    } catch (e) {
        console.error("Failed to fetch posts:", e);
        return { posts: [], total: 0 };
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
    const menuItems = await PageServices.getNavMenu();
    const socials = await getSocials();
    const postSlider = await getPostsSlider();
    const { posts } = await getPosts(8, 0, true);
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
