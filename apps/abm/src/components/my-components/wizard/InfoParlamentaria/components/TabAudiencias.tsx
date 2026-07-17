// TabAudiencias.tsx
import ComponentCard from '@/components/common/ComponentCard';
import DatePicker from '@/components/form/date-picker';
import Button from '@/components/ui/button/Button';
import { Dispatch, SetStateAction, useState, useMemo, useEffect, useRef } from 'react';
import LaborService from '../../../../../../services/LaborService';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table';
import { BiSolidPlusCircle, BiTrash } from 'react-icons/bi';
import ConfirmationModal, { ParlamentariaOptions } from './modals/ConfirmationModal';
import { toast } from 'react-toastify';
import { useAuth } from '@/context/AuthContext';
import RoundedRibbon from '@/components/ui/ribbons/RoundedRibbon';

const ITEMS_PER_PAGE = 5;

import { IAudiencia } from '@/types/postTypes';
import PostService from '../../../../../../services/PostService';

export interface PaginatedResponse {
  data: any[];
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
}

export default function TabAudiencias({
  audiencias,
  setInfoParlamentaria,
  postId,
  table,
}: {
  audiencias: IAudiencia[];
  setInfoParlamentaria: Dispatch<SetStateAction<any>>;
  postId: number;
  table?: any;
}) {
  const { auth } = useAuth();
  const [isOpen, SetIsOpen] = useState<boolean>(false);
  const [isAdd, SetIsAdd] = useState<boolean>(false);
  const [selectedAudiencia, setSelectedAudiencia] = useState<any | null>(null);
  const [selectedAudienciaForDelete, setSelectedAudienciaForDelete] = useState<IAudiencia | null>(
    null,
  );
  const [fch_desde, setFchDesde] = useState<string>('');
  const [fch_hasta, setFchHasta] = useState<string>('');

  // Estado para la data y la paginación
  const [paginatedData, setPaginatedData] = useState<PaginatedResponse | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const [dateKey, setDateKey] = useState(0);

  const mapRawAudiencia = (raw: any): any => {
    return {
      id: raw.id_audiencia,
      expediente: raw.expediente,
      sumario: raw.sumario,
      fechaHora: raw.fecha_hora,
      // Fechas parseadas a objetos Date

      salaReunion: raw.sala_reunion,
      comision: raw.comision,

      // Campos numéricos asegurados
      totalInscriptos: parseInt(raw.total_inscriptos || '0', 10),
    };
  };

  // Función de fetch (envía la página y el límite)
  const fetchAudiencias = async () => {
    setIsLoading(true);
    try {
      const response = await LaborService.GetAudienciasPorRango(
        fch_desde,
        fch_hasta,
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

  // Mapeo DTO: Se ejecuta solo cuando cambia paginatedData
  const mappedAudiencias = useMemo(() => {
    if (!paginatedData) return [];
    // Aplicamos el mapeo DTO a cada ítem del array de data
    return paginatedData.data.map(mapRawAudiencia);
  }, [paginatedData]);

  // Handler para el botón Buscar (siempre empieza en la página 1)
  const handleBuscar = async () => {
    if (!fch_desde && !fch_hasta) {
      toast.warning('Debe colocar fechas qué desea buscar.', { theme: 'light' });
      return;
    }

    if (!fch_desde) {
      toast.warning('Debe colocar fecha inicio.', { theme: 'light' });
      return;
    }

    if (!fch_hasta) {
      toast.warning('Debe colocar fecha hasta.', { theme: 'light' });
      return;
    }

    setCurrentPage(1);

    setIsLoading(true);
    try {
      const response = await LaborService.GetAudienciasPorRango(
        fch_desde,
        fch_hasta,
        1,
        ITEMS_PER_PAGE,
      );
      console.log('Respuesta búsqueda:', response);
      setPaginatedData(response);
      setCurrentPage(response.page);

      if (!response.data || response.data.length === 0) {
        toast.info('No se encontraron audiencias en el rango de fechas seleccionado.', {
          theme: 'light',
        });
      }
    } catch (e) {
      console.error(e);
      setPaginatedData(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Handler para los controles de paginación
  const handlePageChange = (newPage: number) => {
    if (paginatedData && newPage >= 1 && newPage <= paginatedData.totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleAgregarAudiencia = async () => {
    try {
      const response = await PostService.postAudiencia(
        postId,
        selectedAudiencia.id,
        auth?.user?.id_user,
        table,
      );

      const backendMessage: string | undefined = response?.message ?? response?.data?.message;

      if (backendMessage && /error/i.test(backendMessage)) {
        toast.warning(backendMessage, { theme: 'light' });
        SetIsOpen(false);
        return;
      }

      // Refetch del post completo para traer las audiencias actualizadas
      const refreshed = await PostService.getPostById(String(postId), table);
      const nuevasAudiencias: IAudiencia[] = refreshed?.infoParlamentaria?.audiencias ?? [];

      setInfoParlamentaria((prev: { audiencias: IAudiencia[] }) => ({
        ...prev,
        audiencias: nuevasAudiencias,
      }));

      toast.success(backendMessage || 'Audiencia agregada correctamente', {
        theme: 'light',
      });
      SetIsOpen(false);
    } catch (e) {
      console.error(e);
      toast.error('Error al agregar audiencia.', { theme: 'light' });
    }
  };

  const handleEliminarAudiencia = async () => {
    if (!selectedAudienciaForDelete) {
      toast.warning('No se seleccionó ninguna audiencia para eliminar.', {
        theme: 'light',
      });
      return;
    }

    try {
      const response = await PostService.deleteAudiencia(
        postId,
        selectedAudienciaForDelete.audiencia_id,
        auth?.user?.id_user,
        table,
      );

      const backendMessage: string | undefined = response?.message ?? response?.data?.message;

      if (backendMessage && /error/i.test(backendMessage)) {
        toast.warning(backendMessage, { theme: 'light' });
        return;
      }

      // Refetch del post completo para traer las audiencias actualizadas
      const refreshed = await PostService.getPostById(String(postId), table);
      const nuevasAudiencias: IAudiencia[] = refreshed?.infoParlamentaria?.audiencias ?? [];

      setInfoParlamentaria((prev: { audiencias: IAudiencia[] }) => ({
        ...prev,
        audiencias: nuevasAudiencias,
      }));

      toast.success(backendMessage || 'Audiencia eliminada correctamente', {
        theme: 'light',
      });
    } catch (e) {
      console.error(e);
      toast.error('Error al eliminar audiencia.', { theme: 'light' });
    } finally {
      SetIsOpen(false);
      SetIsAdd(false);
      setSelectedAudienciaForDelete(null);
    }
  };

  function parseFechaDMY(s: string): Date | null {
    if (!s) return null;
    const [d, m, y] = s.split('-').map(Number);
    if (!d || !m || !y) return null;
    return new Date(y, m - 1, d);
  }

  function esRangoValido(desde: string, hasta: string): boolean {
    if (!desde || !hasta) return true;
    const d = parseFechaDMY(desde);
    const h = parseFechaDMY(hasta);
    if (!d || !h) return true;
    return h.getTime() >= d.getTime();
  }

  const isFirstRun = useRef(true);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    fetchAudiencias();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  return (
    <ComponentCard title="Audiencias">
      {/* <DebugInfo data={mappedAudiencias} /> */}
      <ConfirmationModal
        isOpen={isOpen}
        SetIsOpen={SetIsOpen}
        title={
          isAdd
            ? `Expediente nro. ${selectedAudiencia ? selectedAudiencia.expediente : ''}`
            : `${selectedAudienciaForDelete?.detalleAudiencia?.expediente || ''}`
        }
        option={ParlamentariaOptions.Audiencia}
        handleRequest={isAdd ? handleAgregarAudiencia : handleEliminarAudiencia}
        isAdd={isAdd}
      />

      <section className="space-y-6">
        <div className="mb-4">
          <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Buscador</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Tiene que buscar las audiencias por un rango de fechas y luego podrá asociarlas al
            expediente.
          </p>
        </div>
        <div className="flex items-end gap-3">
          <div className="md:col-span-1">
            <DatePicker
              key={`desde-${dateKey}`}
              id="date-picker-desde"
              value={fch_desde}
              label="Fecha desde"
              placeholder="Fecha desde"
              onChange={(_, dateStr: string) => setFchDesde(dateStr)}
            />
          </div>

          <div className="md:col-span-1">
            <DatePicker
              key={`hasta-${dateKey}`}
              id="date-picker-hasta"
              value={fch_hasta}
              label="Fecha hasta"
              placeholder="Fecha hasta"
              onChange={(_, dateStr: string) => {
                if (!esRangoValido(fch_desde, dateStr)) {
                  toast.error('La fecha hasta no puede ser menor que la fecha desde', {
                    theme: 'light',
                  });
                  return;
                }

                setFchHasta(dateStr);
              }}
            />
          </div>

          <div className="flex items-end gap-2 md:col-span-2">
            <Button className="w-auto" onClick={handleBuscar} disabled={isLoading}>
              Buscar
            </Button>

            <Button
              disabled={isLoading}
              onClick={() => {
                setFchDesde('');
                setFchHasta('');
                setPaginatedData(null);
                setCurrentPage(1);

                setSelectedAudiencia(null);
                setDateKey((prev) => prev + 1);

                toast.info('Campos limpiados', { theme: 'light' });
              }}
            >
              Limpiar
            </Button>
          </div>
        </div>
      </section>

      {/* --- TABLA DE RESULTADOS --- */}

      {mappedAudiencias.length > 0 && paginatedData && (
        <div className="mt-8 max-w-full overflow-x-auto">
          <span className="ms-1 mb-4 block">
            Mostrando {mappedAudiencias.length} audiencias de un total de {paginatedData.totalItems}
            .
          </span>

          <Table className="text-center">
            <TableHeader className="border-y border-gray-100 dark:border-gray-800">
              <TableRow className="dark:hover:bg-dark-700 border-y border-gray-300 hover:bg-gray-50 dark:border-gray-700">
                <TableCell className="py-3 text-sm font-extrabold text-gray-500">
                  Expediente
                </TableCell>
                <TableCell className="py-3 text-sm font-extrabold text-gray-500">
                  Fecha y Hora
                </TableCell>
                <TableCell className="py-3 text-sm font-extrabold text-gray-500">
                  Comisión
                </TableCell>
                <TableCell className="py-3 text-sm font-extrabold text-gray-500">Sala</TableCell>
                <TableCell className="py-3 text-sm font-extrabold text-gray-500">
                  Inscriptos
                </TableCell>
                <TableCell className="py-3 text-sm font-extrabold text-gray-500">Acción</TableCell>
              </TableRow>
            </TableHeader>

            <TableBody>
              {mappedAudiencias.map((audiencia: any) => (
                <TableRow
                  key={audiencia.id}
                  className="dark:hover:bg-dark-700 border-y border-gray-300 hover:bg-gray-50 dark:border-gray-700"
                >
                  <TableCell className="text-theme-xs py-3 font-medium text-gray-500 dark:text-gray-400">
                    {audiencia.expediente}
                  </TableCell>
                  <TableCell className="text-theme-xs py-3 font-medium text-gray-500 dark:text-gray-400">
                    {audiencia.fechaHora}
                  </TableCell>
                  <TableCell className="text-theme-xs py-3 font-medium text-gray-500 dark:text-gray-400">
                    {audiencia.comision}
                  </TableCell>
                  <TableCell className="text-theme-xs py-3 font-medium text-gray-500 dark:text-gray-400">
                    {audiencia.salaReunion}
                  </TableCell>
                  <TableCell className="text-theme-xs py-3 font-medium text-gray-500 dark:text-gray-400">
                    {audiencia.totalInscriptos}
                  </TableCell>
                  <TableCell className="text-theme-xs relative py-3 font-medium text-gray-500 dark:text-gray-400">
                    <div className="group relative inline-flex items-center justify-center">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedAudiencia(audiencia);
                          audiencias.forEach((audiencia) => {
                            console.log(audiencia.audiencia_id);
                            console.log(selectedAudiencia?.id);
                          });

                          if (!audiencia?.id) {
                            toast.warning('No se encontró el id del expediente.', {
                              theme: 'light',
                            });
                            return;
                          }

                          const yaExiste = audiencias?.some(
                            (p) => p.audiencia_id == selectedAudiencia?.id,
                          );

                          if (yaExiste) {
                            toast.info('Este expediente ya está asociado al post.', {
                              theme: 'light',
                            });
                            return;
                          }
                          setSelectedAudienciaForDelete(null);
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
        {audiencias?.length > 0 && (
          <h2 className="mb-4 text-lg font-semibold text-gray-700 dark:text-gray-200">
            Audiencias Relacionadas:
          </h2>
        )}

        {audiencias?.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {audiencias?.map((audienciaItem: IAudiencia, index: number) => (
              <RoundedRibbon
                key={index}
                text={`Expediente ${audienciaItem.detalleAudiencia?.expediente}`}
                color="bg-indigo-600"
                className="relative p-3"
              >
                <div className="space-y-1 pr-6 text-xs">
                  <p>
                    <span className="font-semibold">Sumario:</span>
                    {audienciaItem.detalleAudiencia?.sumario}
                  </p>
                  <p>
                    <span className="font-semibold">Comisión: </span>
                    {audienciaItem.detalleAudiencia?.comision}
                  </p>
                </div>

                {/* Botón borrar */}
                <div className="group absolute right-2 bottom-2">
                  <button
                    type="button"
                    className="absolute right-2 bottom-2 inline-flex items-center justify-center rounded-full p-1 transition hover:bg-red-100 dark:hover:bg-red-900/40"
                    onClick={() => {
                      setSelectedAudienciaForDelete(audienciaItem);
                      setSelectedAudiencia(null);
                      SetIsAdd(false);
                      SetIsOpen(true);
                    }}
                  >
                    <BiTrash className="h-5 w-5 text-red-600 dark:text-red-400" />
                  </button>
                  {/* Tooltip */}
                  <div className="pointer-events-none invisible absolute right-0 bottom-8 rounded bg-gray-800 px-2 py-1 text-[10px] whitespace-nowrap text-white opacity-0 transition group-hover:visible group-hover:opacity-100">
                    Eliminar audiencia
                  </div>
                </div>
              </RoundedRibbon>
            ))}
          </div>
        )}

        {audiencias?.length === 0 && (
          <RoundedRibbon text="Sin resultados" color="bg-gray-500">
            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              No se encontraron audiencias asociados.
            </p>
          </RoundedRibbon>
        )}
      </div>
    </ComponentCard>
  );
}
