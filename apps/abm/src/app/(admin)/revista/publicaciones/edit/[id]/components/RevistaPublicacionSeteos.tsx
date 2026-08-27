'use client';

import { useEffect, useState } from 'react';
import MagazineService from '../../../../../../../../services/MagazineService';
import * as Yup from 'yup';
import { ISeteosPublicacionRevista } from '@/types/postTypes';
import CategoriesServices from '../../../../../../../../services/CategoriesServices';
import IssueService from '../../../../../../../../services/IssueService';

const BIENESTAR_ID = '98';

export const revistaPublicacionSeteosSchema = Yup.object({
  fk_id_magazine_issue: Yup.number().required('La revista es obligatoria'),
  fk_idcat: Yup.string().required('La categoría es obligatoria'),
  tipo_post_id: Yup.number().required('El tipo de noticia es obligatorio'),
  idsubcategories: Yup.string()
    .nullable()
    .when('fk_idcat', {
      is: BIENESTAR_ID,
      then: (schema) => schema.required('Debe seleccionar una subcategoría'),
      otherwise: (schema) => schema.nullable(),
    }),
});

export interface IRevista {
  id: number;
  numero: number;
  titulo: string;
  fecha: string;
  ultimaAccion: string;
  status: {
    type: string;
    data: number[];
  };
}

interface Itype {
  id: number;
  orden: number;
  status: { type: string; data: number[] };
  tipo: string;
  ultimaAccion: null | string; // Asumo que ultimaAccion puede ser string o null
  url: string;
}

interface ICategoria {
  PostsSubcat: number;
  cantidadPosts: number;
  destacado: number;
  fecha: string;
  id: number;
  menu: null | string; // Asumiendo que podría ser un string en el futuro
  orden: number;
  status: number;
  titulo: string;
  ultimaAccion: string;
  url: string;
}

export default function RevistaPublicacionSeteos({
  seteos,
  setSeteos,
}: {
  seteos: ISeteosPublicacionRevista;
  setSeteos: (newSeteos: ISeteosPublicacionRevista) => void;
}) {
  const [categorias, setCategorias] = useState<ICategoria[]>([]);
  const [subCategorias, setSubCategorias] = useState<ICategoria[]>([]);
  const [revistas, setRevistas] = useState<IRevista[] | undefined>();
  const [types, setTypes] = useState<Itype[] | undefined>();

  const fetchRevistas = async () => {
    const response = await IssueService.getAll({
      limit: 100,
      offset: 0,
      table: 'magazine'
    });
    setRevistas(response.data as unknown as IRevista[]);
  };
  const fetchTipoPublicacion = async () => {
    const response = await MagazineService.getAllTypes({
      limit: 100,
      offset: 0,
    });
    setTypes(response.data as unknown as Itype[]);
  };
  const fetchCategorias = async () => {
    const response = await CategoriesServices.getAllCategories({
      limit: 100,
      offset: 0,
      table: 'magazine_categorias'
    });
    const subCategoriasArr = (response.data as unknown as ICategoria[]).filter(
      (cat: ICategoria) => cat.menu === null,
    );
    const categoriasArr = (response.data as unknown as ICategoria[]).filter(
      (cat: ICategoria) => cat.menu !== null,
    );
    setCategorias(categoriasArr);
    setSubCategorias(subCategoriasArr);
  };

  useEffect(() => {
    try {
      fetchRevistas();
      fetchTipoPublicacion();
      fetchCategorias();
      // Parsear y actualizar padre al montar (solo una vez, limpia el ISO)
      const parsedIni = seteos.date_ini ? seteos.date_ini.split('T')[0] : null;
      const parsedEnd = seteos.date_end ? seteos.date_end.split('T')[0] : null;
      const parsedArticle = seteos.date_article ? seteos.date_article.split('T')[0] : null;

      if (
        parsedIni !== seteos.date_ini ||
        parsedEnd !== seteos.date_end ||
        parsedArticle !== seteos.date_article
      ) {
        // Solo actualiza si cambió (evita loops infinitos)
        setSeteos({
          ...seteos,
          date_ini: parsedIni,
          date_end: parsedEnd,
          date_article: parsedArticle,
        });
      }
    } catch (error) {
      console.error('Error fetching revistas:', error);
    }
  }, [seteos, setSeteos]);

  return (
    <form className="grid grid-cols-12 gap-4 rounded-2xl border p-4">
      {/* Seleccione Revista */}
      <div className="col-span-10 p-4">
        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
          Seleccione Revista
        </label>
        <select
          value={seteos.fk_id_magazine_issue}
          onChange={(e) =>
            setSeteos({
              ...seteos,
              fk_id_magazine_issue: parseInt(e.target.value) || 0,
            })
          }
          className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
        >
          <option value="">Seleccione...</option>
          {revistas?.map((revista: IRevista) => (
            <option key={revista.id} value={revista.id}>
              {revista.titulo}
            </option>
          ))}
        </select>
      </div>
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
        >
          <span
            className={`h-5 w-5 transform rounded-full bg-white shadow transition ${seteos.status.data[0] === 1 ? 'translate-x-6' : 'translate-x-1'
              }`}
          />
        </button>
      </div>
      {/* Tipo de noticia */}
      <div className="col-span-6 p-4">
        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
          Tipo de noticia
        </label>
        <div className="relative">
          <select
            value={seteos.tipo_post_id ?? ''}
            onChange={(e) =>
              setSeteos({
                ...seteos,
                tipo_post_id: parseInt(e.target.value) || 0,
              })
            }
            className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
          >
            <option>Seleccione el tipo de noticia</option>
            {types?.map((tipo: Itype) => (
              <option key={tipo.id} value={tipo.id}>
                {tipo.tipo}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Categorías principales */}
      <div className="col-span-6 p-4">
        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
          Categoria
        </label>
        <select
          value={seteos.fk_idcat ?? null}
          onChange={(e) => {
            const newCat = e.target.value;
            setSeteos({
              ...seteos,
              fk_idcat: newCat,
              idsubcategories: newCat === BIENESTAR_ID ? seteos.idsubcategories : null,
            });
          }}
          className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
          name=""
          id=""
        >
          <option value="">Seleccione la categoría principal</option>
          {categorias.map((categoria) => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.titulo}
            </option>
          ))}
        </select>
      </div>

      {/* Subcategorías — habilitado solo si la categoría es BIENESTAR (98) */}
      <div className="col-span-6 p-4">
        <label
          className={`mb-1.5 block text-sm font-medium ${seteos.fk_idcat === BIENESTAR_ID ? 'text-gray-700 dark:text-gray-400' : 'text-gray-400 dark:text-gray-600'}`}
        >
          Subcategorías
        </label>
        <select
          value={seteos.idsubcategories ?? ''}
          onChange={(e) => setSeteos({ ...seteos, idsubcategories: e.target.value || null })}
          disabled={seteos.fk_idcat !== BIENESTAR_ID}
          title={
            seteos.fk_idcat !== BIENESTAR_ID
              ? 'Para habilitarlo, debe seleccionar BIENESTAR en Categoría'
              : undefined
          }
          className={`h-11 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm dark:border-gray-700 ${seteos.fk_idcat === BIENESTAR_ID
            ? 'bg-transparent text-gray-800 dark:bg-gray-900 dark:text-white/90'
            : 'cursor-not-allowed bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500'
            }`}
        >
          <option value="">Seleccione una subcategoría</option>
          {subCategorias.map((subcategoria) => (
            <option key={subcategoria.id} value={subcategoria.id}>
              {subcategoria.titulo}
            </option>
          ))}
        </select>
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

      {/* Publicar en Slider */}
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
          value={seteos.orderby ?? 0}
          onChange={(e) => setSeteos({ ...seteos, orderby: parseInt(e.target.value) || 0 })}
          className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
        />
      </div>

      {/* Fechas */}
      <div className="col-span-6 p-4">
        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
          Fecha Noticia
        </label>
        <input
          type="date"
          value={seteos.date_article ? seteos.date_article.split('T')[0] : ''} // Siempre parsea para display
          onChange={(e) => {
            const newValue = e.target.value; // 'YYYY-MM-DD' puro
            setSeteos({ ...seteos, date_article: newValue || null }); // Actualiza padre sin hora
          }}
          className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
        />
      </div>

      <div className="col-span-6 p-4">
        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
          Fecha Fin Publicación
        </label>
        <input
          type="date"
          value={seteos.date_end ? seteos.date_end.split('T')[0] : ''} // Siempre parsea
          onChange={(e) => {
            const newValue = e.target.value;
            setSeteos({ ...seteos, date_end: newValue || null });
          }}
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
