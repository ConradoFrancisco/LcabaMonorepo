import Layout from "@lcaba/ui/astrax/components/layout/Layout";
import { getNavMenu } from "@/lib/navMenu";

export default async function Page() {
  const menuItems = await getNavMenu();

  return (
    <Layout
      menuItems={menuItems}
      breadcrumbTitle="Artistas presentes en el Patrimonio Artístico (J-Q)"
    >
      <section className="container py-5">
        <h1>Artistas presentes en el Patrimonio Artístico (J-Q)</h1>
      </section>
    </Layout>
  );
}
