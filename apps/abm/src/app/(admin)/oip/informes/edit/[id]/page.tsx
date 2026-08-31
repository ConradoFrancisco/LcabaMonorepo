'use client';

import React, { useEffect, useState, use } from 'react';
import ComponentCard from '@/components/common/ComponentCard';
import OipEditComponent from './components/OipEditComponent';
import PostService from '../../../../../../../services/PostService';

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const response = await PostService.getPostById(resolvedParams.id, 'evidencias_');
        setData(response);
      } catch (err) {
        console.error('Error fetching informe OIP:', err);
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
            Cargando datos del informe...
          </div>
        ) : data === null ? (
          <div className="p-4 text-center text-gray-500">No se encontró el registro</div>
        ) : (
          <OipEditComponent data={data} />
        )}
      </ComponentCard>
    </div>
  );
}
