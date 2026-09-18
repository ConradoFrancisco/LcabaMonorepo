"use client";

import React from "react";
import Link from "next/link";

interface LoginComponentProps {
    type?: string;
}

export default function LoginComponent({ type }: LoginComponentProps) {
    const isLcaba = type === "lcaba";
    const isExternal = type === "ext" || type === "externos";

    return (
        <section className="login-section py-50 py-lg-100">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-6 col-md-8 col-12">
                        <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5">
                            
                            {/* Header del Formulario */}
                            <div className="text-center mb-4">
                                <div 
                                    className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
                                    style={{
                                        width: "60px",
                                        height: "60px",
                                        backgroundColor: isLcaba ? "#e0f2fe" : "#f1f5f9",
                                        color: isLcaba ? "var(--tc-theme-primary)" : "#334155"
                                    }}
                                >
                                    <i 
                                        className={isLcaba ? "ri-smartphone-line" : "ri-user-line"} 
                                        style={{ fontSize: "28px" }} 
                                    />
                                </div>
                                <h3 className="fw-bold mb-1">
                                    {isLcaba ? "Acceso Personal LCABA" : isExternal ? "Acceso Usuarios Registrados" : "Iniciar Sesión"}
                                </h3>
                                <p className="text-muted small">
                                    {isLcaba 
                                        ? "Ingresá con tu usuario de red y credenciales de LCABA" 
                                        : isExternal 
                                            ? "Ingresá con tu correo electrónico y contraseña" 
                                            : "Seleccioná tu tipo de cuenta para continuar"}
                                </p>
                            </div>

                            {/* Renderizado condicional según tipo de acceso */}
                            {isLcaba ? (
                                /* Formulario para Personal LCABA */
                                <form onSubmit={(e) => e.preventDefault()} className="d-flex flex-column gap-3">
                                    <div>
                                        <label className="form-label fw-medium small text-dark">Usuario LCABA</label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-light border-end-0">
                                                <i className="ri-user-settings-line text-muted" />
                                            </span>
                                            <input 
                                                type="text" 
                                                className="form-control border-start-0" 
                                                placeholder="ejemplo@legislatura.gob.ar o usuario" 
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="form-label fw-medium small text-dark">Contraseña de Red</label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-light border-end-0">
                                                <i className="ri-lock-line text-muted" />
                                            </span>
                                            <input 
                                                type="password" 
                                                className="form-control border-start-0" 
                                                placeholder="••••••••" 
                                            />
                                        </div>
                                    </div>

                                    <button 
                                        type="submit" 
                                        className="btn btn-primary w-100 mt-2 py-2 fw-semibold"
                                    >
                                        Ingresar a LCABA
                                    </button>

                                    <div className="text-center mt-3">
                                        <Link href="/login/ext" className="small text-muted text-decoration-none">
                                            ¿Sos usuario externo? <span className="text-primary fw-medium">Ingresá acá</span>
                                        </Link>
                                    </div>
                                </form>
                            ) : isExternal ? (
                                /* Formulario para Usuarios Registrados (Externos) */
                                <form onSubmit={(e) => e.preventDefault()} className="d-flex flex-column gap-3">
                                    <div>
                                        <label className="form-label fw-medium small text-dark">Correo Electrónico</label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-light border-end-0">
                                                <i className="ri-mail-line text-muted" />
                                            </span>
                                            <input 
                                                type="email" 
                                                className="form-control border-start-0" 
                                                placeholder="tu@correo.com" 
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <label className="form-label fw-medium small text-dark mb-0">Contraseña</label>
                                            <Link href="/recuperar-password" className="small text-primary text-decoration-none">
                                                ¿Olvidaste tu contraseña?
                                            </Link>
                                        </div>
                                        <div className="input-group mt-1">
                                            <span className="input-group-text bg-light border-end-0">
                                                <i className="ri-lock-line text-muted" />
                                            </span>
                                            <input 
                                                type="password" 
                                                className="form-control border-start-0" 
                                                placeholder="••••••••" 
                                            />
                                        </div>
                                    </div>

                                    <button 
                                        type="submit" 
                                        className="btn btn-primary w-100 mt-2 py-2 fw-semibold"
                                    >
                                        Iniciar Sesión
                                    </button>

                                    <div className="text-center mt-3 d-flex flex-column gap-2">
                                        <Link href="/registro" className="small text-muted text-decoration-none">
                                            ¿No tenés una cuenta? <span className="text-primary fw-medium">Creá una</span>
                                        </Link>
                                        <Link href="/login/lcaba" className="small text-muted text-decoration-none">
                                            ¿Pertenecés a la Legislatura? <span className="text-primary fw-medium">Acceso LCABA</span>
                                        </Link>
                                    </div>
                                </form>
                            ) : (
                                /* Vista por defecto si entran directo a /login sin parámetro */
                                <div className="d-flex flex-column gap-3 mt-2">
                                    <Link 
                                        href="/login/lcaba" 
                                        className="btn btn-outline-secondary d-flex align-items-center justify-content-between p-3 rounded-3"
                                    >
                                        <div className="d-flex align-items-center gap-3">
                                            <i className="ri-smartphone-line text-primary fs-4" />
                                            <div className="text-start">
                                                <div className="fw-semibold text-dark">Acceso Personal LCABA</div>
                                                <div className="small text-muted">Para personal interno de la Legislatura</div>
                                            </div>
                                        </div>
                                        <i className="ri-arrow-right-s-line fs-5 text-muted" />
                                    </Link>

                                    <Link 
                                        href="/login/ext" 
                                        className="btn btn-outline-secondary d-flex align-items-center justify-content-between p-3 rounded-3"
                                    >
                                        <div className="d-flex align-items-center gap-3">
                                            <i className="ri-user-3-line text-primary fs-4" />
                                            <div className="text-start">
                                                <div className="fw-semibold text-dark">Acceso Usuarios Registrados</div>
                                                <div className="small text-muted">Para ciudadanos y participantes registrados</div>
                                            </div>
                                        </div>
                                        <i className="ri-arrow-right-s-line fs-5 text-muted" />
                                    </Link>

                                    <div className="text-center mt-3">
                                        <Link href="/registro" className="small text-muted text-decoration-none">
                                            ¿Aún no estás registrado? <span className="text-primary fw-semibold">Creá una cuenta</span>
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
