'use client';

import useData from '@/hooks/useData';
import { useDebounce } from '@/hooks/useDebounce';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import { useExportar } from '@/hooks/useExport';
import ComponentCard from '@/components/common/ComponentCard';
import TableComponent from '@/components/common/TableComponent';
import FiltrosTablaPrensa, { FiltrosState } from '@/components/form/FiltrosTablaPrensa';
import PostService from '../../../../../services/PostService';
import OipFormInModal from '@/components/FormsModals/OipFormInModal';

export default function OipInformesPage() {
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
      table: 'evidencias_',
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
    tabla: 'evidencias_',
    filtros,
    busqueda: debounceValue,
    claves,
    nombreArchivo: 'Listado de Informes OIP',
    titulo: 'Listado de Informes - Oficina de Integridad Pública',
  });

  const handleDelete = async (id: any) => {
    try {
      await PostService.deletePost(id, 'evidencias_');
      setFlag((prev) => !prev);
    } catch (error) {
      console.error('Error al eliminar informe:', error);
      throw error;
    }
  };

  const handleStatusChange = async (id: any, newStatus: number) => {
    try {
      await PostService.updatePostStatus(id, newStatus, 'evidencias_');
      setFlag((prev) => !prev);
    } catch (error) {
      console.error('Error al actualizar estado:', error);
      throw error;
    }
  };

  return (
    <>
      <ComponentCard
        title="OIP - Informes"
        action={
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setAbierto(!abierto)}
              className="bg-brand-500 hover:bg-brand-600 inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition"
            >
              + Nuevo Informe
            </button>
            <div className="relative" ref={refMenu}>
              <button
                type="button"
                onClick={() => setMenuAbierto((prev) => !prev)}
                disabled={exportando}
                className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
              >
                {exportando ? 'Exportando...' : 'Exportar'}
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </button>

              {menuAbierto && (
                <div className="absolute right-0 z-50 mt-1 w-44 rounded-xl border border-gray-100 bg-white py-1 shadow-lg dark:border-gray-700 dark:bg-gray-800">
                  <button
                    type="button"
                    onClick={() => {
                      setMenuAbierto(false);
                      handleExportar('excel');
                    }}
                    className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-700"
                  >
                    <Image src="/images/excel.png" alt="Excel" width={18} height={18} />
                    Excel (.xlsx)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMenuAbierto(false);
                      handleExportar('pdf');
                    }}
                    className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-700"
                  >
                    <Image src="/images/pdf.png" alt="PDF" width={18} height={18} />
                    PDF (.pdf)
                  </button>
                </div>
              )}
            </div>
          </div>
        }
      >
        <FiltrosTablaPrensa
          filtros={filtros}
          setFiltros={setFiltros}
          setOffset={setOffset}
          setFlag={setFlag}
          categorias={[]}
          types={types}
        />

        <TableComponent
          data={data}
          section="/oip/informes"
          loading={loading}
          total={total}
          limit={limit}
          offset={offset}
          setOffset={setOffset}
          claves={claves}
          setLimit={setLimit}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
        />
      </ComponentCard>
      <OipFormInModal setFlag={setFlag} isOpen={abierto} setOpen={setAbierto} flag={flag} />
    </>
  );
}
