'use client';
import React, { useState } from 'react';
import {
  ShieldCheck,
  Layers,
  Server,
  Layout,
  CheckCircle2,
  AlertCircle,
  Clock,
  ChevronRight,
  ChevronLeft,
  Database,
  Globe,
  Lock,
  Code2,
  FolderTree,
  Network,
  Settings,
  Terminal,
  FileCode2,
  Share2,
} from 'lucide-react';

const App = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 'portada',
      type: 'hero',
      title: 'Ecosistema Digital LCABA 2026',
      subtitle: 'Arquitectura FullStack para Gestión Institucional',
      footer: 'Infraestructura: Node.js + Next.js 15',
      icon: <Globe className="h-24 w-24 text-blue-400 opacity-20" />,
    },
    {
      id: 'arquitectura',
      title: 'Arquitectura del Sistema',
      type: 'split',
      left: {
        category: 'Backend (Lcaba-API)',
        tech: 'Node.js + Express + TS',
        desc: 'API robusta basada en controladores y rutas con tipado estricto.',
        points: ['TypeScript Nativo', 'MySQL2 (Legislatura DB)', 'Ldapts (Integración AD)'],
      },
      right: {
        category: 'Frontend (Lcaba-Admin)',
        tech: 'Next.js 15 + React 19',
        desc: 'Panel administrativo de alta performance y renderizado híbrido.',
        points: ['Tailwind CSS + Lucide', 'Gestión de Estado Reactiva', 'Comunicación vía Axios'],
      },
    },
    {
      id: 'patron',
      title: 'Patrón de Diseño: Backend',
      type: 'code_structure',
      subtitle: 'Arquitectura basada en Separación de Responsabilidades',
      folders: [
        {
          name: 'Routes/',
          desc: 'Definición de Endpoints y Middleware de acceso.',
          icon: <Share2 className="text-blue-400" />,
        },
        {
          name: 'Controllers/',
          desc: 'Lógica de negocio y procesamiento de peticiones.',
          icon: <Settings className="text-purple-400" />,
        },
        {
          name: 'Models/',
          desc: 'Esquemas de datos y consultas a MySQL (Legis DB).',
          icon: <Database className="text-green-400" />,
        },
        {
          name: 'Services/',
          desc: 'Integraciones externas (LDAP, File Upload).',
          icon: <Server className="text-orange-400" />,
        },
      ],
    },
    {
      id: 'endpoints_public',
      title: 'Mapa de Rutas: Usuario Final (GET)',
      type: 'api_list',
      category: 'Rutas de Consumo Público',
      items: [
        { path: '/menu', desc: 'Jerarquía de navegación dinámica.' },
        { path: '/area', desc: 'Información institucional de áreas legislativas.' },
        { path: '/culturas', desc: 'Repositorio de eventos y contenidos culturales.' },
        { path: '/banner', desc: 'Gestión de sliders y avisos principales.' },
      ],
    },
    {
      id: 'endpoints_admin',
      title: 'Mapa de Rutas: Administrativas (POST/BACK)',
      type: 'api_list',
      category: 'Rutas con Autenticación Obligatoria',
      items: [
        { path: '/auth', desc: 'Validación LDAP y generación de Tokens JWT.' },
        { path: '/magazine', desc: 'Edición y publicación de artículos de revista.' },
        { path: '/dgpc', desc: 'Administración de Planeamiento Estratégico.' },
        { path: '/upload', desc: 'Buffer centralizado para documentos y assets.' },
      ],
    },
    {
      id: 'seguridad_tecnica',
      title: 'Seguridad e Integración AD',
      type: 'content',
      icon: <ShieldCheck className="h-16 w-16 text-blue-500" />,
      highlight: 'Autenticación LDAP via Ldapts',
      text: 'El sistema no almacena contraseñas. Valida credenciales contra el Active Directory institucional y emite un JWT firmado para sesiones administrativas.',
      features: [
        'JWT_SECRET para firma de tokens',
        'CORS_ORIGIN restrictivo',
        'Sanitización de queries MySQL2',
      ],
    },
    {
      id: 'env_scripts',
      title: 'Entorno y Despliegue',
      type: 'env',
      env_vars: [
        { key: 'DB_HOST', value: '10.51.0.29 (MySQL Legis)' },
        { key: 'AD_HOST', value: 'IP del Active Directory' },
        { key: 'JWT_SECRET', value: 'Hash de seguridad único' },
      ],
      scripts: [
        { name: 'npm run dev', desc: 'Desarrollo con Nodemon' },
        { name: 'npm run build', desc: 'Compilación TS -> JS (dist/)' },
        { name: 'npm start', desc: 'Producción (index.js)' },
      ],
    },
    {
      id: 'status',
      title: 'Estado de Situación Actual',
      type: 'status',
      rows: [
        {
          label: 'Autenticación LDAP',
          status: 'success',
          text: 'Completado y testeado',
          icon: <CheckCircle2 className="text-green-500" />,
        },
        {
          label: 'Migración de Modelos',
          status: 'warning',
          text: 'Rutas /dgpc y /magazine en ajuste',
          icon: <Clock className="text-yellow-500" />,
        },
        {
          label: 'Infraestructura Prod y Dev',
          status: 'danger',
          text: 'Pendiente servidor Node.js en Legislatura',
          icon: <AlertCircle className="text-red-500" />,
        },
      ],
    },
  ];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  const slide = slides[currentSlide];

  return (
    <div className="flex min-h-screen flex-col overflow-hidden bg-slate-950 font-sans text-white">
      {/* Navbar Institucional */}
      <div className="z-10 flex items-center justify-between border-b border-slate-800 bg-slate-900/80 p-5 backdrop-blur-md">
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-700 shadow-lg shadow-blue-900/20">
            <FileCode2 size={24} />
          </div>
          <div>
            <div className="text-sm leading-none font-bold tracking-tight">LCABA | SISTEMAS</div>
            <div className="mt-1 font-mono text-[10px] tracking-widest text-blue-400 uppercase">
              FullStack Solution
            </div>
          </div>
        </div>
        <div className="rounded-md border border-slate-700 bg-slate-800 px-3 py-1 font-mono text-xs text-slate-400">
          SLIDE {String(currentSlide + 1).padStart(2, '0')} /{' '}
          {String(slides.length).padStart(2, '0')}
        </div>
      </div>

      {/* Main Content Area */}
      <main className="relative flex flex-grow items-center justify-center p-6">
        <div className="animate-in slide-in-from-bottom-4 w-full max-w-6xl duration-500">
          {/* Título Diapositiva */}
          {slide.type !== 'hero' && (
            <div className="mb-10 text-center">
              <h2 className="relative inline-block text-4xl font-extrabold tracking-tight">
                {slide.title}
                <div className="absolute -bottom-2 left-0 h-1 w-full rounded-full bg-blue-600 opacity-50"></div>
              </h2>
              {slide.subtitle && (
                <p className="mt-4 font-medium text-slate-400 italic">{slide.subtitle}</p>
              )}
            </div>
          )}

          {slide.type === 'hero' && (
            <div className="space-y-8 py-10 text-center">
              <div className="mb-4 flex justify-center">{slide.icon}</div>
              <h1 className="text-7xl font-black tracking-tighter text-white drop-shadow-2xl">
                {slide.title}
              </h1>
              <p className="text-2xl font-light tracking-wide text-blue-400">{slide.subtitle}</p>
              <div className="flex justify-center space-x-4 pt-8">
                <span className="rounded-md border border-slate-700 bg-slate-900 px-4 py-2 font-mono text-sm text-blue-300">
                  Next.js 15
                </span>
                <span className="rounded-md border border-slate-700 bg-slate-900 px-4 py-2 font-mono text-sm text-blue-300">
                  Node.js v20
                </span>
                <span className="rounded-md border border-slate-700 bg-slate-900 px-4 py-2 font-mono text-sm text-blue-300">
                  Active Directory
                </span>
              </div>
            </div>
          )}

          {slide.type === 'split' && (
            <div className="grid gap-8 md:grid-cols-2">
              {[slide.left, slide.right].map((side, i) => (
                <div
                  key={i}
                  className="group rounded-3xl border border-slate-800 bg-slate-900/50 p-8 transition-all hover:border-blue-600/50"
                >
                  <div className="mb-6 flex items-center space-x-3 text-blue-500">
                    {i === 0 ? <Code2 size={28} /> : <Layout size={28} />}
                    <h3 className="text-lg font-black tracking-widest text-slate-500 uppercase transition-colors group-hover:text-blue-400">
                      {side?.category}
                    </h3>
                  </div>
                  <h4 className="mb-4 text-2xl font-bold">{side?.tech}</h4>
                  <p className="mb-8 leading-relaxed text-slate-400">{side?.desc}</p>
                  <ul className="space-y-4">
                    {side?.points?.map((p, idx) => (
                      <li
                        key={idx}
                        className="flex items-center text-sm font-medium text-slate-300"
                      >
                        <div className="mr-3 h-2 w-2 rounded-full bg-blue-600"></div> {p}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {slide.type === 'code_structure' && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {slide.folders?.map((f, i) => (
                <div
                  key={i}
                  className="group rounded-2xl border border-slate-800 bg-slate-900 p-6 transition-all hover:bg-slate-800"
                >
                  <div className="mb-4">{f.icon}</div>
                  <h3 className="mb-2 font-mono text-xl font-bold text-white group-hover:text-blue-400">
                    {f.name}
                  </h3>
                  <p className="text-sm leading-snug text-slate-400">{f.desc}</p>
                </div>
              ))}
            </div>
          )}

          {slide.type === 'api_list' && (
            <div className="mx-auto max-w-4xl">
              <div className="mb-6 inline-block rounded border border-blue-900/50 bg-blue-900/20 px-4 py-2 text-xs font-bold tracking-widest text-blue-400 uppercase">
                {slide.category}
              </div>
              <div className="grid gap-4">
                {slide.items?.map((api, i) => (
                  <div
                    key={i}
                    className="group flex items-center rounded-xl border border-slate-800 bg-slate-900 p-5 transition-all hover:border-slate-600"
                  >
                    <div className="w-1/4 font-mono font-bold text-blue-500 transition-transform group-hover:scale-105">
                      {api.path}
                    </div>
                    <div className="mx-4 h-px w-4 bg-slate-700"></div>
                    <div className="text-sm text-slate-300 italic">{api.desc}</div>
                    <div className="ml-auto flex space-x-2 opacity-30 transition-opacity group-hover:opacity-100">
                      <span className="rounded bg-green-900/50 px-2 py-0.5 text-[10px] text-green-400 uppercase">
                        OK
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {slide.type === 'env' && (
            <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
              <div className="space-y-4">
                <h3 className="mb-4 flex items-center text-lg font-bold">
                  <Terminal className="mr-2 text-blue-500" /> Configuración (.env)
                </h3>
                <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-950">
                  {slide.env_vars?.map((env, i) => (
                    <div
                      key={i}
                      className="flex justify-between border-b border-slate-900 p-4 last:border-0"
                    >
                      <span className="font-mono text-xs text-slate-500">{env.key}</span>
                      <span className="font-mono text-xs font-bold text-blue-400">{env.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="mb-4 flex items-center text-lg font-bold">
                  <Settings className="mr-2 text-purple-500" /> Scripts Disponibles
                </h3>
                <div className="space-y-3">
                  {slide.scripts?.map((script, i) => (
                    <div
                      key={i}
                      className="group flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/50 p-4 hover:bg-slate-800"
                    >
                      <code className="text-sm font-bold text-purple-400">{script.name}</code>
                      <span className="text-xs text-slate-500">{script.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {slide.type === 'status' && (
            <div className="mx-auto max-w-3xl space-y-8">
              <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl">
                {slide.rows?.map((row, i) => (
                  <div
                    key={i}
                    className={`flex items-center border-b border-slate-800 p-8 last:border-0`}
                  >
                    <div className="mr-8 rounded-2xl bg-slate-950 p-4 shadow-inner">{row.icon}</div>
                    <div className="flex-grow">
                      <div className="text-xl font-extrabold">{row.label}</div>
                      <div className="mt-1 text-sm font-medium tracking-tight text-slate-500 uppercase">
                        {row.text}
                      </div>
                    </div>
                    <div
                      className={`rounded-full px-5 py-1.5 text-[10px] font-black tracking-widest uppercase ${
                        row.status === 'success'
                          ? 'border border-green-500/20 bg-green-500/10 text-green-500'
                          : row.status === 'warning'
                            ? 'border border-yellow-500/20 bg-yellow-500/10 text-yellow-500'
                            : 'border border-red-500/20 bg-red-500/10 text-red-500'
                      } `}
                    >
                      {row.status === 'success'
                        ? 'Producción'
                        : row.status === 'warning'
                          ? 'Development'
                          : 'Blocker'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer Navigation */}
      <footer className="flex items-center justify-center p-10">
        <div className="flex items-center space-x-6 rounded-full border border-slate-800 bg-slate-900 p-2 shadow-2xl">
          <button
            onClick={prevSlide}
            className="rounded-full p-3 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
          >
            <ChevronLeft size={24} />
          </button>

          <div className="flex space-x-1.5 px-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === currentSlide ? 'w-10 bg-blue-600' : 'w-2 bg-slate-700 hover:bg-slate-600'}`}
              ></button>
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="rounded-full bg-blue-600 p-3 text-white shadow-lg shadow-blue-900/40 transition-all hover:bg-blue-500"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default App;
