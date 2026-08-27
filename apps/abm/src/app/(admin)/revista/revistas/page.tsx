'use client';
import Search from '@/components/my-components/Search';
import useData from '@/hooks/useData';
import { useDebounce } from '@/hooks/useDebounce';
import { useEffect, useState } from 'react';
import ComponentCard from '@/components/common/ComponentCard';
import TableComponent from '@/components/common/TableComponent';
import IssueService from '../../../../../services/IssueService';
export default function RevistasNumerosPage() {
  const [search, setSearch] = useState<string>('');
  const { debounceValue, loading, setLoading } = useDebounce(search, 1000);
  const { data, offset, limit, setOffset, total } = useData({
    getAll: IssueService.getAll,
    loading,
    setLoading,
    search: debounceValue,
    table: 'magazine'
  });
  const [claves, setClaves] = useState<string[]>([]);

  useEffect(() => {
    if (data?.length > 0) {
      setClaves(Object.keys(data[0] as object));
    }
  }, [data]);

  return (
    <>
      <ComponentCard title="Revista LCABA">
        <Search setSearch={setSearch} tipo={'revista'} setOffset={setOffset} />
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
