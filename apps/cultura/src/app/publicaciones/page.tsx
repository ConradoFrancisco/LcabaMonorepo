import Layout from "@lcaba/ui/astrax/components/layout/Layout";
import NewsSection from "@lcaba/ui/astrax/components/sections/home/NewsSection";
import { getNavMenu } from "@/lib/navMenu";

async function getSocials() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API}/general/pages/3/socials`,
      {
        next: { revalidate: 60 },
      },
    );
    const data = await res.json();
    if (Array.isArray(data)) return data;
    if (data.value && Array.isArray(data.value)) return data.value;
    return [];
  } catch {
    return [];
  }
}

async function getPosts(categoria?: string) {
  try {
    const params = new URLSearchParams({
      table: "cultura_",
      limit: "12",
      status: "true",
      withImages: "true",
    });
    if (categoria) params.append("filtros[categorias][]", categoria);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API}/posts?${params.toString()}`,
      {
        next: { revalidate: 60 },
      },
    );
    const data = await res.json();
    return Array.isArray(data) ? data : data.data || [];
  } catch {
    return [];
  }
}

export default async function PublicacionesPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string }>;
}) {
  const { categoria } = await searchParams;
  const [menuItems, socials, posts] = await Promise.all([
    getNavMenu(),
    getSocials(),
    getPosts(categoria),
  ]);

  return (
    <Layout
      menuItems={menuItems}
      socials={socials}
      breadcrumbTitle="Publicaciones"
    >
      <NewsSection posts={posts} title="Publicaciones" />
    </Layout>
  );
}
