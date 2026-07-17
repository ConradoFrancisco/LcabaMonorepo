'use client';

import { useEffect, useState } from 'react';
import GacetillaManager from '@/components/my-components/prensa/GacetillaManager';
import PostService from '../../../../../services/PostService';
import PrensaService from '../../../../../services/PrensaService';

const TIPOS_PERMITIDOS_KEYWORDS = ['noticia', 'comunicado'];

export default function GacetillasPage() {
  const [tipoOptions, setTipoOptions] = useState<{ value: string; label: string }[] | null>(null);

  useEffect(() => {
    const loadTypes = async () => {
      try {
        const res = await PostService.getTypes(' ', true);
        if (res) {
          const mapped = res.map((tipo: any) => ({
            value: String(tipo.id),
            label: tipo.title || tipo.titulo || 'Sin título',
          }));
          setTipoOptions(mapped);
        }
      } catch (e) {
        console.error('Error cargando tipos', e);
      }
    };
    loadTypes();
  }, []);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <GacetillaManager
        contentTitle="Publicaciones"
        domainLink={process.env.NEXT_PUBLIC_PRENSA_URL || ''}
        tipoOptions={tipoOptions}
        getContentDetail={(id) => PostService.getPostById(String(id), ' ')}
        searchContentMethod={(q, offset, limit, tipo) =>
          PostService.getAll({
            table: '',
            input: q,
            offset,
            limit,
            filtros: tipo ? { tipo: Number(tipo) } : {},
          })
        }
        searchSubscribersMethod={(q, offset, limit) =>
          PrensaService.getAllSuscriptores({ input: q, offset, limit })
        }
        onContentSelect={(item) => ({
          subject: item.titulo || item.title || 'Sin título',
          body: item.body || item.description || `<h3>${item.titulo}</h3>`,
        })}
      />
    </div>
  );
}
