import Layout from "@lcaba/ui/astrax/components/layout/Layout";
import { getNavMenu } from "@/lib/navMenu";

export default async function Page() {
  const menuItems = await getNavMenu();

  return (
    <Layout
      menuItems={menuItems}
      breadcrumbTitle="Jornadas Especiales en Legislatura"
    >
      <section className="container py-5">
        <h1>Jornadas Especiales en Legislatura</h1>
      </section>
    </Layout>
  );
}
