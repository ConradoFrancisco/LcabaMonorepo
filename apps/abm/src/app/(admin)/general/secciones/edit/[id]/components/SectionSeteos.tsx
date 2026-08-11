'use client';

import React, { useEffect, useState } from 'react';
import GeneralService from '../../../../../../../../services/GeneralService';

// Pequeño helper para los toggle switches con el mismo estilo de la app
function Toggle({
  name,
  checked,
  onChange,
}: {
  name: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <label className="relative inline-flex cursor-pointer items-center">
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        className="peer sr-only"
      />
      <div className="peer peer-checked:bg-brand-500 h-6 w-11 rounded-full bg-gray-200 peer-focus:outline-none after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white" />
    </label>
  );
}

// Helper para filas de formulario
function FormRow({
  label,
  note,
  children,
}: {
  label: string;
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-4">
      <label className="form-label mt-2 w-56 shrink-0 text-right font-medium">{label}</label>
      <div className="flex min-h-[40px] flex-1 flex-col justify-center">
        {children}
        {note && <p className="mt-1 text-xs text-gray-500">{note}</p>}
      </div>
    </div>
  );
}

export default function SectionSeteos({
  seteos,
  setSeteos,
}: {
  seteos: any;
  setSeteos: (newSeteos: any) => void;
}) {
  const [pages, setPages] = useState<{ id: number; title: string }[]>([]);

  useEffect(() => {
    GeneralService.getAll({ offset: 0, limit: 100 }).then((res) => {
      const list = (res?.data ?? []).map((p: any) => ({
        id: p.id,
        title: p.Titulo ?? p.title ?? `Página ${p.id}`,
      }));
      setPages(list);
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type } = target;
    const checked = (target as HTMLInputElement).checked;
    setSeteos({
      ...seteos,
      [name]: type === 'checkbox' ? (checked ? 1 : 0) : value,
    });
  };

  const boolVal = (field: string) =>
    seteos?.[field] === 1 || seteos?.[field] === true || seteos?.[field] === '1';

  return (
    <div className="card-surface grid gap-5 rounded-2xl border border-gray-200 p-6 dark:border-gray-700">

      {/* Página */}
      <FormRow label="Página *" note="Determina en qué sitio de los definidos aparece">
        <select
          name="fk_pageid"
          value={seteos?.fk_pageid ?? ''}
          onChange={handleChange}
          className="form-input w-full rounded-md border px-4 py-2 text-sm"
        >
          <option value="">-- Seleccionar página --</option>
          {pages.map((p) => (
            <option key={p.id} value={p.id}>
              {p.title}
            </option>
          ))}
        </select>
      </FormRow>

      {/* Orden */}
      <FormRow label="Orden" note="Determina el orden en que aparecerá en el menú, siendo ascendente el orden.">
        <input
          type="number"
          name="orderby"
          value={seteos?.orderby ?? ''}
          onChange={handleChange}
          className="form-input w-32 rounded-md border px-4 py-2 text-sm"
        />
      </FormRow>

      <div className="my-1 border-b border-gray-200 dark:border-gray-700" />

      {/* Color Identificatorio */}
      <FormRow label="Color Identificatorio:">
        <div className="flex items-center gap-2">
          <input
            type="color"
            name="bgcolor"
            value={seteos?.bgcolor ? `#${seteos.bgcolor}` : '#000000'}
            onChange={(e) =>
              setSeteos({ ...seteos, bgcolor: e.target.value.replace('#', '') })
            }
            className="h-10 w-10 cursor-pointer rounded border border-gray-300 bg-white p-1 dark:border-gray-600 dark:bg-gray-800"
          />
          <input
            type="text"
            name="bgcolor"
            value={seteos?.bgcolor ?? ''}
            onChange={handleChange}
            placeholder="000000"
            className="form-input w-32 rounded-md border px-4 py-2 text-sm uppercase"
          />
        </div>
      </FormRow>

      {/* Activo */}
      <FormRow label="Activo?">
        <Toggle name="status" checked={boolVal('status')} onChange={handleChange} />
      </FormRow>

      {/* Es Sección Especial */}
      <FormRow label="¿Es Sección Especial?">
        <Toggle name="specialsection" checked={boolVal('specialsection')} onChange={handleChange} />
      </FormRow>

      {/* Mostrar Banner en Interior */}
      <FormRow
        label="Mostrar Banner en Interior?"
        note="Nota: Si está marcado activo muestra el banner, no aplica LCABA"
      >
        <Toggle name="showbanner" checked={boolVal('showbanner')} onChange={handleChange} />
      </FormRow>

      {/* Una Columna Derecha */}
      <FormRow label="Una Columna Derecha?">
        <Toggle name="showrightcol" checked={boolVal('showrightcol')} onChange={handleChange} />
      </FormRow>

      {/* Visible en Internet */}
      <FormRow
        label="Visible en Internet?"
        note="Nota: Si esto marcado que no se muestre en top y esta opción está activa, no se verá en la home pero si en los interiores"
      >
        <Toggle name="showinside" checked={boolVal('showinside')} onChange={handleChange} />
      </FormRow>

      {/* Usa Menú Completo */}
      <FormRow label="Usa Menú Completo?">
        <Toggle name="megamenu" checked={boolVal('megamenu')} onChange={handleChange} />
      </FormRow>

      {/* Usa Menú Side Home */}
      <FormRow label="Usa Menú Side Home?">
        <Toggle name="slidemenu" checked={boolVal('slidemenu')} onChange={handleChange} />
      </FormRow>

      {/* Muestra en Menú Superior */}
      <FormRow label="Muestra en Menú Superior?">
        <Toggle name="show_top" checked={boolVal('show_top')} onChange={handleChange} />
      </FormRow>

      {/* Muestra en Menú Interior */}
      <FormRow label="Muestra en Menú Interior?">
        <Toggle name="show_bottom" checked={boolVal('show_bottom')} onChange={handleChange} />
      </FormRow>

      {/* Muestra formulario contacto */}
      <FormRow
        label="Muestra formulario contacto?"
        note="Nota: Determina si junto al contenido se muestra el formulario de contacto"
      >
        <Toggle name="contact_form" checked={boolVal('contact_form')} onChange={handleChange} />
      </FormRow>

      <div className="my-1 border-b border-gray-200 dark:border-gray-700" />

      {/* Link Externo */}
      <FormRow
        label="Link Externo?"
        note="Nota: Si está marcado abre el link en una nueva ventana"
      >
        <Toggle name="externallink" checked={boolVal('externallink')} onChange={handleChange} />
      </FormRow>

      {/* URL */}
      <FormRow
        label="URL:"
        note="Nota: Solo completar si los contenidos a mostrar van a ser los cargados"
      >
        <input
          type="text"
          name="url"
          value={seteos?.url ?? ''}
          onChange={handleChange}
          className="form-input w-full rounded-md border px-4 py-2 text-sm"
        />
      </FormRow>

      {/* Contenido Extra */}
      <FormRow
        label="Contenido Extra:"
        note="Nota: Solo completar si los contenidos a mostrar van a ser los cargados en el formulario informado (load)"
      >
        <input
          type="text"
          name="loadcontent"
          value={seteos?.loadcontent ?? ''}
          onChange={handleChange}
          className="form-input w-full rounded-md border px-4 py-2 text-sm"
        />
      </FormRow>

    </div>
  );
}
