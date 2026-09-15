import Link from "next/link";

const SOCIAL_LABELS: Record<string, string> = {
  "fa-facebook-f": "Facebook",
  "fa-facebook": "Facebook",
  "fa-instagram": "Instagram",
  "fa-x-twitter": "X (Twitter)",
  "fa-twitter": "Twitter",
  "fa-youtube": "YouTube",
  "fa-linkedin-in": "LinkedIn",
  "fa-linkedin": "LinkedIn",
  "fa-tiktok": "TikTok",
  "fa-whatsapp": "WhatsApp",
  "fa-telegram": "Telegram",
};

export default function Footer({ menuItems = [], socials = [] }: any) {
  const formatUrl = (url: string | null) => {
    if (!url || url === "#") return "#";
    if (url.startsWith("http")) return url;
    return url.startsWith("/") ? url : `/${url}`;
  };

  const socialLabel = (icon: string) => SOCIAL_LABELS[icon] ?? "Red social";

  const year = new Date().getFullYear();

  return (
    <footer className="institutional-footer">
      <div className="container pt-5 pb-4">
        <div className="row gy-5">
          {/* Identity */}
          <div className="col-12 col-lg-5">
            <p className="footer-kicker mb-3">
              Legislatura de la Ciudad Autónoma de Buenos Aires
            </p>
            <Link href="/" className="d-inline-block mb-3">
              <img
                src="http://web.lcaba.test/_pagedata/page/images/jl58gsopll_1595522903.3196.png"
                height={48}
                alt="Cultura - Legislatura de la Ciudad Autónoma de Buenos Aires"
              />
            </Link>
            <p className="footer-lead mb-0">
              Dirección General de Asuntos Culturales y Patrimoniales
            </p>
          </div>

          {/* Navigation */}
          {menuItems.length > 0 && (
            <div className="col-6 col-lg-3">
              <h2 className="footer-heading mb-3">Navegación</h2>
              <nav aria-label="Pie de página">
                <ul className="footer-link-list list-unstyled mb-0">
                  {menuItems.map((item: any) => (
                    <li key={item.id}>
                      <Link href={formatUrl(item.url)} className="footer-link">
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          )}

          {/* Contact */}
          <div className="col-6 col-lg-4">
            <h2 className="footer-heading mb-3">Contacto</h2>
            <p className="footer-lead mb-2">
              <a href="tel:+5491143384059" className="footer-link">
                +54 9 11 4338-4059
              </a>
            </p>
            <Link
              href="/contacto"
              className="footer-link footer-link--arrow d-inline-block mb-4"
            >
              Contacto
            </Link>

            {socials.length > 0 && (
              <ul className="footer-social-list list-unstyled d-flex gap-3 mb-0">
                {socials.map((social: any) => (
                  <li key={social.id}>
                    <Link
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="footer-social-link"
                      aria-label={socialLabel(social.icon)}
                    >
                      <i className={`fa-brands ${social.icon}`} aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="footer-divider" />

        <p className="footer-legal mb-0">
          © {year} Micro Sitio Dirección General de Asuntos Culturales y
          Patrimoniales — Legislatura de la Ciudad Autónoma de Buenos Aires
        </p>
      </div>

      <style>{`
        .institutional-footer {
          background: #1f1f1f;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .footer-kicker {
          font-family: var(--tc-body-font-family);
          font-size: 12px;
          font-weight: var(--tc-fw-medium);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--tc-black-bg-body-text);
        }

        .footer-heading {
          font-family: var(--tc-body-font-family);
          font-size: 13px;
          font-weight: var(--tc-fw-semi-bold);
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--tc-system-white);
        }

        .footer-lead {
          font-family: var(--tc-heading-font-family);
          font-size: 17px;
          line-height: 1.5;
          color: var(--tc-system-white);
        }

        .footer-link-list li + li {
          margin-top: 12px;
        }

        .footer-link {
          font-size: 15px;
          color: var(--tc-black-bg-white);
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .footer-link:hover,
        .footer-link:focus-visible {
          color: var(--bs-primary);
        }

        .footer-link:focus-visible {
          outline: 1px solid var(--bs-primary);
          outline-offset: 4px;
          border-radius: 2px;
        }

        .footer-link--arrow::after {
          content: "→";
          margin-left: 6px;
          transition: margin-left 0.2s ease;
          display: inline-block;
        }

        .footer-link--arrow:hover::after {
          margin-left: 10px;
        }

        .footer-social-link {
          display: inline-flex;
          padding: 4px;
          font-size: 16px;
          color: var(--tc-black-bg-white);
          transition: color 0.2s ease;
        }

        .footer-social-link:hover,
        .footer-social-link:focus-visible {
          color: var(--bs-primary);
        }

        .footer-social-link:focus-visible {
          outline: 1px solid var(--bs-primary);
          outline-offset: 3px;
          border-radius: 2px;
        }

        .footer-divider {
          height: 1px;
          background: rgba(255, 255, 255, 0.08);
          margin: 40px 0 24px;
        }

        .footer-legal {
          font-family: var(--tc-body-font-family);
          font-size: 13px;
          line-height: 1.6;
          color: var(--tc-black-bg-stroke);
        }

        @media (max-width: 991.98px) {
          .footer-lead {
            font-size: 16px;
          }

          .footer-divider {
            margin: 32px 0 20px;
          }
        }
      `}</style>
    </footer>
  );
}
