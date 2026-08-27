'use client';

import useData from '@/hooks/useData';
import { useDebounce } from '@/hooks/useDebounce';
import { useEffect, useState } from 'react';
import ComponentCard from '@/components/common/ComponentCard';
import Search from '@/components/my-components/Search';
import TableComponent from '@/components/common/TableComponent';
import CulturaService from '../../../../../services/CulturaService';
import CategoriesServices from '../../../../../services/CategoriesServices';

export default function CategoriasPage() {
  const [search, setSearch] = useState<string>('');
  const { debounceValue, loading, setLoading } = useDebounce(search, 1000);
  const { data, offset, limit, setOffset, total } = useData({
    getAll: CategoriesServices.getAllCategories,
    loading,
    setLoading,
    search: debounceValue,
    table: 'cultura_categorias',
  });
  const [claves, setClaves] = useState<string[]>([]);

  useEffect(() => {
    if (data?.length > 0) {
      setClaves(Object.keys(data[0] as object));
    }
  }, [data]);

  return (
    <>
      <ComponentCard title="DG Cultura">
        <Search setSearch={setSearch} tipo={'Categorias'} setOffset={setOffset} />
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
    </>
  );
}
