'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface HeaderProps {
  menuItems?: any[];
  logo?: string;
  currentEdicion?: string | number;
}

export default function Header({ menuItems = [], logo, currentEdicion }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({});
  const pathname = usePathname();

  const currentDate = new Date().toLocaleDateString("es-AR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
  }).toUpperCase();

  // Cerrar menú al cambiar de ruta
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Bloquear scroll del body cuando el drawer está abierto
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  // Cerrar con Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setIsMobileMenuOpen(false); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const toggleAccordion = (key: string) =>
    setExpandedMenus((prev) => ({ ...prev, [key]: !prev[key] }));

  const formatHref = (urlStr?: string) => {
    if (!urlStr || urlStr === "#") return "#";
    const cleaned = urlStr.replace(/^\/+/, "").replace(/\.html$/, "");
    return currentEdicion ? `/${cleaned}?edicion=${currentEdicion}` : `/${cleaned}`;
  };

  const renderMenuData = () =>
    menuItems.map((item: any) => {
      const title = item.menu_title || item.title;
      const allSubs = (item.submenus || item.subItems || []).filter(
        (sub: any) => !!(sub.submenu_title || sub.title)
      );
      const isDegenerate =
        allSubs.length === 1 &&
        (allSubs[0].submenu_title || allSubs[0].title || "").trim().toLowerCase() ===
          title.trim().toLowerCase();
      const hasSub = allSubs.length > 0 && !isDegenerate;
      const href = isDegenerate
        ? formatHref(allSubs[0].submenu_url || allSubs[0].url || item.url)
        : formatHref(item.url);
      const key = String(item.menu_id || item.id || title);
      return { title, allSubs, hasSub, href, key, color: item.color };
    });

  return (
    <header className="revista-header bg-white" style={{ borderBottom: "1px solid #f1f5f9", position: "sticky", top: 0, zIndex: 900 }}>

      {/* ─── TOP BAR ─── */}
      <div className="container py-3">
        {/* Mobile: columna (logo arriba, fecha+hamburger abajo). Desktop: fila */}
        <div className="d-flex flex-column flex-lg-row justify-content-between align-items-center gap-2 gap-lg-3">

          {/* Logo */}
          <Link
            href={currentEdicion ? `/?edicion=${currentEdicion}` : "/"}
            className="revista-logo d-flex align-items-center text-decoration-none flex-shrink-0"
          >
            {logo
              ? <img src={logo} alt="LA CASA" style={{ maxHeight: "52px", width: "auto", objectFit: "contain" }} />
              : "LA CASA"
            }
          </Link>

          {/* Fecha + hamburger */}
          <div className="d-flex align-items-center gap-3">
            <div className="text-center text-lg-end">
              <div className="revista-digital-tag">REVISTA DIGITAL</div>
              <div className="revista-date-badge">{currentDate}</div>
            </div>

            {/* Hamburger — solo visible en mobile (d-lg-none) */}
            <button
              type="button"
              className="revista-hamburger-btn d-lg-none"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Abrir menú"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </div>

      {/* ─── DESKTOP NAV (solo visible en >= 992px) ─── */}
      <nav className="revista-nav d-none d-lg-block" style={{ borderTop: "1px solid #f1f5f9" }}>
        <div className="container">
          <ul className="revista-nav-list py-1">
            {/* Inicio */}
            <li className="nav-item">
              <Link href={currentEdicion ? `/?edicion=${currentEdicion}` : "/"} className="revista-nav-link text-dark">
                <i className="fa-solid fa-house" />
              </Link>
            </li>

            {renderMenuData().map(({ title, allSubs, hasSub, href, key, color }) => {
              if (hasSub) {
                return (
                  <li key={key} className="nav-item dropdown">
                    <span className="revista-nav-link">
                      {title}
                      <i className="fa-solid fa-chevron-down ms-1" style={{ fontSize: "0.65rem", opacity: 0.7 }} />
                    </span>
                    <ul className="dropdown-menu">
                      {allSubs.map((sub: any) => {
                        const subTitle = sub.submenu_title || sub.title;
                        const subHref = formatHref(sub.submenu_url || sub.url);
                        const subKey = sub.cat_id || sub.id || subTitle;
                        const subColor = sub.color || color;
                        return (
                          <li key={subKey}>
                            <Link className="revista-dropdown-item" href={subHref}>
                              <span>
                                {subColor && (
                                  <span
                                    className="d-inline-block rounded-circle me-2"
                                    style={{ width: "8px", height: "8px", backgroundColor: subColor }}
                                  />
                                )}
                                {subTitle}
                              </span>
                              <i className="fa-solid fa-arrow-right arrow-icon" />
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                );
              }
              return (
                <li key={key} className="nav-item">
                  <Link href={href} className="revista-nav-link">{title}</Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* ─── MOBILE DRAWER ─── */}

      {/* Backdrop */}
      <div
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1050,
          background: "rgba(15,23,42,0.55)",
          backdropFilter: "blur(3px)",
          WebkitBackdropFilter: "blur(3px)",
          opacity: isMobileMenuOpen ? 1 : 0,
          visibility: isMobileMenuOpen ? "visible" : "hidden",
          transition: "opacity 0.3s ease, visibility 0.3s ease",
          pointerEvents: isMobileMenuOpen ? "auto" : "none",
        }}
      />

      {/* Drawer panel */}
      <aside
        aria-label="Menú mobile"
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          width: "min(85vw, 350px)",
          height: "100dvh",
          background: "#fff",
          zIndex: 1060,
          display: "flex",
          flexDirection: "column",
          boxShadow: "-8px 0 30px rgba(0,0,0,0.14)",
          transform: isMobileMenuOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.32s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        {/* Drawer header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 18px", borderBottom: "1px solid #f1f5f9" }}>
          <Link
            href={currentEdicion ? `/?edicion=${currentEdicion}` : "/"}
            className="revista-logo text-decoration-none"
            onClick={() => setIsMobileMenuOpen(false)}
            style={{ fontSize: "1.5rem" }}
          >
            {logo
              ? <img src={logo} alt="LA CASA" style={{ maxHeight: "34px", width: "auto" }} />
              : "LA CASA"
            }
          </Link>
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Cerrar menú"
            style={{
              background: "#f8fafc", border: "1px solid #e2e8f0",
              borderRadius: "50%", width: 36, height: 36,
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", color: "#334155",
            }}
          >
            <i className="fa-solid fa-xmark" style={{ fontSize: "1rem" }} />
          </button>
        </div>

        {/* Fecha dentro del drawer */}
        <div style={{ padding: "10px 18px", borderBottom: "1px solid #f1f5f9", background: "#fafafa", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span className="revista-date-badge" style={{ fontSize: "0.62rem", padding: "2px 10px" }}>{currentDate}</span>
          <span className="revista-digital-tag" style={{ fontSize: "0.7rem", marginTop: 0 }}>REVISTA DIGITAL</span>
        </div>

        {/* Drawer nav body */}
        <div style={{ flex: 1, overflowY: "auto", padding: "12px 10px" }}>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 2 }}>

            {/* Inicio */}
            <li>
              <Link
                href={currentEdicion ? `/?edicion=${currentEdicion}` : "/"}
                className="revista-drawer-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span><i className="fa-solid fa-house me-2" style={{ color: "#7c3aed" }} />INICIO</span>
                <i className="fa-solid fa-chevron-right" style={{ fontSize: "0.7rem", color: "#94a3b8" }} />
              </Link>
            </li>

            {renderMenuData().map(({ title, allSubs, hasSub, href, key, color }) => {
              const isExpanded = !!expandedMenus[key];

              if (hasSub) {
                return (
                  <li key={key}>
                    <button
                      type="button"
                      className="revista-drawer-link"
                      onClick={() => toggleAccordion(key)}
                    >
                      <span className="d-flex align-items-center">
                        {color && (
                          <span
                            style={{ display: "inline-block", width: 9, height: 9, borderRadius: "50%", backgroundColor: color, marginRight: 8, flexShrink: 0 }}
                          />
                        )}
                        {title}
                      </span>
                      <i
                        className="fa-solid fa-chevron-down"
                        style={{ fontSize: "0.7rem", color: "#94a3b8", transition: "transform 0.25s ease", transform: isExpanded ? "rotate(180deg)" : "rotate(0)" }}
                      />
                    </button>

                    {isExpanded && (
                      <ul style={{ listStyle: "none", margin: "2px 0 6px 26px", padding: "0 0 0 14px", borderLeft: "2px solid #ede9fe", display: "flex", flexDirection: "column", gap: 2 }}>
                        {allSubs.map((sub: any) => {
                          const subTitle = sub.submenu_title || sub.title;
                          const subHref = formatHref(sub.submenu_url || sub.url);
                          const subKey = sub.cat_id || sub.id || subTitle;
                          const subColor = sub.color || color;
                          return (
                            <li key={subKey}>
                              <Link
                                href={subHref}
                                className="revista-drawer-sublink"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                <span className="d-flex align-items-center">
                                  {subColor && (
                                    <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", backgroundColor: subColor, marginRight: 8, flexShrink: 0 }} />
                                  )}
                                  {subTitle}
                                </span>
                                <i className="fa-solid fa-arrow-right" style={{ fontSize: "0.6rem", color: "#94a3b8" }} />
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </li>
                );
              }

              return (
                <li key={key}>
                  <Link
                    href={href}
                    className="revista-drawer-link"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="d-flex align-items-center">
                      {color && (
                        <span style={{ display: "inline-block", width: 9, height: 9, borderRadius: "50%", backgroundColor: color, marginRight: 8, flexShrink: 0 }} />
                      )}
                      {title}
                    </span>
                    <i className="fa-solid fa-chevron-right" style={{ fontSize: "0.7rem", color: "#94a3b8" }} />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Drawer footer */}
        {currentEdicion && (
          <div style={{ padding: "12px 18px", borderTop: "1px solid #f1f5f9", background: "#fafafa", textAlign: "center" }}>
            <span style={{ fontSize: "0.72rem", color: "#94a3b8" }}>
              Edición Nº <strong style={{ color: "#475569" }}>{currentEdicion}</strong>
            </span>
          </div>
        )}
      </aside>

    </header>
  );
}
