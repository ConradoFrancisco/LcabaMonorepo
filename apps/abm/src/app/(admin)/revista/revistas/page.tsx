'use client';
import Search from '@/components/my-components/Search';
import useData from '@/hooks/useData';
import { useDebounce } from '@/hooks/useDebounce';
import { useEffect, useState } from 'react';
import ComponentCard from '@/components/common/ComponentCard';
import TableComponent from '@/components/common/TableComponent';
import IssueService from '../../../../../services/IssueService';
import IssueFormInModal from '@/components/FormsModals/IssueFormInModal';

export default function RevistasNumerosPage() {
  const [search, setSearch] = useState<string>('');
  const [modalAbierto, setModalAbierto] = useState(false);
  const { debounceValue, loading, setLoading } = useDebounce(search, 1000);
  const { data, offset, limit, setOffset, total, setFlag } = useData({
    getAll: IssueService.getAll,
    loading,
    setLoading,
    search: debounceValue,
    table: 'magazine',
  });
  const [claves, setClaves] = useState<string[]>([]);

  useEffect(() => {
    if (data?.length > 0) {
      setClaves(Object.keys(data[0] as object));
    }
  }, [data]);

  const handleDelete = async (id: any) => {
    try {
      await IssueService.deleteIssue(id, 'magazine_issue');
      setFlag((prev) => !prev);
    } catch (error) {
      console.error('Error al eliminar issue:', error);
      throw error;
    }
  };

  const handleStatusChange = async (id: any, newStatus: number) => {
    try {
      await IssueService.updateStatus(id, newStatus, 'magazine_issue');
      setFlag((prev) => !prev);
    } catch (error) {
      console.error('Error al actualizar estado de issue:', error);
      throw error;
    }
  };

  return (
    <>
      <ComponentCard
        title="Revista LCABA - Números / Ediciones"
        action={
          <button
            type="button"
            onClick={() => setModalAbierto(true)}
            className="bg-brand-500 hover:bg-brand-600 inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition"
          >
            + Nueva Edición
          </button>
        }
      >
        <Search setSearch={setSearch} tipo={'revista'} setOffset={setOffset} />
        <TableComponent
          section="/revista/revistas"
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
      <IssueFormInModal
        isOpen={modalAbierto}
        setOpen={setModalAbierto}
        setFlag={setFlag}
      />
    </>
  );
}
