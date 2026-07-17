'use client';

import useData from '@/hooks/useData';
import { useDebounce } from '@/hooks/useDebounce';
import { useEffect, useState } from 'react';
import ComponentCard from '@/components/common/ComponentCard';
import Search from '@/components/my-components/Search';
import TableComponent from '@/components/common/TableComponent';
import GeneralService from '../../../../../services/GeneralService';
import PageFormModal from '@/components/example/ModalExample/PageFormModal';

export default function PaginasPage() {
  const [search, setSearch] = useState<string>('');
  const { debounceValue, loading, setLoading } = useDebounce(search, 1000);
  const { data, offset, limit, setOffset, total, setLimit } = useData({
    getAll: GeneralService.getAll,
    loading,
    setLoading,
    search: debounceValue,
  });
  const [claves, setClaves] = useState<string[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    if (data?.length > 0) {
      setClaves(Object.keys(data[0]));
    }
  }, [data]);

  return (
    <>
      <ComponentCard
        title="Configuracion general - páginas"
        action={
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="bg-brand-500 inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white"
          >
            + Nueva página
          </button>
        }
      >
        <Search setSearch={setSearch} tipo={'Publicaciones'} setOffset={setOffset} />

        <TableComponent
          setLimit={setLimit}
          section="paginas"
          data={data}
          loading={loading}
          total={total}
          limit={limit}
          offset={offset}
          setOffset={setOffset}
          claves={claves}
        />
      </ComponentCard>

      <PageFormModal isOpen={open} setOpen={setOpen} setFlag={setFlag} flag={flag} />
    </>
  );
}
