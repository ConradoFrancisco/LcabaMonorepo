
export default function Breadcrumb({ breadcrumbTitle, breadcrumbCategory }: { breadcrumbTitle: string; breadcrumbCategory?: string }) {
    return (
        <section
            className="position-relative overflow-hidden py-5 text-center text-white"
            style={{
                marginTop: "150px",
                backgroundColor: "#704477",
                backgroundImage: "linear-gradient(145deg, rgba(111, 56, 116, .9), rgba(143, 157, 79, .82)), linear-gradient(35deg, transparent 48%, rgba(255,255,255,.08) 49%, transparent 51%), linear-gradient(155deg, transparent 48%, rgba(255,255,255,.08) 49%, transparent 51%)",
                backgroundSize: "cover, 240px 150px, 300px 190px",
            }}
        >
            <div className="container position-relative z-1">
                <h1 className="mb-1 fs-2 fw-bold text-shadow">{breadcrumbTitle}</h1>
                {breadcrumbCategory && <p className="mb-0 fs-5 text-decoration-underline">{breadcrumbCategory}</p>}
            </div>
        </section>
    )
}
