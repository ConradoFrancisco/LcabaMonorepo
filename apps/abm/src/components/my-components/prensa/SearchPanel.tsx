'use client';

import { useEffect, useRef, useState } from 'react';
import ComponentCard from '@/components/common/ComponentCard';
import {
  Search,
  RefreshCcw,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  X,
  Trash2,
  CheckSquare,
} from 'lucide-react';

const ITEMS_PER_PAGE = 5;

export interface SearchPanelFetchParams {
  query: string;
  offset: number;
  limit: number;
}

export interface SearchPanelFetchResult {
  data: any[];
  total: number;
}

interface SearchPanelProps {
  title: string;
  placeholder?: string;
  onSearch: (params: SearchPanelFetchParams) => Promise<SearchPanelFetchResult>;
  renderItem: (item: any) => React.ReactNode;
  onSelect?: (item: any) => void;
  icon?: React.ReactNode;
  emptyIcon?: React.ReactNode;
  emptyText?: string;
  selectionCount?: number;
  onClearSelection?: () => void;
  onSelectAll?: (query: string) => Promise<void> | void;
  refetchKey?: string | number;
  enabled?: boolean;
  disabledText?: string;
}

export default function SearchPanel({
  title,
  placeholder = 'Buscar...',
  onSearch,
  renderItem,
  onSelect,
  icon,
  emptyIcon,
  emptyText = 'Escriba para buscar',
  selectionCount = 0,
  onClearSelection,
  onSelectAll,
  refetchKey,
  enabled = true,
  disabledText,
}: SearchPanelProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectingAll, setSelectingAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const handleSelectAll = async () => {
    if (!onSelectAll) return;
    setSelectingAll(true);
    try {
      await onSelectAll(query);
    } finally {
      setSelectingAll(false);
    }
  };

  const fetchPage = async (val: string, page: number) => {
    setLoading(true);
    try {
      const offset = (page - 1) * ITEMS_PER_PAGE;
      const res = await onSearch({
        query: val,
        offset,
        limit: ITEMS_PER_PAGE,
      });
      setResults(res?.data || []);
      setTotal(res?.total ?? (res?.data?.length || 0));
    } catch (error) {
      console.error(`Error en búsqueda de ${title}:`, error);
      setResults([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!enabled) {
      setResults([]);
      setTotal(0);
      setQuery('');
      setCurrentPage(1);
      return;
    }
    let cancelled = false;
    const loadInitial = async () => {
      setLoading(true);
      try {
        const res = await onSearch({
          query: '',
          offset: 0,
          limit: ITEMS_PER_PAGE,
        });
        if (!cancelled) {
          setResults(res?.data || []);
          setTotal(res?.total ?? (res?.data?.length || 0));
        }
      } catch (error) {
        console.error(`Error en búsqueda inicial de ${title}:`, error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    loadInitial();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);

  const isFirstRefetch = useRef(true);
  useEffect(() => {
    if (refetchKey === undefined) return;
    if (isFirstRefetch.current) {
      isFirstRefetch.current = false;
      return;
    }
    if (!enabled) return;
    setQuery('');
    setCurrentPage(1);
    fetchPage('', 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetchKey]);

  const handleSearch = async (val: string) => {
    setQuery(val);
    setCurrentPage(1);

    // Si val es vacío (botón Listar) o tiene más de 2 caracteres, buscamos
    if (val === '' || val.length > 2) {
      await fetchPage(val, 1);
    } else {
      setResults([]);
      setTotal(0);
    }
  };

  const goToPage = async (page: number) => {
    setCurrentPage(page);
    await fetchPage(query, page);
  };

  const totalPages = Math.max(1, Math.ceil(total / ITEMS_PER_PAGE));
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const getPageItems = (): (number | 'dots')[] => {
    const items: (number | 'dots')[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) items.push(i);
      return items;
    }
    const window = 1;
    const left = Math.max(2, currentPage - window);
    const right = Math.min(totalPages - 1, currentPage + window);
    items.push(1);
    if (left > 2) items.push('dots');
    for (let i = left; i <= right; i++) items.push(i);
    if (right < totalPages - 1) items.push('dots');
    items.push(totalPages);
    return items;
  };

  return (
    <ComponentCard
      title={title}
      action={
        (onSelectAll && total > 0) || (selectionCount > 0 && onClearSelection) ? (
          <div className="flex items-center space-x-2">
            {onSelectAll && total > 0 && (
              <button
                onClick={handleSelectAll}
                disabled={selectingAll}
                className="flex items-center space-x-1 rounded-lg bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600 transition-colors hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/40"
                title="Seleccionar todos"
              >
                {selectingAll ? (
                  <RefreshCcw size={14} className="animate-spin" />
                ) : (
                  <CheckSquare size={14} />
                )}
                <span>Seleccionar todos ({total})</span>
              </button>
            )}
            {selectionCount > 0 && onClearSelection && (
              <button
                onClick={async () => {
                  onClearSelection();
                  setQuery('');
                  setCurrentPage(1);
                  await fetchPage('', 1);
                }}
                className="flex items-center space-x-1 rounded-lg bg-red-50 px-3 py-1 text-xs font-semibold text-red-600 transition-colors hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/40"
                title="Borrar selección"
              >
                <Trash2 size={14} />
                <span>Borrar selección ({selectionCount})</span>
              </button>
            )}
          </div>
        ) : null
      }
    >
      <div className="space-y-4">
        <div className="relative">
          <span className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400">
            {icon || <Search size={18} />}
          </span>
          <input
            type="text"
            placeholder={enabled ? placeholder : disabledText || placeholder}
            disabled={!enabled}
            className={`dark:bg-dark-900 w-full rounded-lg border py-2 pr-10 pl-10 focus:ring-2 focus:ring-blue-500 dark:border-gray-700 ${
              !enabled ? 'cursor-not-allowed bg-gray-50 opacity-60 dark:bg-gray-900' : ''
            }`}
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
          />
          {query && (
            <button
              type="button"
              onClick={() => handleSearch('')}
              className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800"
              title="Limpiar búsqueda"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <div className="max-h-[360px] min-h-[120px] overflow-y-auto rounded-xl border border-gray-100 dark:border-gray-800">
          {results.length > 0 ? (
            <div className="divide-y divide-gray-50 dark:divide-gray-800">
              {results.map((item, index) => (
                <div
                  key={item.id || item.ID || index}
                  onClick={() => onSelect && onSelect(item)}
                  className="cursor-pointer"
                >
                  {renderItem(item)}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex min-h-[120px] flex-col items-center justify-center p-4 text-center">
              {loading ? (
                <RefreshCcw size={32} className="animate-spin text-blue-500 opacity-20" />
              ) : (
                <>
                  <div className="mb-2 opacity-20">{emptyIcon || <Search size={32} />}</div>
                  <p className="text-sm text-gray-400">
                    {!enabled
                      ? disabledText || emptyText
                      : query.length > 0 && query.length <= 2
                        ? 'Siga escribiendo...'
                        : results.length === 0 && query.length > 2
                          ? 'No se encontraron resultados'
                          : emptyText}
                  </p>
                </>
              )}
            </div>
          )}
        </div>

        {total > ITEMS_PER_PAGE && (
          <div className="flex items-center justify-between border-t border-gray-100 pt-2 dark:border-gray-800">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Mostrando <span className="font-semibold">{startIndex + 1}</span>
              {'-'}
              <span className="font-semibold">
                {Math.min(startIndex + ITEMS_PER_PAGE, total)}
              </span>{' '}
              de <span className="font-semibold">{total}</span>
            </p>
            <div className="flex items-center space-x-1">
              <button
                onClick={() => goToPage(1)}
                disabled={currentPage === 1 || loading}
                className="rounded-lg border border-gray-200 p-1 text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                title="Primera"
              >
                <ChevronsLeft size={16} />
              </button>
              <button
                onClick={() => goToPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1 || loading}
                className="rounded-lg border border-gray-200 p-1 text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                title="Anterior"
              >
                <ChevronLeft size={16} />
              </button>
              {getPageItems().map((p, idx) =>
                p === 'dots' ? (
                  <span key={`dots-${idx}`} className="px-1 text-xs text-gray-400">
                    …
                  </span>
                ) : (
                  <button
                    key={p}
                    onClick={() => goToPage(p)}
                    disabled={loading}
                    className={`min-w-[28px] rounded-lg border px-2 py-1 text-xs font-semibold transition-colors disabled:cursor-not-allowed ${
                      p === currentPage
                        ? 'border-blue-600 bg-blue-600 text-white'
                        : 'border-gray-200 text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800'
                    }`}
                  >
                    {p}
                  </button>
                ),
              )}
              <button
                onClick={() => goToPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages || loading}
                className="rounded-lg border border-gray-200 p-1 text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                title="Siguiente"
              >
                <ChevronRight size={16} />
              </button>
              <button
                onClick={() => goToPage(totalPages)}
                disabled={currentPage === totalPages || loading}
                className="rounded-lg border border-gray-200 p-1 text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                title="Última"
              >
                <ChevronsRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </ComponentCard>
  );
}
