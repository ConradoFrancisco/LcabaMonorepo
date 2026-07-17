'use client';

import useData from '@/hooks/useData';
import { useDebounce } from '@/hooks/useDebounce';
import { useEffect, useState } from 'react';
import ComponentCard from '@/components/common/ComponentCard';
import Search from '@/components/my-components/Search';
import TableComponent from '@/components/common/TableComponent';
import PostService from '../../../../../services/PostService';

export default function BneficiosPage() {
  const [search, setSearch] = useState<string>('');
  const { debounceValue, loading, setLoading } = useDebounce(search, 1000);
  const { data, offset, limit, setOffset, total } = useData({
    getAll: PostService.getAll,
    loading,
    setLoading,
    search: debounceValue,
    table: 'ilcp_',
  });
  const [claves, setClaves] = useState<string[]>([]);

  useEffect(() => {
    if (data?.length > 0) {
      setClaves(Object.keys(data[0]));
    }
  }, [data]);

  return (
    <>
      <ComponentCard title="Ilcp - Publicaciones">
        <Search setSearch={setSearch} tipo={'publicaciones'} setOffset={setOffset} />
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
