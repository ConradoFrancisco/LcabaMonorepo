"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface LoginComponentProps {
    type?: string;
}

export default function LoginComponent({ type }: LoginComponentProps) {
    const router = useRouter();
    // Determinamos si es lcaba o externo. Por defecto si no viene o es ext, es externo.
    const isLcaba = type === "lcaba";
    const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");

    return (
        <section className="login-page-wrapper">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-xl-10">
                        {/* 
                            Si es LCABA: Banner gráfico a la DERECHA, formulario a la IZQUIERDA (flex-lg-row-reverse).
                            Si es Externo: Banner gráfico a la IZQUIERDA, formulario a la DERECHA (flex-lg-row).
                        */}
                        <div className={`login-split-card row g-0 ${isLcaba ? "flex-lg-row-reverse" : "flex-lg-row"}`}>
                            
                            {/* COLUMNA 1: BANNER VISUAL (GRADIENTE + AVATAR / ILUSTRACIÓN) */}
                            <div className={`col-lg-6 col-12 login-visual-banner ${isLcaba ? "theme-lcaba" : "theme-ext"}`}>
                                <div className="login-visual-circles" />

                                {/* Marca / Título superior */}
                                <div className="d-flex justify-content-between align-items-center position-relative z-2">
                                    <div className="d-flex align-items-center gap-2">
                                        <div 
                                            className="d-inline-flex align-items-center justify-content-center rounded-3 bg-white text-primary"
                                            style={{ width: "36px", height: "36px" }}
                                        >
                                            <i className={isLcaba ? "ri-government-line" : "ri-community-line"} style={{ fontSize: "20px" }} />
                                        </div>
                                        <span className="fw-bold fs-6 letter-spacing-1 text-white">
                                            {isLcaba ? "LCABA INTERNO" : "PARTICIPACIÓN CIUDADANA"}
                                        </span>
                                    </div>
                                    <span className="badge bg-white bg-opacity-25 rounded-pill px-3 py-2 text-white small">
                                        {isLcaba ? "Personal Legislatura" : "Comunidad"}
                                    </span>
                                </div>

                                {/* Centro con Ilustración / Avatar y formas */}
                                <div className="login-avatar-wrapper py-4">
                                    <div className="position-relative d-inline-block">
                                        <img 
                                            src={isLcaba 
                                                ? "/assets/imgs/pages/coworking-space/page-about/img-1.png" 
                                                : "/assets/imgs/pages/coworking-space/page-home/home-section-1/img-1.png"
                                            } 
                                            alt={isLcaba ? "Personal LCABA" : "Usuarios Registrados"}
                                            className="login-avatar-img"
                                        />
                                        <div 
                                            className="position-absolute bottom-0 end-0 rounded-circle bg-white shadow d-flex align-items-center justify-content-center"
                                            style={{ width: "46px", height: "46px", color: isLcaba ? "#0284c7" : "#2563eb" }}
                                        >
                                            <i className={isLcaba ? "ri-shield-user-line fs-5" : "ri-user-heart-line fs-5"} />
                                        </div>
                                    </div>

                                    <h4 className="text-white mt-4 mb-2 fw-bold">
                                        {isLcaba ? "Portal del Personal" : "Tu Voz en la Ciudad"}
                                    </h4>
                                    <p className="text-white text-opacity-75 small px-lg-4 mb-0">
                                        {isLcaba 
                                            ? "Acceso exclusivo para miembros y colaboradores de la Legislatura de la Ciudad." 
                                            : "Participá activamente en las propuestas y proyectos de tu comunidad."}
                                    </p>
                                </div>

                                {/* Footer del banner */}
                                <div className="d-flex justify-content-between align-items-center position-relative z-2 text-white text-opacity-75 small pt-3 border-top border-white border-opacity-10">
                                    <span>© 2026 Legislatura CABA</span>
                                    <div className="d-flex gap-2">
                                        <i className="ri-lock-2-line" />
                                        <span>Conexión Segura SSL</span>
                                    </div>
                                </div>
                            </div>

                            {/* COLUMNA 2: FORMULARIO */}
                            <div className="col-lg-6 col-12 p-4 p-md-5 d-flex flex-column justify-content-between bg-white">
                                
                                <div>
                                    {/* Selector de Acceso (LCABA vs Externo) */}
                                    <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
                                        <div className="login-tabs-switcher">
                                            <Link 
                                                href="/login/ext"
                                                className={`login-tab-btn ${!isLcaba ? "active" : ""}`}
                                            >
                                                Registrados
                                            </Link>
                                            <Link 
                                                href="/login/lcaba"
                                                className={`login-tab-btn ${isLcaba ? "active" : ""}`}
                                            >
                                                Personal LCABA
                                            </Link>
                                        </div>

                                        <span className="small text-muted">
                                            {isLcaba ? "Vista: Derecha" : "Vista: Izquierda"}
                                        </span>
                                    </div>

                                    {/* Sub-selector Sign In / Sign Up para Externos */}
                                    {!isLcaba && (
                                        <div className="d-flex gap-4 border-bottom mb-4 pb-2">
                                            <button 
                                                type="button" 
                                                onClick={() => setAuthMode("signin")}
                                                className={`btn p-0 text-capitalize fw-bold ${authMode === "signin" ? "text-primary border-bottom border-primary border-2 pb-2 mb-[-2px]" : "text-muted"}`}
                                                style={{ borderRadius: 0 }}
                                            >
                                                Iniciar Sesión
                                            </button>
                                            <button 
                                                type="button" 
                                                onClick={() => setAuthMode("signup")}
                                                className={`btn p-0 text-capitalize fw-bold ${authMode === "signup" ? "text-primary border-bottom border-primary border-2 pb-2 mb-[-2px]" : "text-muted"}`}
                                                style={{ borderRadius: 0 }}
                                            >
                                                Crear Cuenta
                                            </button>
                                        </div>
                                    )}

                                    {/* Titular */}
                                    <div className="mb-4">
                                        <h3 className="fw-bold text-dark mb-1">
                                            {isLcaba 
                                                ? "Acceso Empleados LCABA" 
                                                : authMode === "signin" 
                                                    ? "Bienvenido de nuevo" 
                                                    : "Registrate en la plataforma"}
                                        </h3>
                                        <p className="text-muted small">
                                            {isLcaba 
                                                ? "Ingresá tus credenciales oficiales de red."
                                                : authMode === "signin" 
                                                    ? "Ingresá tus datos para acceder a tu perfil." 
                                                    : "Completá tus datos para formar parte de las iniciativas."}
                                        </p>
                                    </div>

                                    {/* FORMULARIOS */}
                                    {isLcaba ? (
                                        /* Formulario LCABA */
                                        <form onSubmit={(e) => e.preventDefault()} className="d-flex flex-column gap-3">
                                            <div>
                                                <label className="form-label small text-muted text-uppercase fw-semibold mb-1">
                                                    Usuario de Red o Email
                                                </label>
                                                <input 
                                                    type="text" 
                                                    className="form-control login-input-clean" 
                                                    placeholder="usuario@legislatura.gob.ar" 
                                                />
                                            </div>

                                            <div>
                                                <label className="form-label small text-muted text-uppercase fw-semibold mb-1">
                                                    Contraseña de Dominio
                                                </label>
                                                <input 
                                                    type="password" 
                                                    className="form-control login-input-clean" 
                                                    placeholder="••••••••" 
                                                />
                                            </div>

                                            <div className="pt-3">
                                                <button 
                                                    type="submit" 
                                                    className="btn btn-primary w-100 py-3 rounded-pill fw-semibold shadow-sm"
                                                    style={{ backgroundColor: "#0284c7", borderColor: "#0284c7" }}
                                                >
                                                    Entrar al Sistema LCABA
                                                </button>
                                            </div>

                                            <div className="text-center mt-3">
                                                <Link href="/login/ext" className="small text-muted text-decoration-none">
                                                    ¿No sos personal interno? <span className="text-primary fw-semibold">Ingresá como ciudadano</span>
                                                </Link>
                                            </div>
                                        </form>
                                    ) : (
                                        /* Formulario Externo (Sign In / Sign Up) */
                                        <form onSubmit={(e) => e.preventDefault()} className="d-flex flex-column gap-3">
                                            {authMode === "signup" && (
                                                <div>
                                                    <label className="form-label small text-muted text-uppercase fw-semibold mb-1">
                                                        Nombre Completo
                                                    </label>
                                                    <input 
                                                        type="text" 
                                                        className="form-control login-input-clean" 
                                                        placeholder="Tu nombre y apellido" 
                                                    />
                                                </div>
                                            )}

                                            <div>
                                                <label className="form-label small text-muted text-uppercase fw-semibold mb-1">
                                                    Correo Electrónico
                                                </label>
                                                <input 
                                                    type="email" 
                                                    className="form-control login-input-clean" 
                                                    placeholder="nombre@ejemplo.com" 
                                                />
                                            </div>

                                            <div>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <label className="form-label small text-muted text-uppercase fw-semibold mb-1">
                                                        Contraseña
                                                    </label>
                                                    {authMode === "signin" && (
                                                        <Link href="/recuperar-password" className="small text-primary text-decoration-none">
                                                            ¿Olvidaste tu contraseña?
                                                        </Link>
                                                    )}
                                                </div>
                                                <input 
                                                    type="password" 
                                                    className="form-control login-input-clean" 
                                                    placeholder="••••••••" 
                                                />
                                            </div>

                                            <div className="pt-3">
                                                <button 
                                                    type="submit" 
                                                    className="btn btn-primary w-100 py-3 rounded-pill fw-semibold shadow-sm"
                                                >
                                                    {authMode === "signin" ? "Iniciar Sesión" : "Crear Mi Cuenta"}
                                                </button>
                                            </div>

                                            <div className="text-center mt-3">
                                                <button 
                                                    type="button" 
                                                    onClick={() => setAuthMode(authMode === "signin" ? "signup" : "signin")}
                                                    className="btn btn-link p-0 small text-decoration-none text-muted"
                                                >
                                                    {authMode === "signin" ? (
                                                        <>¿No tenés una cuenta? <span className="text-primary fw-semibold">Registrate acá</span></>
                                                    ) : (
                                                        <>¿Ya tenés una cuenta? <span className="text-primary fw-semibold">Iniciá sesión</span></>
                                                    )}
                                                </button>
                                            </div>
                                        </form>
                                    )}
                                </div>

                                {/* Redes / Footer del Formulario */}
                                <div className="mt-4 pt-3 border-top d-flex justify-content-between align-items-center text-muted small">
                                    <div className="d-flex gap-3">
                                        <a href="#" className="text-muted"><i className="ri-facebook-circle-line fs-5" /></a>
                                        <a href="#" className="text-muted"><i className="ri-twitter-x-line fs-5" /></a>
                                        <a href="#" className="text-muted"><i className="ri-instagram-line fs-5" /></a>
                                    </div>
                                    <Link href="/contacto" className="text-muted text-decoration-none">
                                        <i className="ri-mail-line me-1" /> Soporte
                                    </Link>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
