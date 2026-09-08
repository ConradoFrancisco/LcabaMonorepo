import Header from "../components/Header";
import HeroSlider from "../components/HeroSlider";
import ArticleCard from "../components/ArticleCard";
import IssueSelector from "../components/IssueSelector";
import EnAccionGallery from "../components/EnAccionGallery";
import { PageServices } from "@lcaba/services";

// Helper para verificar si el status es 1 (soporta Buffer o número/boolean)
function isStatusActive(status: any): boolean {
  if (status === 1 || status === "1" || status === true) return true;
  if (status && typeof status === "object" && Array.isArray(status.data)) {
    return status.data[0] === 1;
  }
  return false;
}
async function getPageVw(pageId: string = "6") {
  try {
    const res = await PageServices.getPageVw(pageId);
    return res || null;
  } catch (e) {
    console.error("Error fetching page content:", e);
    return null;
  }
}

// Traer menú dinámico de Revista
async function getRevistaMenu() {
  try {
    const items = await PageServices.getDynamicMenu("magazine_", 6);
    return items || [];
  } catch (e) {
    console.error("Error fetching revista menu:", e);
    return [];
  }
}

// Traer todos los issues e hidratar las imágenes de portada
async function getAllIssuesWithCovers() {
  try {
    const { data: issues } = await PageServices.getIssues("magazine_");
    const baseImg = process.env.NEXT_PUBLIC_IMAGES;
    const fileKey = process.env.NEXT_PUBLIC_FILESERVER_KEY;

    // Solo issues activos para el carrusel de Otras Ediciones
    const activeIssues = issues.filter((iss: any) => isStatusActive(iss.status));
    console.log("Active Issues", activeIssues);
    // Hidratar con imágenes llamando a getIssueById en paralelo
    const issuesWithImages = await Promise.all(
      activeIssues.map(async (iss: any) => {
        try {
          const detail = await PageServices.getIssueById(iss.id);
          const sliderImg =
            detail?.images?.find(
              (i: any) => i.image_type === "slider" || i.image_type === "render"
            ) || detail?.images?.[0];

          let imageUrl = "";
          if (sliderImg?.location && sliderImg?.filename) {
            imageUrl = `${baseImg}/${sliderImg.location}${sliderImg.filename}${fileKey ? `?key=${fileKey}` : ""}`;
          }

          return {
            ...iss,
            imageUrl,
          };
        } catch {
          return iss;
        }
      })
    );

    return { allIssues: issues, activeIssues: issuesWithImages };
  } catch (e) {
    console.error("Error fetching issues:", e);
    return { allIssues: [], activeIssues: [] };
  }
}

// Traer posts del Slider filtrados por el issue actual
async function getSliderPosts(issueNumber: number | string) {
  try {
    const res = await PageServices.getPosts(
      "magazine_",
      false,
      0,
      6,
      true,
      true,
      null,
      "1",
      true,
      issueNumber
    );
    return Array.isArray(res) ? res : (res.data || []);
  } catch (e) {
    console.error("Error fetching slider posts:", e);
    return [];
  }
}

// Traer listado de posts para la grilla filtrados por el issue actual
async function getGridPosts(issueNumber: number | string, limit = 12, offset = 0) {
  try {
    const res = await PageServices.getPosts(
      "magazine_",
      false,
      offset,
      3,
      true,
      true,
      null,
      "1",
      false,
      issueNumber
    );
    return Array.isArray(res) ? res : (res.data || []);
  } catch (e) {
    console.error("Error fetching grid posts:", e);
    return [];
  }
}

//Traer listado de EN ACCION
async function getEnAccion(issueNumber: number | string, limit = 1, offset = 0) {
  try {
    const { data: posts } = await PageServices.getPosts("magazine_", false, offset, limit, true, true, 95, "1", false, issueNumber);
    console.log("En Accion Posts", posts);
    return posts;
  } catch (e) {
    console.error("Error fetching en accion posts:", e);
    return [];
  }
}
interface PageProps {
  searchParams: Promise<{ edicion?: string }>;
}

export default async function HomePage({ searchParams }: PageProps) {
  const params = await searchParams;
  const requestedEdicion = params?.edicion;

  // 1. Obtener menú, info de la página y lista de issues
  const [menuItems, { allIssues, activeIssues }, pageVw] = await Promise.all([
    getRevistaMenu(),
    getAllIssuesWithCovers(),
    getPageVw("6"),
  ]);

  // 2. Determinar el issue activo a mostrar:
  // Si vino por query (?edicion=X) se usa ese.
  // Sino, se toma el último issue con status 1 (ordenados descendente por id).
  const latestActiveIssue = allIssues.find((iss: any) => isStatusActive(iss.status));
  console.log('acaaaaaaa', latestActiveIssue);
  const currentIssueNumber = requestedEdicion
    ? Number(requestedEdicion)
    : (latestActiveIssue ? latestActiveIssue.id : 21);

  // 3. Traer los posts correspondientes al issue actual
  const [sliderPosts, gridPosts, enAccionPosts] = await Promise.all([
    getSliderPosts(currentIssueNumber),
    getGridPosts(currentIssueNumber, 12, 0),
    getEnAccion(currentIssueNumber, 1, 0),
  ]);

  const enAccionPost = Array.isArray(enAccionPosts) ? enAccionPosts[0] : enAccionPosts;

  // Logo
  const logo = pageVw?.images?.find((img: any) => img.image_type === "logo");
  const baseImg = process.env.NEXT_PUBLIC_IMAGES;
  const fileKey = process.env.NEXT_PUBLIC_FILESERVER_KEY;
  const logoUrl =
    logo && logo.location && logo.filename
      ? `${baseImg}/${logo.location}${logo.filename}${fileKey ? `?key=${fileKey}` : ""}`
      : "";

  // Construir mapa de colores desde el menú dinámico
  const categoryColorMap: Record<string, string> = {};
  menuItems.forEach((item: any) => {
    if (item.menu_title && item.color) {
      categoryColorMap[item.menu_title.trim().toLowerCase()] = item.color;
    }
    if (Array.isArray(item.submenus)) {
      item.submenus.forEach((sub: any) => {
        if (sub.submenu_title && sub.color) {
          categoryColorMap[sub.submenu_title.trim().toLowerCase()] = sub.color;
        }
      });
    }
  });

  return (
    <>
      {/* Header estilo La Casa con fecha y menú de navegación */}
      <Header menuItems={menuItems} logo={logoUrl} />

      <main className="py-4">
        {/* Slider Superior de Destacados del Issue Actual */}
        {sliderPosts.length > 0 && (
          <HeroSlider posts={sliderPosts} categoryColorMap={categoryColorMap} />
        )}

        {/* Separador sutil */}
        <div className="container my-3">
          <hr className="opacity-10" />
        </div>

        {/* Grilla de Artículos del Issue Actual */}
        <section className="container py-2">
          <div className="row g-4">
            {gridPosts.map((post: any) => (
              <ArticleCard
                key={post.id}
                post={post}
                categoryColorMap={categoryColorMap}
              />
            ))}
          </div>

          {gridPosts.length === 0 && (
            <div className="text-center py-5 text-muted">
              No hay publicaciones disponibles para esta edición.
            </div>
          )}
        </section>
        <hr />

        {/* Carrusel de Galería En Acción */}
        {enAccionPost && <EnAccionGallery post={enAccionPost} />}
        <hr />
        <h2 className="text-center">LA REVISTA LA HACEMOS ENTRE TODOS</h2>
        <hr />
        {/* Carrusel de Otras Ediciones */}
        {activeIssues.length > 0 && (
          <IssueSelector
            issues={activeIssues}
            currentIssueNumber={currentIssueNumber}
          />
        )}
      </main>

      {/* Footer estilo institucional */}
      <footer className="py-5 mt-5" style={{ backgroundColor: "#232637", color: "#ffffff" }}>
        <div className="container">
          <div className="row align-items-center gy-4">
            <div className="col-12 col-md-6">
              <div className="d-flex align-items-center gap-3 mb-2">
                <span className="fw-bold fs-4">Legislatura</span>
              </div>
              <p className="small text-white-50 m-0">
                Legislatura de la Ciudad Autónoma de Buenos Aires
              </p>
            </div>

            <div className="col-12 col-md-6 text-md-end">
              <div
                className="d-inline-flex align-items-center justify-content-between p-3 rounded-4"
                style={{ backgroundColor: "#635bbc", minWidth: "260px" }}
              >
                <div className="text-start me-3">
                  <span className="d-block small text-white-50">#AlzáTuVoz</span>
                  <span className="fw-bold">Dejanos tus propuestas.</span>
                </div>
                <div
                  className="rounded-circle bg-white text-dark d-flex align-items-center justify-content-center fw-bold"
                  style={{ width: "36px", height: "36px" }}
                >
                  +
                </div>
              </div>
              <div className="small text-white-50 mt-2">
                lacasa@legislatura.gob.ar &copy; {new Date().getFullYear()}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
