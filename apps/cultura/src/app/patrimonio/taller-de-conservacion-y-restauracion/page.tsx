import Layout from "@lcaba/ui/astrax/components/layout/Layout";
import { getNavMenu } from "@/lib/navMenu";

export default async function Page() {
  const menuItems = await getNavMenu();

  return (
    <Layout
      menuItems={menuItems}
      breadcrumbTitle="Taller de Conservación y Restauración "
    >
      <section className="container py-5">
        <h1>Taller de Conservación y Restauración </h1>
      </section>
    </Layout>
  );
}
