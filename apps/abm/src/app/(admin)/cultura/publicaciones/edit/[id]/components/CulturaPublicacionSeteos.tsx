'use client';

import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import CulturaService from '../../../../../../../../services/CulturaService';
import MultiSelect from '@/components/form/MultiSelect';
import CategoriesServices from '../../../../../../../../services/CategoriesServices';

const hasRealSelection = (val: unknown) =>
  String(val ?? '')
    .split(',')
    .some((v) => v.trim() && v.trim() !== '0');

export const CulturaPublicacionSeteosSchema = Yup.object({
  type: Yup.number().required('El tipo de noticia es obligatorio').nullable(),
  idcategories: Yup.mixed<number | []>().nullable(),
  idsubcategories: Yup.mixed<number | []>().nullable(),
}).test('solo-uno', 'Debes seleccionar categorías o subcategorías', function (values) {
  const { idcategories, idsubcategories } = values as {
    idcategories?: string | null;
    idsubcategories?: string | null;
  };
  const a = hasRealSelection(idcategories);
  const b = hasRealSelection(idsubcategories);
  return (a && !b) || (!a && b);
});

export interface ICultura {
  id: number;
  titulo: string;
  fecha: string;
  ultimaAccion: string;
  status: { type: string; data: number[] };
}

/* interface Itype {
  id: number;
  orden: number;
  status: { type: string; data: number[] };
  tipo: string;
  ultimaAccion: null | string;
  url: string;
} */

interface ICategoria {
  PostsSubcat: number;
  cantidadPosts: number;
  destacado: number;
  fecha: string;
  id: number;
  menu: null | string;
  orden: number;
  status: number;
  titulo: string;
  ultimaAccion: string;
  url: string;
}

interface ISetosPublicacionCultura {
  type: number;
  // DE ACA ABAJO ES DE REVISTA
  banner: { type: string; data: number[] };
  bgcolor: string | null;
  categoria: string;
  comments: number | null;
  date_article: string | null;
  date_article_parsed: string | null;
  date_end: string | null;
  date_end_parsed: string | null;
  date_end_pub: string | null;
  date_ini: string | null;
  date_ins: string;
  date_ins_parsed: string;
  date_upd: string | null;
  desta: { type: string; data: number[] };
  fk_idcat: string;
  fk_menuid: number | null;
  fk_pageid: number;
  gacetilla: { type: string; data: number[] };
  id: number;
  idcategories: string; // CSV
  idsubcategories: string | null; // CSV o null
  iduser_ins: number;
  iduser_upd: number | null;
  keywords: string;
  lang: number;
  loadcontent: unknown | null;
  magazine_shortdesc: string;
  magazine_title: string;
  magazine_url: string;
  menu_subtitle: string | null;
  menu_title: string | null;
  menu_url: string | null;
  orderby: number;
  removed: { type: string; data: number[] };
  slider: { type: string; data: number[] };
  source: string;
  status: { type: string; data: number[] };
  textcolor: string | null;
  tipo_post: string;
  tipo_post_id: number;
  typeorder: number;
  urltype: string;
}

export default function CulturaPublicacionSeteos({
  seteos,
  setSeteos,
}: {
  seteos: ISetosPublicacionCultura;
  setSeteos: (newSeteos: ISetosPublicacionCultura) => void;
}) {
  const [categorias, setCategorias] = useState<ICategoria[]>([]);
  const [subCategorias, setSubCategorias] = useState<ICategoria[]>([]);
  const [cultura, setCultura] = useState<ICultura[] | undefined>();

  const fetchTipoDeNoticia = async () => {
    const response = await CulturaService.getAllTypes({ limit: 100, offset: 0 });
    setCultura(response.data as unknown as ICultura[]);
  };

  const fetchCategorias = async () => {
    const response = await CategoriesServices.getAllCategories({
      limit: 100,
      offset: 0,
      table: 'cultura_categorias',
    });
    const data = (response.data as unknown as ICategoria[]) || [];
    const sortedData = [...data].sort((a: any, b: any) => a.titulo.localeCompare(b.titulo));
    const subCategoriasArr = sortedData.filter((cat) => cat.menu === null);
    const categoriasArr = sortedData.filter((cat) => cat.menu !== null);
    setCategorias(categoriasArr);
    setSubCategorias(subCategoriasArr);
  };

  useEffect(() => {
    Promise.all([fetchTipoDeNoticia(), fetchCategorias()]).catch((err) =>
      console.error('Error fetching datos de cultura:', err),
    );
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Opciones base
  const categoriaOpciones = categorias.map((c) => ({
    value: String(c.id),
    text: c.titulo,
    selected: false,
  }));
  const subcategoriaOpciones = subCategorias.map((sc) => ({
    value: String(sc.id),
    text: sc.titulo,
    selected: false,
  }));

  // "0" desde la BD se trata como vacío; String() por si la API devuelve número
  const parseCsvIds = (val: unknown) =>
    String(val ?? '')
      .split(',')
      .map((s) => s.trim())
      .filter((v) => v && v !== '0');

  const defaultCategorias = parseCsvIds(seteos.idcategories);
  const defaultSubcategorias = parseCsvIds(seteos.idsubcategories);

  // Estado local de exclusión mutua — independiente del prop seteos para evitar
  // que cualquier efecto externo con cierre obsoleto lo sobreescriba.
  // Se inicializa con los datos de la BD; si ambos tienen valores, categorías ganan.
  const [catActive, setCatActive] = useState(() => parseCsvIds(seteos?.idcategories).length > 0);
  const [subcatActive, setSubcatActive] = useState(
    () =>
      parseCsvIds(seteos?.idsubcategories).length > 0 &&
      parseCsvIds(seteos?.idcategories).length === 0,
  );

  const handleChangeCategorias = (vals: string[]) => {
    console.log('[cats] onChange →', vals, '| catActive antes:', catActive);
    setCatActive(vals.length > 0);
    setSubcatActive(false);
    setSeteos({ ...seteos, idcategories: vals.join(','), idsubcategories: null });
  };

  const handleChangeSubcategorias = (vals: string[]) => {
    console.log('[subcats] onChange →', vals, '| subcatActive antes:', subcatActive);
    setSubcatActive(vals.length > 0);
    setCatActive(false);
    setSeteos({
      ...seteos,
      idcategories: '',
      idsubcategories: vals.length > 0 ? vals.join(',') : null,
    });
  };

  return (
    <form className="grid grid-cols-12 gap-4 rounded-2xl border p-4">
      {/* Tipo de noticia */}
      <div className="col-span-10 p-4">
        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
          Tipo de noticia
        </label>
        <select
          value={seteos.type || undefined}
          onChange={(e) => setSeteos({ ...seteos, type: parseInt(e.target.value) || 0 })}
          className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
        >
          <option>Seleccione...</option>
          {cultura?.map((cultura: ICultura) => (
            <option key={cultura.id} value={cultura.id}>
              {cultura.titulo}
            </option>
          ))}
        </select>
      </div>
      {/* 

      {/* Publicado */}
      <div className="col-span-2 p-4">
        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
          Publicado
        </label>
        <button
          type="button"
          onClick={() =>
            setSeteos({
              ...seteos,
              status: {
                ...seteos.status,
                data: [seteos.status.data[0] === 1 ? 0 : 1],
              },
            })
          }
          className={`flex h-6 w-12 items-center rounded-full transition ${seteos.status.data[0] === 1 ? 'bg-green-500' : 'bg-gray-300'
            }`}
          aria-label="Alternar publicado"
        >
          <span
            className={`h-5 w-5 transform rounded-full bg-white shadow transition ${seteos.status.data[0] === 1 ? 'translate-x-6' : 'translate-x-1'
              }`}
          />
        </button>
      </div>

      {/* Categorías */}
      <div className="relative col-span-6 p-4">
        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
          Categorías
        </label>

        <div title={subcatActive ? 'Hay una subcategoría seleccionada' : undefined}>
          <MultiSelect
            label=""
            options={categoriaOpciones}
            defaultSelected={defaultCategorias}
            onChange={handleChangeCategorias}
            closeOnSelect={false}
            disabled={subcatActive}
            searchable={true}
            searchPlaceholder="Buscar categorías..."
            clearSearchOnSelect={true}
          />
        </div>
      </div>

      {/* Subcategorías */}
      <div className="relative col-span-6 p-4">
        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
          Subcategorías
        </label>

        <div title={catActive ? 'Hay una categoría seleccionada' : undefined}>
          <MultiSelect
            label=""
            options={subcategoriaOpciones}
            defaultSelected={defaultSubcategorias}
            onChange={handleChangeSubcategorias}
            closeOnSelect={false}
            disabled={catActive}
            searchable={true}
            searchPlaceholder="Buscar subcategorías..."
            clearSearchOnSelect={true}
          />
        </div>
      </div>

      {/* Destacado */}
      <div className="col-span-6 p-4">
        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
          ¿Es destacado?
        </label>
        <input
          type="checkbox"
          checked={seteos.desta.data[0] === 1}
          onChange={() =>
            setSeteos({
              ...seteos,
              desta: {
                ...seteos.desta,
                data: [seteos.desta.data[0] === 1 ? 0 : 1],
              },
            })
          }
          className="h-5 w-5"
        />
      </div>

      {/* Slider Home */}
      <div className="col-span-6 p-4">
        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
          Publicar en Slider Home
        </label>
        <input
          type="checkbox"
          checked={seteos.slider.data[0] === 1}
          onChange={() =>
            setSeteos({
              ...seteos,
              slider: {
                ...seteos.slider,
                data: [seteos.slider.data[0] === 1 ? 0 : 1],
              },
            })
          }
          className="h-5 w-5"
        />
      </div>

      {/* Orden */}
      <div className="col-span-6 p-4">
        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
          Orden
        </label>
        <input
          type="number"
          value={Number.isFinite(Number(seteos.orderby)) ? seteos.orderby : 0}
          onChange={(e) => setSeteos({ ...seteos, orderby: parseInt(e.target.value) || 0 })}
          className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
        />
      </div>

      {/* Fecha Noticia */}
      <div className="col-span-6 p-4">
        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
          Fecha Noticia
        </label>
        <input
          type="date"
          value={seteos.date_ini ? seteos.date_ini.split('T')[0] : ''}
          onChange={(e) => setSeteos({ ...seteos, date_ini: e.target.value || null })}
          className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
        />
      </div>

      {/* Fecha Fin Publicación */}
      <div className="col-span-6 p-4">
        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
          Fecha Fin Publicación
        </label>
        <input
          type="date"
          value={seteos.date_end ? seteos.date_end.split('T')[0] : ''}
          onChange={(e) => setSeteos({ ...seteos, date_end: e.target.value || null })}
          className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
        />
      </div>

      {/* Fuente */}
      <div className="col-span-12 p-4">
        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
          Fuente
        </label>
        <input
          value={seteos.source ?? ''}
          onChange={(e) => setSeteos({ ...seteos, source: e.target.value })}
          type="text"
          placeholder="Ej: Legislatura de la Ciudad Autónoma de Buenos Aires"
          className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
        />
      </div>
    </form>
  );
}
