import Layout from "@lcaba/ui/astrax/components/layout/Layout";
import { findNavMenuItemByUrl, getNavMenu } from "@/lib/navMenu";

export default async function Page() {
  const menuItems = await getNavMenu();
  const menuMatch = findNavMenuItemByUrl(menuItems, "quienes-somos");
  const currentItem = menuMatch?.item;

  return (
    <Layout
      menuItems={menuItems}
      breadcrumbTitle={currentItem?.title ?? "¿Quiénes somos?"}
      breadcrumbCategory={menuMatch?.parent?.title}
    >
      <section className="container py-5">
        <h1>{currentItem?.title ?? "¿Quiénes somos?"}</h1>
        {currentItem?.description ? (
          <div dangerouslySetInnerHTML={{ __html: currentItem.description }} />
        ) : (
          <p>Esta página todavía no tiene contenido publicado.</p>
        )}
      </section>
    </Layout>
  );
}
