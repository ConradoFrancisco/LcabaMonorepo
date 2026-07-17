'use client';

import React, { useState } from 'react';
import MyEditor from '@/components/my-components/MyEditor';
import { normalizarTitulo } from '@/utils/buildPublicUrl';
import { X } from 'lucide-react';
import * as Yup from 'yup';

// El editor rich-text (MyEditor/Tiptap) guarda HTML, ej. "<p>abc</p>" en vez de "abc".
// Validar length sobre ese string crudo cuenta las etiquetas: "<p>aaa</p>" ya son 10
// caracteres con solo 3 reales, y "<p></p>" (vacío) no es detectado por .required()
// porque no es un string vacío. Por eso se mide sobre el texto ya despojado de tags.
const stripHtml = (html?: string) =>
  (html ?? '')
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .trim();

const richTextField = (requiredMessage: string, minMessage: string, min = 10) =>
  Yup.string()
    .required(requiredMessage)
    .test('rich-text-not-empty', requiredMessage, (value) => stripHtml(value).length > 0)
    .test('rich-text-min-length', minMessage, (value) => {
      const length = stripHtml(value).length;
      return length === 0 || length >= min;
    });

export const textosSchema = Yup.object({
  title: Yup.string()
    .min(3, 'El título debe tener al menos 3 caracteres')
    .required('El título es obligatorio'),
  abbreviation: Yup.string()
    .min(3, 'La abreviatura debe tener al menos 3 caracteres')
    .required('La abreviatura es obligatoria'),
  shortdesc: Yup.string()
    .min(3, 'El slogan / descripción corta debe tener al menos 3 caracteres')
    .required('El slogan / descripción corta es obligatorio'),
  text_footer: Yup.string()
    .min(3, 'El pie de página debe tener al menos 3 caracteres')
    .required('El pie de página es obligatorio'),
  description: richTextField(
    'La descripción completa es obligatoria',
    'La descripción completa debe tener al menos 10 caracteres',
  ),
  shipping_info: richTextField(
    'La información de envío es obligatoria',
    'La información de envío debe tener al menos 10 caracteres',
  ),
});

type TextosProps = {
  title: string;
  subtitle: string;
  shortdesc: string;
  extradesc: string;
  shipping_info: string;
  text_footer?: string;
  description: string;
  url?: string;
  url_ext?: string;
  abbreviation?: string;
  keywords?: string;
  generaUrlDesdeTitulo?: boolean;
  setTextos: (newTextos: any) => void;
};

export default function PageTextos({
  title,
  subtitle,
  shortdesc,
  extradesc,
  shipping_info,
  description,
  generaUrlDesdeTitulo = false,
  setTextos,
  text_footer,
  abbreviation,
  keywords,
  url,
  url_ext,
}: TextosProps) {
  const [keywordInput, setKeywordInput] = useState('');

  const keywordsList = keywords
    ? keywords
        .split(',')
        .map((k) => k.trim())
        .filter(Boolean)
    : [];

  const handleAddKeyword = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const newKeyword = keywordInput.trim();
      if (newKeyword && !keywordsList.includes(newKeyword)) {
        const newKeywordsString = [...keywordsList, newKeyword].join(',');
        setTextos({
          title,
          subtitle,
          shortdesc,
          extradesc,
          description,
          abbreviation,
          shipping_info,
          text_footer,
          keywords: newKeywordsString,
          url,
          url_ext,
        });
        setKeywordInput('');
      }
    }
  };

  const handleRemoveKeyword = (keywordToRemove: string) => {
    const newKeywordsString = keywordsList.filter((k) => k !== keywordToRemove).join(',');
    setTextos({
      title,
      subtitle,
      shortdesc,
      extradesc,
      description,
      abbreviation,
      shipping_info,
      text_footer,
      keywords: newKeywordsString,
      url,
      url_ext,
    });
  };

  const handleTitleChange = (value: string) => {
    setTextos({
      title: value,
      subtitle,
      shortdesc,
      extradesc,
      description,
      abbreviation,
      shipping_info,
      text_footer,
      keywords,
      url,
      url_ext,
    });
  };

  return (
    <div className="card-surface grid gap-4 rounded-2xl border border-gray-200 p-4 dark:border-gray-700">
      <div>
        <label className="form-label mb-1 block font-medium">Título *</label>
        <input
          value={title ?? ''}
          onChange={(e) => handleTitleChange(e.target.value)}
          className="form-input w-full rounded-md border px-4 py-2 text-sm"
        />
      </div>

      <div>
        <label className="form-label mb-1 block font-medium">Abreviatura *</label>
        <input
          value={abbreviation ?? ''}
          onChange={(e) =>
            setTextos({
              title,
              subtitle: e.target.value,
              shortdesc,
              extradesc,
              description,
              abbreviation: e.target.value,
              text_footer,
              shipping_info,
              keywords,
              url,
              url_ext,
            })
          }
          className="form-input w-full rounded-md border px-4 py-2 text-sm"
        />
      </div>

      <div>
        <label className="form-label mb-1 block font-medium">Slogan / descripción corta *</label>
        <textarea
          value={shortdesc ?? ''}
          onChange={(e) =>
            setTextos({
              title,
              subtitle,
              shortdesc: e.target.value,
              extradesc,
              description,
              abbreviation,
              shipping_info,
              text_footer,
              keywords,
              url,
              url_ext,
            })
          }
          className="form-input w-full rounded-md border px-4 py-2 text-sm"
          rows={2}
        />
      </div>

      <div>
        <label className="form-label mb-1 block font-medium">Pie de página *</label>
        <textarea
          value={text_footer ?? ''}
          onChange={(e) =>
            setTextos({
              title,
              subtitle,
              shortdesc,
              extradesc,
              text_footer: e.target.value,
              description,
              abbreviation,
              shipping_info,
              keywords,
              url,
              url_ext,
            })
          }
          className="form-input w-full rounded-md border px-4 py-2 text-sm"
          rows={2}
        />
      </div>

      <div>
        <label className="form-label mb-1 block font-medium">Descripción completa *</label>
        <div className="editor-surface overflow-hidden rounded-md border">
          <MyEditor
            value={description}
            onChange={(val) =>
              setTextos({
                title,
                subtitle,
                shortdesc,
                extradesc,
                text_footer,
                description: val,
                abbreviation,
                shipping_info,
                keywords,
                url,
                url_ext,
              })
            }
          />
        </div>
      </div>

      <div>
        <label className="form-label mb-1 block font-medium">Información de envío *</label>
        <div className="editor-surface overflow-hidden rounded-md border">
          <MyEditor
            value={shipping_info}
            onChange={(val) =>
              setTextos({
                title,
                subtitle,
                shortdesc,
                shipping_info: val,
                text_footer,
                description,
                abbreviation,
                keywords,
                url,
                url_ext,
              })
            }
          />
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs text-gray-500">
          Use este espacio para las palabras claves que definen los tipos de contenidos y servicios
          y funciones de su sitio.
        </p>
        <div className="flex flex-col gap-2">
          <label className="form-label font-medium whitespace-nowrap">Keywords</label>
          <div className="flex flex-wrap gap-2">
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
    </div>
  );
}
