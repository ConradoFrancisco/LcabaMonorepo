'use client';

import React from 'react';
import { ISeteosType } from '@/types/postTypes';

interface TiposSeteosProps {
  seteos: ISeteosType;
  setSeteos: (newSeteos: ISeteosType) => void;
  tableType: 'revista' | 'cultura' | 'prensa';
}

export default function TiposSeteos({ seteos, setSeteos, tableType }: TiposSeteosProps) {
  const isChecked = (val: any) => {
    if (typeof val === 'object' && val !== null && 'data' in val) {
      return val.data?.[0] === 1;
    }
    return val === 1 || val === true;
  };

  const handleCheckboxChange = (field: keyof ISeteosType) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setSeteos({
      ...seteos,
      [field]: e.target.checked ? 1 : 0,
    });
  };

  const handleChange = (field: keyof ISeteosType) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setSeteos({
      ...seteos,
      [field]: e.target.value,
    });
  };

  return (
    <div className="card-surface grid gap-6 rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
      {/* Header tipo barra azul del legacy */}
      <div className="rounded-lg bg-sky-500 px-4 py-2.5 text-white font-medium text-sm">
        {tableType === 'cultura' ? 'Agregar Tipo de Noticia' : 'Agregar Tipo de Noticia'}
      </div>

      {/* Descripción (Título / Nombre del tipo) */}
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
          Descripción: <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={seteos.title ?? seteos.titulo ?? ''}
          onChange={(e) =>
            setSeteos({
              ...seteos,
              title: e.target.value,
              titulo: e.target.value,
            })
          }
          placeholder="Descripción del tipo"
          className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
        />
      </div>

      {/* Descripción Corta */}
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
          Descripción Corta:
        </label>
        <textarea
          rows={3}
          value={seteos.shortdesc ?? ''}
          onChange={handleChange('shortdesc')}
          placeholder="Descripción corta"
          className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
        />
      </div>

      {/* Publicado (Status) */}
      <div className="flex items-center gap-3">
        <label className="relative inline-flex cursor-pointer items-center">
          <input
            type="checkbox"
            checked={isChecked(seteos.status)}
            onChange={handleCheckboxChange('status')}
            className="peer sr-only"
          />
          <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-emerald-500 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none dark:bg-gray-700"></div>
        </label>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Publicado</span>
      </div>

      {/* Campos específicos según el módulo */}
      {tableType === 'cultura' ? (
        <>
          {/* Banner */}
          <div>
            <div className="flex items-center gap-3">
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  checked={isChecked(seteos.banner)}
                  onChange={handleCheckboxChange('banner')}
                  className="peer sr-only"
                />
                <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-emerald-500 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none dark:bg-gray-700"></div>
              </label>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Banner</span>
            </div>
            <span className="mt-1 block text-xs text-gray-400 dark:text-gray-500">
              Nota: Determina si se ve en el banner
            </span>
          </div>

          {/* Ver Solo Cultura */}
          <div>
            <div className="flex items-center gap-3">
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  checked={isChecked(seteos.solo_cultura)}
                  onChange={handleCheckboxChange('solo_cultura')}
                  className="peer sr-only"
                />
                <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-emerald-500 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none dark:bg-gray-700"></div>
              </label>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Ver Solo Cultura</span>
            </div>
            <span className="mt-1 block text-xs text-gray-400 dark:text-gray-500">
              Nota: Determina si se ve en el menu de cultura y solo ahi
            </span>
          </div>

          {/* Permite Envio Gacetilla */}
          <div>
            <div className="flex items-center gap-3">
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  checked={isChecked(seteos.gacetilla)}
                  onChange={handleCheckboxChange('gacetilla')}
                  className="peer sr-only"
                />
                <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-emerald-500 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none dark:bg-gray-700"></div>
              </label>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Permite Envio Gacetilla</span>
            </div>
            <span className="mt-1 block text-xs text-gray-400 dark:text-gray-500">
              Nota: Determina si se ve listado en el envio de gacetillas
            </span>
          </div>
        </>
      ) : (
        /* Revista y Prensa */
        <>
          {/* Categoria Principal */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Categoría Principal
            </label>
            <input
              type="number"
              value={seteos.parentid ?? ''}
              onChange={handleChange('parentid')}
              placeholder="ID de categoría principal (opcional)"
              className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
            />
            <span className="mt-1 block text-xs text-gray-400 dark:text-gray-500">
              Nota: Determina si esta asociada a un Tipo Principal
            </span>
          </div>

          {/* Mostrar SOLO en Calendario */}
          <div>
            <div className="flex items-center gap-3">
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  checked={isChecked(seteos.showincal)}
                  onChange={handleCheckboxChange('showincal')}
                  className="peer sr-only"
                />
                <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-emerald-500 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none dark:bg-gray-700"></div>
              </label>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Mostrar SOLO en Calendario</span>
            </div>
            <span className="mt-1 block text-xs text-gray-400 dark:text-gray-500">
              Nota: Determina si se ve SOLAMENTE en el Calendario
            </span>
          </div>

          {/* Permite Envio Gacetilla */}
          <div>
            <div className="flex items-center gap-3">
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  checked={isChecked(seteos.gacetilla)}
                  onChange={handleCheckboxChange('gacetilla')}
                  className="peer sr-only"
                />
                <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-emerald-500 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none dark:bg-gray-700"></div>
              </label>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Permite Envio Gacetilla</span>
            </div>
            <span className="mt-1 block text-xs text-gray-400 dark:text-gray-500">
              Nota: Determina si se ve listado en el envio de gacetillas
            </span>
          </div>
        </>
      )}

      {/* Orden */}
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
          Orden
        </label>
        <input
          type="number"
          value={seteos.orderby ?? seteos.orden ?? 0}
          onChange={handleChange('orderby')}
          className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
        />
        <span className="mt-1 block text-xs text-gray-400 dark:text-gray-500">
          Nota: Determina el orden en que aparecera en el menu, siendo ascendente el orden
        </span>
      </div>

      {/* Color Fondo */}
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
          Color Fondo:
        </label>
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={seteos.bgcolor && seteos.bgcolor.startsWith('#') ? seteos.bgcolor : '#ffffff'}
            onChange={handleChange('bgcolor')}
            className="h-10 w-12 cursor-pointer rounded border border-gray-300 p-1"
          />
          <input
            type="text"
            value={seteos.bgcolor ?? ''}
            onChange={handleChange('bgcolor')}
            placeholder="Ej: #ffffff o blue"
            className="h-11 flex-1 rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
          />
        </div>
      </div>

      {/* Color Textos */}
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
          Color Textos:
        </label>
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={seteos.textcolor && seteos.textcolor.startsWith('#') ? seteos.textcolor : '#000000'}
            onChange={handleChange('textcolor')}
            className="h-10 w-12 cursor-pointer rounded border border-gray-300 p-1"
          />
          <input
            type="text"
            value={seteos.textcolor ?? ''}
            onChange={handleChange('textcolor')}
            placeholder="Ej: #000000 o white"
            className="h-11 flex-1 rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
          />
        </div>
      </div>
    </div>
  );
}
