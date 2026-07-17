'use client';

import useData from '@/hooks/useData';
import { useDebounce } from '@/hooks/useDebounce';
import { useEffect, useState } from 'react';
import ComponentCard from '@/components/common/ComponentCard';
import Search from '@/components/my-components/Search';
import TableComponent from '@/components/common/TableComponent';
import PrensaService from '../../../../../services/PrensaService';

export default function TiposPage() {
  const [search, setSearch] = useState<string>('');
  const { debounceValue, loading, setLoading } = useDebounce(search, 1000);
  const { data, offset, limit, setOffset, total } = useData({
    getAll: PrensaService.getAllTypes,
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
      <ComponentCard title="Prensa - Tipos de publicaciones">
        <Search setSearch={setSearch} tipo={'Publicaciones'} setOffset={setOffset} />
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
