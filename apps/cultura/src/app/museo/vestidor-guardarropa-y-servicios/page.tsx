import Layout from "@lcaba/ui/astrax/components/layout/Layout";
import { getNavMenu } from "@/lib/navMenu";

export default async function Page() {
  const menuItems = await getNavMenu();

  return (
    <Layout
      menuItems={menuItems}
      breadcrumbTitle="Vestidor, guardarropa y servicios"
    >
      <section className="container py-5">
        <h1>Vestidor, guardarropa y servicios</h1>
      </section>
    </Layout>
  );
}
