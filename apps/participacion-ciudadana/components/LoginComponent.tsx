"use client";

import React, { useEffect, useRef, useState } from "react";
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

  // Transición entre /login/lcaba y /login/ext: se desvanece la card,
  // se navega, y al llegar el contenido nuevo vuelve a aparecer.
  const [isTransitioning, setIsTransitioning] = useState(false);
  const prevTypeRef = useRef(type);

  useEffect(() => {
    if (prevTypeRef.current !== type) {
      prevTypeRef.current = type;
      const frame = requestAnimationFrame(() => setIsTransitioning(false));
      return () => cancelAnimationFrame(frame);
    }
  }, [type]);

  const handleModeSwitch = (e: React.MouseEvent, href: string) => {
    const current = isLcaba ? "/login/lcaba" : "/login/ext";
    if (href === current) return;
    e.preventDefault();
    setIsTransitioning(true);
    setTimeout(() => router.push(href), 280);
  };

  return (
    <section className="login-page-wrapper">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-xl-10">
            {/* 
                            Si es LCABA: Banner gráfico a la DERECHA, formulario a la IZQUIERDA (flex-lg-row-reverse).
                            Si es Externo: Banner gráfico a la IZQUIERDA, formulario a la DERECHA (flex-lg-row).
                        */}
            <div
              className={`login-split-card row g-0 ${isLcaba ? "flex-lg-row-reverse" : "flex-lg-row"} ${isTransitioning ? "is-transitioning" : ""}`}
            >
              {/* COLUMNA 1: BANNER VISUAL */}
              <div
                className={`col-lg-6 col-12 login-visual-banner ${isLcaba ? "theme-lcaba" : "theme-ext"}`}
                style={{
                  background: `url('${isLcaba ? "/assets/imgs/login-lcaba-ad.jpg" : "/assets/imgs/login-lcaba-ext.jpg"}') center center / cover no-repeat`,
                  minHeight: "540px",
                }}
              >
                <div />

                {/* Footer del banner */}
                <div className="d-flex justify-content-between align-items-center position-relative z-2 text-white text-opacity-75 small pt-3 border-top border-white border-opacity-10">
                  <span>© {new Date().getFullYear()} Legislatura CABA</span>
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
                        onClick={(e) => handleModeSwitch(e, "/login/ext")}
                        className={`login-tab-btn ${!isLcaba ? "active" : ""}`}
                      >
                        Registrados
                      </Link>
                      <Link
                        href="/login/lcaba"
                        onClick={(e) => handleModeSwitch(e, "/login/lcaba")}
                        className={`login-tab-btn ${isLcaba ? "active" : ""}`}
                      >
                        Personal Legislatura
                      </Link>
                    </div>
                  </div>

                  {/* Titular */}
                  <div className="mb-4">
                    <h3 className="fw-bold text-dark mb-1">
                      {isLcaba
                        ? "Acceso empleados Legislatura"
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
                    <form
                      onSubmit={(e) => e.preventDefault()}
                      className="d-flex flex-column gap-3"
                    >
                      <div>
                        <label className="form-label small text-muted text-uppercase fw-semibold mb-1">
                          Usuario de red
                        </label>
                        <input
                          type="text"
                          className="form-control login-input-clean"
                          placeholder="Usuario"
                        />
                      </div>

                      <div>
                        <label className="form-label small text-muted text-uppercase fw-semibold mb-1">
                          Contraseña
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
                          style={{
                            backgroundColor: "#0284c7",
                            borderColor: "#0284c7",
                          }}
                        >
                          Ingresar
                        </button>
                      </div>

                      <div className="text-center mt-3">
                        <Link
                          href="/login/ext"
                          onClick={(e) => handleModeSwitch(e, "/login/ext")}
                          className="small text-muted text-decoration-none"
                        >
                          ¿No sos personal interno?{" "}
                          <span className="text-primary fw-semibold">
                            Ingresá como ciudadano
                          </span>
                        </Link>
                      </div>
                    </form>
                  ) : (
                    /* Formulario Externo (Sign In / Sign Up) */
                    <form
                      onSubmit={(e) => e.preventDefault()}
                      className="d-flex flex-column gap-3"
                    >
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
                          placeholder="usuario@correo.com"
                        />
                      </div>

                      <div>
                        <div className="d-flex justify-content-between align-items-center">
                          <label className="form-label small text-muted text-uppercase fw-semibold mb-1">
                            Contraseña
                          </label>
                          {authMode === "signin" && (
                            <Link
                              href="/recuperar-password"
                              className="small text-primary text-decoration-none"
                            >
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
                          {authMode === "signin"
                            ? "Iniciar Sesión"
                            : "Crear Mi Cuenta"}
                        </button>
                      </div>

                      <div className="text-center mt-3">
                        {authMode === "signin" ? (
                          <Link
                            href="/registro"
                            onClick={(e) => handleModeSwitch(e, "/registro")}
                            className="btn btn-link p-0 small text-decoration-none text-muted"
                          >
                            ¿No tenés una cuenta?{" "}
                            <span className="text-primary fw-semibold">
                              Registrate acá
                            </span>
                          </Link>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setAuthMode("signin")}
                            className="btn btn-link p-0 small text-decoration-none text-muted"
                          >
                            ¿Ya tenés una cuenta?{" "}
                            <span className="text-primary fw-semibold">
                              Iniciá sesión
                            </span>
                          </button>
                        )}
                      </div>
                    </form>
                  )}
                </div>

                {/* Redes / Footer del Formulario */}
                <div className="mt-4 pt-3 border-top d-flex justify-content-between align-items-center text-muted small">
                  <div className="d-flex gap-3">
                    <a href="#" className="text-muted">
                      <i className="ri-facebook-circle-line fs-5" />
                    </a>
                    <a href="#" className="text-muted">
                      <i className="ri-twitter-x-line fs-5" />
                    </a>
                    <a href="#" className="text-muted">
                      <i className="ri-instagram-line fs-5" />
                    </a>
                  </div>
                  <Link
                    href="/contacto"
                    className="text-muted text-decoration-none"
                  >
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
