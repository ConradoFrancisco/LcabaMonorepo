'use client';

import useData from '@/hooks/useData';
import { useEffect, useState } from 'react';
import ComponentCard from '@/components/common/ComponentCard';
import TableComponent from '@/components/common/TableComponent';
import FormInModal from '@/components/FormsModals/CategoriasFormInModal';
import CategoriesServices from '../../../../../services/CategoriesServices';
import FiltrosTablaCategoria, {
  FiltrosCategoriaState,
} from '@/components/form/FiltrosTablaCategoria';

export default function CategoriasPage() {
  const [filtros, setFiltros] = useState<FiltrosCategoriaState>({
    search: '',
    fechaDesde: '',
    fechaHasta: '',
    status: '',
    destacado: undefined,
  });
  const [loading, setLoading] = useState(false);
  const [abierto, setAbierto] = useState(false);

  const { data, offset, limit, setOffset, total, setFlag, flag } = useData({
    getAll: CategoriesServices.getAllCategories,
    loading,
    setLoading,
    search: filtros.search || '',
    table: 'magazine_categorias',
    filtros,
  });

  const [claves, setClaves] = useState<string[]>([]);

  useEffect(() => {
    if (data?.length > 0) {
      setClaves(Object.keys(data[0] as object));
    }
  }, [data]);

  return (
    <>
      <ComponentCard
        title="Revista LCABA"
        action={
          <button
            type="button"
            onClick={() => setAbierto(!abierto)}
            className="bg-brand-500 inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white"
          >
            + Nueva categoria
          </button>
        }
      >
        <FiltrosTablaCategoria
          filtros={filtros}
          setFiltros={setFiltros}
          setFlag={setFlag}
          setOffset={setOffset}
        />

        <TableComponent
          data={data}
          section="/revista/categorias"
          loading={loading}
          total={total}
          limit={limit}
          offset={offset}
          setOffset={setOffset}
          claves={claves}
        />
      </ComponentCard>
      <FormInModal setFlag={setFlag} isOpen={abierto} setOpen={setAbierto} flag={flag} />
    </>
  );
}
