'use client';

import useData from '@/hooks/useData';
import { useDebounce } from '@/hooks/useDebounce';
import { useEffect, useState } from 'react';
import ComponentCard from '@/components/common/ComponentCard';
import Search from '@/components/my-components/Search';
import TableComponent from '@/components/common/TableComponent';
import TiposFormInModal from '@/components/FormsModals/TiposFormInModal';
import TypesService from '../../../../../services/TypesService';

export default function PrensaTiposPage() {
  const [search, setSearch] = useState<string>('');
  const [modalAbierto, setModalAbierto] = useState(false);
  const { debounceValue, loading, setLoading } = useDebounce(search, 1000);
  const { data, offset, limit, setOffset, total, setFlag } = useData({
    getAll: TypesService.getAll,
    loading,
    setLoading,
    search: debounceValue,
    table: 'posts_type',
  });
  const [claves, setClaves] = useState<string[]>([]);

  useEffect(() => {
    if (data?.length > 0) {
      setClaves(Object.keys(data[0] as object));
    }
  }, [data]);

  const handleDelete = async (id: any) => {
    try {
      await TypesService.deleteType(id, 'posts_type');
      setFlag((prev) => !prev);
    } catch (error) {
      console.error('Error al eliminar tipo:', error);
      throw error;
    }
  };

  const handleStatusChange = async (id: any, newStatus: number) => {
    try {
      await TypesService.updateStatus(id, newStatus, 'posts_type');
      setFlag((prev) => !prev);
    } catch (error) {
      console.error('Error al actualizar estado:', error);
      throw error;
    }
  };

  return (
    <>
      <ComponentCard
        title="Prensa - Tipos de publicaciones"
        action={
          <button
            type="button"
            onClick={() => setModalAbierto(true)}
            className="bg-brand-500 hover:bg-brand-600 inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition"
          >
            + Nuevo Tipo
          </button>
        }
      >
        <Search setSearch={setSearch} tipo={'Prensa Tipos'} setOffset={setOffset} />
        <TableComponent
          section="/prensa/tipos"
          data={data}
          loading={loading}
          total={total}
          limit={limit}
          offset={offset}
          setOffset={setOffset}
          claves={claves}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
        />
      </ComponentCard>
      <TiposFormInModal
        isOpen={modalAbierto}
        setOpen={setModalAbierto}
        setFlag={setFlag}
        table="posts_type"
        modalTitle="Crear nuevo tipo de prensa"
        editRoute="/prensa/tipos/edit"
      />
    </>
  );
}
