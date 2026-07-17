type BuildPublicUrlParamsGeneral = {
  origin: string;
  section: string;
  title: string;
  id?: number | string;
};

type BuildPublicUrlParamsLaRevista = {
  origin: string;
  section: string;
  id: number | string;
  idcategories: number | string;
};

export function normalizarTitulo(text: string): string {
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
  return `${origin}/${section}/${slugGeneral}${id != null ? id : ''}.html`;
}

export function buildPublicUrlLaRevista({
  origin,
  section,
  id,
  idcategories,
}: BuildPublicUrlParamsLaRevista): string {
  return `${origin}/${section}/${id}/${idcategories}.html`;
}
