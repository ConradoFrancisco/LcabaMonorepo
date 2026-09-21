"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";

interface LoginComponentProps {
  type?: string;
}

export default function LoginComponent({ type }: LoginComponentProps) {
  const [seePass, setSeePass] = useState('password');

  const router = useRouter();
  const { login, loginExt, isAuthenticated } = useAuth();

  // Determinamos si es lcaba o externo. Por defecto si no viene o es ext, es externo.
  const isLcaba = type === "lcaba";
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");

  // Estados para formulario LCABA
  const [lcabaUser, setLcabaUser] = useState("");
  const [lcabaPass, setLcabaPass] = useState("");

  // Estados para formulario Externo (Ciudadano)
  const [extEmail, setExtEmail] = useState("");
  const [extPass, setExtPass] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [pendingActivation, setPendingActivation] = useState(false);

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
    setErrorMessage(null);
    setSeePass("password");
    setIsTransitioning(true);
    setTimeout(() => router.push(href), 280);
  };

  const handleLcabaSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!lcabaUser.trim() || !lcabaPass.trim()) {
      setErrorMessage("Por favor completá todos los campos");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await login(lcabaUser.trim(), lcabaPass);
      if (result.ok) {
        const displayName = result.user?.name || result.user?.username || lcabaUser.trim();
        toast.success(`¡Bienvenido/a, ${displayName}!`, { position: "bottom-right" });
        router.push("/");
      } else {
        setErrorMessage(result.message);
      }
    } catch {
      setErrorMessage("Ocurrió un error inesperado al iniciar sesión.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleExtSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("[LOGIN_EXT] handleExtSubmit triggered:", { extEmail, extPass: extPass ? "***" : "" });
    setErrorMessage(null);
    setPendingActivation(false);

    if (!extEmail.trim() || !extPass.trim()) {
      setErrorMessage("Por favor completá tu correo y contraseña");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await loginExt(extEmail.trim(), extPass);
      console.log("[LOGIN_EXT] result:", result);
      if (result.ok) {
        const displayName = result.user?.name || result.user?.username || extEmail.trim();
        toast.success(`¡Bienvenido/a, ${displayName}!`, { position: "bottom-right" });
        router.push("/");
      } else {
        // Si el error es cuenta sin activar, mostramos un banner especial
        if (!result.ok && result.message?.includes("activada")) {
          setPendingActivation(true);
        } else {
          setErrorMessage(result.message);
        }
      }
    } catch (err) {
      console.error("[LOGIN_EXT] catch error:", err);
      setErrorMessage("Ocurrió un error inesperado al iniciar sesión.");
    } finally {
      setIsSubmitting(false);
    }
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
                      onSubmit={handleLcabaSubmit}
                      className="d-flex flex-column gap-3"
                    >
                      {errorMessage && (
                        <div className="alert alert-danger py-2 px-3 small rounded-3 d-flex align-items-center gap-2 mb-0">
                          <i className="ri-error-warning-line fs-5 flex-shrink-0" />
                          <span>{errorMessage}</span>
                        </div>
                      )}

                      <div>
                        <label className="form-label small text-muted text-uppercase fw-semibold mb-1">
                          Usuario de red
                        </label>
                        <input
                          type="text"
                          className="form-control login-input-clean"
                          placeholder="Usuario"
                          value={lcabaUser}
                          onChange={(e) => setLcabaUser(e.target.value)}
                          disabled={isSubmitting}
                          required
                          autoFocus
                        />
                      </div>

                      <div>
                        <label className="form-label small text-muted text-uppercase fw-semibold mb-1">
                          Contraseña
                        </label>
                        <div className="position-relative">
                          <input
                            type={seePass}
                            className="form-control login-input-clean pe-5"
                            placeholder="Contraseña"
                            value={lcabaPass}
                            onChange={(e) => setLcabaPass(e.target.value)}
                            disabled={isSubmitting}
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setSeePass((prev) => (prev === "password" ? "text" : "password"))}
                            className="btn position-absolute top-50 end-0 translate-middle-y border-0 bg-transparent text-muted p-0 me-3"
                            style={{ boxShadow: "none", zIndex: 5 }}
                            title={seePass === "password" ? "Mostrar contraseña" : "Ocultar contraseña"}
                            tabIndex={-1}
                          >
                            <i className={seePass === "password" ? "ri-eye-line fs-5" : "ri-eye-off-line fs-5 text-primary"} />
                          </button>
                        </div>
                      </div>

                      <div className="pt-3">
                        <button
                          type="submit"
                          className="btn btn-primary w-100 py-3 rounded-pill fw-semibold shadow-sm d-flex align-items-center justify-content-center gap-2"
                          style={{
                            backgroundColor: "#0284c7",
                            borderColor: "#0284c7",
                          }}
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                              <span>Iniciando sesión...</span>
                            </>
                          ) : (
                            <span>Ingresar</span>
                          )}
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
                      onSubmit={handleExtSubmit}
                      className="d-flex flex-column gap-3"
                    >
                      {pendingActivation && (
                        <div className="alert alert-warning py-3 px-3 small rounded-3 mb-0">
                          <div className="d-flex align-items-center gap-2 mb-1">
                            <i className="ri-mail-send-line fs-5 flex-shrink-0 text-warning-emphasis" />
                            <strong>Cuenta pendiente de activación</strong>
                          </div>
                          <p className="mb-0">
                            Revisá tu casilla de correo <strong>{extEmail}</strong> y hacé clic en el enlace de confirmación que te enviamos al registrarte.
                          </p>
                        </div>
                      )}
                      {errorMessage && !pendingActivation && (
                        <div className="alert alert-danger py-2 px-3 small rounded-3 d-flex align-items-center gap-2 mb-0">
                          <i className="ri-error-warning-line fs-5 flex-shrink-0" />
                          <span>{errorMessage}</span>
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
                          value={extEmail}
                          onChange={(e) => setExtEmail(e.target.value)}
                          disabled={isSubmitting}
                          required
                          autoFocus
                        />
                      </div>

                      <div>
                        <div className="d-flex justify-content-between align-items-center">
                          <label className="form-label small text-muted text-uppercase fw-semibold mb-1">
                            Contraseña
                          </label>
                          <Link
                            href="/recuperar-password"
                            className="small text-primary text-decoration-none"
                          >
                            ¿Olvidaste tu contraseña?
                          </Link>
                        </div>
                        <div className="position-relative">
                          <input
                            type={seePass}
                            className="form-control login-input-clean pe-5"
                            placeholder="••••••••"
                            value={extPass}
                            onChange={(e) => setExtPass(e.target.value)}
                            disabled={isSubmitting}
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setSeePass((prev) => (prev === "password" ? "text" : "password"))}
                            className="btn position-absolute top-50 end-0 translate-middle-y border-0 bg-transparent text-muted p-0 me-3"
                            style={{ boxShadow: "none", zIndex: 5 }}
                            title={seePass === "password" ? "Mostrar contraseña" : "Ocultar contraseña"}
                            tabIndex={-1}
                          >
                            <i className={seePass === "password" ? "ri-eye-line fs-5" : "ri-eye-off-line fs-5 text-primary"} />
                          </button>
                        </div>
                      </div>

                      <div className="pt-3">
                        <button
                          type="submit"
                          className="btn btn-primary w-100 py-3 rounded-pill fw-semibold shadow-sm d-flex align-items-center justify-content-center gap-2"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                              <span>Iniciando sesión...</span>
                            </>
                          ) : (
                            <span>Iniciar Sesión</span>
                          )}
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
