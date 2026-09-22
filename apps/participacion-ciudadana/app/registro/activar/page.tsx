import { Suspense } from "react";
import Layout from "@/components/layout/Layout";
import ActivarCuentaComponent from "@/components/ActivarCuentaComponent";
import { PageServices } from "@lcaba/services";

export const metadata = {
    title: "Activación de Cuenta | Participación Ciudadana",
    description: "Verificá tu correo electrónico para activar tu cuenta en Participación Ciudadana.",
};

export default async function ActivarCuentaPage() {
    const menuItems = await PageServices.getNavMenu(4);
    const pageVw = await PageServices.getPageVw("4");
    const logo = pageVw?.images?.find((img: any) => img.image_type === "logo");

    return (
        <Layout menuItems={menuItems} pageVw={pageVw} logo={logo}>
            {/* Suspense es obligatorio cuando el componente usa useSearchParams() */}
            <Suspense fallback={
                <section className="login-page-wrapper py-5">
                    <div className="container text-center py-5">
                        <div className="spinner-border text-primary" role="status" />
                    </div>
                </section>
            }>
                <ActivarCuentaComponent />
            </Suspense>
        </Layout>
    );
}

