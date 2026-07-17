'use client';
import Search from '@/components/my-components/Search';
import useData from '@/hooks/useData';
import { useDebounce } from '@/hooks/useDebounce';
import { useEffect, useState } from 'react';
import MagazineService from '../../../../../services/MagazineService';
import ComponentCard from '@/components/common/ComponentCard';
import TableComponent from '@/components/common/TableComponent';
export default function RevistasNumerosPage() {
  const [search, setSearch] = useState<string>('');
  const { debounceValue, loading, setLoading } = useDebounce(search, 1000);
  const { data, offset, limit, setOffset, total } = useData({
    getAll: MagazineService.getAllIssues,
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
