import type { Metadata } from "next";
import AgendaCalendar, { type AgendaPost } from "./AgendaCalendar";
import "./agenda.css";

export const metadata: Metadata = {
  title: "Agenda Cultural | Asuntos Culturales - Legislatura CABA",
  description:
    "Calendario de eventos, exposiciones y actividades culturales de la Dirección General de Asuntos Culturales y Patrimoniales de la Legislatura Porteña.",
};

// ── Placeholder posts (datos de ejemplo hasta integrar la API real) ─────────────
// Estructura espeja la de cultura_posts_vw
const PLACEHOLDER_POSTS: AgendaPost[] = [
  {
    id: 1001,
    title: "Exposición: Fotografía Porteña Contemporánea",
    shortdesc: "Una muestra que recorre la identidad visual de Buenos Aires a través de 40 fotógrafos emergentes. Sala de Exposiciones Manuel Belgrano, subsuelo del Palacio Legislativo.",
    date_ini: `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}-03`,
    date_end: `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}-22`,
    tipo_post: "Exposición",
    url: "cultura_posts/exposicion-fotografia-portena",
  },
  {
    id: 1002,
    title: "Concierto: Tango en el Palacio",
    shortdesc: "Noche de tango con la Orquesta Típica de la Ciudad. Entrada libre y gratuita. Presentar DNI.",
    date_ini: `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}-08`,
    date_end: `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}-08`,
    tipo_post: "Concierto",
    url: "cultura_posts/concierto-tango",
  },
  {
    id: 1003,
    title: "Ciclo de Cine Documental LGBTQ+",
    shortdesc: "Proyección de documentales y debate con directores. 4 funciones durante el mes en el Salón Dalmacio Vélez Sársfield.",
    date_ini: `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}-10`,
    date_end: `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}-10`,
    tipo_post: "Cine",
    url: "cultura_posts/ciclo-cine-documental",
  },
  {
    id: 1004,
    title: "Muestra: Patrimonio Arquitectónico de la CABA",
    shortdesc: "Exhibición permanente sobre la historia del Palacio Legislativo y el patrimonio arquitectónico de la Ciudad.",
    date_ini: `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}-01`,
    date_end: `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}-28`,
    tipo_post: "Patrimonio",
    url: "cultura_posts/patrimonio-arquitectonico",
  },
  {
    id: 1005,
    title: "Taller de Escritura Creativa",
    shortdesc: "Taller intensivo de 3 jornadas con escritores invitados. Inscripción previa obligatoria.",
    date_ini: `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}-14`,
    date_end: `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}-16`,
    tipo_post: "Taller",
    url: "cultura_posts/taller-escritura",
  },
  {
    id: 1006,
    title: "Presentación de Libro: La Ciudad Invisible",
    shortdesc: "Presentación del nuevo libro de Martín Kohan con debate abierto al público. Biblioteca de la Legislatura.",
    date_ini: `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}-19`,
    date_end: `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}-19`,
    tipo_post: "Literatura",
    url: "cultura_posts/presentacion-libro",
  },
  {
    id: 1007,
    title: "Festival de Teatro Independiente",
    shortdesc: "Cuatro días de obras de compañías independientes porteñas. Múltiples salas del Palacio.",
    date_ini: `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}-23`,
    date_end: `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}-26`,
    tipo_post: "Teatro",
    url: "cultura_posts/festival-teatro",
  },
  {
    id: 1008,
    title: "Visita Guiada al Palacio",
    shortdesc: "Visita patrimonial por las salas históricas, el Salón Azul y el hemiciclo. Grupos de hasta 20 personas. Inscripción online.",
    date_ini: `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}-07`,
    date_end: `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}-07`,
    tipo_post: "Visita",
    url: "cultura_posts/visita-guiada",
  },
  {
    id: 1009,
    title: "Jam Session: Jazz Porteño",
    shortdesc: "Noche abierta de jazz con músicos locales. Entrada libre.",
    date_ini: `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}-21`,
    date_end: `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}-21`,
    tipo_post: "Música",
    url: "cultura_posts/jam-jazz",
  },
  {
    id: 1010,
    title: "Encuentro de Artistas Visuales",
    shortdesc: "Charlas, intervenciones en vivo y exposición colectiva de artes visuales emergentes.",
    date_ini: `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}-28`,
    date_end: `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}-30`,
    tipo_post: "Arte",
    url: "cultura_posts/encuentro-artistas",
  },
];

// ── Fetch real de la API de Cultura ───────────────────────────────────────────
async function getAgendaPosts(): Promise<AgendaPost[]> {
  try {
    const params = new URLSearchParams({
      table: "cultura",
      status: "true",
      front: "true",
      onlyDates: "true",
    });
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/posts?${params.toString()}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) {
      console.warn(`[Agenda] API error HTTP ${res.status}, usando placeholders`);
      return PLACEHOLDER_POSTS;
    }
    const data = await res.json();

    const rawPosts = Array.isArray(data) ? data : data.data || [];
    if (rawPosts.length > 0) {
      return rawPosts.map((p: any) => ({
        ...p,
        id: Number(p.id),
        title: p.title || p.titulo || "Sin título",
        date_ini: p.date_ini,
        date_end: p.date_end,
        shortdesc: p.shortdesc,
        description: p.description,
        tipo_post: p.tipo_post || p.tipo || "Actividad",
        url: p.url,
      }));
    }
    return PLACEHOLDER_POSTS;
  } catch (err) {
    console.error("[Agenda] Error fetching agenda posts:", err);
    return PLACEHOLDER_POSTS;
  }
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function AgendaPage() {
  const posts = await getAgendaPosts();
  return <AgendaCalendar posts={posts} />;
}
