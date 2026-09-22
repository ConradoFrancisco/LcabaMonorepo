import Link from "next/link";
import Icon from "./Icon";
import { isExternal } from "./utils";

interface Area {
  label: string;
  href: string;
  icon: string;
  image: string;
  height: number;
  dark?: boolean;
}

const IMG = "/assets/imgs/menu-buttons";

// Tres columnas de 540 px de alto en total (mismo bento que el diseño).
const COLUMNS: Area[][] = [
  [
    { label: "Institucional", href: "/institucional", icon: "account_balance", image: `${IMG}/institucional.jpeg`, height: 340 },
    { label: "Patrimonio", href: "/patrimonio", icon: "museum", image: `${IMG}/patrimonio.jpg`, height: 180 },
  ],
  [
    { label: "Acción Cultural", href: "/accion-cultural", icon: "handshake", image: `${IMG}/accion-cultural.jpg`, height: 160 },
    { label: "Hemeroteca", href: "https://hemeroteca.legislatura.gob.ar/", icon: "inventory_2", image: `${IMG}/hemeroteca.jpg`, height: 170, dark: true },
    { label: "Sitios Recomendados", href: "/sitios-recomendados", icon: "location_on", image: `${IMG}/sitios-recomendados.jpg`, height: 170 },
  ],
  [
    { label: "Biblioteca", href: "https://biblioteca.legislatura.gob.ar/", icon: "menu_book", image: `${IMG}/biblioteca.jpg`, height: 160 },
    { label: "Museo", href: "/museo", icon: "temple_buddhist", image: `${IMG}/museo.jpg`, height: 360 },
  ],
];

function AreaCard({ area }: { area: Area }) {
  const external = isExternal(area.href);
  const content = (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={area.image} alt="" className="cl-area__img" loading="lazy" />
      <div className="cl-area__scrim" />
      <div className="cl-area__icon">
        <Icon name={area.icon} size={20} />
      </div>
      <h3 className="cl-area__label">{area.label}</h3>
    </>
  );
  const className = `cl-area ${area.dark ? "cl-area--dark" : ""}`;
  const style = { height: area.height };

  return external ? (
    <a href={area.href} className={className} style={style} target="_blank" rel="noopener noreferrer">
      {content}
    </a>
  ) : (
    <Link href={area.href} className={className} style={style}>
      {content}
    </Link>
  );
}

export default function AreasBento() {
  return (
    <section className="cl-areas" id="areas">
      <div className="cl-areas__inner">
        <div className="cl-areas__head">
          <h2 className="cl-areas__title">CONOCÉ MÁS SOBRE NUESTRAS ÁREAS</h2>
          <p className="cl-areas__lead">
            Recorré cada una de nuestras áreas: cultura, patrimonio, memoria y
            participación ciudadana, todo en un mismo lugar.
          </p>
        </div>
        <div className="cl-areas__grid">
          {COLUMNS.map((column, i) => (
            <div className="cl-areas__col" key={i}>
              {column.map((area) => (
                <AreaCard key={area.label} area={area} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
