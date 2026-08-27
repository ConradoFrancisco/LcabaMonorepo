'use client';

import React, { useState } from 'react';
import MyEditor from '@/components/my-components/MyEditor';
import { X } from 'lucide-react';
import * as Yup from 'yup';

export const issueTextosSchema = Yup.object({
  title: Yup.string()
    .min(3, 'El título debe tener al menos 3 caracteres')
    .required('El título es obligatorio'),
});

type IssueTextosProps = {
  title: string;
  shortdesc?: string;
  description?: string;
  keywords?: string;
  numero?: number | string;
  setTextos: (newTextos: any) => void;
  [key: string]: any;
};

export default function IssueTextos({
  title,
  shortdesc = '',
  description = '',
  keywords = '',
  numero,
  setTextos,
  ...rest
}: IssueTextosProps) {
  const [keywordInput, setKeywordInput] = useState('');

  const keywordsList = keywords
    ? (Array.isArray(keywords)
        ? keywords
        : typeof keywords === 'string'
        ? keywords.split(',')
        : []
      )
        .map((k: string) => (typeof k === 'string' ? k.trim() : ''))
        .filter(Boolean)
    : [];

  const handleAddKeyword = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const newKeyword = keywordInput.trim();
      if (newKeyword && !keywordsList.includes(newKeyword)) {
        const newKeywordsString = [...keywordsList, newKeyword].join(',');
        setTextos({
          ...rest,
          title,
          shortdesc,
          description,
          keywords: newKeywordsString,
        });
        setKeywordInput('');
      }
    }
  };

  const handleRemoveKeyword = (keywordToRemove: string) => {
    const newKeywordsString = keywordsList.filter((k: string) => k !== keywordToRemove).join(',');
    setTextos({
      ...rest,
      title,
      shortdesc,
      description,
      keywords: newKeywordsString,
    });
  };

  return (
    <div className="card-surface grid gap-5 rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
      {numero !== undefined && numero !== null && (
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Número
          </label>
          <input
            type="text"
            value={numero}
            disabled
            className="w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-2.5 text-sm text-gray-500 cursor-not-allowed dark:border-gray-700 dark:bg-gray-800/60 dark:text-gray-400"
          />
          <span className="mt-1 block text-xs text-gray-400 dark:text-gray-500">
            Nota: El número de revista no se puede modificar una vez creada.
          </span>
        </div>
      )}

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
          Título: <span className="text-red-500">*</span>
        </label>
        <input
          value={title ?? ''}
          onChange={(e) =>
            setTextos({
              ...rest,
              title: e.target.value,
              shortdesc,
              description,
              keywords,
            })
          }
          placeholder="Título de la revista..."
          className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 focus:border-brand-300 focus:outline-hidden dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
          Resumen:
        </label>
        <div className="editor-surface overflow-hidden rounded-lg border border-gray-300 dark:border-gray-700">
          <MyEditor
            value={shortdesc ?? ''}
            onChange={(val) =>
              setTextos({
                ...rest,
                title,
                shortdesc: val,
                description,
                keywords,
              })
            }
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
          Descripción: <span className="text-red-500">*</span>
        </label>
        <div className="editor-surface overflow-hidden rounded-lg border border-gray-300 dark:border-gray-700">
          <MyEditor
            value={description ?? ''}
            onChange={(val) =>
              setTextos({
                ...rest,
                title,
                shortdesc,
                description: val,
                keywords,
              })
            }
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
          Keywords
        </label>
        <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">
          Los nombres de los productos o categorías a las que asocie esta nota serán ingresados automáticamente al metatag de la página, use este espacio para las palabras claves que definen el post.
        </p>
        <div className="flex flex-col gap-2">
          {keywordsList.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {keywordsList.map((keyword: string, index: number) => (
                <span
                  key={index}
                  className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
                >
                  {keyword}
                  <button
                    type="button"
                    onClick={() => handleRemoveKeyword(keyword)}
                    className="text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400"
                  >
                    <X size={13} />
                  </button>
                </span>
              ))}
            </div>
          )}
          <input
            value={keywordInput}
            onChange={(e) => setKeywordInput(e.target.value)}
            onKeyDown={handleAddKeyword}
            placeholder="Escriba una keyword y presione Enter o coma (,)"
            className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 focus:border-brand-300 focus:outline-hidden dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
          />
        </div>
      </div>
    </div>
  );
}
