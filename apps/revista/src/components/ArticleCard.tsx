import Link from "next/link";
import { getCategoryColor, buildImageUrl } from "../utils/categoryColors";

interface ArticleCardProps {
  post: any;
  categoryColorMap?: Record<string, string>;
}

export default function ArticleCard({ post, categoryColorMap = {} }: ArticleCardProps) {
  const imgUrl = buildImageUrl(post.images || []);
  const title = post.titulo || post.title || "";
  const desc = post.copete || post.shortdesc || "";
  const category = post.categoria || post.category || "";
  const categoryBg = categoryColorMap[category?.toLowerCase()] || getCategoryColor(category);
  const postUrl = `/publicaciones/${post.id}`;

  return (
    <div className="col-12 col-md-6 col-lg-4 d-flex">
      <Link href={postUrl} className="text-decoration-none w-100">
        <div className="revista-card">
          {/* Contenedor relativo para la imagen, fondo de color abajo y badge superpuesto */}
          <div
            className="revista-card-figure"
            style={{ backgroundColor: categoryBg }}
          >
            {/* Label de la categoría superpuesto arriba a la izquierda */}
            {category && (
              <span className="revista-card-badge" style={{ backgroundColor: categoryBg }}>
                {category}
              </span>
            )}

            {/* Recorte de la imagen con la curva inferior derecha */}
            <div className="revista-card-img-wrap">
              {imgUrl ? (
                <img
                  src={imgUrl}
                  alt={title}
                  className="revista-card-img"
                />
              ) : (
                <div
                  className="w-100 h-100 d-flex align-items-center justify-content-center text-white"
                  style={{ backgroundColor: categoryBg, opacity: 0.85 }}
                >
                  <span className="fw-bold fs-5 px-3 text-center">{title}</span>
                </div>
              )}
            </div>
          </div>

          {/* Textos: Título en el color temático y breve bajada */}
          <div className="revista-card-body">
            <h4
              className="revista-card-title"
              style={{ color: categoryBg }}
            >
              {title}
            </h4>
            {desc && <p className="revista-card-desc">{desc}</p>}
          </div>
        </div>
      </Link>
    </div>
  );
}
