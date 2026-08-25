'use client';

import Link from 'next/link';
import {
  ArrowUpRight,
  BookOpen,
  ChevronRight,
  FileText,
  Megaphone,
  Newspaper,
  Settings2,
  Users,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import StatisticsChart from '@/components/ecommerce/StatisticsChart';

const modules = [
  {
    title: 'Configuración general',
    description: 'Páginas, secciones y contenido transversal',
    href: '/general/paginas',
    icon: Settings2,
    tone: 'bg-amber-50 text-amber-700',
    count: '7 áreas',
  },
  {
    title: 'Revista LCABA',
    description: 'Publicaciones, revistas y categorías',
    href: '/revista/publicaciones',
    icon: Newspaper,
    tone: 'bg-sky-50 text-sky-700',
    count: '4 secciones',
  },
  {
    title: 'DG. Cultura',
    description: 'Noticias y contenidos culturales',
    href: '/cultura/publicaciones',
    icon: BookOpen,
    tone: 'bg-emerald-50 text-emerald-700',
    count: '3 secciones',
  },
  {
    title: 'Prensa y difusión',
    description: 'Gacetillas, noticias y suscriptores',
    href: '/prensa/publicaciones',
    icon: Megaphone,
    tone: 'bg-rose-50 text-rose-700',
    count: '4 secciones',
  },
];

const metrics = [
  { label: 'Publicaciones activas', value: '248', change: '+12,4%', icon: FileText, color: 'text-sky-600' },
  { label: 'Usuarios registrados', value: '1.284', change: '+8,2%', icon: Users, color: 'text-emerald-600' },
  { label: 'Secciones administradas', value: '18', change: '+2 este mes', icon: Settings2, color: 'text-amber-600' },
];

const activity = [
  { title: 'Nueva publicación en Revista LCABA', time: 'Hace 18 min', color: 'bg-sky-500' },
  { title: 'Se actualizó una sección de Cultura', time: 'Hace 1 h', color: 'bg-emerald-500' },
  { title: 'Nuevo usuario registrado', time: 'Hace 3 h', color: 'bg-amber-500' },
];

export default function Dashboard() {
  const { auth } = useAuth();
  const name = auth.user?.name ?? '';
  const firstName = name.split(' ')[0];

  return (
    <main className="mx-auto max-w-[1600px] space-y-6 pb-8">
      <section className="relative overflow-hidden rounded-2xl bg-[#132b3f] px-6 py-7 text-white shadow-theme-md sm:px-8 sm:py-9">
        <div className="relative z-10 max-w-2xl">
          <p className="mb-2 text-sm font-medium tracking-wide text-cyan-200">CENTRO DE GESTIÓN LCABA</p>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {firstName ? `Buen día, ${firstName}` : 'Bienvenido al centro de gestión'}
          </h1>
          <p className="mt-2 max-w-lg text-sm leading-6 text-slate-300">
            Todo lo que necesitás para mantener actualizado el contenido institucional, en un solo lugar.
          </p>
        </div>
        <div className="absolute -right-12 -top-20 h-64 w-64 rounded-full border-[28px] border-cyan-400/15" />
        <div className="absolute -bottom-32 right-28 h-56 w-56 rounded-full border-[22px] border-amber-300/10" />
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {metrics.map(({ label, value, change, icon: Icon, color }) => (
          <div key={label} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-theme-xs">
            <div className="flex items-start justify-between">
              <div className={`rounded-xl bg-gray-50 p-2.5 ${color}`}><Icon size={20} strokeWidth={1.8} /></div>
              <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">{change}</span>
            </div>
            <p className="mt-5 text-sm text-gray-500">{label}</p>
            <p className="mt-1 text-2xl font-semibold tracking-tight text-gray-900">{value}</p>
          </div>
        ))}
      </section>

      <section>
        <div className="mb-4 flex items-end justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-400">Accesos rápidos</p>
            <h2 className="mt-1 text-xl font-semibold text-gray-900">Tus módulos de trabajo</h2>
          </div>
          <span className="hidden text-sm text-gray-500 sm:block">Seleccioná un área para comenzar</span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {modules.map(({ title, description, href, icon: Icon, tone, count }) => (
            <Link key={title} href={href} className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-theme-xs transition hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-theme-md">
              <div className="flex items-start justify-between">
                <span className={`rounded-xl p-3 ${tone}`}><Icon size={21} strokeWidth={1.8} /></span>
                <ArrowUpRight size={18} className="text-gray-300 transition group-hover:text-gray-700" />
              </div>
              <h3 className="mt-5 font-semibold text-gray-900">{title}</h3>
              <p className="mt-1 min-h-10 text-sm leading-5 text-gray-500">{description}</p>
              <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3 text-xs font-medium text-gray-400">
                <span>{count}</span><ChevronRight size={15} className="text-gray-300 group-hover:text-gray-700" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.6fr)_minmax(280px,0.7fr)]">
        <div className="min-w-0"><StatisticsChart /></div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-theme-xs sm:p-6">
          <div className="flex items-center justify-between">
            <div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-400">Últimos movimientos</p><h2 className="mt-1 text-lg font-semibold text-gray-900">Actividad reciente</h2></div>
            <Link href="/general/actividad-media" aria-label="Ver toda la actividad" className="rounded-lg p-2 text-gray-400 hover:bg-gray-50 hover:text-gray-700"><ArrowUpRight size={18} /></Link>
          </div>
          <div className="mt-6 space-y-5">
            {activity.map((item) => <div key={item.title} className="flex gap-3"><span className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${item.color}`} /><div><p className="text-sm font-medium leading-5 text-gray-700">{item.title}</p><p className="mt-1 text-xs text-gray-400">{item.time}</p></div></div>)}
          </div>
          <Link href="/general/actividad-media" className="mt-7 flex items-center justify-center gap-2 rounded-xl border border-gray-200 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50">Ver historial completo <ChevronRight size={16} /></Link>
        </div>
      </section>
    </main>
  );
}
