/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { ForwardRefExoticComponent, RefAttributes, SetStateAction } from 'react';
import { LucideProps } from 'lucide-react';

export interface Itabs {
  id: string;
  label: string;
  icon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>;
  component: React.ReactNode;
  state?: any;
}

interface EditComponentProps {
  state: any;
  tabs: Itabs[];
  handleEditChange: () => void;
  setActiveTab: (value: SetStateAction<string>) => void;
  activeTab: string;
  tituloPosteo?: string;
  tituloCard?: string;
}
export default function EditComponent({
  state,
  tabs,
  handleEditChange,
  setActiveTab,
  activeTab,
  tituloPosteo,
  tituloCard,
}: EditComponentProps) {
  const titulo = tituloPosteo || state?.textos?.title;

  return (
    <div className="flex h-full flex-col">
      {/* Header + Tabs - sticky top */}
      <div className="sticky top-0 z-10 border-b border-gray-200 bg-white pb-2 dark:border-gray-800 dark:bg-gray-950">
        {tituloCard && (
          <div className="mb-3 border-b border-gray-100 pt-2 pb-3 dark:border-gray-800">
            <h3 className="text-base font-medium text-gray-800 dark:text-white/90">{tituloCard}</h3>
          </div>
        )}
        {titulo && (
          <div className="mb-3 text-lg font-medium text-gray-800 dark:text-gray-200">
            <span className="text-brand-500 font-bold">{titulo}</span>
          </div>
        )}
        <nav className="flex overflow-x-auto rounded-lg bg-gray-100 p-1 dark:bg-gray-900 [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-200 dark:[&::-webkit-scrollbar-thumb]:bg-gray-600 [&::-webkit-scrollbar-track]:bg-white dark:[&::-webkit-scrollbar-track]:bg-transparent">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-2 px-2.5 py-2 text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? 'shadow-theme-xs inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-900 transition-colors duration-200 ease-in-out dark:bg-white/[0.03] dark:text-white'
                    : 'inline-flex items-center rounded-md bg-transparent px-3 py-2 text-sm font-medium text-gray-500 transition-colors duration-200 ease-in-out hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                }`}
              >
                <Icon
                  className={`h-4 w-4 ${
                    isActive
                      ? 'text-gray-dark dark:text-blue-400'
                      : 'text-gray-500 dark:text-gray-400'
                  }`}
                />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab content - scrollable area */}
      <div className="mt-6 flex-1 overflow-y-auto">
        {tabs.map((tab) => (
          <div key={tab.id} className={activeTab === tab.id ? 'block' : 'hidden'}>
            {tab.component}
          </div>
        ))}
      </div>

      {/* Botones guardar y cancelar - sticky bottom */}
      <div className="sticky bottom-0 mt-4 flex flex-shrink-0 gap-3 border-t border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-950">
        <button
          onClick={handleEditChange}
          className="bg-brand-500 shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300 rounded-md p-3 text-sm font-medium text-white transition"
        >
          Guardar edición
        </button>
        {/* {
            <button
              onClick={() => console.log(state)}
              className='p-3 text-sm font-medium bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300 rounded-md transition'
            >
              IMPRIMIR
            </button>
          } */}
        {/* <DebugInfo data={state.seteos} /> */}

        <button
          onClick={() => window.history.back()}
          className="shadow-theme-xs rounded-md bg-red-500 p-3 text-sm font-medium text-white transition hover:bg-red-600 dark:bg-red-600 dark:text-white dark:hover:bg-red-700"
        >
          Cancelar
        </button>

        <button
          onClick={() => window.history.back()}
          className="shadow-theme-xs rounded-md bg-gray-200 p-3 text-sm font-medium text-gray-700 transition hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
        >
          Volver al listado
        </button>
        {/* 
          <DebugInfo data={state} /> */}
      </div>
    </div>
  );
}
