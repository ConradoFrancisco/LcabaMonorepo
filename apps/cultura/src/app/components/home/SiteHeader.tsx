"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Icon from "./Icon";
import { isExternal, type HeaderNavItem } from "./utils";

const BIBLIOTECA_URL = "https://biblioteca.legislatura.gob.ar/";

function NavLink({
  href,
  className,
  children,
  onClick,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  // Ítems agrupadores (sin destino propio): solo abren su submenú.
  if (href === "#") {
    return (
      <a
        href="#"
        className={className}
        onClick={(e) => {
          e.preventDefault();
          onClick?.();
        }}
      >
        {children}
      </a>
    );
  }
  if (isExternal(href)) {
    return (
      <a
        href={href}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}

export default function SiteHeader({
  navItems = [],
}: {
  navItems?: HeaderNavItem[];
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expanded, setExpanded] = useState<HeaderNavItem["id"] | null>(null);

  const closeMobile = () => setMobileOpen(false);
  const isActive = (href: string) =>
    href !== "#" && !isExternal(href) && (pathname === href || pathname.startsWith(`${href}/`));

  return (
    <>
      {/* Barra superior (sub-header cívico) */}
      <div className="cl-topbar">
        <div className="cl-topbar__inner">
          <div className="cl-topbar__msg">
            <span className="cl-topbar__dot" aria-hidden="true" />
            <span>
              Palacio de la Legislatura Porteña • Entrada libre y gratuita a
              todas las actividades culturales
            </span>
          </div>
          <div className="cl-topbar__links">
            <Link href="/#visitas">
              <Icon name="calendar_month" size={14} /> Visitas Guiadas
            </Link>
            <a href={BIBLIOTECA_URL} target="_blank" rel="noopener noreferrer">
              <Icon name="library_books" size={14} /> Catálogo Bibliográfico
            </a>
            <span className="cl-topbar__sep">|</span>
            <span className="cl-topbar__addr">Perú 160, CABA</span>
          </div>
        </div>
      </div>

      <header className="cl-header">
        <div className="cl-header__inner">
          <Link href="/" className="cl-header__brand">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logoCultura.png" alt="Cultura Legislatura CABA" />
          </Link>

          <nav aria-label="Navegación principal" className="cl-nav">
            <ul className="cl-nav__list">
              {navItems.map((item) => {
                const href = item.href;
                const subItems = item.subItems ?? [];
                return (
                  <li key={item.id} className="cl-nav__item">
                    <NavLink
                      href={href}
                      className={`cl-nav__link ${isActive(href) ? "is-active" : ""}`}
                    >
                      {item.title}
                    </NavLink>
                    {subItems.length > 0 && (
                      <ul className="cl-nav__dropdown">
                        {subItems.map((sub) => (
                          <li key={sub.id}>
                            <NavLink
                              href={sub.href}
                              className="cl-nav__dropdown-link"
                            >
                              {sub.title}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="cl-header__actions">
            <Link href="/publicaciones" className="cl-btn cl-btn--crimson cl-header__cta">
              <Icon name="event" size={16} filled />
              <span>Ver Agenda</span>
            </Link>
            <button
              type="button"
              className="cl-header__burger"
              aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={mobileOpen}
              aria-controls="cl-mobile-menu"
              onClick={() => setMobileOpen((v) => !v)}
            >
              <Icon name={mobileOpen ? "close" : "menu"} size={24} />
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="cl-mobile" id="cl-mobile-menu">
            <ul className="cl-mobile__list">
              {navItems.map((item) => {
                const href = item.href;
                const subItems = item.subItems ?? [];
                const open = expanded === item.id;
                return (
                  <li key={item.id}>
                    <div className="cl-mobile__row">
                      <NavLink
                        href={href}
                        className={`cl-mobile__link ${isActive(href) ? "is-active" : ""}`}
                        onClick={
                          href === "#" ? () => setExpanded(open ? null : item.id) : closeMobile
                        }
                      >
                        {item.title}
                      </NavLink>
                      {subItems.length > 0 && (
                        <button
                          type="button"
                          className="cl-mobile__toggle"
                          aria-label={`${open ? "Ocultar" : "Mostrar"} submenú de ${item.title}`}
                          aria-expanded={open}
                          onClick={() => setExpanded(open ? null : item.id)}
                        >
                          <Icon name={open ? "expand_less" : "expand_more"} size={22} />
                        </button>
                      )}
                    </div>
                    {open && (
                      <ul className="cl-mobile__sub">
                        {subItems.map((sub) => (
                          <li key={sub.id}>
                            <NavLink
                              href={sub.href}
                              className="cl-mobile__sublink"
                              onClick={closeMobile}
                            >
                              {sub.title}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
            <Link
              href="/publicaciones"
              className="cl-btn cl-btn--crimson cl-mobile__cta"
              onClick={closeMobile}
            >
              <Icon name="event" size={18} />
              <span>Ver Agenda Completa</span>
            </Link>
          </div>
        )}
      </header>
    </>
  );
}
