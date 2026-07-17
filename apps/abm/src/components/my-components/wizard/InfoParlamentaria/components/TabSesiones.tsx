'use client';
import ComponentCard from '@/components/common/ComponentCard';
import Label from '@/components/form/Label';
import Button from '@/components/ui/button/Button';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import DatePicker from '@/components/form/date-picker';
import LaborService from '../../../../../../services/LaborService';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table';
import RoundedRibbon from '@/components/ui/ribbons/RoundedRibbon';
import DebugInfo from '@/app/developComponent/DebugInfo';
import { BiSolidPlusCircle, BiTrash } from 'react-icons/bi';
import ConfirmationModal, { ParlamentariaOptions } from './modals/ConfirmationModal';
import { useAuth } from '@/context/AuthContext';
import formatDate from '@/utils/dateFormater';
import PostService from '../../../../../../services/PostService';

export default function TabSesiones({
  sesiones,
  setInfoParlamentaria,
  postId,
  table,
}: {
  sesiones: any[];
  setInfoParlamentaria: Dispatch<SetStateAction<any>>;
  postId: number;
  table: string;
}) {
  const { auth } = useAuth();
  const [isOpen, SetIsOpen] = useState<boolean>(false);
  const [isAdd, SetIsAdd] = useState<boolean>(false);
  const [selectedSesion, setSelectedSesion] = useState<any | null>(null);
  const [selectedSesionForDelete, setSelectedSesionForDelete] = useState<any | null>(null);

  const [fechaDesde, setFechaDesde] = useState<string>('');
  const [fechaHasta, setFechaHasta] = useState<string>('');
  const [dateKey, setDateKey] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [paginatedData, setPaginatedData] = useState<PaginatedResponse | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  interface PaginatedResponse {
    data: any[];
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
  }
  const ITEMS_PER_PAGE = 5;

  function handleLimpiar() {
    setFechaDesde('');
    setFechaHasta('');
    setDateKey((prev) => prev + 1);
    setPaginatedData(null);
    toast.info('Campos limpiados', { theme: 'light' });
  }

  function esRangoValido(desde: string, hasta: string): boolean {
    if (!desde || !hasta) return true; // no validar si falta una
    return new Date(hasta).getTime() >= new Date(desde).getTime();
  }

  const fetchSesiones = async () => {
    setIsLoading(true);
    try {
      const response = await LaborService.GetSesionesAvanzado(
        fechaDesde,
        fechaHasta,
        currentPage,
        ITEMS_PER_PAGE,
      );
      console.log(response);
      setPaginatedData(response);
      setCurrentPage(response.page);
      return response; // Retornar la respuesta
    } catch (e) {
      console.error(e);
      setPaginatedData(null);
      return null;
    } finally {
      setIsLoading(false);
    }
  };
  const handlePageChange = (newPage: number) => {
    if (paginatedData && newPage >= 1 && newPage <= paginatedData.totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleAgregarSesion = async () => {
    try {
      const response = await PostService.insertSesion(
        postId,
        selectedSesion.id_sesion_lp ?? selectedSesion.id ?? selectedSesion.sesion_id,
        auth?.user?.id_user,
        table,
      );

      setInfoParlamentaria((prev: { sesiones: any[] }) => {
        const nuevasSesiones: any[] = response.data?.data || [];
        return { ...prev, sesiones: nuevasSesiones };
      });

      // Limpiar búsqueda al agregar
      setPaginatedData(null);
      setFechaDesde('');
      setFechaHasta('');
      setDateKey((prev) => prev + 1);

      toast.success(response.data?.message || 'Sesión agregada', {
        theme: 'light',
      });
      SetIsOpen(false);
    } catch (e) {
      console.error(e);
      toast.error('Error al agregar sesión.', { theme: 'light' });
    }
  };

  const handleEliminarSesion = async () => {
    if (!selectedSesionForDelete) {
      toast.warning('No se seleccionó ninguna sesión para eliminar.', {
        theme: 'light',
      });
      return;
    }

    try {
      const response = await PostService.deleteSesion(
        postId,
        selectedSesionForDelete.sesion_id,
        auth?.user?.id_user,
        table,
      );

      if (!response?.data?.success) {
        toast.warning(response?.data?.message || 'No se pudo eliminar la sesión.', {
          theme: 'light',
        });
        return;
      }

      setInfoParlamentaria((prev: { sesiones: any[] }) => ({
        ...prev,
        sesiones: response.data?.data || [],
      }));

      toast.success(response.data?.message || 'Sesión eliminada', {
        theme: 'light',
      });
    } catch (e) {
      console.error(e);
      toast.error('Error al eliminar sesión.', { theme: 'light' });
    } finally {
      SetIsOpen(false);
      SetIsAdd(false);
      setSelectedSesionForDelete(null);
    }
  };

  const isFirstRun = useRef(true);
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    fetchSesiones();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);
  return (
    <ComponentCard title="Sesiones">
      {/* <DebugInfo data={sesiones} /> */}
      <ConfirmationModal
        isOpen={isOpen}
        SetIsOpen={SetIsOpen}
        title={
          isAdd
            ? `Sesión Nro. ${selectedSesion?.nro_de_sesion || selectedSesion?.id_sesion_lp || ''}`
            : `Sesión Nro. ${
                selectedSesionForDelete?.detalleSesion?.nro_de_sesion ||
                selectedSesionForDelete?.detalleSesion?.id_sesion_lp ||
                ''
              }`
        }
        option={ParlamentariaOptions.Sesion || 'Sesion'}
        handleRequest={isAdd ? handleAgregarSesion : handleEliminarSesion}
        isAdd={isAdd}
      />
      <section className="space-y-6">
        <div className="mb-4">
          <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Buscador</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Tiene que buscar por rango de fechas y luego podrá asociarlas al expediente.
          </p>
        </div>
        <div className="flex flex-wrap items-end gap-4">
          <div className="flex w-64 flex-col">
            <Label>Fecha desde</Label>
            <DatePicker
              key={`desde-${dateKey}`}
              id="sesiones-fecha-desde"
              value={fechaDesde}
              onChange={(dates: Date[]) => setFechaDesde(dates[0]?.toISOString() || '')}
              placeholder="Seleccionar fecha"
            />
          </div>
          <div className="flex w-64 flex-col">
            <Label>Fecha hasta</Label>
            <DatePicker
              key={`hasta-${dateKey}`}
              id="sesiones-fecha-hasta"
              value={fechaHasta ?? undefined}
              placeholder="Seleccionar fecha"
              onChange={(dates: Date[]) => {
                const val = dates[0]?.toISOString() || '';
                /*  if (!esRangoValido(fechaDesde, val)) {
                                     toast.error(
                                         "La fecha hasta no puede ser menor que la fecha desde",
                                         { theme: "light" }
                                     );
                                     return;
                                 } */
                setFechaHasta(val);
              }}
            />
          </div>

          <Button className="mt-4" onClick={() => fetchSesiones()}>
            Buscar
          </Button>

          <Button onClick={handleLimpiar} className="mt-4">
            Limpiar
          </Button>
        </div>{' '}
        {paginatedData?.data && paginatedData.data.length > 0 && (
          <div className="mt-8 max-w-full overflow-x-auto">
            <span className="ms-1 mb-4 block">
              Mostrando {paginatedData.data.length} sesiones de un total de{' '}
              {paginatedData.totalItems}.
            </span>

            <Table className="text-center">
              <TableHeader className="border-y border-gray-100 dark:border-gray-800">
                <TableRow className="dark:hover:bg-dark-700 border-y border-gray-300 hover:bg-gray-50 dark:border-gray-700">
                  <TableCell className="py-3 text-sm font-extrabold text-gray-500">Tipo</TableCell>
                  <TableCell className="py-3 text-sm font-extrabold text-gray-500">Fecha</TableCell>
                  <TableCell className="py-3 text-sm font-extrabold text-gray-500">
                    Acciones
                  </TableCell>
                </TableRow>
              </TableHeader>

              <TableBody>
                {paginatedData.data.map((sesion: any, index: number) => (
                  <TableRow
                    key={sesion.id || index}
                    className="dark:hover:bg-dark-700 border-y border-gray-300 hover:bg-gray-50 dark:border-gray-700"
                  >
                    <TableCell className="text-theme-xs py-3 font-medium text-gray-500 dark:text-gray-400">
                      {sesion?.dsc_sesion_tipo || '-'}
                    </TableCell>
                    <TableCell className="text-theme-xs py-3 font-medium text-gray-500 dark:text-gray-400">
                      {formatDate(sesion?.fch_sesion_lp) || '-'}
                    </TableCell>

                    <TableCell className="text-theme-xs relative py-3 font-medium text-gray-500 dark:text-gray-400">
                      <div className="group relative inline-flex items-center justify-center">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedSesion(sesion);
                            const yaExiste = sesiones?.some(
                              (s) => s.sesion_id == sesion.id_sesion_lp,
                            );

                            if (yaExiste) {
                              toast.info('Esta sesión ya está asociada al expediente/post.', {
                                theme: 'light',
                              });
                              return;
                            }
                            setSelectedSesionForDelete(null);
                            SetIsAdd(true);
                            SetIsOpen(true);
                          }}
                        >
                          <BiSolidPlusCircle className="h-8 w-8 text-gray-600 hover:text-blue-600 dark:text-gray-300" />
                        </button>

                        <div className="pointer-events-none invisible absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-gray-800 px-2 py-1 text-[10px] whitespace-nowrap text-white opacity-0 transition group-hover:visible group-hover:opacity-100">
                          Agregar
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* --- CONTROLES DE PAGINACIÓN --- */}

            <div className="flex items-center justify-end space-x-2 pt-4">
              <span className="ms-1 block">
                Mostrando página {currentPage} de {paginatedData.totalPages}
              </span>

              <Button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1 || isLoading}
              >
                Anterior
              </Button>

              <Button
                onClick={() => setCurrentPage((currentPage) => currentPage + 1)}
                disabled={currentPage === paginatedData.totalPages || isLoading}
              >
                Siguiente
              </Button>
            </div>
          </div>
        )}
        <div className="mt-8">
          {sesiones?.length > 0 && (
            <h2 className="mb-4 text-lg font-semibold text-gray-700 dark:text-gray-200">
              Sesiones Relacionadas:
            </h2>
          )}

          {sesiones?.length > 0 && (
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {sesiones?.map((sesion: any, index: number) => (
                <RoundedRibbon
                  key={index}
                  text={`${sesion?.detalleSesion?.fch_sesion_lp || 'Sin salva'}`}
                  color="bg-indigo-600"
                  className="p-3"
                >
                  <div className="space-y-1 text-xs">
                    <p>
                      <span className="font-semibold">Tipo: </span>
                      {` ${sesion?.detalleSesion?.dsc_sesion_tipo}` || 'Sin competencia'}
                    </p>
                  </div>

                  {/* Botón borrar */}
                  <div className="group absolute right-2 bottom-2">
                    <button
                      type="button"
                      className="absolute right-2 bottom-2 inline-flex items-center justify-center rounded-full p-1 transition hover:bg-red-100 dark:hover:bg-red-900/40"
                      onClick={() => {
                        setSelectedSesionForDelete(sesion);
                        setSelectedSesion(null);
                        SetIsAdd(false);
                        SetIsOpen(true);
                      }}
                    >
                      <BiTrash className="h-5 w-5 text-red-600 dark:text-red-400" />
                    </button>
                    {/* Tooltip */}
                    <div className="pointer-events-none invisible absolute right-0 bottom-8 rounded bg-gray-800 px-2 py-1 text-[10px] whitespace-nowrap text-white opacity-0 transition group-hover:visible group-hover:opacity-100">
                      Eliminar sesión
                    </div>
                  </div>
                </RoundedRibbon>
              ))}
            </div>
          )}

          {!sesiones?.length && (
            <RoundedRibbon text="Sin resultados" color="bg-gray-500">
              <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                No se encontraron sesiones asociadas.
              </p>
            </RoundedRibbon>
          )}
        </div>
      </section>
    </ComponentCard>
  );
}
