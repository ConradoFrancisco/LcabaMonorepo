'use client';

import ComponentCard from '@/components/common/ComponentCard';
import { CalendarDays, FileText, Layers, Megaphone, Users } from 'lucide-react';
import { Dispatch, SetStateAction, useState } from 'react';
import TabProyectos from './components/TabProyectos';
import TabLegisladores from './components/TabLegisladores';
import TabComisiones from './components/TabComisiones';
import TabSesiones from './components/TabSesiones';
import TabAudiencias from './components/TabAudiencias';
import { InfoParlamentariaData } from '@/types/postTypes';

interface InfoParlamentariaProps {
  infoParlamentaria: InfoParlamentariaData;
  setInfoParlamentaria: Dispatch<SetStateAction<InfoParlamentariaData>>;
  postId: number;
  table: string;
}

export default function InfoParlamentaria({
  infoParlamentaria,
  postId,
  setInfoParlamentaria,
  table,
}: InfoParlamentariaProps) {
  const [activeTab, setActiveTab] = useState('proyectos');
  const tabs = [
    {
      id: 'proyectos',
      label: 'Proyectos',
      icon: FileText,
      component: (
        <TabProyectos
          proyectos={infoParlamentaria.proyectos}
          setInfoParlamentaria={setInfoParlamentaria}
          postId={postId}
          table={table}
        />
      ),
    },
    {
      id: 'legisladores',
      label: 'Legisladores',
      icon: Users,
      component: (
        <TabLegisladores
          legisladores={infoParlamentaria.legisladores}
          setInfoParlamentaria={setInfoParlamentaria}
          postId={postId}
          table={table}
        />
      ),
    },
    {
      id: 'comisiones',
      label: 'Comisiones',
      icon: Layers,
      component: (
        <TabComisiones
          comisiones={infoParlamentaria.comisiones}
          setInfoParlamentaria={setInfoParlamentaria}
          postId={postId}
          table={table}
        />
      ),
    },
    {
      id: 'sesiones',
      label: 'Sesiones',
      icon: CalendarDays,
      component: (
        <TabSesiones
          sesiones={infoParlamentaria.sesiones}
          setInfoParlamentaria={setInfoParlamentaria}
          postId={postId}
          table={table}
        />
      ),
    },
    {
      id: 'audiencias',
      label: 'Audiencias',
      icon: Megaphone,
      component: (
        <TabAudiencias
          audiencias={infoParlamentaria.audiencias}
          setInfoParlamentaria={setInfoParlamentaria}
          postId={postId}
          table={table}
        />
      ),
    },
  ];

  return (
    <ComponentCard title="Información Parlamentaria">
      <div className="mb-4 flex flex-wrap gap-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              type="button"
              className={[
                'flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all',
                isActive
                  ? 'dark:bg-dark-800 bg-gray-200 text-gray-900 shadow-sm dark:text-white'
                  : 'dark:hover:bg-dark-700 text-gray-600 hover:bg-gray-100 hover:text-gray-800 dark:text-gray-400',
              ].join(' ')}
            >
              <Icon size={16} />
              {tab.label}
            </button>
          );
        })}
      </div>

      <div>{tabs.find((t) => t.id === activeTab)?.component}</div>
    </ComponentCard>
  );
}
