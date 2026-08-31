import Layout from "@lcaba/ui/astrax/components/layout/Layout";
import { getNavMenu } from "@/lib/navMenu";
import Link from "next/link";
import { getPosts } from "../page";

const LIMIT = 9; // 3 columnas × 3 filas

// ── helpers ───────────────────────────────────────────────────────────────────

function buildImageUrl(img: any): string | null {
  if (!img?.location || !img?.filename) return null;
  const base = process.env.NEXT_PUBLIC_IMAGES;
  const key = process.env.NEXT_PUBLIC_FILESERVER_KEY;
  return `${base}/${img.location}/${img.filename}${key ? `?key=${key}` : ""}`;
}

function formatDate(dateStr?: string): string {
  if (!dateStr) return "";
  try {
    return new Date(dateStr).toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

// ── data fetchers ─────────────────────────────────────────────────────────────



async function getSocials() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API}/general/pages/3/socials`,
      { next: { revalidate: 60 } }
    );
    const data = await res.json();
    if (Array.isArray(data)) return data;
    if (data.value && Array.isArray(data.value)) return data.value;
    return [];
  } catch {
    return [];
  }
}

// ── sub-components ────────────────────────────────────────────────────────────

function PostCard({ post }: { post: any }) {
  const { textos = {}, images = [], seteos = {} } = post;
  const titulo = textos?.titulo || "Sin título";
  const shortdesc = textos?.shortdesc || textos?.subtitle || "";
  const date = formatDate(seteos?.date_ins || seteos?.date_article || seteos?.date);
  const category = seteos?.cat_name || seteos?.categoria || "";
  const coverImg = buildImageUrl(images?.[0]);
  const postId = seteos?.id || post.id;

  console.log(post.titulo)


  return (
    <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
      <style>{`
        .post-card-hover:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0,0,0,.12) !important;
        }
      `}</style>
      <div
        className="card h-100 border-0 shadow-sm post-card-hover"
        style={{ borderRadius: "12px", overflow: "hidden", transition: "transform .2s, box-shadow .2s" }}
      >
        {/* Imagen */}
        <div style={{ height: "200px", overflow: "hidden", backgroundColor: "#f0f0f0" }}>
          {coverImg ? (
            <img
              src={coverImg}
              alt={titulo}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <div
              className="d-flex align-items-center justify-content-center h-100"
              style={{ backgroundColor: "#c9003d10" }}
            >
              <i className="bi bi-image text-muted" style={{ fontSize: "2.5rem" }} />
            </div>
          )}
        </div>

        {/* Contenido */}
        <div className="card-body d-flex flex-column p-4">
          {/* Categoría + fecha */}
          <div className="d-flex justify-content-between align-items-center mb-2">
            {category && (
              <span
                className="badge text-white"
                style={{ backgroundColor: "#c9003d", fontSize: ".7rem", borderRadius: "20px", padding: "4px 10px" }}
              >
                {category}
              </span>
            )}
            {date && (
              <small className="text-muted" style={{ fontSize: ".75rem" }}>
                <i className="bi bi-calendar3 me-1" />
                {date}
              </small>
            )}
          </div>

          {/* Título */}
          <h5
            className="card-title fw-bold mb-2"
            style={{ fontSize: "1rem", lineHeight: 1.4, color: "#1a1a2e" }}
          >
            {post.titulo}
          </h5>

          {/* Bajada */}
          {shortdesc && (
            <p
              className="card-text text-muted mb-3"
              style={{ fontSize: ".85rem", lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}
              dangerouslySetInnerHTML={{ __html: shortdesc }}
            />
          )}

          {/* Botón */}
          <div className="mt-auto">
            <Link
              href={`/publicaciones/${postId}`}
              className="btn btn-sm w-100 text-white fw-semibold"
              style={{ backgroundColor: "#c9003d", borderRadius: "30px", padding: "8px 20px", fontSize: ".85rem" }}
            >
              Leer más →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function Paginator({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  if (totalPages <= 1) return null;

  const pages: (number | "...")[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (currentPage > 3) pages.push("...");
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pages.push(i);
    }
    if (currentPage < totalPages - 2) pages.push("...");
    pages.push(totalPages);
  }

  const btnBase: React.CSSProperties = {
    borderRadius: "8px",
    padding: "6px 14px",
    fontSize: ".875rem",
    fontWeight: 500,
    border: "1px solid #dee2e6",
    cursor: "pointer",
    lineHeight: 1.5,
    transition: "all .15s",
    textDecoration: "none",
  };

  return (
    <nav aria-label="Paginación de publicaciones" className="mt-5">
      <ul className="pagination justify-content-center flex-wrap gap-1 list-unstyled d-flex">
        {/* Anterior */}
        {currentPage > 1 && (
          <li>
            <Link
              href={`?page=${currentPage - 1}`}
              style={{ ...btnBase, color: "primary", backgroundColor: "#fff" }}
            >
              ‹ Anterior
            </Link>
          </li>
        )}

        {/* Páginas */}
        {pages.map((p, idx) =>
          p === "..." ? (
            <li key={`ellipsis-${idx}`}>
              <span style={{ ...btnBase, cursor: "default", border: "none", color: "#6c757d" }}>…</span>
            </li>
          ) : (
            <li key={p}>
              <Link
                href={`?page=${p}`}
                style={{
                  ...btnBase,
                  backgroundColor: p === currentPage ? "primary" : "#fff",
                  color: p === currentPage ? "#fff" : "#495057",
                  borderColor: p === currentPage ? "primary" : "#dee2e6",
                }}
              >
                {p}
              </Link>
            </li>
          )
        )}

        {/* Siguiente */}
        {currentPage < totalPages && (
          <li>
            <Link
              href={`?page=${currentPage + 1}`}
              style={{ ...btnBase, color: "primary", backgroundColor: "#fff" }}
            >
              Siguiente ›
            </Link>
          </li>
        )}
      </ul>

      <p className="text-center text-muted mt-2" style={{ fontSize: ".8rem" }}>
        Página {currentPage} de {totalPages}
      </p>
    </nav>
  );
}

// ── page ──────────────────────────────────────────────────────────────────────

export default async function PublicacionesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; categoria?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const currentPage = Math.max(1, parseInt(pageParam || "1", 10));

  const [menuItems, socials, { posts, total }] = await Promise.all([
    getNavMenu(),
    getSocials(),
    getPosts(LIMIT, (currentPage - 1) * LIMIT, true)
  ]);

  const totalPages = Math.ceil(total / LIMIT) || 1;

  return (
    <Layout
      menuItems={menuItems}
      socials={socials}
      breadcrumbTitle="Publicaciones"
    >
      <section className="py-80">
        <div className="container">
          {/* Encabezado */}
          <div className="row mb-5">
            <div className="col-12 text-center">
              <h2 className="fw-bold" style={{ color: "#1a1a2e" }}>
                Publicaciones
              </h2>
              <p className="text-muted">
                {total > 0
                  ? `Mostrando ${Math.min((currentPage - 1) * LIMIT + 1, total)}–${Math.min(currentPage * LIMIT, total)} de ${total} publicaciones`
                  : "No se encontraron publicaciones."}
              </p>
              <div
                style={{ width: "60px", height: "4px", backgroundColor: "#c9003d", margin: "0 auto", borderRadius: "2px" }}
              />
            </div>
          </div>

          {/* Grid de cards */}
          {posts.length > 0 ? (
            <div className="row">
              {posts.map((post: any, idx: number) => (
                <PostCard key={post?.seteos?.id ?? post?.id ?? idx} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-5">
              <i className="bi bi-inbox text-muted" style={{ fontSize: "3rem" }} />
              <p className="text-muted mt-3">No hay publicaciones disponibles en este momento.</p>
            </div>
          )}

          {/* Paginador */}
          <Paginator currentPage={currentPage} totalPages={totalPages} />
        </div>
      </section>
    </Layout>
  );
}
