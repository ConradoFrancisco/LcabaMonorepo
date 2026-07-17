import { FiltrosState } from '@/components/form/FiltrosTablaCultura';
import React, { useEffect, useState } from 'react';
type GetAllFn<T> = (
  params: {
    limit?: number;
    offset?: number;
    input?: string;
    table?: string;
    filtros?: FiltrosState;
  } & Record<string, any>,
) => Promise<BaseResponse<T>>;
export interface ServiceType<T> {
  getAll: GetAllFn<T>;
}
export interface BaseResponse<T> {
  data: T[];
  total: number;
  categorias: any[];
  types: any[];
}
export default function useData<T>({
  getAll,
  loading,
  setLoading,
  search,
  table,
  filtros,
}: {
  getAll: GetAllFn<T>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  search: string;
  table?: string;
  filtros?: FiltrosState;
}) {
  const [types, setTypes] = useState<{ id: number; title: string }[]>([]);
  const [data, setData] = React.useState<T[]>([]);
  const [categorias, setCategorias] = React.useState<any[]>([]);
  const [error, setError] = React.useState<string | null>(null);
  const [total, setTotal] = React.useState<number>(0);
  const [limit, setLimit] = React.useState<number>(7);
  const [offset, setOffset] = React.useState<number>(0);
  const [flag, setFlag] = React.useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getAll({
          limit,
          offset,
          input: search,
          table,
          filtros: filtros as FiltrosState,
        });
        setData(response.data);
        setTotal(response.total);
        setCategorias(response.categorias);
        setTypes(response.types);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError(String(error));
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [limit, offset, search, flag, getAll, setLoading, table]);

  return {
    data,
    loading,
    error,
    total,
    limit,
    setLimit,
    offset,
    setOffset,
    setFlag,
    flag,
    categorias,
    types,
  };
}
