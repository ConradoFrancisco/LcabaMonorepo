'use client';

import { ISeteosIssue } from '@/types/postTypes';

export default function IssueSeteos({
  seteos,
  setSeteos,
}: {
  seteos: ISeteosIssue;
  setSeteos: (newSeteos: ISeteosIssue) => void;
}) {
  return (
    <div className="grid grid-cols-12 gap-4 rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="col-span-12 md:col-span-6">
        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
          Número de Revista
        </label>
        <input
          type="number"
          value={seteos.magazine_number ?? seteos.numero ?? ''}
          disabled
          className="h-11 w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-2.5 text-sm text-gray-500 cursor-not-allowed dark:border-gray-700 dark:bg-gray-800/60 dark:text-gray-400"
          placeholder="Ej: 15"
        />
        <span className="mt-1 block text-xs text-gray-400 dark:text-gray-500">
          El número de revista no se puede modificar.
        </span>
      </div>

      <div className="col-span-12 md:col-span-6">
        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
          URL amigable (Slug)
        </label>
        <input
          type="text"
          value={seteos.url ?? ''}
          onChange={(e) => setSeteos({ ...seteos, url: e.target.value })}
          className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 focus:border-brand-300 focus:outline-hidden dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
          placeholder="ej: edicion-15"
        />
      </div>

      <div className="col-span-12 md:col-span-6">
        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
          Color de Fondo (BG Color)
        </label>
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={seteos.bgcolor || '#ffffff'}
            onChange={(e) => setSeteos({ ...seteos, bgcolor: e.target.value })}
            className="h-11 w-14 cursor-pointer rounded-lg border border-gray-300 bg-transparent p-1 dark:border-gray-700"
          />
          <input
            type="text"
            value={seteos.bgcolor ?? ''}
            onChange={(e) => setSeteos({ ...seteos, bgcolor: e.target.value })}
            className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
            placeholder="#ffffff"
          />
        </div>
      </div>

      <div className="col-span-12 md:col-span-6">
        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
          Color de Texto (Text Color)
        </label>
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={seteos.textcolor || '#000000'}
            onChange={(e) => setSeteos({ ...seteos, textcolor: e.target.value })}
            className="h-11 w-14 cursor-pointer rounded-lg border border-gray-300 bg-transparent p-1 dark:border-gray-700"
          />
          <input
            type="text"
            value={seteos.textcolor ?? ''}
            onChange={(e) => setSeteos({ ...seteos, textcolor: e.target.value })}
            className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
            placeholder="#000000"
          />
        </div>
      </div>

      <div className="col-span-12 md:col-span-6">
        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
          Estado (Activo / Inactivo)
        </label>
        <div className="flex items-center gap-3 mt-2">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={
                typeof seteos.status === 'object' && seteos.status !== null
                  ? (seteos.status as any).data?.[0] === 1
                  : seteos.status === 1 || seteos.status === true
              }
              onChange={(e) => setSeteos({ ...seteos, status: e.target.checked ? 1 : 0 })}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-300 dark:peer-focus:ring-brand-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-brand-500"></div>
          </label>
          <span className="text-sm font-medium text-gray-900 dark:text-gray-300">
            { (typeof seteos.status === 'object' && seteos.status !== null ? (seteos.status as any).data?.[0] === 1 : seteos.status === 1 || seteos.status === true) ? 'Activo' : 'Inactivo' }
          </span>
        </div>
      </div>
    </div>
  );
}
