import Layout from "@lcaba/ui/astrax/components/layout/Layout";
import { getNavMenu } from "@/lib/navMenu";

export default async function Page() {
  const menuItems = await getNavMenu();

  return (
    <Layout menuItems={menuItems} breadcrumbTitle="Acciones">
      <section className="container py-5">
        <h1>Acciones</h1>
      </section>
    </Layout>
  );
}
