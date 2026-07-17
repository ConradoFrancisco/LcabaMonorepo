'use client';

import useData from '@/hooks/useData';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import { useExportar } from '@/hooks/useExport';
import ComponentCard from '@/components/common/ComponentCard';
import TableComponent from '@/components/common/TableComponent';
import FormInModal from '@/components/example/ModalExample/RevistaFormInModal';
import PostService from '../../../../../services/PostService';
import FiltrosTablaRevista, { FiltrosState } from '@/components/form/FiltrosTablaRevista';

export default function RevistaPage() {
  const [filtros, setFiltros] = useState<FiltrosState>({
    search: '',
    fechaDesde: '',
    fechaHasta: '',
    categorias: [],
    status: '',
    tipo: undefined,
    destacado: undefined,
  });

  const [loading, setLoading] = useState(false);
  const { data, types, offset, limit, setOffset, total, categorias, setFlag, flag, setLimit } =
    useData({
      getAll: PostService.getAll,
      loading,
      setLoading,
      search: filtros.search || '',
      table: 'magazine_',
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
    tabla: 'magazine_',
    filtros,
    busqueda: filtros.search || '',
    claves,
    nombreArchivo: 'Listado de publicaciones de Revista',
    titulo: 'Listado de publicaciones de Revista',
  });

  const handleDelete = async (id: any) => {
    try {
      await PostService.deletePost(id, 'magazine_');
      setFlag((prev) => !prev);
    } catch (error) {
      console.error('Error deleting post:', error);
      throw error;
    }
  };

  const handleStatusChange = async (id: any, newStatus: number) => {
    try {
      await PostService.updatePostStatus(id, newStatus, 'magazine_');
      setFlag((prev) => !prev);
    } catch (error) {
      console.error('Error updating post status:', error);
      throw error;
    }
  };

  return (
    <>
      <ComponentCard
        title="Revista LCABA"
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
        <FiltrosTablaRevista
          setOffset={setOffset}
          types={types}
          setFlag={setFlag}
          filtros={filtros}
          setFiltros={setFiltros}
          categorias={categorias}
        />

        <TableComponent
          setLimit={setLimit}
          section="/revista/publicaciones"
          data={data}
          loading={loading}
          total={total}
          limit={limit}
          offset={offset}
          setOffset={setOffset}
          claves={claves}
          onStatusChange={handleStatusChange}
          onDelete={handleDelete}
        />
      </ComponentCard>

      <FormInModal setFlag={setFlag} isOpen={abierto} setOpen={setAbierto} flag={flag} />
    </>
  );
}
