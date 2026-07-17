'use client';

import { useEffect, useState } from 'react';
import MagazineService from '../../../../../../../../services/MagazineService';
import * as Yup from 'yup';
import { ISeteosPublicacionRevista } from '@/types/postTypes';
import MenuService from '../../../../../../../../services/MenuService';
import PrensaService from '../../../../../../../../services/PrensaService';

export const prensaPublicacionSeteosSchema = Yup.object({
  tipo_post_id: Yup.number()
    .min(1, 'Tipo de noticia es obligatorio')
    .required('Tipo de noticia es obligatorio'),
});

interface Itype {
  id: number;
  orden: number;
  status: { type: string; data: number[] };
  tipo: string;
  titulo: string;
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

export default function PrensaPublicacionSeteos({
  seteos,
  setSeteos,
  textos,
  setTextos,
}: {
  seteos: any;
  setSeteos: (newSeteos: any) => void;
  textos?: any;
  setTextos?: (newTextos: any) => void;
}) {
  const [menues, setMenues] = useState<any[]>([]);
  const [categorias, setCategorias] = useState<ICategoria[]>([]);

  const [types, setTypes] = useState<Itype[] | undefined>();

  const fetchTipoPublicacion = async () => {
    const response = await PrensaService.getAllTypes({
      limit: 100,
      offset: 0,
    }); // a cambiar
    setTypes(response.data as unknown as Itype[]);
  };

  useEffect(() => {
    try {
      fetchTipoPublicacion();

      // Parsear y actualizar padre al montar (solo una vez, limpia el ISO)
      const parsedEnd = seteos.date_end ? seteos.date_end.split('T')[0] : null;
      const parsedArticle = seteos.date_article ? seteos.date_article.split('T')[0] : null;
      const parsedEfemerides = seteos.date_efemerides ? seteos.date_efemerides.split('T')[0] : null;
      const parsedTipo = seteos.tipo_post_id ?? seteos.type ?? null;

      if (
        parsedEnd !== seteos.date_end ||
        parsedArticle !== seteos.date_article ||
        parsedEfemerides !== seteos.date_efemerides ||
        parsedTipo !== seteos.tipo_post_id
      ) {
        // Solo actualiza si cambió (evita loops infinitos)
        setSeteos({
          ...seteos,
          date_end: parsedEnd,
          date_article: parsedArticle,
          date_efemerides: parsedEfemerides,
          tipo_post_id: parsedTipo,
          id_userupd: seteos.iduser_upd || seteos.id_userupd,
        });
      }
    } catch (error) {
      console.error('Error fetching revistas:', error);
    }
  }, [seteos, setSeteos]);

  const inputClass =
    'h-[42px] w-full rounded-xl border px-4 py-2 text-sm bg-gray-50/50 dark:bg-gray-800/50 text-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all';
  const labelClass = 'mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300';
  const noteClass = 'block mt-1.5 text-xs font-medium text-gray-400 dark:text-gray-500';

  const isPublicado = seteos?.status?.data?.[0] === 1;
  const isDestacado = seteos?.desta?.data?.[0] === 1;

  const fetchMenus = async () => {
    const response = await MenuService.getAll();
    setMenues(response);
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  return (
    <form className="space-y-8 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800/60 dark:bg-gray-900">
      {/* --- SECCIÓN: ESTADO Y VISIBILIDAD --- */}
      <div>
        <h3 className="mb-5 border-b border-gray-100 pb-2 text-base font-bold text-gray-800 dark:border-gray-800 dark:text-gray-100">
          Estado y Visibilidad
        </h3>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Publicado */}
          <div className="flex flex-col justify-center">
            <label className={labelClass}>Publicado</label>
            <div className="flex h-[42px] items-center gap-3">
              <button
                type="button"
                onClick={() =>
                  setSeteos({
                    ...seteos,
                    status: { ...seteos.status, data: [isPublicado ? 0 : 1] },
                  })
                }
                className={`flex h-6 w-12 items-center rounded-full transition-colors ${
                  isPublicado ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform ${
                    isPublicado ? 'translate-x-[26px]' : 'translate-x-[2px]'
                  }`}
                />
              </button>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {isPublicado ? 'Activo' : 'Inactivo'}
              </span>
            </div>
          </div>

          {/* Es Destacado? */}
          <div className="flex flex-col justify-center">
            <label className={labelClass}>¿Es Destacado?</label>
            <div className="flex h-[42px] items-center gap-3">
              <button
                type="button"
                onClick={() =>
                  setSeteos({
                    ...seteos,
                    desta: { ...seteos.desta, data: [isDestacado ? 0 : 1] },
                  })
                }
                className={`flex h-6 w-12 items-center rounded-full transition-colors ${
                  isDestacado ? 'bg-blue-500' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform ${
                    isDestacado ? 'translate-x-[26px]' : 'translate-x-[2px]'
                  }`}
                />
              </button>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {isDestacado ? 'Sí' : 'No'}
              </span>
            </div>
            <span className={noteClass}>Se mostrará en la Home de notices rotantes.</span>
          </div>

          {/* Orden */}
          <div>
            <label className={labelClass}>Orden</label>
            <input
              type="number"
              value={seteos.orderby ?? 0}
              onChange={(e) => setSeteos({ ...seteos, orderby: parseInt(e.target.value) || 0 })}
              className={inputClass}
              placeholder="Ej: 1"
            />
            <span className={noteClass}>Define el orden como destacado.</span>
          </div>

          {/* Tipo de noticia */}
          <div>
            <label className={labelClass}>Tipo de noticia *</label>
            <select
              value={seteos.tipo_post_id ?? ''}
              onChange={(e) =>
                setSeteos({
                  ...seteos,
                  tipo_post_id: parseInt(e.target.value) || 0,
                })
              }
              className={inputClass}
            >
              <option value="">Seleccione el tipo...</option>
              {types?.map((tipo: Itype) => (
                <option key={tipo.id} value={tipo.id}>
                  {tipo.titulo}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* --- SECCIÓN: FECHAS --- */}
      <div>
        <h3 className="mb-5 border-b border-gray-100 pb-2 text-base font-bold text-gray-800 dark:border-gray-800 dark:text-gray-100">
          Fechas y Temporalidad
        </h3>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Fecha Noticia */}
          <div>
            <label className={labelClass}>Fecha de la Noticia</label>
            <div className="relative">
              <input
                type="date"
                value={seteos.date_article ? seteos.date_article.split('T')[0] : ''}
                onChange={(e) => setSeteos({ ...seteos, date_article: e.target.value || null })}
                className={inputClass}
              />
              {seteos.date_article && (
                <button
                  type="button"
                  onClick={() => setSeteos({ ...seteos, date_article: null })}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-red-500"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
            <span className={noteClass}>Si se deja vacío toma la fecha de ingreso.</span>
          </div>

          {/* Fecha Efemerides */}
          <div>
            <label className={labelClass}>Fecha Efemérides</label>
            <div className="relative">
              <input
                type="date"
                value={seteos.date_efemerides ? seteos.date_efemerides.split('T')[0] : ''}
                onChange={(e) =>
                  setSeteos({
                    ...seteos,
                    date_efemerides: e.target.value || null,
                  })
                }
                className={inputClass}
              />
              {seteos.date_efemerides && (
                <button
                  type="button"
                  onClick={() => setSeteos({ ...seteos, date_efemerides: null })}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-red-500"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
            <span className={noteClass}>Indica repetición anual (efemérides).</span>
          </div>

          {/* Fecha Fin */}
          <div>
            <label className={labelClass}>Fecha Fin de Publicación</label>
            <div className="relative">
              <input
                type="date"
                value={seteos.date_end ? seteos.date_end.split('T')[0] : ''}
                onChange={(e) => setSeteos({ ...seteos, date_end: e.target.value || null })}
                className={inputClass}
              />
              {seteos.date_end && (
                <button
                  type="button"
                  onClick={() => setSeteos({ ...seteos, date_end: null })}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-red-500"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
            <span className={noteClass}>Completar para dar de baja automáticamente.</span>
          </div>
        </div>
      </div>

      {/* --- SECCIÓN: FUENTES Y ENLACES --- */}
      <div>
        <h3 className="mb-5 border-b border-gray-100 pb-2 text-base font-bold text-gray-800 dark:border-gray-800 dark:text-gray-100">
          Fuentes y Enlaces
        </h3>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Fuente (pre cargado) */}
          <div>
            <label className={labelClass}>Fuente sugerida</label>
            <select
              onChange={(e) => setSeteos({ ...seteos, source: e.target.value })}
              defaultValue=""
              className={inputClass}
            >
              <option value="" disabled>
                Seleccione una fuente predeterminada...
              </option>
              <option value="Legislatura de la Ciudad Autónoma de Buenos Aires">
                Legislatura de la Ciudad
              </option>
              <option value="Prensa Oficial">Prensa Oficial</option>
            </select>
            <span className={noteClass}>Al seleccionar, se autocompletará el campo inferior.</span>
          </div>

          {/* Fuente texto libre */}
          <div>
            <label className={labelClass}>Fuente (Texto Manual)</label>
            <input
              value={seteos.source ?? ''}
              onChange={(e) => setSeteos({ ...seteos, source: e.target.value })}
              type="text"
              placeholder="Escriba la fuente..."
              className={inputClass}
            />
          </div>

          {/* Menú Existente */}
          <div>
            <label className={labelClass}>Vincular a Menú Existente</label>
            <select
              value={seteos.fk_menuid ?? ''}
              onChange={(e) =>
                setSeteos({
                  ...seteos,
                  fk_menuid: parseInt(e.target.value) || null,
                })
              }
              className={inputClass}
            >
              <option value="">Seleccione el menú.</option>
              {menues?.map((menu) => (
                <option key={menu.id} value={menu.id}>
                  {menu.title}
                </option>
              ))}
            </select>
            <span className={noteClass}>Si elige una relación con menú, se ignorará la URL.</span>
          </div>

          {/* URL */}
          <div>
            <label className={labelClass}>URL de la Publicación</label>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-sm text-gray-400">/</span>
              <input
                value={textos?.url ?? ''}
                onChange={(e) => {
                  if (setTextos && textos) {
                    setTextos({ ...textos, url: e.target.value });
                  }
                }}
                type="text"
                placeholder="posts/mi-nueva-noticia.html"
                className={`${inputClass} pl-8`}
              />
            </div>
            <span className={noteClass}>
              Se genera desde el título (posts/&#123;titulo&#125;.html). Puede acortarla
              manualmente; mantenga el formato posts/...html.
            </span>
          </div>

          {/* Contenido Extra */}
          <div className="md:col-span-2">
            <label className={labelClass}>Contenido Extra a Cargar (Load)</label>
            <input
              value={seteos.loadcontent ?? ''}
              onChange={(e) => setSeteos({ ...seteos, loadcontent: e.target.value })}
              type="text"
              placeholder="Indique la ruta del archivo a cargar..."
              className={inputClass}
            />
            <span className={noteClass}>
              Uso avanzado: complete este campo si mostrará contenidos dinámicos a través de un
              archivo cargado.
            </span>
          </div>
        </div>
      </div>
    </form>
  );
}
