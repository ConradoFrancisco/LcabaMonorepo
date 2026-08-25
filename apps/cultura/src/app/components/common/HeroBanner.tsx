export default function HeroBanner({ title, subtitle }: { title: string; subtitle?: string }) {
    return (
        <section className="position-relative overflow-hidden py-5 text-center text-white" style={{ backgroundColor: "#c9003d" }}>
            <div className="container position-relative z-1">
                <h1 className="mb-1 fs-2 fw-bold text-shadow">{title}</h1>
                {subtitle && <p className="mb-0 fs-5 text-decoration-underline">{subtitle}</p>}
            </div>
        </section>
    )
}