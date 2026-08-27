'use client';

import { useEffect, useState } from 'react';
import MagazineService from '../../../../../../../../services/MagazineService';
import * as Yup from 'yup';
import { ISeteosCategoriasRevista } from '@/types/postTypes';

export default function CategoriasRevistaSeteos({
  seteos,
  setSeteos,
}: {
  seteos: ISeteosCategoriasRevista;
  setSeteos: (newSeteos: ISeteosCategoriasRevista) => void;
}) {
  return (
    <form className="grid grid-cols-12 gap-4 rounded-2xl border p-4">
      <div className="col-span-12 p-4">
        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
          Título
        </label>
        <input
          type="text"
          value={seteos.titulo ?? ''}
          onChange={(e) => setSeteos({ ...seteos, titulo: e.target.value })}
          className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
        />
      </div>
    </form>
  );
}
