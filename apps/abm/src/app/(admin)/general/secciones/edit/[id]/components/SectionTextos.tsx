'use client';

import React, { useState } from 'react';
import MyEditor from '@/components/my-components/MyEditor';
import { X } from 'lucide-react';
import * as Yup from 'yup';

export const sectionTextosSchema = Yup.object({
  title: Yup.string()
    .min(3, 'El título debe tener al menos 3 caracteres')
    .required('El título es obligatorio'),
});

type SectionTextosProps = {
  title?: string;
  subtitle?: string;
  description?: string;
  shortdesc?: string;
  keywords?: string;
  additional_text?: string;
  setTextos: (newTextos: any) => void;
};

export default function SectionTextos({
  title,
  subtitle,
  description,
  shortdesc,
  keywords,
  additional_text,
  setTextos,
}: SectionTextosProps) {
  const [keywordInput, setKeywordInput] = useState('');

  const keywordsList = keywords
    ? keywords.split(',').map((k) => k.trim()).filter(Boolean)
    : [];

  const update = (partial: Record<string, any>) => {
    setTextos({ title, subtitle, description, shortdesc, keywords, additional_text, ...partial });
  };

  const handleAddKeyword = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const kw = keywordInput.trim();
      if (kw && !keywordsList.includes(kw)) {
        update({ keywords: [...keywordsList, kw].join(',') });
        setKeywordInput('');
      }
    }
  };

  const handleRemoveKeyword = (toRemove: string) => {
    update({ keywords: keywordsList.filter((k) => k !== toRemove).join(',') });
  };

  return (
    <div className="card-surface grid gap-4 rounded-2xl border border-gray-200 p-4 dark:border-gray-700">
      {/* Nombre */}
      <div>
        <label className="form-label mb-1 block font-medium">Nombre *</label>
        <input
          value={title ?? ''}
          onChange={(e) => update({ title: e.target.value })}
          className="form-input w-full rounded-md border px-4 py-2 text-sm"
        />
      </div>

      {/* Sub Título */}
      <div>
        <label className="form-label mb-1 block font-medium">Sub Título</label>
        <input
          value={subtitle ?? ''}
          onChange={(e) => update({ subtitle: e.target.value })}
          className="form-input w-full rounded-md border px-4 py-2 text-sm"
        />
        <p className="mt-1 text-xs text-gray-500">
          Copiar texto a subtítulo — Utilizado para el texto sobre el banner
        </p>
      </div>

      {/* Descripción Corta */}
      <div>
        <label className="form-label mb-1 block font-medium">Descripción Corta</label>
        <textarea
          value={shortdesc ?? ''}
          onChange={(e) => update({ shortdesc: e.target.value })}
          className="form-input w-full rounded-md border px-4 py-2 text-sm"
          rows={2}
        />
        <p className="mt-1 text-xs text-gray-500">Descripción breve, utilizada para resúmenes</p>
      </div>

      {/* Descripción Completa */}
      <div>
        <label className="form-label mb-1 block font-medium">Descripción Completa</label>
        <div className="editor-surface overflow-hidden rounded-md border">
          <MyEditor
            value={description ?? ''}
            onChange={(val) => update({ description: val })}
          />
        </div>
      </div>

      {/* Texto Adicional */}
      <div>
        <label className="form-label mb-1 block font-medium">Texto Adicional</label>
        <div className="editor-surface overflow-hidden rounded-md border">
          <MyEditor
            value={additional_text ?? ''}
            onChange={(val) => update({ additional_text: val })}
          />
        </div>
        <p className="mt-1 text-xs text-gray-500">
          Sus contenidos no se muestran automaticamente al recargar la página
        </p>
      </div>

      {/* Keywords */}
      <div>
        <label className="form-label mb-2 block font-medium">Keywords</label>
        <p className="mb-2 text-xs text-gray-500">
          Los keywords no son indexados automáticamente al metadato de la página, solo
          sirven de guía para definir el perfil que difiere del jeje.
        </p>
        <div className="flex flex-wrap gap-2 mb-2">
          {keywordsList.map((keyword, index) => (
            <span
              key={index}
              className="flex items-center gap-1 rounded-full border border-gray-200 bg-gray-100 px-3 py-1 text-sm text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
            >
              {keyword}
              <button
                type="button"
                onClick={() => handleRemoveKeyword(keyword)}
                className="transition-colors hover:text-red-500"
              >
                <X size={14} />
              </button>
            </span>
          ))}
        </div>
        <input
          value={keywordInput}
          onChange={(e) => setKeywordInput(e.target.value)}
          onKeyDown={handleAddKeyword}
          placeholder="Escriba una keyword y presione Enter o coma (,)"
          className="form-input w-full rounded-md border px-4 py-2 text-sm"
        />
      </div>
    </div>
  );
}
