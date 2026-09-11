"use client";

import { useMemo, useState } from "react";
import ArticleCard from "./ArticleCard";

type WellbeingPost = {
  id: string | number;
  wellbeingCategory: "general" | "emocional" | "fisico" | "laboral";
  [key: string]: any;
};

const FILTERS = [
  { key: "todas", label: "Todas" },
  { key: "emocional", label: "Emocional" },
  { key: "fisico", label: "Físico" },
  { key: "laboral", label: "Laboral" },
] as const;

const PAGE_SIZE = 6;

export default function WellbeingPostGrid({
  posts,
  categoryColor,
  categoryColorMap,
}: {
  posts: WellbeingPost[];
  categoryColor: string;
  categoryColorMap: Record<string, string>;
}) {
  const [activeFilter, setActiveFilter] = useState<(typeof FILTERS)[number]["key"]>("todas");
  const [page, setPage] = useState(1);

  const filteredPosts = useMemo(
    () => activeFilter === "todas" ? posts : posts.filter((post) => post.wellbeingCategory === activeFilter),
    [activeFilter, posts],
  );
  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / PAGE_SIZE));
  const visiblePosts = filteredPosts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const selectFilter = (filter: (typeof FILTERS)[number]["key"]) => {
    setActiveFilter(filter);
    setPage(1);
  };

  return (
    <section className="container py-5">
      <div className="revista-wellbeing-filters" aria-label="Filtrar publicaciones de bienestar">
        {FILTERS.map((filter) => (
          <button
            key={filter.key}
            type="button"
            onClick={() => selectFilter(filter.key)}
            className={activeFilter === filter.key ? "is-active" : ""}
            style={activeFilter === filter.key ? { backgroundColor: categoryColor } : undefined}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {visiblePosts.length > 0 ? (
        <div className="row g-4">
          {visiblePosts.map((post) => (
            <ArticleCard key={post.id} post={post} categoryColorMap={categoryColorMap} />
          ))}
        </div>
      ) : (
        <div className="text-center py-5 text-muted">No hay publicaciones para este filtro.</div>
      )}

      {totalPages > 1 && (
        <nav className="revista-wellbeing-pagination" aria-label="Paginación de bienestar">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
            <button
              key={pageNumber}
              type="button"
              className={pageNumber === page ? "is-active" : ""}
              style={pageNumber === page ? { backgroundColor: categoryColor } : undefined}
              onClick={() => setPage(pageNumber)}
              aria-current={pageNumber === page ? "page" : undefined}
            >
              {pageNumber}
            </button>
          ))}
        </nav>
      )}
    </section>
  );
}
