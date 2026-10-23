"use client";

import Link from "next/link";

function buildSubItemHref(rawUrl: string | null | undefined): string {
  if (!rawUrl) return "#";
  return (
    "/" +
    rawUrl
      .toLowerCase()
      .replace(/^\//, "")
      .replace(/\.html?$/, "")
      .replace(/^seccion\//, "")
  );
}

export default function SubItemCard({ item }: { item: any }) {
  const href = buildSubItemHref(item.url);
  const desc = item.shortdesc || item.description || "";
  const plainDesc = desc.replace(/<[^>]*>/g, "").slice(0, 120);

  return (
    <Link
      href={href}
      className="text-decoration-none"
      style={{ display: "block", height: "100%" }}
    >
      <div className="sub-item-card h-100 rounded-4 border overflow-hidden">
        <div
          style={{
            height: "4px",
            background: "linear-gradient(90deg, #f6bd43, #e8762c)",
          }}
        />
        <div className="p-4">
          <h6
            className="fw-bold mb-2"
            style={{ fontSize: "1rem", color: "#1a1a2e" }}
          >
            {item.title}
          </h6>
          {plainDesc && (
            <p
              className="text-muted mb-3"
              style={{ fontSize: "0.85rem", lineHeight: 1.5 }}
            >
              {plainDesc}
              {desc.replace(/<[^>]*>/g, "").length > 120 ? "\u2026" : ""}
            </p>
          )}
          <span
            className="d-inline-flex align-items-center gap-1 fw-semibold"
            style={{
              fontSize: "0.82rem",
              color: "var(--tc-primary-color, #e8762c)",
            }}
          >
            Visitar &rarr;
          </span>
        </div>
      </div>
    </Link>
  );
}