import Link from "next/link";

export function Paginator({
  currentPage,
  totalPages,
  extraParams = {},
}: {
  currentPage: number;
  totalPages: number;
  extraParams?: Record<string, string | undefined>;
}) {
  if (totalPages <= 1) return null;

  const buildHref = (page: number) => {
    const usp = new URLSearchParams();
    Object.entries(extraParams).forEach(([key, value]) => {
      if (value) usp.set(key, value);
    });
    usp.set("page", String(page));
    return `?${usp.toString()}`;
  };

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
              href={buildHref(currentPage - 1)}
              style={{ ...btnBase, color: "#c9003d", backgroundColor: "#fff" }}
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
                href={buildHref(p)}
                style={{
                  ...btnBase,
                  backgroundColor: p === currentPage ? "#c9003d" : "#fff",
                  color: p === currentPage ? "#fff" : "#495057",
                  borderColor: p === currentPage ? "#c9003d" : "#dee2e6",
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
              href={buildHref(currentPage + 1)}
              style={{ ...btnBase, color: "#c9003d", backgroundColor: "#fff" }}
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
