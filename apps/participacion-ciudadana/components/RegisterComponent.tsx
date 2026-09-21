"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";

// ─── Tipos ───────────────────────────────────────────────────────────────────
interface FormData {
    // Paso 1 – Datos Personales
    nombre: string;
    apellido: string;
    tipoDocumento: string;
    numeroDni: string;
    fechaNacimiento: string;
    genero: string;
    // Paso 2 – Domicilio
    calleNumero: string;
    pisoDpto: string;
    pais: string;
    provincia: string;
    comunaPartido: string;
    codigoPostal: string;
    // Paso 3 – Info de Contacto
    email: string;
    emailConfirm: string;
    telefonoMovil: string;
    telefonoFijo: string;
    // Paso 4 – Info Complementaria
    ocupacion: string;
    nivelEducativo: string;
    password: string;
    passwordConfirm: string;
    aceptaTerminos: boolean;
    aceptaNotificaciones: boolean;
}

const INITIAL_FORM: FormData = {
    nombre: "", apellido: "", tipoDocumento: "DNI", numeroDni: "",
    fechaNacimiento: "", genero: "",
    calleNumero: "", pisoDpto: "", pais: "Argentina", provincia: "", comunaPartido: "", codigoPostal: "",
    email: "", emailConfirm: "", telefonoMovil: "", telefonoFijo: "",
    ocupacion: "", nivelEducativo: "", password: "", passwordConfirm: "", aceptaTerminos: false, aceptaNotificaciones: false,
};

// ─── Configuración de pasos ──────────────────────────────────────────────────
const STEPS = [
    { id: 1, label: "Datos Personales", icon: "ri-user-3-line", title: "Datos Personales", subtitle: "Necesitamos verificar tu identidad para completar el registro." },
    { id: 2, label: "Domicilio", icon: "ri-map-pin-2-line", title: "Domicilio", subtitle: "Ingresá tu domicilio actual. Los campos marcados con ▲ son obligatorios." },
    { id: 3, label: "Info de Contacto", icon: "ri-mail-line", title: "Info de Contacto", subtitle: "Tu email será tu usuario de acceso a la plataforma." },
    { id: 4, label: "Info Complementaria", icon: "ri-file-user-line", title: "Info Complementaria", subtitle: "Estos datos nos ayudan a conectarte con iniciativas de tu comunidad." },
];

// Provincias argentinas

interface Provincia {
    id: number;
    nombre: string;
    nombre_completo: string;
    categoria: string;
    centroide_lat: number | null;
    centroide_lon: number | null;
    fuente: string;
    iso_id: string | null;
    iso_nombre: string | null;
    pais: string;
}

interface Departamento {
    id: number;
    nombre: string;
    provincia_id: number;
    centroide_lat: number | null;
    centroide_lon: number | null;
    poblacion: number | null;
}

// ─── Componente principal ────────────────────────────────────────────────────
export default function RegisterComponent({ menuItems, logo }: any) {
    const router = useRouter();
    const { registerExt } = useAuth();

    const [provincias, setProvincias] = useState<Provincia[]>([]);
    const [departamentos, setDepartamentos] = useState<Departamento[]>([]);
    const [loadingProvincias, setLoadingProvincias] = useState(false);
    const [loadingDepartamentos, setLoadingDepartamentos] = useState(false);

    const apiBase = process.env.NEXT_PUBLIC_API || "http://localhost:3000";

    const fetchProvincias = async () => {
        setLoadingProvincias(true);
        try {
            const res = await fetch(`${apiBase}/provincias`);
            const data = await res.json();
            if (Array.isArray(data)) {
                setProvincias(data);
            }
        } catch (error) {
            console.error('Error al obtener provincias:', error);
        } finally {
            setLoadingProvincias(false);
        }
    };

    const fetchDepartamentos = async (provinciaId: number) => {
        setLoadingDepartamentos(true);
        try {
            const res = await fetch(`${apiBase}/provincias/${provinciaId}/departamentos`);
            const data = await res.json();
            if (Array.isArray(data)) {
                setDepartamentos(data);
            }
        } catch (error) {
            console.error('Error al obtener departamentos:', error);
        } finally {
            setLoadingDepartamentos(false);
        }
    };
    const [form, setForm] = useState<FormData>(INITIAL_FORM);

    useEffect(() => {
        fetchProvincias();
    }, []);

    useEffect(() => {
        if (form.provincia) {
            fetchDepartamentos(Number(form.provincia));
        } else {
            setDepartamentos([]);
        }
    }, [form.provincia]);

    const [step, setStep] = useState(1);
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const totalSteps = STEPS.length;
    const currentStep = STEPS[step - 1];
    const progress = step === 1 ? 5 : ((step - 1) / (totalSteps - 1)) * 100;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const target = e.target as HTMLInputElement;
        const value = target.type === "checkbox" ? target.checked : target.value;
        setForm(prev => ({ ...prev, [target.name]: value }));
    };

    const goNext = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage(null);

        if (step < totalSteps) {
            setStep(s => s + 1);
            return;
        }

        // Validación final
        if (form.password !== form.passwordConfirm) {
            setErrorMessage("Las contraseñas no coinciden");
            return;
        }
        if (!form.aceptaTerminos) {
            setErrorMessage("Debés aceptar los términos y condiciones");
            return;
        }

        setIsSubmitting(true);
        try {
            // Resolver el nombre de la provincia a partir de su ID si fue seleccionado
            const selectedProv = provincias.find(p => String(p.id) === String(form.provincia));
            const payload = {
                ...form,
                provincia: selectedProv?.nombre || selectedProv?.nombre_completo || form.provincia,
            };
            const result = await registerExt(payload);
            if (result.ok) {
                toast.success(`¡Registro iniciado! Te enviamos un email de confirmación a ${form.email}`, { position: "bottom-right", autoClose: 5000 });
                setSubmitted(true);
            } else {
                setErrorMessage(result.message);
            }
        } catch {
            setErrorMessage("Error de conexión al procesar el registro.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const goPrev = () => {
        setErrorMessage(null);
        if (step > 1) setStep(s => s - 1);
    };

    // ─── PASO 1: Datos Personales ─────────────────────────────────────────────
    const renderStep1 = () => (
        <div className="d-flex flex-column gap-3">
            <div className="register-notice-banner">
                <i className="ri-information-line me-2 text-primary" />
                <span>
                    Este registro es <strong>exclusivamente para ciudadanos</strong>.
                    Si sos empleado/a de LCABA, ingresá con tu usuario y clave de red por{" "}
                    <Link href="/login/lcaba" className="text-primary fw-semibold">aquí</Link>.
                </span>
            </div>

            <div className="row g-3">
                <div className="col-12 col-md-6">
                    <label className="register-label">Nombre <span className="register-required">▲</span></label>
                    <input name="nombre" type="text" className="form-control login-input-clean"
                        placeholder="Tu nombre" value={form.nombre} onChange={handleChange} required />
                </div>
                <div className="col-12 col-md-6">
                    <label className="register-label">Apellido <span className="register-required">▲</span></label>
                    <input name="apellido" type="text" className="form-control login-input-clean"
                        placeholder="Tu apellido" value={form.apellido} onChange={handleChange} required />
                </div>
            </div>

            <div className="row g-3">
                <div className="col-12 col-md-4">
                    <label className="register-label">Tipo de Documento <span className="register-required">▲</span></label>
                    <select name="tipoDocumento" className="form-select login-input-clean"
                        value={form.tipoDocumento} onChange={handleChange}>
                        <option value="DNI">DNI</option>
                        <option value="LE">LE</option>
                        <option value="LC">LC</option>
                        <option value="PASAPORTE">Pasaporte</option>
                    </select>
                </div>
                <div className="col-12 col-md-8">
                    <label className="register-label">Número de Documento <span className="register-required">▲</span></label>
                    <input name="numeroDni" type="text" className="form-control login-input-clean"
                        placeholder="Ej: 32456789" value={form.numeroDni} onChange={handleChange} required />
                </div>
            </div>

            <div className="row g-3">
                <div className="col-12 col-md-6">
                    <label className="register-label">Fecha de Nacimiento <span className="register-required">▲</span></label>
                    <input name="fechaNacimiento" type="date" className="form-control login-input-clean"
                        value={form.fechaNacimiento} onChange={handleChange} required />
                </div>
                <div className="col-12 col-md-6">
                    <label className="register-label">Género</label>
                    <select name="genero" className="form-select login-input-clean"
                        value={form.genero} onChange={handleChange}>
                        <option value="">Seleccioná...</option>
                        <option value="femenino">Femenino</option>
                        <option value="masculino">Masculino</option>
                        <option value="no_binario">No binario</option>
                        <option value="otro">Otro</option>
                        <option value="prefiero_no_decir">Prefiero no decir</option>
                    </select>
                </div>
            </div>
        </div>
    );

    // ─── PASO 2: Domicilio ────────────────────────────────────────────────────
    const renderStep2 = () => (
        <div className="d-flex flex-column gap-3">
            <div>
                <label className="register-label">Calle y Número <span className="register-required">▲</span></label>
                <input name="calleNumero" type="text" className="form-control login-input-clean"
                    placeholder="Calle y Número" value={form.calleNumero} onChange={handleChange} required />
            </div>

            <div>
                <label className="register-label">Piso y Departamento</label>
                <input name="pisoDpto" type="text" className="form-control login-input-clean"
                    placeholder="Piso y Departamento" value={form.pisoDpto} onChange={handleChange} />
            </div>

            <div className="row g-3">
                <div className="col-12 col-md-4">
                    <label className="register-label">País <span className="register-required">▲</span></label>
                    <input name="pais" type="text" className="form-control login-input-clean"
                        value={form.pais} onChange={handleChange} required />
                </div>
                <div className="col-12 col-md-4">
                    <label className="register-label">Provincia</label>
                    <select
                        name="provincia"
                        className="form-select login-input-clean"
                        value={form.provincia}
                        onChange={(e) => {
                            handleChange(e);
                            setForm(prev => ({ ...prev, comunaPartido: "" }));
                        }}
                    >
                        <option value="">{loadingProvincias ? "Cargando provincias..." : "Seleccioná..."}</option>
                        {provincias.map((p) => (
                            <option key={p.id} value={p.id}>
                                {p.nombre || p.nombre_completo}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="col-12 col-md-4">
                    <label className="register-label">Comuna/Partido/Departamento</label>
                    {departamentos.length > 0 ? (
                        <select
                            name="comunaPartido"
                            className="form-select login-input-clean"
                            value={form.comunaPartido}
                            onChange={handleChange}
                        >
                            <option value="">{loadingDepartamentos ? "Cargando..." : "Seleccioná departamento..."}</option>
                            {departamentos.map((d: any) => (
                                <option key={d.id} value={d.nombre || d.nombre_completo}>
                                    {d.nombre || d.nombre_completo}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <input
                            name="comunaPartido"
                            type="text"
                            className="form-control login-input-clean"
                            placeholder={form.provincia ? (loadingDepartamentos ? "Cargando..." : "Comuna / Partido") : "Seleccioná provincia primero"}
                            value={form.comunaPartido}
                            onChange={handleChange}
                            disabled={loadingDepartamentos}
                        />
                    )}
                </div>
            </div>

            <div className="col-12 col-md-4">
                <label className="register-label">Código Postal</label>
                <input name="codigoPostal" type="text" className="form-control login-input-clean"
                    placeholder="Código Postal" value={form.codigoPostal} onChange={handleChange} />
            </div>

            <div className="register-info-alert">
                <i className="ri-information-line me-2" />
                Los campos Provincia - Comuna/Partido/Departamento son obligatorios si su domicilio es en Argentina.
            </div>

            <div className="register-required-hint">
                <span className="register-required">▲</span> DATOS OBLIGATORIOS (Sólo los datos marcados por el sistema o con el símbolo ▲ son de carácter obligatorio)
            </div>
        </div>
    );

    // ─── PASO 3: Info de Contacto ─────────────────────────────────────────────
    const renderStep3 = () => (
        <div className="d-flex flex-column gap-3">
            <div className="row g-4">
                <div className="col-12 col-md-6">
                    <label className="register-label">Correo Electrónico <span className="register-required">▲</span></label>
                    <input name="email" type="email" className="form-control login-input-clean"
                        placeholder="juanjose@jimail.com" value={form.email} onChange={handleChange} required />
                </div>
                <div className="col-12 col-md-6">
                    <label className="register-label">Repetir Correo Electrónico <span className="register-required">▲</span></label>
                    <input name="emailConfirm" type="email" className="form-control login-input-clean"
                        placeholder="juanjose@jimail.com" value={form.emailConfirm} onChange={handleChange} required />
                    {form.email && form.emailConfirm && form.email !== form.emailConfirm && (
                        <div className="text-danger small mt-1">
                            <i className="ri-error-warning-line me-1" />Los emails no coinciden
                        </div>
                    )}
                </div>
            </div>

            <div className="row g-4">
                <div className="col-12 col-md-6">
                    <label className="register-label">Teléfono Móvil <span className="register-required">▲</span></label>
                    <input name="telefonoMovil" type="tel" className="form-control login-input-clean"
                        placeholder="11 2223 3344" value={form.telefonoMovil} onChange={handleChange} required />
                </div>
                <div className="col-12 col-md-6">
                    <label className="register-label">Teléfono Fijo</label>
                    <input name="telefonoFijo" type="tel" className="form-control login-input-clean"
                        placeholder="11 4223 3344" value={form.telefonoFijo} onChange={handleChange} />
                </div>
            </div>

            <div className="register-required-hint">
                <span className="register-required">▲</span> DATOS OBLIGATORIOS (Sólo los datos marcados por el sistema o con el símbolo ▲ son de carácter obligatorio)
            </div>
        </div>
    );

    // ─── PASO 4: Info Complementaria ─────────────────────────────────────────
    const renderStep4 = () => {
        const strengthScore = (() => {
            const p = form.password;
            let s = 0;
            if (p.length >= 8) s++;
            if (/[A-Z]/.test(p)) s++;
            if (/[0-9]/.test(p)) s++;
            if (/[^A-Za-z0-9]/.test(p)) s++;
            return s;
        })();
        const strengthLabel = ["", "Débil", "Regular", "Buena", "Excelente"][strengthScore];
        const strengthColor = ["", "#ef4444", "#f97316", "#3b82f6", "#22c55e"][strengthScore];

        return (
            <div className="d-flex flex-column gap-3">
                {/* Contraseña (se define en el último paso) */}
                <div className="row g-4">
                    <div className="col-12 col-md-6">
                        <label className="register-label">Contraseña <span className="register-required">▲</span></label>
                        <input name="password" type="password" className="form-control login-input-clean"
                            placeholder="Mínimo 8 caracteres" value={form.password} onChange={handleChange} required />
                        {form.password && (
                            <div className="mt-2">
                                <div className="register-strength-bar">
                                    <div className="register-strength-fill" style={{
                                        width: `${(strengthScore / 4) * 100}%`,
                                        backgroundColor: strengthColor,
                                        transition: "width 0.3s ease, background-color 0.3s ease",
                                    }} />
                                </div>
                                <span className="small fw-semibold mt-1 d-block" style={{ color: strengthColor }}>{strengthLabel}</span>
                            </div>
                        )}
                        <div className="form-text mt-1">Mínimo 8 caracteres, mayúscula, número y símbolo.</div>
                    </div>
                    <div className="col-12 col-md-6">
                        <label className="register-label">Confirmá tu Contraseña <span className="register-required">▲</span></label>
                        <input name="passwordConfirm" type="password" className="form-control login-input-clean"
                            placeholder="Repetí tu contraseña" value={form.passwordConfirm} onChange={handleChange} required />
                        {form.password && form.passwordConfirm && form.password !== form.passwordConfirm && (
                            <div className="text-danger small mt-1"><i className="ri-error-warning-line me-1" />Las contraseñas no coinciden</div>
                        )}
                        {form.password && form.passwordConfirm && form.password === form.passwordConfirm && (
                            <div className="text-success small mt-1"><i className="ri-checkbox-circle-line me-1" />Las contraseñas coinciden</div>
                        )}
                    </div>
                </div>
                <div>
                    <label className="register-label">Ocupación</label>
                    <select name="ocupacion" className="form-select login-input-clean"
                        value={form.ocupacion} onChange={handleChange}>
                        <option value="">Seleccioná...</option>
                        <option value="empleado_publico">Empleado/a público/a</option>
                        <option value="empleado_privado">Empleado/a privado/a</option>
                        <option value="independiente">Independiente / Autónomo/a</option>
                        <option value="estudiante">Estudiante</option>
                        <option value="jubilado">Jubilado/a</option>
                        <option value="desocupado">Desocupado/a</option>
                        <option value="otra">Otra</option>
                    </select>
                </div>

                <div>
                    <label className="register-label">Nivel Educativo</label>
                    <select name="nivelEducativo" className="form-select login-input-clean"
                        value={form.nivelEducativo} onChange={handleChange}>
                        <option value="">Seleccioná...</option>
                        <option value="primario">Primario</option>
                        <option value="secundario">Secundario</option>
                        <option value="terciario">Terciario</option>
                        <option value="universitario">Universitario</option>
                        <option value="posgrado">Posgrado</option>
                    </select>
                </div>

                <div className="register-terms-card">
                    <div className="form-check d-flex align-items-start gap-2 mb-3">
                        <input className="form-check-input mt-1 flex-shrink-0" type="checkbox" id="aceptaTerminos"
                            name="aceptaTerminos" checked={form.aceptaTerminos} onChange={handleChange} required />
                        <label className="form-check-label small text-muted" htmlFor="aceptaTerminos">
                            Acepto los{" "}
                            <Link href="/terminos" className="text-primary fw-semibold text-decoration-none">términos y condiciones</Link>
                            {" "}y la{" "}
                            <Link href="/privacidad" className="text-primary fw-semibold text-decoration-none">política de privacidad</Link>
                            {" "}de la Legislatura de la Ciudad de Buenos Aires. <span className="register-required">▲</span>
                        </label>
                    </div>
                    <div className="form-check d-flex align-items-start gap-2">
                        <input className="form-check-input mt-1 flex-shrink-0" type="checkbox" id="aceptaNotificaciones"
                            name="aceptaNotificaciones" checked={form.aceptaNotificaciones} onChange={handleChange} />
                        <label className="form-check-label small text-muted" htmlFor="aceptaNotificaciones">
                            Deseo recibir notificaciones sobre iniciativas y actividades de participación ciudadana.
                        </label>
                    </div>
                </div>

                <div className="register-required-hint">
                    <span className="register-required">▲</span> DATOS OBLIGATORIOS
                </div>
            </div>
        );
    };

    // ─── Pantalla de éxito ────────────────────────────────────────────────────
    if (submitted) {
        return (
            <section className="login-page-wrapper">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-8 col-lg-6">
                            <div className="register-success-card text-center">
                                <div className="register-success-icon mb-4">
                                    <i className="ri-checkbox-circle-line" />
                                </div>
                                <h3 className="fw-bold text-dark mb-2">¡Registro completado!</h3>
                                <p className="text-muted mb-4">
                                    Te enviamos un email a <strong className="text-dark">{form.email}</strong> para verificar tu cuenta.
                                    Por favor revisá tu bandeja de entrada.
                                </p>
                                <Link href="/login/ext" className="btn btn-primary rounded-pill px-5 py-3 fw-semibold shadow-sm">
                                    <i className="ri-login-circle-line me-2" />Ir al inicio de sesión
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    // ─── Layout principal ─────────────────────────────────────────────────────
    return (
        <section className="login-page-wrapper">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-xl-10">
                        <div className="login-split-card row g-0 flex-lg-row">

                            {/* ── BANNER LATERAL ── */}
                            <div className="col-lg-5 col-12 login-visual-banner theme-ext">
                                <div className="login-visual-circles" />

                                {/* Header del banner */}
                                <div className="d-flex justify-content-between align-items-center position-relative z-2">
                                    <div className="d-flex align-items-center gap-2">
                                        <div
                                            className="d-inline-flex align-items-center justify-content-center rounded-3 bg-white text-primary"
                                            style={{ width: "36px", height: "36px" }}
                                        >
                                            <i className="ri-community-line" style={{ fontSize: "20px" }} />
                                        </div>
                                        <span className="fw-bold fs-6 text-white" style={{ letterSpacing: "0.05em" }}>
                                            PARTICIPACIÓN CIUDADANA
                                        </span>
                                    </div>
                                    <span className="badge bg-white bg-opacity-25 rounded-pill px-3 py-2 text-white small">
                                        Registro
                                    </span>
                                </div>

                                {/* Indicador de pasos vertical */}
                                <div className="register-steps-visual position-relative z-2">
                                    {STEPS.map((s, idx) => (
                                        <div key={s.id} className="register-step-row">
                                            <div className={`register-step-indicator ${step === s.id ? "active" : ""} ${step > s.id ? "done" : ""}`}>
                                                <div className="register-step-dot">
                                                    {step > s.id
                                                        ? <i className="ri-check-line" />
                                                        : <i className={s.icon} />
                                                    }
                                                </div>
                                                <div className="register-step-text">
                                                    <span className="register-step-num">Paso {s.id}</span>
                                                    <span className="register-step-name">{s.label}</span>
                                                </div>
                                            </div>
                                            {idx < STEPS.length - 1 && (
                                                <div className={`register-step-connector ${step > s.id ? "done" : ""}`} />
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {/* Footer del banner */}
                                <div className="d-flex justify-content-between align-items-center position-relative z-2 text-white text-opacity-75 small pt-3 border-top border-white border-opacity-10 mt-auto">
                                    <span>© 2026 Legislatura CABA</span>
                                    <div className="d-flex gap-2 align-items-center">
                                        <i className="ri-lock-2-line" />
                                        <span>Conexión Segura SSL</span>
                                    </div>
                                </div>
                            </div>

                            {/* ── FORMULARIO ── */}
                            <div className="col-lg-7 col-12 p-4 p-md-5 d-flex flex-column justify-content-between bg-white">
                                <div>
                                    {/* Header del formulario */}
                                    <div className="d-flex align-items-center justify-content-between mb-4">
                                        <Link href="/login/ext" className="register-back-link">
                                            <i className="ri-arrow-left-line me-1" /> Volver al login
                                        </Link>
                                        <span className="small text-muted">Paso {step} de {totalSteps}</span>
                                    </div>

                                    {/* Progress bar */}
                                    <div className="register-progress-bar mb-4">
                                        <div className="register-progress-fill" style={{ width: `${progress}%` }} />
                                    </div>

                                    {/* Ícono + Título del paso */}
                                    <div className="mb-4">
                                        <div className="register-step-icon-header mb-2">
                                            <i className={currentStep.icon} />
                                        </div>
                                        <h3 className="fw-bold text-dark mb-1">{currentStep.title}</h3>
                                        <p className="text-muted small">{currentStep.subtitle}</p>
                                    </div>

                                    {/* Contenido del paso */}
                                    <form onSubmit={goNext}>
                                        {errorMessage && (
                                            <div className="alert alert-danger py-2 px-3 small rounded-3 d-flex align-items-center gap-2 mb-3">
                                                <i className="ri-error-warning-line fs-5 flex-shrink-0" />
                                                <span>{errorMessage}</span>
                                            </div>
                                        )}

                                        {step === 1 && renderStep1()}
                                        {step === 2 && renderStep2()}
                                        {step === 3 && renderStep3()}
                                        {step === 4 && renderStep4()}

                                        {/* Navegación */}
                                        <div className="d-flex justify-content-between align-items-center mt-4 pt-3 border-top gap-3">
                                            <button
                                                type="button"
                                                onClick={goPrev}
                                                disabled={step === 1 || isSubmitting}
                                                className="btn register-btn-outline rounded-pill px-4 py-2 fw-semibold"
                                            >
                                                <i className="ri-arrow-left-s-line me-1" /> Anterior
                                            </button>

                                            {/* Dots para mobile */}
                                            <div className="d-flex gap-2 d-lg-none">
                                                {STEPS.map(s => (
                                                    <div key={s.id} className={`register-dot-indicator ${step >= s.id ? "active" : ""}`} />
                                                ))}
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="btn btn-primary rounded-pill px-4 py-2 fw-semibold shadow-sm register-btn-next d-flex align-items-center gap-2"
                                            >
                                                {isSubmitting ? (
                                                    <>
                                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                                                        <span>Registrando...</span>
                                                    </>
                                                ) : step === totalSteps ? (
                                                    <><i className="ri-check-double-line me-1" />Crear mi cuenta</>
                                                ) : (
                                                    <>Siguiente <i className="ri-arrow-right-s-line ms-1" /></>
                                                )}
                                            </button>
                                        </div>
                                    </form>
                                </div>

                                {/* Footer */}
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

