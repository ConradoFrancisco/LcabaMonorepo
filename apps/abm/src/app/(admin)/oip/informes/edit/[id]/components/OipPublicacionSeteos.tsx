'use client';

import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import MenuService from '../../../../../../../../services/MenuService';
import TypesService from '../../../../../../../../services/TypesService';

export const oipPublicacionSeteosSchema = Yup.object({
  tipo_post_id: Yup.number().nullable(),
});

interface Itype {
  id: number;
  tipo?: string;
  titulo?: string;
}

export default function OipPublicacionSeteos({
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
  const [types, setTypes] = useState<Itype[]>([]);

  const fetchTipoPublicacion = async () => {
    try {
      const response = await TypesService.getAll({
        table: 'evidencias_posts_type',
        limit: 100,
        offset: 0,
      });
      setTypes(response.data || []);
    } catch (error) {
      console.error('Error fetching tipos de evidencias:', error);
    }
  };

  const fetchMenus = async () => {
    try {
      const response = await MenuService.getAll();
      setMenues(response || []);
    } catch (error) {
      console.error('Error fetching menues:', error);
    }
  };

  useEffect(() => {
    fetchTipoPublicacion();
    fetchMenus();

    const parsedEnd = seteos.date_end ? seteos.date_end.split('T')[0] : null;
    const parsedArticle = seteos.date_article ? seteos.date_article.split('T')[0] : null;
    const parsedTipo = seteos.tipo_post_id ?? seteos.type ?? null;

    if (
      parsedEnd !== seteos.date_end ||
      parsedArticle !== seteos.date_article ||
      parsedTipo !== seteos.tipo_post_id
    ) {
      setSeteos({
        ...seteos,
        date_end: parsedEnd,
        date_article: parsedArticle,
        tipo_post_id: parsedTipo,
        id_userupd: seteos.iduser_upd || seteos.id_userupd,
      });
    }
  }, [seteos, setSeteos]);

  const inputClass =
    'h-[42px] w-full rounded-xl border px-4 py-2 text-sm bg-gray-50/50 dark:bg-gray-800/50 text-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all';
  const labelClass = 'mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300';
  const noteClass = 'block mt-1.5 text-xs font-medium text-gray-400 dark:text-gray-500';

  const isPublicado =
    typeof seteos?.status === 'object' && seteos?.status !== null && 'data' in seteos.status
      ? seteos.status.data[0] === 1
      : seteos?.status === 1 || seteos?.status === true;

  const isDestacado =
    typeof seteos?.desta === 'object' && seteos?.desta !== null && 'data' in seteos.desta
      ? seteos.desta.data[0] === 1
      : seteos?.desta === 1 || seteos?.desta === true;

  return (
    <form className="space-y-8 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800/60 dark:bg-gray-900">
      {/* --- SECCIÓN: ESTADO Y TIPO --- */}
      <div>
        <h3 className="mb-5 border-b border-gray-100 pb-2 text-base font-bold text-gray-800 dark:border-gray-800 dark:text-gray-100">
          Estado y Visibilidad
        </h3>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Publicado */}
          <div className="flex flex-col justify-center">
            <label className={labelClass}>Publicado</label>
            <div className="flex h-[42px] items-center gap-3">
              <button
                type="button"
                onClick={() =>
                  setSeteos({
                    ...seteos,
                    status: isPublicado ? 0 : 1,
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

          {/* Tipo de noticia */}
          <div className="lg:col-span-2">
            <label className={labelClass}>Tipo de noticia: *</label>
            <select
              value={seteos.tipo_post_id ?? seteos.type ?? ''}
              onChange={(e) =>
                setSeteos({
                  ...seteos,
                  tipo_post_id: parseInt(e.target.value) || 0,
                  type: parseInt(e.target.value) || 0,
                })
              }
              className={inputClass}
            >
              <option value="">Seleccione el tipo...</option>
              {types.map((tipo) => (
                <option key={tipo.id} value={tipo.id}>
                  {tipo.titulo || tipo.tipo}
                </option>
              ))}
            </select>
          </div>

          {/* ¿Es Destacado? */}
          <div className="flex flex-col justify-center">
            <label className={labelClass}>¿Es Destacado?</label>
            <div className="flex h-[42px] items-center gap-3">
              <button
                type="button"
                onClick={() =>
                  setSeteos({
                    ...seteos,
                    desta: isDestacado ? 0 : 1,
                  })
                }
                className={`flex h-6 w-12 items-center rounded-full transition-colors ${
                  isDestacado ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'
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
            <span className={noteClass}>Aparecen en la Home dentro de las noticias rotantes</span>
          </div>

          {/* Orden */}
          <div className="lg:col-span-2">
            <label className={labelClass}>Orden</label>
            <input
              type="number"
              value={seteos.orderby ?? 0}
              onChange={(e) => setSeteos({ ...seteos, orderby: parseInt(e.target.value) || 0 })}
              className={inputClass}
              placeholder="Ej: 1"
            />
            <span className={noteClass}>
              Determina el orden en que se ven en la home como destacados
            </span>
          </div>
        </div>
      </div>

      {/* --- SECCIÓN: FECHAS --- */}
      <div>
        <h3 className="mb-5 border-b border-gray-100 pb-2 text-base font-bold text-gray-800 dark:border-gray-800 dark:text-gray-100">
          Fechas
        </h3>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Fecha Noticia */}
          <div>
            <label className={labelClass}>Fecha Noticia:</label>
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
                  ✕
                </button>
              )}
            </div>
            <span className={noteClass}>
              Al dejar vacío se toma como fecha la de ingreso de la publicación
            </span>
          </div>

          {/* Fecha Fin Publicación */}
          <div>
            <label className={labelClass}>Fecha Fin Publicación:</label>
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
                  ✕
                </button>
              )}
            </div>
            <span className={noteClass}>
              Solo completar en caso de querer quitar del listado en una fecha destinada
            </span>
          </div>
        </div>
      </div>

      {/* --- SECCIÓN: FUENTE, MENÚ, URL Y CONTENIDO EXTRA --- */}
      <div>
        <h3 className="mb-5 border-b border-gray-100 pb-2 text-base font-bold text-gray-800 dark:border-gray-800 dark:text-gray-100">
          Fuente y Enlaces
        </h3>

        <div className="space-y-6">
          {/* Fuente */}
          <div>
            <label className={labelClass}>Fuente:</label>
            <input
              value={seteos.source ?? ''}
              onChange={(e) => setSeteos({ ...seteos, source: e.target.value })}
              type="text"
              placeholder="OIP"
              className={inputClass}
            />
            <span className={noteClass}>Si queda vacío se autocompleta con &quot;OIP&quot;</span>
          </div>

          {/* Seleccione Menú Existente */}
          <div>
            <label className={labelClass}>Seleccione Menú Existente</label>
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
              <option value="">Seleccione un menú...</option>
              {menues.map((menu) => (
                <option key={menu.id} value={menu.id}>
                  {menu.title}
                </option>
              ))}
            </select>
            <span className={noteClass}>
              Atención: Al seleccionar una relación con un item del menú el campo URL no será tomado
              en cuenta
            </span>
          </div>

          {/* URL */}
          <div>
            <label className={labelClass}>Url</label>
            <input
              value={textos?.url ?? seteos?.url ?? ''}
              onChange={(e) => {
                if (setTextos && textos) {
                  setTextos({ ...textos, url: e.target.value });
                } else {
                  setSeteos({ ...seteos, url: e.target.value });
                }
              }}
              type="text"
              placeholder="evidencias_posts/comunicacion/..."
              className={inputClass}
            />
            <span className={noteClass}>
              Nota: Esto define la URL con la que se accederá a la publicación, el .html se agrega
              automáticamente
            </span>
          </div>

          {/* Contenido Extra */}
          <div>
            <label className={labelClass}>Contenido Extra:</label>
            <input
              value={seteos.loadcontent ?? ''}
              onChange={(e) => setSeteos({ ...seteos, loadcontent: e.target.value })}
              type="text"
              placeholder="Ruta o contenido a cargar..."
              className={inputClass}
            />
            <span className={noteClass}>
              Nota: Solo completar si los contenidos a mostrar van a ser los cargados en el formulario
              informado (load)
            </span>
          </div>
        </div>
      </div>
    </form>
  );
}
