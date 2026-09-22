import Link from "next/link";
import Icon from "./Icon";
import {
  formatNavUrl,
  isExternal,
  showInFooter,
  type NavItem,
  type Social,
} from "./utils";

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

// El CSS de Font Awesome que carga el layout no trae las clases de marcas (`fa-brands fa-*`),
// pero sí el archivo de la fuente: se dibuja el glifo directo desde su codepoint (Font Awesome 6).
const BRAND_GLYPHS: Record<string, string> = {
  "fa-facebook": "\uf09a",
  "fa-facebook-f": "\uf39e",
  "fa-instagram": "\uf16d",
  "fa-twitter": "\uf099",
  "fa-x-twitter": "\ue61b",
  "fa-youtube": "\uf167",
  "fa-linkedin": "\uf08c",
  "fa-linkedin-in": "\uf0e1",
  "fa-tiktok": "\ue07b",
  "fa-whatsapp": "\uf232",
  "fa-telegram": "\uf2c6",
};

// Contenido estático tomado del diseño de Stitch (no viene de la API).
const LEGAL_LINKS = [
  "Transparencia Activa",
  "Digesto Jurídico CABA",
  "Términos y Condiciones",
  "Accesibilidad Web",
  "Portal de Datos Abiertos",
  "Declaraciones Juradas",
];

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return isExternal(href) ? (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ) : (
    <Link href={href}>{children}</Link>
  );
}

export default function SiteFooter({
  menuItems = [],
  socials = [],
}: {
  menuItems?: NavItem[];
  socials?: Social[];
}) {
  const year = new Date().getFullYear();
  const contact = menuItems.find((item) => /contacto/i.test(item.title));

  return (
    <footer className="cl-footer">
      <div className="cl-footer__grid">
        {/* Marca */}
        <div className="cl-footer__brand">
          <Link href="/" className="cl-footer__logo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logoCultura.png" alt="Cultura Legislatura CABA" />
          </Link>
          <h3 className="cl-footer__name">Cultura Legislatura</h3>
          <p className="cl-footer__blurb">
            Dirección General de Asuntos Culturales y Patrimoniales de la
            Legislatura de la Ciudad Autónoma de Buenos Aires. Promovemos el
            acceso democrático a la cultura, la conservación del patrimonio y la
            memoria colectiva.
          </p>
          {socials.length > 0 && (
            <ul className="cl-footer__social">
              {socials.map((social) => (
                <li key={social.id}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={SOCIAL_LABELS[social.icon] ?? "Red social"}
                  >
                    {BRAND_GLYPHS[social.icon] ? (
                      <span className="cl-brand" aria-hidden="true">
                        {BRAND_GLYPHS[social.icon]}
                      </span>
                    ) : (
                      <Icon name="link" size={16} />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Áreas y secciones (menú de la API) */}
        <div className="cl-footer__col">
          <h4 className="cl-footer__heading">Áreas y Secciones</h4>
          <ul className="cl-footer__list">
            {menuItems.filter(showInFooter).map((item) => (
              <li key={item.id}>
                <FooterLink href={formatNavUrl(item)}>{item.title}</FooterLink>
              </li>
            ))}
            <li>
              <Link href="/publicaciones" className="cl-footer__accent">
                Publicaciones
              </Link>
            </li>
          </ul>
        </div>

        {/* Contacto y visitas */}
        <div className="cl-footer__col">
          <h4 className="cl-footer__heading">Contacto y Visitas</h4>
          <div className="cl-footer__contact">
            <div>
              <Icon
                name="pin_drop"
                size={16}
                className="cl-footer__contact-icon"
              />
              <span>
                Perú 160, C1067AAD, CABA
                <br />
                <span className="cl-footer__muted">
                  Palacio de la Legislatura Porteña
                </span>
              </span>
            </div>
            <div>
              <Icon name="call" size={16} className="cl-footer__contact-icon" />
              <a href="tel:+5491143384059">+54 9 11 4338-4059</a>
            </div>
            <div>
              <Icon
                name="schedule"
                size={16}
                className="cl-footer__contact-icon"
              />
              <span>Lunes a Viernes de 10:00 a 19:00 hs</span>
            </div>
            {contact && (
              <div>
                <FooterLink href={formatNavUrl(contact)}>
                  <span className="cl-footer__accent">Contacto</span>
                  <Icon
                    name="arrow_forward"
                    size={12}
                    className="cl-footer__accent"
                  />
                </FooterLink>
              </div>
            )}
          </div>
        </div>

        {/* Transparencia y legal */}
        <div className="cl-footer__col">
          <h4 className="cl-footer__heading">Transparencia y Legal</h4>
          <ul className="cl-footer__list">
            {LEGAL_LINKS.map((label) => (
              <li key={label}>
                <a href="#">{label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="cl-footer__bar">
        <div className="cl-footer__bar-inner">
          <p>
            © {year} Legislatura de la Ciudad Autónoma de Buenos Aires -
            Dirección General de Asuntos Culturales y Patrimoniales. Todos los
            derechos reservados.
          </p>
          <div className="cl-footer__bar-links">
            <a
              href="https://www.legislatura.gob.ar"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.legislatura.gob.ar
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
