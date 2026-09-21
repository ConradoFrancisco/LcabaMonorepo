import Link from "next/link";
import Icon from "./Icon";

// Contenido estático tomado del diseño de Stitch (no viene de la API).
const SERVICES = [
  {
    tone: "crimson",
    icon: "tour",
    title: "Visitas Guiadas",
    text: "Recorré el Salón Dorado, la Biblioteca y el Recinto de Sesiones. Martes y jueves con reserva previa online.",
    cta: "Inscribirme gratis →",
    href: "#",
  },
  {
    tone: "gold",
    icon: "search_insights",
    title: "Consultas Online",
    text: "Servicio de referencia legislativa y hemerográfica remota para investigadores, estudiantes y vecinos.",
    cta: "Iniciar consulta →",
    href: "#",
  },
  {
    tone: "teal",
    icon: "event_available",
    title: "Agenda Semanal",
    text: "Descargá el cronograma de actividades, conciertos, presentaciones de libros y muestras del mes.",
    cta: "Descargar PDF →",
    href: "#agenda",
  },
] as const;

export default function ServicesBanner() {
  return (
    <section className="cl-section cl-services" id="visitas">
      <div className="cl-services__panel">
        <div className="cl-services__watermark" aria-hidden="true">
          <Icon name="account_balance" size={240} />
        </div>
        <div className="cl-services__grid">
          {SERVICES.map((s) => (
            <div className="cl-service" key={s.title}>
              <div className={`cl-service__icon cl-service__icon--${s.tone}`}>
                <Icon name={s.icon} size={30} />
              </div>
              <div className="cl-service__body">
                <h4 className="cl-service__title">{s.title}</h4>
                <p className="cl-service__text">{s.text}</p>
                <Link href={s.href} className={`cl-service__cta cl-service__cta--${s.tone}`}>
                  {s.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
