import Layout from "@lcaba/ui/astrax/components/layout/Layout";
import { getNavMenu } from "@/lib/navMenu";

export default async function Page() {
  const menuItems = await getNavMenu();

  return (
    <Layout
      menuItems={menuItems}
      breadcrumbTitle="Sala de Exposiciones Manuel Belgrano"
    >
      <section className="container py-5">
        <h1>Sala de Exposiciones Manuel Belgrano</h1>
      </section>
    </Layout>
  );
}
