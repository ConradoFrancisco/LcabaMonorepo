import Link from "next/link";

interface HeaderProps {
  menuItems?: any[];
  logo?: string;
  currentEdicion?: string | number;
}

export default function Header({ menuItems = [], logo, currentEdicion }: HeaderProps) {
  // Fecha actual formateada: ej. LUNES 07 DE SEPTIEMBRE
  const currentDate = new Date().toLocaleDateString("es-AR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
  }).toUpperCase();

  return (
    <header className="revista-header sticky-top bg-white">
      {/* Top Bar: Logo + Fecha/Badge */}
      <div className="container py-4 ">
        <div className="d-flex justify-content-between align-items-center">
          <Link href="/" className="revista-logo d-flex align-items-center text-decoration-none">
            {logo ? (
              <img
                src={logo}
                alt="LA CASA"
                style={{ maxHeight: "55px", width: "auto", objectFit: "contain" }}
              />
            ) : (
              "LA CASA"
            )}
          </Link>

          <div className="text-center">
            <div className="revista-date-badge">
              {currentDate}
            </div>
            <div className="revista-digital-tag">
              REVISTA DIGITAL
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="revista-nav">
        <div className="container">
          <ul className="navbar-nav d-flex flex-row align-items-center flex-wrap py-1">
            <li className="nav-item">
              <Link href={currentEdicion ? `/?edicion=${currentEdicion}` : "/"} className="revista-nav-link text-dark">
                <i className="fa-solid fa-house" />
              </Link>
            </li>

            {menuItems.map((item: any) => {
              const title = item.menu_title || item.title;
              const subItems = item.submenus || item.subItems || [];
              const hasSub = subItems.length > 0;
              const formatHref = (urlStr?: string) => {
                if (!urlStr || urlStr === "#") return "#";
                let cleaned = urlStr.replace(/^\/+/, "").replace(/\.html$/, "");
                const baseHref = `/${cleaned}`;
                return currentEdicion ? `${baseHref}?edicion=${currentEdicion}` : baseHref;
              };
              const href = formatHref(item.url);
              const key = item.menu_id || item.id || title;

              if (hasSub) {
                return (
                  <li key={key} className="nav-item dropdown">
                    <span className="revista-nav-link">
                      {title}
                      <i className="fa-solid fa-chevron-down ms-1" style={{ fontSize: "0.65rem", opacity: 0.7 }} />
                    </span>
                    <ul className="dropdown-menu">
                      {subItems.map((sub: any) => {
                        const subTitle = sub.submenu_title || sub.title;
                        const subHref = formatHref(sub.submenu_url || sub.url);
                        const subKey = sub.cat_id || sub.id || subTitle;
                        const subColor = sub.color || item.color;

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
                  <Link href={href} className="revista-nav-link">
                    {title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </header>
  );
}
