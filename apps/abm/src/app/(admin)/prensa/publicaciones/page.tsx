'use client';

import useData from '@/hooks/useData';
import { useDebounce } from '@/hooks/useDebounce';
import { useEffect, useRef, useState } from 'react';
import ComponentCard from '@/components/common/ComponentCard';
import TableComponent from '@/components/common/TableComponent';
import { FiltrosState } from '@/components/form/FiltrosTablaPrensa';
import FiltrosTablaPrensa from '@/components/form/FiltrosTablaPrensa';
import PostService from '../../../../../services/PostService';
import PrensaFormInModal from '@/components/example/ModalExample/PrensaFormInModal';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import { useExportar } from '@/hooks/useExport';

export default function CategoriasPage() {
  const [filtros, setFiltros] = useState<FiltrosState>({
    search: '',
    fechaDesde: '',
    fechaHasta: '',
    categorias: [],
    status: '',
    tipo: undefined,
    destacado: undefined,
  });

  const { debounceValue, loading, setLoading } = useDebounce(filtros.search, 1000);
  const { data, offset, limit, setOffset, total, categorias, types, setFlag, flag, setLimit } =
    useData({
      getAll: PostService.getAll,
      loading,
      setLoading,
      search: debounceValue,
      table: '',
      filtros,
    });

  const [claves, setClaves] = useState<string[]>([]);
  const [abierto, setAbierto] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const refMenu = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cerrarAlClickAfuera = (e: MouseEvent) => {
      if (refMenu.current && !refMenu.current.contains(e.target as Node)) {
        setMenuAbierto(false);
      }
    };
    document.addEventListener('mousedown', cerrarAlClickAfuera);
    return () => document.removeEventListener('mousedown', cerrarAlClickAfuera);
  }, []);

  useEffect(() => {
    if (data?.length > 0) {
      setClaves(Object.keys(data[0]));
    }
  }, [data]);

  const { handleExportar, exportando } = useExportar({
    obtenerTodos: PostService.getAll,
    tabla: '',
    filtros,
    busqueda: debounceValue,
    claves,
    nombreArchivo: 'Listado de publicaciones de Prensa',
    titulo: 'Listado de publicaciones de Prensa',
  });

  const handleDelete = async (id: any) => {
    try {
      await PostService.deletePost(id, ' ');
      setFlag((prev) => !prev);
    } catch (error) {
      console.error('Error deleting post:', error);
      throw error;
    }
  };

  const handleStatusChange = async (id: any, newStatus: number) => {
    try {
      await PostService.updatePostStatus(id, newStatus, ' ');
      setFlag((prev) => !prev);
    } catch (error) {
      console.error('Error updating post status:', error);
      throw error;
    }
  };

  return (
    <>
      <ComponentCard
        title="Prensa"
        action={
          <div className="flex items-center gap-3">
            <div ref={refMenu} className="relative">
              <button
                type="button"
                onClick={() => setMenuAbierto((prev) => !prev)}
                disabled={exportando}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
              >
                Exportar
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${menuAbierto ? 'rotate-180' : ''}`}
                />
              </button>

              {menuAbierto && (
                <div className="absolute left-0 z-50 mt-2 w-40 rounded-xl border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
                  <button
                    type="button"
                    onClick={() => {
                      handleExportar('pdf');
                      setMenuAbierto(false);
                    }}
                    className="flex w-full items-center gap-2 rounded-t-xl px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                  >
                    <Image src="/images/export/pdf.svg" alt="PDF" width={16} height={16} />
                    PDF
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      handleExportar('excel');
                      setMenuAbierto(false);
                    }}
                    className="flex w-full items-center gap-2 rounded-b-xl px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                  >
                    <Image src="/images/export/excel.svg" alt="Excel" width={16} height={16} />
                    Excel
                  </button>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => setAbierto(!abierto)}
              className="bg-brand-500 inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white"
            >
              + Nuevo registro
            </button>
          </div>
        }
      >
        <FiltrosTablaPrensa
          setOffset={setOffset}
          types={types}
          setFlag={setFlag}
          filtros={filtros}
          setFiltros={setFiltros}
          categorias={categorias}
        />

        <TableComponent
          setLimit={setLimit}
          section="/prensa/publicaciones"
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
        <PrensaFormInModal
          isOpen={abierto}
          setOpen={setAbierto}
          setFlag={setFlag}
          flag={flag}
          types={types}
        />
      </ComponentCard>
    </>
  );
}
