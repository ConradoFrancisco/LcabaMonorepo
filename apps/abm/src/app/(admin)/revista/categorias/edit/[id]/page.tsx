'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ComponentCard from '@/components/common/ComponentCard';
import CategoriasEditComponent from './components/CategoriasEditComponent';
import CategoriesServices from '../../../../../../../services/CategoriesServices';

export default function Page() {
  const params = useParams();
  const id = params.id as string;

  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    CategoriesServices.getCategoryById(id, 'magazine_categorias').then((data) => {
      setResponse(data);
      setLoading(false);
    });
  }, [id]);

  return (
    <div className="mx-auto max-w-(--breakpoint-2xl) p-4 md:p-6">
      <ComponentCard>
        {loading ? (
          <div>Cargando...</div>
        ) : response === null ? (
          <div>No se encontró el registro</div>
        ) : (
          <CategoriasEditComponent response={response} />
        )}
      </ComponentCard>
    </div>
  );
}
