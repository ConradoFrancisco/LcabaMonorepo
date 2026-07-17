import ComponentCard from '@/components/common/ComponentCard';
import Input from '@/components/form/input/InputField';
import Label from '@/components/form/Label';
import Button from '@/components/ui/button/Button';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table';
import RoundedRibbon from '@/components/ui/ribbons/RoundedRibbon';
import { Loader2 } from 'lucide-react';
import { Dispatch, SetStateAction, useState } from 'react';
import { toast } from 'react-toastify';
import { BiSolidPlusCircle, BiTrash } from 'react-icons/bi';
import LaborService from '../../../../../../services/LaborService';
import { useAuth } from '@/context/AuthContext';
import ConfirmationModal, { ParlamentariaOptions } from './modals/ConfirmationModal';
import PostService from '../../../../../../services/PostService';

interface IDiputado {
  id_legislador: string;
  apellido: string;
  nombre: string;
  cantidad_exptes_autor: string;
  cantidad_exptes_coautor: string;
}

export default function TabLegisladores({
  legisladores,
  setInfoParlamentaria,
  postId,
  table,
}: {
  legisladores: any[];
  setInfoParlamentaria: Dispatch<SetStateAction<any>>;
  postId: number;
  table: string;
}) {
  const { auth } = useAuth();

  const [query, setQuery] = useState('');
  const [datos, setDatos] = useState<IDiputado[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [buscado, setBuscado] = useState(false);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isAdd, setIsAdd] = useState<boolean>(false);
  const [legislador, setLegislador] = useState<IDiputado | null>(null);
  const [legisladorAEliminar, setLegisladorAEliminar] = useState<any | null>(null);

  const handleBuscar = async () => {
    if (!query) {
      toast.warning('Ingrese un nombre para buscar.', { theme: 'light' });
      return;
    }
    setIsLoading(true);
    setBuscado(true);
    try {
      const respuesta = await LaborService.getDiputados(query);
      const lista: IDiputado[] = Array.isArray(respuesta) ? respuesta : [];
      setDatos(lista);
      if (lista.length === 0) {
        toast.info('No se encontró ningún legislador con ese nombre.', {
          theme: 'light',
        });
      }
    } catch {
      toast.warning('Error al buscar. Intente nuevamente.', { theme: 'light' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLimpiar = () => {
    setQuery('');
    setDatos([]);
    setBuscado(false);
    toast.info('Campos limpiados.', { theme: 'light' });
  };

  const handleAgregarLegislador = async () => {
    if (!legislador?.id_legislador) {
      toast.error('No se pudo identificar el ID del legislador.', {
        theme: 'light',
      });
      return;
    }

    try {
      const yaExiste = legisladores?.some(
        (l) =>
          String(l.legislador_id ?? l.detalleLegislador?.id_legislador) ===
          String(legislador.id_legislador),
      );

      if (yaExiste) {
        toast.info('Este legislador ya está asociado al post.', {
          theme: 'light',
        });
        setIsOpen(false);
        return;
      }

      const response = await PostService.PostLegislador(
        postId,
        legislador.id_legislador,
        auth.user?.id_user,
        table,
      );

      setInfoParlamentaria((prev: any) => {
        const nuevosLegisladores = response?.data?.data ?? [
          ...(prev?.legisladores ?? []),
          { ...legislador },
        ];
        return { ...prev, legisladores: nuevosLegisladores };
      });

      toast.success('Legislador agregado correctamente.', { theme: 'light' });
      setQuery('');
      setDatos([]);
      setBuscado(false);
    } catch (error) {
      console.error('Error en handleAgregarLegislador:', error);
      toast.error('Error al agregar el legislador.', { theme: 'light' });
    } finally {
      setIsOpen(false);
      setIsAdd(false);
      setLegislador(null);
    }
  };

  const handleEliminarLegislador = async () => {
    if (!legisladorAEliminar) {
      toast.warning('No se seleccionó ningún legislador para eliminar.', {
        theme: 'light',
      });
      return;
    }
    try {
      const legisladorId = legisladorAEliminar.legislador_id;

      const response = await PostService.deleteLegislador(
        postId,
        legisladorId,
        auth.user?.id_user,
        table,
      );

      if (response?.data?.success === false) {
        toast.error(response.data.message ?? 'Error al eliminar el legislador.', {
          theme: 'light',
        });
        return;
      }

      setInfoParlamentaria((prev: any) => {
        const nuevosLegisladores =
          response?.data?.data ??
          (prev?.legisladores ?? []).filter(
            (l: any) => String(l.legislador_id) !== String(legisladorId),
          );
        return { ...prev, legisladores: nuevosLegisladores };
      });

      toast.success('Legislador eliminado correctamente.', { theme: 'light' });
    } catch {
      toast.error('Error al eliminar el legislador.', { theme: 'light' });
    } finally {
      setIsOpen(false);
      setIsAdd(false);
      setLegisladorAEliminar(null);
    }
  };

  return (
    <ComponentCard title="Legisladores">
      <ConfirmationModal
        SetIsOpen={setIsOpen}
        isOpen={isOpen}
        handleRequest={isAdd ? handleAgregarLegislador : handleEliminarLegislador}
        title={
          isAdd
            ? `${legislador?.apellido ?? ''}, ${legislador?.nombre ?? ''}`
            : `${legisladorAEliminar?.detalleLegislador?.apellido ?? ''}, ${
                legisladorAEliminar?.detalleLegislador?.nombre ?? ''
              }`
        }
        option={ParlamentariaOptions.Legislador}
        isAdd={isAdd}
      />

      <section className="space-y-6">
        <div className="mb-4">
          <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Buscador</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Tiene que buscar los legisladores y luego podrá asociarlos al expediente.
          </p>
        </div>

        <div className="flex items-end gap-3">
          <div className="flex w-80 flex-col">
            <Label>Nombre del legislador/a</Label>
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ej. Juan Perez"
            />
          </div>
          <div className="mt-4 flex gap-2">
            <Button onClick={handleBuscar} disabled={isLoading} className="px-6">
              Buscar
            </Button>
            <Button onClick={handleLimpiar} disabled={isLoading}>
              Limpiar
            </Button>
          </div>
        </div>

        {/* Resultados de búsqueda */}
        {buscado &&
          (isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="animate-spin text-gray-500" size={32} />
            </div>
          ) : datos.length > 0 ? (
            <>
              <h2 className="mb-4 text-lg font-semibold text-gray-700 dark:text-gray-200">
                Resultados Búsqueda:
              </h2>
              <Table className="text-center">
                <TableHeader className="border-y border-gray-100 dark:border-gray-800">
                  <TableRow className="dark:hover:bg-dark-700 border-y border-gray-300 hover:bg-gray-50 dark:border-gray-700">
                    <TableCell className="py-3 text-left text-sm font-extrabold text-gray-500">
                      Apellido
                    </TableCell>
                    <TableCell className="py-3 text-left text-sm font-extrabold text-gray-500">
                      Nombre
                    </TableCell>
                    <TableCell className="py-3 text-sm font-extrabold text-gray-500">
                      Exptes. Autor
                    </TableCell>
                    <TableCell className="py-3 text-sm font-extrabold text-gray-500">
                      Exptes. Coautor
                    </TableCell>
                    <TableCell className="py-3 text-sm font-extrabold text-gray-500">
                      Acción
                    </TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {datos.map((fila, index) => (
                    <TableRow
                      key={index}
                      className="dark:hover:bg-dark-700 border-y border-gray-300 hover:bg-gray-50 dark:border-gray-700"
                    >
                      <TableCell className="text-theme-xs py-3 text-left font-medium text-gray-500 dark:text-gray-400">
                        {fila.apellido}
                      </TableCell>
                      <TableCell className="text-theme-xs py-3 text-left font-medium text-gray-500 dark:text-gray-400">
                        {fila.nombre}
                      </TableCell>
                      <TableCell className="text-theme-xs py-3 font-medium text-gray-500 dark:text-gray-400">
                        {fila.cantidad_exptes_autor}
                      </TableCell>
                      <TableCell className="text-theme-xs py-3 font-medium text-gray-500 dark:text-gray-400">
                        {fila.cantidad_exptes_coautor}
                      </TableCell>
                      <TableCell className="text-theme-xs py-3 text-center font-medium text-gray-500 dark:text-gray-400">
                        <div className="group relative inline-flex items-center justify-center">
                          <button
                            type="button"
                            onClick={() => {
                              setLegislador(fila);
                              setLegisladorAEliminar(null);
                              setIsAdd(true);
                              setIsOpen(true);
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
            </>
          ) : null)}

        {/* Legisladores ya vinculados */}
        <div className="mt-8">
          {legisladores?.length > 0 ? (
            <>
              <h2 className="mb-4 text-lg font-semibold text-gray-700 dark:text-gray-200">
                Legisladores Relacionados:
              </h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {legisladores.map((leg: any, index: number) => {
                  const detalle = leg.detalleLegislador ?? leg;
                  return (
                    <RoundedRibbon
                      key={index}
                      text={`${detalle.apellido}, ${detalle.nombre}`}
                      color="bg-indigo-600"
                      className="p-3"
                    >
                      <div className="mt-1 space-y-1 text-xs">
                        <p>
                          <span className="font-semibold">Bloque: </span>
                          {detalle.bloque}
                        </p>
                        <p>
                          <span className="font-semibold">Fecha de fin de mandato: </span>
                          {detalle.fecha_fin_mandato}
                        </p>
                        <p>
                          <span className="font-semibold">Exptes. como autor: </span>
                          {detalle.cantidad_exptes_autor}
                        </p>
                        <p>
                          <span className="font-semibold">Exptes. como coautor: </span>
                          {detalle.cantidad_exptes_coautor}
                        </p>
                      </div>
                      <div className="group absolute right-2 bottom-2">
                        <button
                          type="button"
                          className="inline-flex items-center justify-center rounded-full p-1 transition hover:bg-red-100 dark:hover:bg-red-900/40"
                          onClick={() => {
                            setLegisladorAEliminar(leg);
                            setLegislador(null);
                            setIsAdd(false);
                            setIsOpen(true);
                          }}
                        >
                          <BiTrash className="h-5 w-5 text-red-600 dark:text-red-400" />
                        </button>
                        <div className="pointer-events-none invisible absolute right-0 bottom-8 rounded bg-gray-800 px-2 py-1 text-[10px] whitespace-nowrap text-white opacity-0 transition group-hover:visible group-hover:opacity-100">
                          Eliminar legislador
                        </div>
                      </div>
                    </RoundedRibbon>
                  );
                })}
              </div>
            </>
          ) : (
            <RoundedRibbon text="Sin resultados" color="bg-gray-500">
              <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                No se encontraron legisladores asociados.
              </p>
            </RoundedRibbon>
          )}
        </div>
      </section>
    </ComponentCard>
  );
}
