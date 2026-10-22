import { PageServices } from "@lcaba/services";
import AreasBento from "./components/home/AreasBento";
import HeroSlider from "./components/home/HeroSlider";
import NewsSection from "./components/home/NewsSection";
import WeeklyAgenda from "./components/home/WeeklyAgenda";

// Cantidad de novedades que recorren las flechas de la sección (de a 3).
const NEWS_LIMIT = 9;

async function getPostsSlider() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API}/posts?slider=true&table=cultura&limit=2&status=true&withImages=true`,
      {
        next: { revalidate: 60 },
      },
    );
    const data = await res.json();
    const postArray = Array.isArray(data) ? data : data.data || [];
    return postArray;
  } catch (e) {
    console.error("Failed to fetch posts slider:", e);
    return [];
  }
}

export async function getPosts(
  limit = 8,
  offset = 0,
  images: boolean = true,
  filters?: { search?: string; fechaDesde?: string; fechaHasta?: string },
) {
  try {
    const params = new URLSearchParams({
      table: "cultura",
      limit: String(limit),
      offset: String(offset),
      status: "true",
      withImages: String(images),
      front: "true",
    });
    if (filters?.search) params.set("input", filters.search);
    if (filters?.fechaDesde)
      params.set("filtros[fechaDesde]", filters.fechaDesde);
    if (filters?.fechaHasta)
      params.set("filtros[fechaHasta]", filters.fechaHasta);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API}/posts?${params.toString()}`,
      {
        next: { revalidate: 60 },
      },
    );
    const data = await res.json();
    const posts = Array.isArray(data) ? data : data.data || [];
    const total = data.total ?? data.Total ?? posts.length;
    return { posts, total };
  } catch (e) {
    console.error("Failed to fetch posts:", e);
    return { posts: [], total: 0 };
  }
}

// Primer y último día del mes en curso, en formato "dd-mm-aaaa" (el que espera filtros[...] del backend)
function getCurrentMonthRange() {
  const now = new Date();
  const first = new Date(now.getFullYear(), now.getMonth(), 1);
  const last = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  const fmt = (d: Date) =>
    `${String(d.getDate()).padStart(2, "0")}-${String(d.getMonth() + 1).padStart(2, "0")}-${d.getFullYear()}`;
  return { fechaDesde: fmt(first), fechaHasta: fmt(last) };
}

// `upcomingOnly` del backend no filtra por mes y además rompe si se combina con `order`,
// así que acá se pide directo el rango del mes en curso.
async function getAgendaPosts() {
  try {
    const { fechaDesde, fechaHasta } = getCurrentMonthRange();
    const params = new URLSearchParams({
      table: "cultura",
      status: "true",
      front: "true",
      limit: "20",
      "filtros[fechaDesde]": fechaDesde,
      "filtros[fechaHasta]": fechaHasta,
    });
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/posts?${params.toString()}`, {
      next: { revalidate: 60 },
    });
    const data = await res.json();
    const posts = Array.isArray(data) ? data : data.data || [];
    return posts.sort(
      (a: { fecha?: string }, b: { fecha?: string }) =>
        new Date(a.fecha ?? 0).getTime() - new Date(b.fecha ?? 0).getTime(),
    );
  } catch (e) {
    console.error("Failed to fetch agenda posts:", e);
    return [];
  }
}

export default async function Home() {
  const postSlider = await getPostsSlider();
  const { posts } = await getPosts(NEWS_LIMIT, 0, true);
  const agendaPosts = await getAgendaPosts();
  return (
    <>
      <HeroSlider posts={postSlider} />
      <NewsSection posts={posts} title="NOVEDADES" />
      <AreasBento />
      {/* <ServicesBanner /> */}
      <WeeklyAgenda posts={agendaPosts} />
    </>
  );
}
