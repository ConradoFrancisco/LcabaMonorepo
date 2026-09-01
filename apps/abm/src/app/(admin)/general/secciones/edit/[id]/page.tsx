'use client';

import React, { useEffect, useState, use } from 'react';
import ComponentCard from '@/components/common/ComponentCard';
import SectionEditComponent from './components/SectionEditComponent';
import GeneralService from '../../../../../../../services/GeneralService';

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const response = await GeneralService.getSectionById(resolvedParams.id);
        setData(response);
      } catch (err) {
        console.error('Error fetching section:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [resolvedParams.id]);

  return (
    <div className="mx-auto max-w-(--breakpoint-2xl) p-4 md:p-6">
      <ComponentCard>
        {loading ? (
          <div className="flex h-40 items-center justify-center text-gray-500">
            Cargando datos de la sección...
          </div>
        ) : data === null ? (
          <div className="p-4 text-center text-gray-500">No se encontró el registro</div>
        ) : (
          <SectionEditComponent data={data} />
        )}
      </ComponentCard>
    </div>
  );
}
