'use client';

import React, { useEffect, useState, use } from 'react';
import ComponentCard from '@/components/common/ComponentCard';
import CulturaTiposEditComponent from './components/CulturaTiposEditComponent';
import TypesService from '../../../../../../../services/TypesService';

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const response = await TypesService.getTypeById(resolvedParams.id, 'cultura_posts_type');
        setData(response);
      } catch (err) {
        console.error('Error fetching cultura type:', err);
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
            Cargando tipo de publicación...
          </div>
        ) : data === null ? (
          <div className="p-4 text-center text-gray-500">No se encontró el registro</div>
        ) : (
          <CulturaTiposEditComponent response={data} />
        )}
      </ComponentCard>
    </div>
  );
}
