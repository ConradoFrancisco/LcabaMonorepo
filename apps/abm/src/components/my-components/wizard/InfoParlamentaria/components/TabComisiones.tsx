import ComponentCard from '@/components/common/ComponentCard';
import Input from '@/components/form/input/InputField';
import Label from '@/components/form/Label';
import Button from '@/components/ui/button/Button';
import { Dispatch, SetStateAction, useState } from 'react';
import LaborService from '../../../../../../services/LaborService';
import { BiSolidPlusCircle, BiTrash } from 'react-icons/bi';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table';
import RoundedRibbon from '@/components/ui/ribbons/RoundedRibbon';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'react-toastify';
import ConfirmationModal, { ParlamentariaOptions } from './modals/ConfirmationModal';
import { Loader2 } from 'lucide-react';
import { IComision, IDetalleComision } from '@/types/postTypes';
import PostService from '../../../../../../services/PostService';

export default function TabComisiones({
  comisiones,
  setInfoParlamentaria,
  postId,
  table,
}: {
  comisiones: IComision[];
  setInfoParlamentaria: Dispatch<SetStateAction<any>>;
  postId: number;
  table: string;
}) {
  const { auth } = useAuth();
  const [query, setQuery] = useState('');
  const [isOpen, SetIsOpen] = useState<boolean>(false);
  const [isAdd, SetIsAdd] = useState<boolean>(false);
  const [selectedComision, setSelectedComision] = useState<IDetalleComision | null>(null);
  const [selectedComisionForDelete, setSelectedComisionForDelete] = useState<IComision | null>(
    null,
  );
  const [data, setData] = useState<IDetalleComision[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleBuscar = async () => {
    setIsLoading(true);
    if (!query) {
      toast.warning('Debe ingresar un nombre de comisión.', { theme: 'light' });
      return;
    }

    let dataToSet = null;
    let errorMessage = null;

    try {
      const response = await LaborService.GetComisiones(query);
      dataToSet = response.data.data || response.data;
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        errorMessage = error.response.data.error;
      } else if (error.response) {
        errorMessage = error.response.data.error || `Error del servidor: ${error.response.status}`;
      } else {
        errorMessage = 'No se pudo conectar con el servicio de comisiones.';
      }
    } finally {
      setIsLoading(false);
    }

    if (errorMessage) {
      toast.success(errorMessage, { theme: 'light' });
      setData([]);
    } else {
      setData(dataToSet);
      if (dataToSet && dataToSet.message) {
        toast.success(dataToSet.message);
        setData(dataToSet.data);
      } else if (Array.isArray(dataToSet) && dataToSet.length === 0) {
        toast.warning('No se encontró la comisión buscada.', { theme: 'light' });
      }
    }
  };

  const handleAñadirComision = async () => {
    if (!selectedComision?.id_comision) {
      toast.error('No se pudo identificar el ID de la comisión.', {
        theme: 'light',
      });
      return;
    }

    try {
      const yaExiste = comisiones?.some(
        (c) =>
          String(c.comision_id ?? c.detalleComision?.[0]?.id_comision) ===
          String(selectedComision.id_comision),
      );

      if (yaExiste) {
        toast.info('Esta comisión ya está asociada al post.', {
          theme: 'light',
        });
        SetIsOpen(false);
        return;
      }

      const response = await PostService.postComision(
        postId,
        selectedComision.id_comision,
        auth.user?.id_user,
        table,
      );

      setInfoParlamentaria((prev: any) => {
        const nuevasComisiones = response?.data?.data ?? [
          ...(prev?.comisiones ?? []),
          { ...selectedComision },
        ];
        return { ...prev, comisiones: nuevasComisiones };
      });

      toast.success('Comisión agregada correctamente.', { theme: 'light' });
      setQuery('');
      setData([]);
    } catch (error) {
      console.error('Error en handleAñadirComision:', error);
      toast.error('Error al agregar la comisión.', { theme: 'light' });
    } finally {
      SetIsOpen(false);
      SetIsAdd(false);
      setSelectedComision(null);
    }
  };

  const handleEliminarComision = async () => {
    if (!selectedComisionForDelete) {
      toast.warning('No se seleccionó ninguna comisión para eliminar.', {
        theme: 'light',
      });
      return;
    }

    try {
      setIsLoading(true);
      const response = await PostService.deleteComision(
        postId,
        selectedComisionForDelete.comision_id,
        auth?.user?.id_user,
        table,
      );

      const comisionIdEliminada = selectedComisionForDelete.comision_id;

      setInfoParlamentaria((prev: { comisiones: IComision[] }) => {
        const fromApi = response?.comisiones?.data ?? response?.data?.data ?? response?.data;
        const nuevasComisiones = Array.isArray(fromApi)
          ? fromApi
          : (prev?.comisiones ?? []).filter(
              (c) => String(c.comision_id) !== String(comisionIdEliminada),
            );
        return { ...prev, comisiones: nuevasComisiones };
      });

      toast.success(response?.comisiones?.message ?? 'Comisión eliminada correctamente.', {
        theme: 'light',
      });
    } catch (e) {
      console.error(e);
      toast.error('Error al eliminar comisión.', { theme: 'light' });
    } finally {
      SetIsOpen(false);
      SetIsAdd(false);
      setSelectedComisionForDelete(null);
      setIsLoading(false);
    }
  };

  return (
    <>
      <ComponentCard title="Comisiones">
        <ConfirmationModal
          SetIsOpen={SetIsOpen}
          handleRequest={isAdd ? handleAñadirComision : handleEliminarComision}
          isOpen={isOpen}
          title={
            isAdd
              ? selectedComision?.nombre || ''
              : selectedComisionForDelete?.detalleComision?.[0]?.nombre || ''
          }
          option={ParlamentariaOptions.Comision}
          isAdd={isAdd}
        />

        <section className="space-y-6">
          <div className="mb-4">
            <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Buscador</h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Tiene que buscar las comisiones que desea buscar y luego podrá asociarlas al
              expediente.
            </p>
          </div>
          <div className="flex items-end gap-3">
            <div className="flex items-end gap-3">
              <div className="flex w-100 flex-col">
                <Label>Nombre de la comisión</Label>
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Ej. Comisión de Presupuesto"
                />
              </div>
              <Button onClick={handleBuscar} disabled={isLoading} className="mt-4 flex gap-2">
                Buscar
              </Button>
              <Button
                disabled={isLoading}
                onClick={() => {
                  setQuery('');
                  setData([]);
                  // setDateKey(prev => prev + 1);

                  toast.info('Campos limpiados', { theme: 'light' });
                }}
              >
                Limpiar
              </Button>
            </div>
          </div>

          {data.length > 0 ? (
            isLoading ? (
              <div className="flex h-64 items-center justify-center">
                <Loader2 className="animate-spin" />
              </div>
            ) : (
              <>
                <h2 className="mb-4 text-lg font-semibold text-gray-700 dark:text-gray-200">
                  Resultados Búsqueda:
                </h2>
                <div className="flex flex-col">
                  <Table className="text-center">
                    <TableHeader className="border-y border-gray-100 dark:border-gray-800">
                      <TableRow className="dark:hover:bg-dark-700 border-y border-gray-300 hover:bg-gray-50 dark:border-gray-700">
                        <TableCell className="ms-4 w-3/4 py-3 text-left text-sm font-extrabold text-gray-500">
                          Nombre
                        </TableCell>
                        <TableCell className="w-1/4 py-3 text-sm font-extrabold text-gray-500">
                          Acciones
                        </TableCell>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      {data.map((fila: IDetalleComision, index: number) => (
                        <TableRow
                          key={index}
                          className="dark:hover:bg-dark-700 border-y border-gray-300 hover:bg-gray-50 dark:border-gray-700"
                        >
                          <TableCell className="text-md ms-4 py-3 text-left text-gray-500 dark:text-gray-400">
                            {fila.nombre}
                          </TableCell>

                          <TableCell className="text-theme-xs py-3 text-center align-middle font-medium text-gray-500 dark:text-gray-400">
                            <div className="group relative flex items-center justify-center">
                              <button
                                onClick={() => {
                                  setSelectedComision(fila);
                                  setSelectedComisionForDelete(null);
                                  SetIsAdd(true);
                                  SetIsOpen(true);
                                }}
                              >
                                <BiSolidPlusCircle className="h-8 w-8 text-gray-600 hover:text-blue-600 dark:text-gray-300" />
                              </button>

                              {/* TOOLTIP */}
                              <div className="pointer-events-none invisible absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-gray-800 px-2 py-1 text-[10px] whitespace-nowrap text-white opacity-0 transition group-hover:visible group-hover:opacity-100">
                                Agregar
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </>
            )
          ) : (
            ''
          )}
        </section>

        <div className="mt-8">
          {comisiones?.length > 0 && (
            <h2 className="mb-4 text-lg font-semibold text-gray-700 dark:text-gray-200">
              Comisiones Relacionadas:
            </h2>
          )}

          {comisiones?.length > 0 && (
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {comisiones?.map((comision: any, index: number) => (
                <RoundedRibbon
                  key={index}
                  text={`${comision.detalleComision[0].nombre}`}
                  color="bg-indigo-600"
                  className="p-3"
                >
                  <div className="space-y-1 text-xs">
                    <p>
                      <span className="font-semibold">Competencia: </span>
                      {comision.detalleComision[0].competencia}
                    </p>
                  </div>

                  {/* Botón borrar */}
                  <div className="group absolute right-2 bottom-2">
                    <button
                      type="button"
                      className="absolute right-2 bottom-2 inline-flex items-center justify-center rounded-full p-1 transition hover:bg-red-100 dark:hover:bg-red-900/40"
                      onClick={() => {
                        setSelectedComisionForDelete(comision);
                        setSelectedComision(null);
                        SetIsAdd(false);
                        SetIsOpen(true);
                      }}
                    >
                      <BiTrash className="h-5 w-5 text-red-600 dark:text-red-400" />
                    </button>
                    {/* Tooltip */}
                    <div className="pointer-events-none invisible absolute right-0 bottom-8 rounded bg-gray-800 px-2 py-1 text-[10px] whitespace-nowrap text-white opacity-0 transition group-hover:visible group-hover:opacity-100">
                      Eliminar comisión
                    </div>
                  </div>
                </RoundedRibbon>
              ))}
            </div>
          )}

          {comisiones?.length === 0 && (
            <RoundedRibbon text="Sin resultados" color="bg-gray-500">
              <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                No se encontraron comisiones asociados.
              </p>
            </RoundedRibbon>
          )}
        </div>
      </ComponentCard>
    </>
  );
}
