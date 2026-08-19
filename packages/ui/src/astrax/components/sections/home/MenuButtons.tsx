import Link from "next/link";

const defaultButtons = [
    { label: "Institucional", href: "/institucional" },
    { label: "Acción Cultural", href: "/accion-cultural" },
    { label: "Biblioteca", href: "/biblioteca" },
    { label: "Hemeroteca", href: "/hemeroteca" },
    { label: "Museo", href: "/museo" },
    { label: "Patrimonio", href: "/patrimonio" },
    { label: "Sitios Recomendados", href: "/sitios-recomendados" },
];

export default function MenuButtons({ buttons = defaultButtons }: { buttons?: { label: string; href: string }[] }) {
    return (
        <div className="container my-5">
            <div className="row g-4 justify-content-center">
                {buttons.map((btn, i) => (
                    <div key={i} className="col-12 col-md-6 col-lg-4">
                        <Link className="btn btn-primary text-white w-100 py-3 hover-up" href={btn.href}>
                            {btn.label}
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
