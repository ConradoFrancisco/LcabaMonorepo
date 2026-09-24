"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";

interface Provincia {
    id: number;
    nombre: string;
}

interface Departamento {
    id: number;
    nombre: string;
    provincia_id: number;
}

const revistaOptions = [
    "Legislador/a",
    "Secretario/a",
    "Subsecretario/a",
    "Director/a General",
    "Planta Permanente",
    "Planta SSAS",
    "Planta Transitoria",
    "Adscripto/a | Comisión de Servicio",
    "Otros"
];
export default function PerfilComponent({ menuItems, pageVw, logo }: any) {
    const router = useRouter();
    const { user, isAuthenticated, isLoading: authLoading, getProfile, updateProfile, changePassword, logout } = useAuth();

    const [activeTab, setActiveTab] = useState<"datos" | "password" | "dni" | "participacion" | "capacitacion">("datos");
    const [loadingData, setLoadingData] = useState(true);
    const [saving, setSaving] = useState(false);

    // Provincias y departamentos para selectores
    const [provincias, setProvincias] = useState<Provincia[]>([]);
    const [departamentos, setDepartamentos] = useState<Departamento[]>([]);
    const [loadingDepartamentos, setLoadingDepartamentos] = useState(false);

    // Formulario de datos personales y complementarios
    const [formData, setFormData] = useState({
        nombre: "",
        apellido: "",
        dni: "",
        tramiteDni: "",
        fechaNacimiento: "",
        pais: "Argentina",
        provincia: "",
        provinciaId: "",
        comunaPartido: "",
        calleNumero: "",
        pisoDpto: "",
        codigoPostal: "",
        email: "",
        repetirEmail: "",
        telefonoMovil: "",
        telefonoFijo: "",
        dedicacionOpcion: "",
        ocupacion: "",
        lugarTrabajo: "",
        cargoPuesto: "",
        emailLaboral: "",
        telefonoLaboral: "",
        nivelEducativo: "",
        dependencia: "",
        cargo: "",
        estadoRevista: "",
        legajo: "",
        informacionAdicional: "",
    });

    // Formulario de contraseña
    const [passForm, setPassForm] = useState({
        actualPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [passSaving, setPassSaving] = useState(false);

    const apiBase = process.env.NEXT_PUBLIC_API;

    // Cargar provincias
    useEffect(() => {
        const fetchProvincias = async () => {
            try {
                const res = await fetch(`${apiBase}/provincias`);
                const data = await res.json();
                if (Array.isArray(data)) {
                    setProvincias(data);
                }
            } catch (err) {
                console.error("Error al cargar provincias:", err);
            }
        };
        fetchProvincias();
    }, [apiBase]);

    // Redirección si no está autenticado
    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            router.push("/login");
        }
    }, [authLoading, isAuthenticated, router]);

    // Cargar datos de perfil del usuario
    useEffect(() => {
        if (!isAuthenticated) return;

        const cargarPerfil = async () => {
            setLoadingData(true);
            const res = await getProfile();
            if (res.ok && res.member) {
                const m = res.member;

                // Extraer fecha para input type="date" (YYYY-MM-DD)
                let fNac = "";
                if (m.fecha_nacimiento || m.birthday) {
                    const rawDate = m.fecha_nacimiento || m.birthday;
                    try {
                        const d = new Date(rawDate);
                        if (!isNaN(d.getTime())) {
                            fNac = d.toISOString().split("T")[0];
                        }
                    } catch { }
                }

                // Helper para decodificar entidades HTML como &Atilde;&shy;
                const decodeHtmlEntities = (text?: string): string => {
                    if (!text) return "";
                    const doc = new DOMParser().parseFromString(text, "text/html");
                    return doc.body.textContent || text;
                };

                // Parsear info o nivel educativo
                let nivel = "";
                if (m.info && m.info.includes("Nivel educativo:")) {
                    nivel = m.info.replace("Nivel educativo:", "").trim();
                } else if (m.info) {
                    nivel = m.info;
                }

                setFormData({
                    nombre: decodeHtmlEntities(m.name || user?.name || ""),
                    apellido: decodeHtmlEntities(m.lastname || user?.surname || ""),
                    dni: m.dni || user?.dni || "",
                    tramiteDni: m.dni_tramite || m.legajo || "",
                    fechaNacimiento: fNac,
                    pais: (m.country === "AR" || !m.country) ? "Argentina" : m.country,
                    provincia: m.province || "",
                    provinciaId: m.fk_provincia_id ? String(m.fk_provincia_id) : "",
                    comunaPartido: m.city || "",
                    calleNumero: m.address || "",
                    pisoDpto: m.floor_department || "",
                    codigoPostal: m.postal_code || "",
                    email: m.email || user?.email || "",
                    repetirEmail: m.email || user?.email || "",
                    telefonoMovil: m.tel_celular || m.telephone || "",
                    telefonoFijo: m.tel_particular || "",
                    dedicacionOpcion: m.position || "",
                    ocupacion: m.position || m.cargo || "",
                    lugarTrabajo: m.office || m.org || "",
                    cargoPuesto: m.cargo || m.position || "",
                    emailLaboral: m.emailwork || "",
                    telefonoLaboral: m.telephone || "",
                    nivelEducativo: nivel,
                    dependencia: m.office || "",
                    cargo: m.cargo || m.position || "",
                    estadoRevista: m.planta || "",
                    legajo: m.legajo || "",
                    informacionAdicional: m.info || "",
                });

                // Si tiene provincia, cargar automáticamente sus departamentos
                if (m.fk_provincia_id) {
                    fetch(`${apiBase}/provincias/${m.fk_provincia_id}/departamentos`)
                        .then(r => r.json())
                        .then(d => Array.isArray(d) && setDepartamentos(d))
                        .catch(() => { });
                }
            } else if (user) {
                setFormData(prev => ({
                    ...prev,
                    nombre: user.name || "",
                    apellido: user.surname || "",
                    dni: user.dni || "",
                    email: user.email || "",
                    repetirEmail: user.email || "",
                }));
            }
            setLoadingData(false);
        };

        cargarPerfil();
    }, [isAuthenticated, getProfile, user]);

    // Actualizar departamentos si cambia la provincia seleccionada
    const handleProvinciaChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const provNombre = e.target.value;
        const selectedProv = provincias.find(p => p.nombre === provNombre);

        setFormData(prev => ({
            ...prev,
            provincia: provNombre,
            provinciaId: selectedProv ? String(selectedProv.id) : "",
            comunaPartido: "",
        }));

        if (selectedProv) {
            setLoadingDepartamentos(true);
            try {
                const res = await fetch(`${apiBase}/provincias/${selectedProv.id}/departamentos`);
                const data = await res.json();
                if (Array.isArray(data)) {
                    setDepartamentos(data);
                }
            } catch (err) {
                console.error("Error al traer departamentos:", err);
            } finally {
                setLoadingDepartamentos(false);
            }
        } else {
            setDepartamentos([]);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePassChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPassForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSaveDatos = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            const res = await updateProfile({
                nombre: formData.nombre,
                apellido: formData.apellido,
                dni: formData.dni,
                fechaNacimiento: formData.fechaNacimiento,
                calleNumero: formData.calleNumero,
                pisoDpto: formData.pisoDpto,
                pais: formData.pais,
                provincia: formData.provincia,
                comunaPartido: formData.comunaPartido,
                codigoPostal: formData.codigoPostal,
                telefonoMovil: formData.telefonoMovil,
                telefonoFijo: formData.telefonoFijo,
                ocupacion: formData.ocupacion || formData.cargoPuesto,
                nivelEducativo: formData.nivelEducativo,
                dependencia: formData.dependencia,
                cargo: formData.cargo || formData.cargoPuesto,
                estadoRevista: formData.estadoRevista,
                legajo: formData.legajo,
                emailLaboral: formData.emailLaboral,
                telefonoLaboral: formData.telefonoLaboral,
                informacionAdicional: formData.informacionAdicional,
            });

            if (res.ok) {
                toast.success("¡Datos guardados con éxito!", { position: "bottom-right" });
            } else {
                toast.error(res.message || "Error al actualizar datos", { position: "bottom-right" });
            }
        } catch {
            toast.error("Error al comunicarse con el servidor", { position: "bottom-right" });
        } finally {
            setSaving(false);
        }
    };

    const handleSavePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (passForm.newPassword !== passForm.confirmPassword) {
            toast.error("Las nuevas contraseñas no coinciden", { position: "bottom-right" });
            return;
        }
        if (passForm.newPassword.length < 6) {
            toast.error("La contraseña debe tener al menos 6 caracteres", { position: "bottom-right" });
            return;
        }

        setPassSaving(true);
        try {
            const res = await changePassword(passForm.actualPassword, passForm.newPassword);
            if (res.ok) {
                toast.success("¡Contraseña actualizada correctamente!", { position: "bottom-right" });
                setPassForm({ actualPassword: "", newPassword: "", confirmPassword: "" });
            } else {
                toast.error(res.message || "Error al cambiar la contraseña", { position: "bottom-right" });
            }
        } catch {
            toast.error("Error al actualizar la contraseña", { position: "bottom-right" });
        } finally {
            setPassSaving(false);
        }
    };

    if (authLoading || loadingData) {
        return (
            <div className="d-flex justify-content-center align-items-center py-5" style={{ minHeight: "50vh" }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando perfil...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="perfil-page bg-light min-vh-100 py-4 py-md-5">
            <div className="container">
                {/* Header superior del panel con tabs redondeados */}
                <div
                    className="d-flex flex-wrap align-items-center justify-content-between p-3 px-4 rounded-4 shadow-sm mb-4 text-white"
                    style={{
                        background: "linear-gradient(135deg, #1565c0 0%, #1e88e5 100%)",
                    }}
                >
                    <div className="d-flex align-items-center gap-3">
                        <div
                            className="rounded-circle bg-white text-primary d-flex align-items-center justify-content-center fw-bold shadow-sm"
                            style={{ width: 48, height: 48, fontSize: 20 }}
                        >
                            {(formData.nombre?.[0] || user?.name?.[0] || "U").toUpperCase()}
                        </div>
                        <div>
                            <h4 className="mb-0 text-white fw-bold">Mi Perfil</h4>
                            <span className="badge bg-white bg-opacity-25 text-white small" style={{ fontSize: "11px" }}>
                                {user?.tipo === "ext" ? "Ciudadano" : "Personal LCABA"}
                            </span>
                        </div>
                    </div>

                    {/* Navegación por tabs superior */}
                    <div className="d-flex flex-wrap gap-2 mt-3 mt-md-0">
                        <button
                            type="button"
                            onClick={() => setActiveTab("datos")}
                            className={`btn btn-sm rounded-pill px-3 py-2 fw-semibold transition-all ${activeTab === "datos"
                                ? "btn-light text-primary shadow-sm"
                                : "btn-outline-light border-0 text-white text-opacity-85"
                                }`}
                        >
                            <i className="ri-user-settings-line me-1" /> Datos Personales
                        </button>

                        <button
                            type="button"
                            onClick={() => setActiveTab("password")}
                            className={`btn btn-sm rounded-pill px-3 py-2 fw-semibold transition-all ${activeTab === "password"
                                ? "btn-light text-primary shadow-sm"
                                : "btn-outline-light border-0 text-white text-opacity-85"
                                }`}
                        >
                            <i className="ri-lock-line me-1" /> Contraseña
                        </button>

                        <button
                            type="button"
                            onClick={() => setActiveTab("dni")}
                            className={`btn btn-sm rounded-pill px-3 py-2 fw-semibold transition-all ${activeTab === "dni"
                                ? "btn-light text-primary shadow-sm"
                                : "btn-outline-light border-0 text-white text-opacity-85"
                                }`}
                        >
                            <i className="ri-id-card-line me-1" /> MI DNI
                        </button>

                        <button
                            type="button"
                            onClick={() => setActiveTab("participacion")}
                            className={`btn btn-sm rounded-pill px-3 py-2 fw-semibold transition-all ${activeTab === "participacion"
                                ? "btn-light text-primary shadow-sm"
                                : "btn-outline-light border-0 text-white text-opacity-85"
                                }`}
                        >
                            <i className="ri-community-line me-1" /> Participación Ciudadana
                        </button>

                        <button
                            type="button"
                            onClick={() => setActiveTab("capacitacion")}
                            className={`btn btn-sm rounded-pill px-3 py-2 fw-semibold transition-all ${activeTab === "capacitacion"
                                ? "btn-light text-primary shadow-sm"
                                : "btn-outline-light border-0 text-white text-opacity-85"
                                }`}
                        >
                            <i className="ri-graduation-cap-line me-1" /> Capacitación
                        </button>
                    </div>
                </div>

                <div className="row g-4">
                    {/* Columna Lateral Izquierda: Notificaciones */}
                    <div className="col-12 col-lg-4">
                        <div className="card border-0 shadow-sm rounded-4 mb-4">
                            <div className="card-header bg-white border-0 pt-4 pb-2 px-4 text-center">
                                <h5 className="fw-bold mb-0 text-dark text-uppercase tracking-wider" style={{ letterSpacing: "1px" }}>
                                    Notificaciones
                                </h5>
                                <div className="border-bottom border-primary border-2 w-25 mx-auto mt-2" />
                            </div>
                            <div className="card-body p-4">
                                <div
                                    className="p-3 rounded-3"
                                    style={{
                                        backgroundColor: "#fff8e1",
                                        border: "1px solid #ffe082",
                                        color: "#5d4037",
                                    }}
                                >
                                    <div className="d-flex align-items-start gap-2">
                                        <i className="ri-alert-line text-warning fs-5 flex-shrink-0 mt-1" />
                                        <p className="mb-0 small" style={{ lineHeight: 1.6 }}>
                                            <strong>¡Atención!</strong> Debe completar datos de{" "}
                                            <strong>Estudio Obligatorios</strong> para poder realizar una inscripción a Cursos ILCP{" "}
                                            <a
                                                href="#nivel-estudios"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setActiveTab("datos");
                                                }}
                                                className="text-primary fw-semibold text-decoration-none"
                                            >
                                                Nivel de Estudios 🎓
                                            </a>
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-4 p-3 bg-light rounded-3 text-center border">
                                    <p className="mb-1 text-muted small">Estado de la cuenta:</p>
                                    <span className="badge bg-success-subtle text-success border border-success-subtle px-3 py-1 rounded-pill">
                                        <i className="ri-checkbox-circle-fill me-1" /> Cuenta Activa
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Columna Derecha: Contenido Tabulado */}
                    <div className="col-12 col-lg-8">
                        {/* TAB 1: DATOS PERSONALES */}
                        {activeTab === "datos" && (
                            <form onSubmit={handleSaveDatos} className="d-flex flex-column gap-4">
                                {/* SECCIÓN 1: DATOS PERSONALES */}
                                <div className="card border-0 shadow-sm rounded-4 p-4">
                                    <div className="d-flex align-items-center gap-2 mb-3 pb-2 border-bottom">
                                        <i className="ri-file-user-line text-secondary fs-5" />
                                        <h6 className="fw-bold mb-0 text-uppercase text-secondary" style={{ letterSpacing: "0.5px" }}>
                                            Datos Personales
                                        </h6>
                                    </div>

                                    <div className="row g-3">
                                        <div className="col-12 col-md-6">
                                            <label className="form-label text-muted fw-bold text-uppercase small" style={{ fontSize: "11px" }}>
                                                Nombre
                                            </label>
                                            <input
                                                readOnly
                                                type="text"
                                                name="nombre"
                                                value={formData.nombre}
                                                onChange={handleInputChange}
                                                className="form-control readonly rounded-3 py-2 bg-light"
                                                placeholder="Nombre"
                                                required
                                            />
                                        </div>

                                        <div className="col-12 col-md-6">
                                            <label className="form-label text-muted fw-bold text-uppercase small" style={{ fontSize: "11px" }}>
                                                Apellido
                                            </label>
                                            <input
                                                readOnly
                                                type="text"
                                                name="apellido"
                                                value={formData.apellido}
                                                onChange={handleInputChange}
                                                className="form-control rounded-3 py-2 bg-light"
                                                placeholder="Apellido"
                                                required
                                            />
                                        </div>

                                        <div className="col-12 col-md-6">
                                            <label className="form-label text-muted fw-bold text-uppercase small" style={{ fontSize: "11px" }}>
                                                DNI
                                            </label>
                                            <input
                                                readOnly
                                                type="text"
                                                name="dni"
                                                value={formData.dni}
                                                onChange={handleInputChange}
                                                className="form-control rounded-3 py-2 bg-light"
                                                placeholder="Número de DNI"
                                            />
                                        </div>

                                        <div className="col-12 col-md-6">
                                            <label className="form-label text-muted fw-bold text-uppercase small" style={{ fontSize: "11px" }}>
                                                Número de Trámite DNI
                                            </label>
                                            <input
                                                type="text"
                                                name="tramiteDni"
                                                value={formData.tramiteDni}
                                                onChange={handleInputChange}
                                                className="form-control rounded-3 py-2 bg-light"
                                                placeholder="N. de Trámite"
                                            />
                                        </div>

                                        <div className="col-12 col-md-6">
                                            <label className="form-label text-muted fw-bold text-uppercase small" style={{ fontSize: "11px" }}>
                                                Fecha de Nacimiento
                                            </label>
                                            <div className="input-group">
                                                <input
                                                    readOnly
                                                    type="date"
                                                    name="fechaNacimiento"
                                                    value={formData.fechaNacimiento}
                                                    onChange={handleInputChange}
                                                    className="form-control rounded-3 py-2 bg-light"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* SECCIÓN 2: DOMICILIO */}
                                <div className="card border-0 shadow-sm rounded-4 p-4">
                                    <div className="d-flex align-items-center gap-2 mb-3 pb-2 border-bottom">
                                        <i className="ri-map-pin-line text-secondary fs-5" />
                                        <h6 className="fw-bold mb-0 text-uppercase text-secondary" style={{ letterSpacing: "0.5px" }}>
                                            Domicilio
                                        </h6>
                                    </div>

                                    <div className="row g-3">
                                        <div className="col-12">
                                            <label className="form-label text-muted fw-bold text-uppercase small" style={{ fontSize: "11px" }}>
                                                País
                                            </label>
                                            <input
                                                type="text"
                                                name="pais"
                                                value={formData.pais}
                                                onChange={handleInputChange}
                                                className="form-control rounded-3 py-2 bg-light"
                                                placeholder="Argentina"
                                            />
                                        </div>

                                        <div className="col-12 col-md-6">
                                            <label className="form-label text-muted fw-bold text-uppercase small" style={{ fontSize: "11px" }}>
                                                Provincia
                                            </label>
                                            <select
                                                name="provincia"
                                                value={formData.provincia}
                                                onChange={handleProvinciaChange}
                                                className="form-select rounded-3 py-2 bg-light"
                                            >
                                                <option value="">Seleccionar Provincia...</option>
                                                {provincias.map(p => (
                                                    <option key={p.id} value={p.nombre}>
                                                        {p.nombre}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="col-12 col-md-6">
                                            <label className="form-label text-muted fw-bold text-uppercase small" style={{ fontSize: "11px" }}>
                                                Comuna / Partido / Departamento
                                            </label>
                                            {departamentos.length > 0 ? (
                                                <select
                                                    name="comunaPartido"
                                                    value={formData.comunaPartido}
                                                    onChange={handleInputChange}
                                                    className="form-select rounded-3 py-2 bg-light"
                                                    disabled={loadingDepartamentos}
                                                >
                                                    <option value="">Seleccionar...</option>
                                                    {departamentos.map(d => (
                                                        <option key={d.id} value={d.nombre}>
                                                            {d.nombre}
                                                        </option>
                                                    ))}
                                                </select>
                                            ) : (
                                                <input
                                                    type="text"
                                                    name="comunaPartido"
                                                    value={formData.comunaPartido}
                                                    onChange={handleInputChange}
                                                    className="form-control rounded-3 py-2 bg-light"
                                                    placeholder="Comuna / Partido"
                                                />
                                            )}
                                        </div>

                                        <div className="col-12">
                                            <label className="form-label text-muted fw-bold text-uppercase small" style={{ fontSize: "11px" }}>
                                                Calle y Número
                                            </label>
                                            <input
                                                type="text"
                                                name="calleNumero"
                                                value={formData.calleNumero}
                                                onChange={handleInputChange}
                                                className="form-control rounded-3 py-2 bg-light"
                                                placeholder="Calle y número"
                                            />
                                        </div>

                                        <div className="col-12 col-md-6">
                                            <label className="form-label text-muted fw-bold text-uppercase small" style={{ fontSize: "11px" }}>
                                                Piso y Departamento
                                            </label>
                                            <input
                                                type="text"
                                                name="pisoDpto"
                                                value={formData.pisoDpto}
                                                onChange={handleInputChange}
                                                className="form-control rounded-3 py-2 bg-light"
                                                placeholder="Piso y Departamento"
                                            />
                                        </div>

                                        <div className="col-12 col-md-6">
                                            <label className="form-label text-muted fw-bold text-uppercase small" style={{ fontSize: "11px" }}>
                                                Código Postal
                                            </label>
                                            <input
                                                type="text"
                                                name="codigoPostal"
                                                value={formData.codigoPostal}
                                                onChange={handleInputChange}
                                                className="form-control rounded-3 py-2 bg-light"
                                                placeholder="Código Postal"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* SECCIÓN 3: INFO DE CONTACTO */}
                                <div className="card border-0 shadow-sm rounded-4 p-4">
                                    <div className="d-flex align-items-center gap-2 mb-3 pb-2 border-bottom">
                                        <i className="ri-contacts-line text-secondary fs-5" />
                                        <h6 className="fw-bold mb-0 text-uppercase text-secondary" style={{ letterSpacing: "0.5px" }}>
                                            Info de Contacto
                                        </h6>
                                    </div>

                                    <div className="row g-3">
                                        <div className="col-12 col-md-6">
                                            <label className="form-label text-muted fw-bold text-uppercase small" style={{ fontSize: "11px" }}>
                                                Correo Electrónico
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                disabled
                                                className="form-control rounded-3 py-2 bg-light-subtle text-muted"
                                                placeholder="email@dominio.com"
                                            />
                                        </div>

                                        <div className="col-12 col-md-6">
                                            <label className="form-label text-muted fw-bold text-uppercase small" style={{ fontSize: "11px" }}>
                                                Repetir Correo Electrónico
                                            </label>
                                            <input
                                                type="email"
                                                name="repetirEmail"
                                                value={formData.repetirEmail}
                                                disabled
                                                className="form-control rounded-3 py-2 bg-light-subtle text-muted"
                                                placeholder="email@dominio.com"
                                            />
                                        </div>

                                        <div className="col-12 col-md-6">
                                            <label className="form-label text-muted fw-bold text-uppercase small" style={{ fontSize: "11px" }}>
                                                Teléfono Móvil
                                            </label>
                                            <input
                                                type="tel"
                                                name="telefonoMovil"
                                                value={formData.telefonoMovil}
                                                onChange={handleInputChange}
                                                className="form-control rounded-3 py-2 bg-light"
                                                placeholder="Teléfono Móvil"
                                            />
                                        </div>

                                        <div className="col-12 col-md-6">
                                            <label className="form-label text-muted fw-bold text-uppercase small" style={{ fontSize: "11px" }}>
                                                Teléfono Fijo
                                            </label>
                                            <input
                                                type="tel"
                                                name="telefonoFijo"
                                                value={formData.telefonoFijo}
                                                onChange={handleInputChange}
                                                className="form-control rounded-3 py-2 bg-light"
                                                placeholder="Teléfono Fijo"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* SECCIÓN 4: INFO COMPLEMENTARIA */}
                                <div className="card border-0 shadow-sm rounded-4 p-4" id="nivel-estudios">
                                    <div className="d-flex align-items-center gap-2 mb-3 pb-2 border-bottom">
                                        <i className="ri-briefcase-line text-secondary fs-5" />
                                        <h6 className="fw-bold mb-0 text-uppercase text-secondary" style={{ letterSpacing: "0.5px" }}>
                                            Info Complementaria
                                        </h6>
                                    </div>

                                    {/* CAMPOS PARA PERSONAL LCABA */}
                                    {user?.tipo !== "ext" ? (
                                        <div className="row g-3">
                                            <div className="col-12 col-md-6">
                                                <label className="form-label text-muted fw-bold text-uppercase small" style={{ fontSize: "11px" }}>
                                                    Dependencia
                                                </label>
                                                <input
                                                    type="text"
                                                    name="dependencia"
                                                    value={formData.dependencia}
                                                    onChange={handleInputChange}
                                                    className="form-control rounded-3 py-2 bg-light"
                                                    placeholder="Dependencia / Área"
                                                />
                                            </div>

                                            <div className="col-12 col-md-6">
                                                <label className="form-label text-muted fw-bold text-uppercase small" style={{ fontSize: "11px" }}>
                                                    Cargo
                                                </label>
                                                <input
                                                    type="text"
                                                    name="cargo"
                                                    value={formData.cargo}
                                                    onChange={handleInputChange}
                                                    className="form-control rounded-3 py-2 bg-light"
                                                    placeholder="Cargo"
                                                />
                                            </div>

                                            <div className="col-12 col-md-6">
                                                <label className="form-label text-muted fw-bold text-uppercase small" style={{ fontSize: "11px" }}>
                                                    Estado de Revista
                                                </label>
                                                <select className="form-select " name="estadoRevista" id="estadoRevista" value={formData.estadoRevista} onChange={handleInputChange}>
                                                    <option value="">Seleccionar</option>
                                                    {revistaOptions.map((option, index) => (
                                                        <option key={index} value={option}>
                                                            {option}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div className="col-12 col-md-6">
                                                <label className="form-label text-muted fw-bold text-uppercase small" style={{ fontSize: "11px" }}>
                                                    Legajo Personal Contratado Completar Legajo con 0000
                                                </label>
                                                <input
                                                    type="text"
                                                    name="legajo"
                                                    value={formData.legajo}
                                                    onChange={handleInputChange}
                                                    className="form-control rounded-3 py-2 bg-light"
                                                    placeholder="Legajo"
                                                />
                                            </div>

                                            <div className="col-12 col-md-6">
                                                <label className="form-label text-muted fw-bold text-uppercase small" style={{ fontSize: "11px" }}>
                                                    Correo Electrónico Laboral
                                                </label>
                                                <input
                                                    type="email"
                                                    name="emailLaboral"
                                                    value={formData.emailLaboral}
                                                    onChange={handleInputChange}
                                                    className="form-control rounded-3 py-2 bg-light"
                                                    placeholder="correo@legislatura.gob.ar"
                                                />
                                            </div>

                                            <div className="col-12 col-md-6">
                                                <label className="form-label text-muted fw-bold text-uppercase small" style={{ fontSize: "11px" }}>
                                                    Teléfono Laboral
                                                </label>
                                                <input
                                                    type="tel"
                                                    name="telefonoLaboral"
                                                    value={formData.telefonoLaboral}
                                                    onChange={handleInputChange}
                                                    className="form-control rounded-3 py-2 bg-light"
                                                    placeholder="Teléfono laboral"
                                                />
                                            </div>

                                            <div className="col-12">
                                                <label className="form-label text-muted fw-bold text-uppercase small" style={{ fontSize: "11px" }}>
                                                    Info Complementaria
                                                </label>
                                                <textarea
                                                    name="informacionAdicional"
                                                    rows={3}
                                                    value={formData.informacionAdicional}
                                                    onChange={handleInputChange}
                                                    className="form-control rounded-3 py-2 bg-light"
                                                    placeholder="Información adicional..."
                                                />
                                            </div>
                                        </div>
                                    ) : (
                                        /* CAMPOS PARA CIUDADANOS EXTERNOS */
                                        <div className="row g-3">
                                            <div className="col-12">
                                                <label className="form-label text-muted fw-bold text-uppercase small" style={{ fontSize: "11px" }}>
                                                    ¿A qué te dedicas?
                                                </label>
                                                <select
                                                    name="dedicacionOpcion"
                                                    value={formData.dedicacionOpcion}
                                                    onChange={handleInputChange}
                                                    className="form-select rounded-3 py-2 bg-light mb-2"
                                                >
                                                    <option value="">Seleccione una opción</option>
                                                    <option value="empleado_publico">Empleado Público</option>
                                                    <option value="empleado_privado">Empleado Privado</option>
                                                    <option value="autonomo_independiente">Autónomo / Independiente</option>
                                                    <option value="estudiante">Estudiante</option>
                                                    <option value="docente">Docente</option>
                                                    <option value="otro">Otro</option>
                                                </select>

                                                <input
                                                    type="text"
                                                    name="ocupacion"
                                                    value={formData.ocupacion}
                                                    onChange={handleInputChange}
                                                    className="form-control rounded-3 py-2 bg-light"
                                                    placeholder="¿A qué te dedicas? (Detalle)"
                                                />
                                            </div>

                                            <div className="col-12 col-md-6">
                                                <label className="form-label text-muted fw-bold text-uppercase small" style={{ fontSize: "11px" }}>
                                                    Lugar de Trabajo / Estudio
                                                </label>
                                                <input
                                                    type="text"
                                                    name="lugarTrabajo"
                                                    value={formData.lugarTrabajo}
                                                    onChange={handleInputChange}
                                                    className="form-control rounded-3 py-2 bg-light"
                                                    placeholder="Lugar de Trabajo / Estudio"
                                                />
                                            </div>

                                            <div className="col-12 col-md-6">
                                                <label className="form-label text-muted fw-bold text-uppercase small" style={{ fontSize: "11px" }}>
                                                    Cargo / Puesto / Tarea
                                                </label>
                                                <input
                                                    type="text"
                                                    name="cargoPuesto"
                                                    value={formData.cargoPuesto}
                                                    onChange={handleInputChange}
                                                    className="form-control rounded-3 py-2 bg-light"
                                                    placeholder="Cargo / Puesto / Tarea"
                                                />
                                            </div>

                                            <div className="col-12 col-md-6">
                                                <label className="form-label text-muted fw-bold text-uppercase small" style={{ fontSize: "11px" }}>
                                                    Correo Electrónico Laboral
                                                </label>
                                                <input
                                                    type="email"
                                                    name="emailLaboral"
                                                    value={formData.emailLaboral}
                                                    onChange={handleInputChange}
                                                    className="form-control rounded-3 py-2 bg-light"
                                                    placeholder="Email Trabajo"
                                                />
                                            </div>

                                            <div className="col-12 col-md-6">
                                                <label className="form-label text-muted fw-bold text-uppercase small" style={{ fontSize: "11px" }}>
                                                    Teléfono Laboral
                                                </label>
                                                <input
                                                    type="tel"
                                                    name="telefonoLaboral"
                                                    value={formData.telefonoLaboral}
                                                    onChange={handleInputChange}
                                                    className="form-control rounded-3 py-2 bg-light"
                                                    placeholder="Teléfono Laboral"
                                                />
                                            </div>

                                            <div className="col-12">
                                                <label className="form-label text-muted fw-bold text-uppercase small" style={{ fontSize: "11px" }}>
                                                    Info Complementaria / Nivel Educativo
                                                </label>
                                                <textarea
                                                    name="nivelEducativo"
                                                    rows={3}
                                                    value={formData.nivelEducativo}
                                                    onChange={handleInputChange}
                                                    className="form-control rounded-3 py-2 bg-light"
                                                    placeholder="Ejemplo: Nivel educativo: universitario completo"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="d-flex justify-content-end gap-3 pb-5">
                                    <button
                                        type="submit"
                                        disabled={saving}
                                        className="btn btn-primary rounded-pill px-5 py-2 fw-semibold shadow-sm d-flex align-items-center gap-2"
                                        style={{ backgroundColor: "#00b4d8", borderColor: "#00b4d8" }}
                                    >
                                        {saving && <span className="spinner-border spinner-border-sm" role="status" />}
                                        <i className="ri-save-line" />
                                        <span>Actualizar Información Personal</span>
                                    </button>
                                </div>
                            </form>
                        )}

                        {/* TAB 2: CONTRASEÑA */}
                        {activeTab === "password" && (
                            <div className="card border-0 shadow-sm rounded-4 p-4">
                                <div className="d-flex align-items-center gap-2 mb-3 pb-2 border-bottom">
                                    <i className="ri-lock-password-line text-secondary fs-5" />
                                    <h6 className="fw-bold mb-0 text-uppercase text-secondary" style={{ letterSpacing: "0.5px" }}>
                                        Cambiar Contraseña
                                    </h6>
                                </div>

                                <form onSubmit={handleSavePassword} className="row g-3">
                                    <div className="col-12">
                                        <label className="form-label text-muted fw-bold text-uppercase small" style={{ fontSize: "11px" }}>
                                            Contraseña Actual
                                        </label>
                                        <input
                                            type="password"
                                            name="actualPassword"
                                            value={passForm.actualPassword}
                                            onChange={handlePassChange}
                                            required
                                            className="form-control rounded-3 py-2 bg-light"
                                            placeholder="Ingresá tu contraseña actual"
                                        />
                                    </div>

                                    <div className="col-12 col-md-6">
                                        <label className="form-label text-muted fw-bold text-uppercase small" style={{ fontSize: "11px" }}>
                                            Nueva Contraseña
                                        </label>
                                        <input
                                            type="password"
                                            name="newPassword"
                                            value={passForm.newPassword}
                                            onChange={handlePassChange}
                                            required
                                            className="form-control rounded-3 py-2 bg-light"
                                            placeholder="Mínimo 6 caracteres"
                                        />
                                    </div>

                                    <div className="col-12 col-md-6">
                                        <label className="form-label text-muted fw-bold text-uppercase small" style={{ fontSize: "11px" }}>
                                            Confirmar Nueva Contraseña
                                        </label>
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            value={passForm.confirmPassword}
                                            onChange={handlePassChange}
                                            required
                                            className="form-control rounded-3 py-2 bg-light"
                                            placeholder="Repetí la nueva contraseña"
                                        />
                                    </div>

                                    <div className="col-12 mt-4 text-end">
                                        <button
                                            type="submit"
                                            disabled={passSaving}
                                            className="btn btn-primary rounded-pill px-5 py-2 fw-semibold shadow-sm"
                                        >
                                            {passSaving && <span className="spinner-border spinner-border-sm me-2" />}
                                            Actualizar Contraseña
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}

                        {/* TAB 3: MI DNI */}
                        {activeTab === "dni" && (
                            <div className="card border-0 shadow-sm rounded-4 p-4 text-center py-5">
                                <div
                                    className="d-inline-flex align-items-center justify-content-center rounded-circle bg-primary bg-opacity-10 text-primary mx-auto mb-3"
                                    style={{ width: 70, height: 70, fontSize: 32 }}
                                >
                                    <i className="ri-id-card-line" />
                                </div>
                                <h5 className="fw-bold text-dark">Validación de Identidad (DNI)</h5>
                                <p className="text-muted mx-auto" style={{ maxWidth: 500 }}>
                                    Documento registrado: <strong>{formData.dni || "No especificado"}</strong>
                                    <br />
                                    Próximamente podrás gestionar y validar aquí la constancia oficial de tu documento de identidad.
                                </p>
                            </div>
                        )}

                        {/* TAB 4: PARTICIPACIÓN CIUDADANA */}
                        {activeTab === "participacion" && (
                            <div className="card border-0 shadow-sm rounded-4 p-4 text-center py-5">
                                <div
                                    className="d-inline-flex align-items-center justify-content-center rounded-circle bg-info bg-opacity-10 text-info mx-auto mb-3"
                                    style={{ width: 70, height: 70, fontSize: 32 }}
                                >
                                    <i className="ri-megaphone-line" />
                                </div>
                                <h5 className="fw-bold text-dark">Mis Iniciativas y Participaciones</h5>
                                <p className="text-muted mx-auto" style={{ maxWidth: 500 }}>
                                    Aquí vas a poder consultar el estado y avance de las iniciativas ciudadanas, proyectos y votaciones en las que participes.
                                </p>
                                <div>
                                    <Link href="/iniciativas" className="btn btn-outline-primary rounded-pill px-4 py-2 mt-2">
                                        Explorar Iniciativas
                                    </Link>
                                </div>
                            </div>
                        )}

                        {/* TAB 5: CAPACITACIÓN */}
                        {activeTab === "capacitacion" && (
                            <div className="card border-0 shadow-sm rounded-4 p-4 text-center py-5">
                                <div
                                    className="d-inline-flex align-items-center justify-content-center rounded-circle bg-warning bg-opacity-10 text-warning mx-auto mb-3"
                                    style={{ width: 70, height: 70, fontSize: 32 }}
                                >
                                    <i className="ri-award-line" />
                                </div>
                                <h5 className="fw-bold text-dark">Cursos y Capacitaciones ILCP</h5>
                                <p className="text-muted mx-auto" style={{ maxWidth: 500 }}>
                                    Consultá tus inscripciones a cursos de formación y certificados del Instituto de Capacitación Parlamentaria.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
