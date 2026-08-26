'use client';

import useData from '@/hooks/useData';
import { useDebounce } from '@/hooks/useDebounce';
import { useEffect, useState } from 'react';
import MagazineService from '../../../../../services/MagazineService';
import ComponentCard from '@/components/common/ComponentCard';
import Search from '@/components/my-components/Search';
import TableComponent from '@/components/common/TableComponent';
import FormInModal from '@/components/FormsModals/CategoriasFormInModal';

export default function CategoriasPage() {
  const [search, setSearch] = useState<string>('');
  const { debounceValue, loading, setLoading } = useDebounce(search, 1000);
  const [abierto, setAbierto] = useState(false);
  const { data, offset, limit, setOffset, total, setFlag, flag } = useData({
    getAll: MagazineService.getAllCategories,
    loading,
    setLoading,
    search: debounceValue,
  });
  const [claves, setClaves] = useState<string[]>([]);

  useEffect(() => {
    if (data?.length > 0) {
      setClaves(Object.keys(data[0]));
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
        <Search setSearch={setSearch} tipo={'categorias'} setOffset={setOffset} />
        <TableComponent
          data={data}
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
