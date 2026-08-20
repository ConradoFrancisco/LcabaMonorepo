import Layout from "@lcaba/ui/astrax/components/layout/Layout";
import { getNavMenu } from "@/lib/navMenu";

export default async function Page() {
  const menuItems = await getNavMenu();

  return (
    <Layout menuItems={menuItems} breadcrumbTitle="Galería de los Bustos">
      <section className="container py-5">
        <h1>Galería de los Bustos</h1>
      </section>
    </Layout>
  );
}
