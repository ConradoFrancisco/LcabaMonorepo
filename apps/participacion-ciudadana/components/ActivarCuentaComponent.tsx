"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function ActivarCuentaComponent() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const { activateExt } = useAuth();

    const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
    const [message, setMessage] = useState<string>("");

    useEffect(() => {
        if (!token) {
            setStatus("error");
            setMessage("No se proporcionó un enlace de activación válido.");
            return;
        }

        let isMounted = true;
        const doActivation = async () => {
            const res = await activateExt(token);
            if (!isMounted) return;

            if (res.ok) {
                setStatus("success");
                setMessage(res.message);
            } else {
                setStatus("error");
                setMessage(res.message);
            }
        };

        doActivation();

        return () => {
            isMounted = false;
        };
    }, [token, activateExt]);

    return (
        <section className="login-page-wrapper py-5">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8 col-lg-6">
                        <div className="card border-0 shadow-lg rounded-4 p-4 p-md-5 text-center bg-white">
                            {status === "loading" && (
                                <div className="py-4">
                                    <div className="spinner-border text-primary mb-3" style={{ width: "3.5rem", height: "3.5rem" }} role="status" />
                                    <h4 className="fw-bold text-dark mb-2">Activando tu cuenta...</h4>
                                    <p className="text-muted small">Por favor esperá unos segundos mientras confirmamos tus datos.</p>
                                </div>
                            )}

                            {status === "success" && (
                                <div className="py-2">
                                    <div
                                        className="d-inline-flex align-items-center justify-content-center rounded-circle bg-success bg-opacity-10 text-success mb-4"
                                        style={{ width: "80px", height: "80px", fontSize: "40px" }}
                                    >
                                        <i className="ri-checkbox-circle-line" />
                                    </div>
                                    <h3 className="fw-bold text-dark mb-2">¡Cuenta Activada!</h3>
                                    <p className="text-muted mb-4">
                                        {message || "Tu correo electrónico fue verificado exitosamente. Ya podés acceder a todas las iniciativas de Participación Ciudadana."}
                                    </p>
                                    <Link href="/login/ext" className="btn btn-primary rounded-pill px-5 py-3 fw-semibold shadow-sm w-100">
                                        <i className="ri-login-circle-line me-2" />
                                        Iniciar sesión
                                    </Link>
                                </div>
                            )}

                            {status === "error" && (
                                <div className="py-2">
                                    <div
                                        className="d-inline-flex align-items-center justify-content-center rounded-circle bg-danger bg-opacity-10 text-danger mb-4"
                                        style={{ width: "80px", height: "80px", fontSize: "40px" }}
                                    >
                                        <i className="ri-close-circle-line" />
                                    </div>
                                    <h3 className="fw-bold text-dark mb-2">Error de activación</h3>
                                    <p className="text-muted mb-4">
                                        {message || "El enlace de verificación no es válido o ha expirado."}
                                    </p>
                                    <div className="d-flex flex-column gap-2">
                                        <Link href="/login/ext" className="btn btn-outline-primary rounded-pill px-4 py-2 fw-semibold">
                                            Ir al inicio de sesión
                                        </Link>
                                        <Link href="/registro" className="btn btn-link text-muted small">
                                            ¿No tenés cuenta? Registrate de nuevo
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
