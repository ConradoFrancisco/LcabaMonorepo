import Layout from "@/components/layout/Layout";
import LoginComponent from "@/components/LoginComponent";
import { PageServices } from "@lcaba/services";

interface LoginPageProps {
  params: {
    slug?: string[] | string;
  };
}

export default async function LoginPage({ params }: LoginPageProps) {
  const menuItems = await PageServices.getNavMenu(4);
  const pageVw = await PageServices.getPageVw("4");
  const logo = pageVw?.images?.find((img: any) => img.image_type === "logo");

  const slug = Array.isArray(params?.slug) ? params.slug[0] : params?.slug;

  return (
    <Layout menuItems={menuItems} pageVw={pageVw} logo={logo}>
      <LoginComponent type={slug} />
    </Layout>
  );
}
