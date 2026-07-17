import { URLS } from '../models/back-post/PostModel';

export default function dayFormater(day?: string): string | null {
  if (day === 'FECHA CALENDARIO _>') return null;
  const daysMap: { [key: string]: string } = {
    LUNES: 'Monday',
    MARTES: 'Tuesday',
    MIERCOLES: 'Wednesday',
    JUEVES: 'Thursday',
    VIERNES: 'Friday',
    SABADO: 'Saturday',
    DOMINGO: 'Sunday',
  };
  return day ? daysMap[day] : day || '';
}

export const dias = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const diasSemana = [
  { value: '0', label: 'Domingo' },
  { value: '1', label: 'Lunes' },
  { value: '2', label: 'Martes' },
  { value: '3', label: 'Miércoles' },
  { value: '4', label: 'Jueves' },
  { value: '5', label: 'Viernes' },
  { value: '6', label: 'Sábado' },
];

export const formatDayForFront = (days: unknown) => {
  const formatedDays: DiaLinea[] = (days as IDia[]).map((day) => ({
    id: day.id,
    dia: getDayLabel(day.day),
    desde: day.hour_start ?? undefined,
    hasta: day.hour_end ?? undefined,
    descripcion: day.date_desc ?? undefined,
    date: day.date ?? undefined,
  }));

  return formatedDays;
};

export const getDayLabel = (engLabel: string) => {
  switch (engLabel) {
    case 'Monday':
      return diasSemana[1].label;
    case 'Tuesday':
      return diasSemana[2].label;
    case 'Wednesday':
      return diasSemana[3].label;
    case 'Thursday':
      return diasSemana[4].label;
    case 'Friday':
      return diasSemana[5].label;
    case 'Saturday':
      return diasSemana[6].label;
    case 'Sunday':
      return diasSemana[0].label;
    default:
      return engLabel;
  }
};

export const dtoDateData = (value?: string) => {
  switch (value) {
    case '0':
      return 'Sunday';
    case '1':
      return 'Monday';
    case '2':
      return 'Tuesday';
    case '3':
      return 'Wednesday';
    case '4':
      return 'Thursday';
    case '5':
      return 'Friday';
    case '6':
      return 'Saturday';
    case '8':
      return '';
    default:
      return value;
  }
};

type DiaLinea = {
  id: number;
  dia?: string;
  desde?: string;
  hasta?: string;
  descripcion?: string;
  date?: string;
};
interface IDia {
  id: number;
  fk_idpost: number;
  day: string;
  date: string | null;
  hour_start: string | null;
  hour_end: string | null;
  date_desc: string | null;
  status: {
    type: string;
    data: number[];
  };
  iduser_ins: number;
  date_ins: string; // ISO string
  iduser_upd: number | null;
  date_upd: string | null;
}

type BuildPublicUrlParamsGeneral = {
  origin?: string;
  section: string;
  title: string;
  id: number | string;
};

export function normalizarTitulo(text?: string | null): string {
  if (!text) return '';
  return text
    .normalize('NFD') // separa acentos
    .replace(/[\u0300-\u036f]/g, '') // quita acentos
    .toLowerCase() // pasa a minusculas
    .trim() // quita espacios al inicio y al final
    .replace(/[^a-z0-9\s-]/g, '') // quita caracteres especiales
    .replace(/\s+/g, '-'); // reemplaza espacios por guiones
}
export function buildPublicUrlGeneral({
  origin,
  section,
  title,
  id,
}: BuildPublicUrlParamsGeneral): string {
  const slugGeneral = normalizarTitulo(title);
  return `${origin}/${section}/${slugGeneral}${id}.html`;
}
type BuildPublicUrlParamsLaRevista = {
  origin?: string;
  section: string;
  id: number | string;
  idcategories: number | string;
};

export function buildPublicUrlLaRevista({
  origin,
  section,
  id,
  idcategories,
}: BuildPublicUrlParamsLaRevista): string {
  return `${origin}/${section}/${id}/${idcategories}.html`;
}

export function createFinalData(data: any[], params: any) {
  const finalData = data.map((item) => {
    const url = URLS[params.table as keyof typeof URLS];
    const { idcat, ...rest } = item;

    if (params.table === 'magazine_') {
      return {
        ...rest,
        url: buildPublicUrlLaRevista({
          origin: url,
          section: `posts`,
          id: item.id,
          idcategories: item.idcat,
        }),
      };
    }
    return {
      ...rest,
      url: buildPublicUrlGeneral({
        origin: url,
        section: `${params.table}posts`,
        title: item.titulo,
        id: item.id,
      }),
    };
  });
  return finalData;
}

export const formatFecha = (fecha: string) => {
  if (!fecha) return fecha;
  const [day, month, year] = fecha.split('-');
  if (day.length === 2 && year.length === 4) {
    return `${year}-${month}-${day}`;
  }
  return fecha;
};
