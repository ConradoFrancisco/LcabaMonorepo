import ComponentCard from '@/components/common/ComponentCard';
import Input from '@/components/form/input/InputField';
import Label from '@/components/form/Label';
import SelectNumber, { OpcionesNumber } from '@/components/form/SelectNumber';
import Button from '@/components/ui/button/Button';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table';
import { ChevronDownIcon, Loader2 } from 'lucide-react';
import { Dispatch, SetStateAction, useState } from 'react';
import LaborService from '../../../../../../services/LaborService';
import RoundedRibbon from '@/components/ui/ribbons/RoundedRibbon';
import { BiSolidPlusCircle, BiTrash } from 'react-icons/bi';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'react-toastify';
import ConfirmationModal, { ParlamentariaOptions } from './modals/ConfirmationModal';
import { IProyecto } from '@/types/postTypes';
import PostService from '../../../../../../services/PostService';

export interface ISancion {
  id_expediente: string;
  nro_de_expediente: string;
  sumario: string;
  sanciontipo: string;
  proyectotipo: string;
}

export interface IExpedienteAvanzado {
  id_expediente: string;
  nro_de_expediente: string;
  fch_inicio: string;
  autor_des: string;
  coautores_des: string;
  autor_id: string;
  coautores_id: string;
  tipo_proyecto_des: string;
  fch_movimiento: string;
  ubicacion_des: string;
  descripcion: string;
  id_proyecto_tipo: string;
  id_business_party: string;
  nro_de_orden_JefeGob: string;
  TieneSancion: string;
  TieneEstadoParlamentario: string;
  sumario: string;
  urlDoc: string;
}

export interface IDespacho {
  id_expediente: string;
  id_despacho: string;
  nro_despacho: string;
  sumario: string;
  TieneSancion: string;
  fch_publicacion: string;
  fch_vencimiento_observaciones: string;
  tipo_proyecto_des: string;
  es_preferencia: string;
  urlDoc: string;
}

export type BusquedaResultado = IExpedienteAvanzado | ISancion | IDespacho;

export default function TabProyectos({
  proyectos,
  setInfoParlamentaria,
  postId,
  table,
}: {
  proyectos: IProyecto[];
  setInfoParlamentaria: Dispatch<SetStateAction<any>>;
  postId: number;
  table: string;
}) {
  const { auth } = useAuth();
  const [isOpen, SetIsOpen] = useState<boolean>(false);
  const [isAdd, SetIsAdd] = useState<boolean>(false);
  const [selectedExpediente, setSelectedExpediente] = useState<BusquedaResultado | null>(null);
  const [selectedProyecto, setSelectedProyecto] = useState<IProyecto | null>(null);
  const [datos, setdatos] = useState<BusquedaResultado[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const ArrayApis = (value: unknown): any[] => {
    if (!value) return [];
    return Array.isArray(value) ? value : [value];
  };

  const [tipo, setTipo] = useState<number | null>(null);
  const [numero, setNumero] = useState<number | null>(null);
  const [anio, setAnio] = useState<number | null>(null);
  const [buscado, setBuscado] = useState(false);
  const [selectKey, setSelectKey] = useState(0);

  const handleBuscar = async () => {
    setIsLoading(true);
    setBuscado(true);
    if (!tipo) {
      toast.warning('Debe seleccionar qué desea buscar.', { theme: 'light' });
      setIsLoading(false);
      return;
    }
    if (numero === null) {
      toast.warning('Debe ingresar un número de expediente, ley, despacho o resolución.', {
        theme: 'light',
      });
      setIsLoading(false);
      return;
    }
    if (tipo !== 3 && anio === null) {
      toast.warning('Debe ingresar un año de expediente, ley, despacho o resolución.', {
        theme: 'light',
      });
      setIsLoading(false);
      return;
    }
    try {
      let respuesta: BusquedaResultado[] = [];

      if (tipo === 1) {
        const datos = await LaborService.GetDespachoNroAno(numero, anio!);
        respuesta = ArrayApis(datos?.ArrayOfDespacho?.despacho);
      } else if (tipo === 2) {
        const datos = await LaborService.getExpedienteByNroyAnio(numero, anio!);
        respuesta = ArrayApis(datos?.ArrayOfExpedienteAvanzado?.expedienteAvanzado);
      } else if (tipo === 3) {
        const datos = await LaborService.GetSancionNroDeLey(numero);
        respuesta = ArrayApis(datos?.ArrayOfSancion?.sancion);
      } else if (tipo === 4) {
        const datos = await LaborService.GetSancionNroOrdenAnoParlamentario(numero, anio!);
        respuesta = ArrayApis(datos?.ArrayOfSancion?.sancion);
      }

      setdatos(respuesta);

      if (respuesta.length === 0) {
        toast.info('No se encontró ningún resultado. Verifique los datos ingresados.', {
          theme: 'light',
        });
      }
    } catch {
      toast.warning('Error al buscar. Intente nuevamente.', { theme: 'light' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAgregarProyecto = async () => {
    try {
      if (!selectedExpediente || !selectedExpediente.id_expediente) {
        toast.warning('Debe seleccionar un expediente antes de agregarlo.', {
          theme: 'light',
        });
        return;
      }

      // Validación por seguridad
      const yaExiste = proyectos?.some(
        (p) => p.detalleExpediente?.id_expediente === selectedExpediente.id_expediente,
      );

      if (yaExiste) {
        toast.info('Este expediente ya está asociado al post.', {
          theme: 'light',
        });
        SetIsOpen(false);
        return;
      }

      const response = await PostService.postExpediente(
        postId,
        Number(selectedExpediente.id_expediente),
        auth.user?.id_user ?? 0,
        table,
      );

      const sel = selectedExpediente as any;
      const detalleOptimista = {
        id_expediente: sel.id_expediente,
        nro_de_expediente: sel.nro_de_expediente ?? sel.nro_despacho ?? '',
        sumario: sel.sumario ?? '',
        autor_des: sel.autor_des ?? '',
        proyecto_tipo_des:
          sel.proyecto_tipo_des ??
          sel.tipo_proyecto_des ??
          sel.proyectotipo ??
          sel.sanciontipo ??
          '',
      };

      const conDetalle = (p: any): IProyecto => ({
        ...p,
        detalleExpediente:
          p?.detalleExpediente && Object.keys(p.detalleExpediente).length > 0
            ? p.detalleExpediente
            : detalleOptimista,
      });

      setInfoParlamentaria((prev: { proyectos: IProyecto[] }) => {
        const prevProyectos: IProyecto[] = prev?.proyectos ?? proyectos ?? [];

        let nuevosProyectos: IProyecto[] = [];

        if (Array.isArray(response.data)) {
          nuevosProyectos = response.data.map(conDetalle);
        } else if (Array.isArray(response.data?.proyectos)) {
          nuevosProyectos = response.data.proyectos.map(conDetalle);
        } else if (response.data) {
          nuevosProyectos = [...prevProyectos, conDetalle(response.data)];
        } else {
          nuevosProyectos = prevProyectos;
        }

        return { ...prev, proyectos: nuevosProyectos };
      });

      setdatos((prev) =>
        prev.filter((item) => item.id_expediente !== selectedExpediente.id_expediente),
      );

      toast.success('Proyecto agregado correctamente', { theme: 'light' });
      SetIsOpen(false);
    } catch {
      toast.error('Error al agregar el proyecto', { theme: 'light' });
    }
  };

  const handleEliminarProyecto = async () => {
    if (!selectedProyecto) {
      toast.warning('No se seleccionó ningún proyecto para eliminar.', {
        theme: 'light',
      });
      return;
    }

    try {
      const response = await PostService.deleteExpediente(
        postId,
        selectedProyecto.detalleExpediente?.id_expediente,
        auth.user?.id_user,
        table,
      );
      setInfoParlamentaria((prev: { proyectos: IProyecto[] }) => {
        const prevProyectos: IProyecto[] = prev?.proyectos ?? proyectos ?? [];
        const nuevosProyectos = prevProyectos.filter(
          (p) => p.id !== (selectedProyecto as IProyecto).id,
        );
        return { ...prev, proyectos: nuevosProyectos };
      });

      toast.success(response.message, { theme: 'light' });
    } catch {
      toast.error('Error al eliminar proyecto.', { theme: 'light' });
    } finally {
      SetIsOpen(false);
      SetIsAdd(false);
      setSelectedProyecto(null);
    }
  };

  const options: OpcionesNumber[] = [
    { value: 1, label: 'Despacho' },
    { value: 2, label: 'Expediente' },
    { value: 3, label: 'Ley' },
    { value: 4, label: 'Resolución' },
  ];

  return (
    <ComponentCard title="Proyectos">
      <ConfirmationModal
        SetIsOpen={SetIsOpen}
        isOpen={isOpen}
        handleRequest={isAdd ? handleAgregarProyecto : handleEliminarProyecto}
        title={
          isAdd
            ? (selectedExpediente as any)?.nro_de_expediente ||
              (selectedExpediente as any)?.nro_despacho
            : selectedProyecto?.detalleExpediente?.nro_de_expediente || ''
        }
        option={ParlamentariaOptions.Proyecto}
        isAdd={isAdd}
      />

      <section className="space-y-6">
        <div className="mb-4">
          <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Buscador</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Tiene que buscar leyes, despachos, expedientes o resoluciones y luego podrá asociarlas
            al expediente.
          </p>
        </div>

        <div className="flex items-end gap-3">
          <div className="flex w-52 flex-col">
            <Label>¿Qué desea buscar?</Label>
            <div className="relative">
              <SelectNumber
                key={selectKey}
                options={options}
                value={tipo ?? undefined}
                onChange={setTipo}
                placeholder="Ley, Despacho, etc."
                className="dark:bg-dark-900"
              />
              <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 dark:text-gray-400">
                <ChevronDownIcon size={18} />
              </span>
            </div>
          </div>

          <div className="flex w-28 flex-col">
            <Label>Número</Label>
            <Input
              type="number"
              required
              value={numero ?? ''}
              placeholder="Número"
              onChange={(e) => setNumero(e.target.value === '' ? null : Number(e.target.value))}
            />
          </div>

          <div className="pb-2 text-xl font-semibold select-none">/</div>

          <div className="group relative flex w-28 flex-col">
            <Label>Año</Label>

            <Input
              type="number"
              required={tipo !== 3}
              value={anio ?? ''}
              onChange={(e) => setAnio(e.target.value === '' ? null : Number(e.target.value))}
              disabled={tipo === 3}
              min={1900}
              max={2100}
              placeholder="Año"
              className="disabled:cursor-not-allowed disabled:opacity-70"
            />

            {tipo === 3 && (
              <div className="absolute top-full left-0 z-10 mt-1 w-56 rounded-md bg-gray-800 px-3 py-2 text-xs text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100">
                Si selecciona Ley, no hace falta colocar año.
              </div>
            )}
          </div>

          <div className="mt-4 flex gap-2">
            <Button onClick={handleBuscar} disabled={isLoading} className="px-6">
              Buscar
            </Button>

            <Button
              onClick={() => {
                setTipo(null);
                setNumero(null);
                setAnio(null);
                setdatos([]);
                setSelectedExpediente(null);
                setSelectedProyecto(null);
                setBuscado(false);
                setSelectKey((prev) => prev + 1);
                setIsLoading(false);
                toast.info('Campos limpiados de la busqueda.', {
                  theme: 'light',
                });
              }}
            >
              Limpiar
            </Button>
          </div>
        </div>

        {buscado && datos.length > 0 ? (
          isLoading ? (
            <div className="flex items-center justify-center">
              <Loader2 className="animate-spin" />
            </div>
          ) : (
            <>
              <h2 className="mb-4 text-lg font-semibold text-gray-700 dark:text-gray-200">
                Resultados Búsqueda:
              </h2>

              <Table className="text-center">
                <TableHeader className="border-y border-gray-100 dark:border-gray-800">
                  <TableRow className="dark:hover:bg-dark-700 border-y border-gray-300 hover:bg-gray-50 dark:border-gray-700">
                    <TableCell className="py-3 text-sm font-extrabold text-gray-500">
                      Nro.
                    </TableCell>
                    <TableCell className="py-3 text-sm font-extrabold text-gray-500">
                      Sumario
                    </TableCell>
                    <TableCell className="py-3 text-sm font-extrabold text-gray-500">
                      Autores
                    </TableCell>
                    <TableCell className="py-3 text-sm font-extrabold text-gray-500">
                      Tipo
                    </TableCell>
                    <TableCell className="py-3 text-sm font-extrabold text-gray-500">
                      Acción
                    </TableCell>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {datos.map((fila: any, index: number) => (
                    <TableRow
                      key={index}
                      className="dark:hover:bg-dark-700 border-y border-gray-300 hover:bg-gray-50 dark:border-gray-700"
                    >
                      <TableCell className="text-theme-xs py-3 font-medium text-gray-500 dark:text-gray-400">
                        {fila.nro_de_expediente ?? fila.nro_despacho ?? fila.id_expediente ?? ''}
                      </TableCell>
                      <TableCell className="text-theme-xs py-3 font-medium text-gray-500 dark:text-gray-400">
                        {fila.sumario ?? ''}
                      </TableCell>
                      <TableCell className="text-theme-xs py-3 font-medium text-gray-500 dark:text-gray-400">
                        {fila.autor_des ?? fila.autor_id ?? ''}
                      </TableCell>
                      <TableCell className="text-theme-xs py-3 font-medium text-gray-500 dark:text-gray-400">
                        {fila.proyecto_tipo_des ??
                          fila.tipo_proyecto_des ??
                          fila.proyectotipo ??
                          fila.sanciontipo ??
                          ''}
                      </TableCell>
                      <TableCell className="text-theme-xs py-3 text-center align-middle font-medium text-gray-500 dark:text-gray-400">
                        <div
                          className="group relative inline-flex items-center justify-center"
                          onClick={() => {
                            if (!fila?.id_expediente) {
                              toast.warning('No se encontró el id del expediente.', {
                                theme: 'light',
                              });
                              return;
                            }

                            const yaExiste = proyectos?.some(
                              (p) => p.detalleExpediente?.id_expediente === fila.id_expediente,
                            );

                            if (yaExiste) {
                              toast.info('Este expediente ya está asociado al post.', {
                                theme: 'light',
                              });
                              return;
                            }
                            setSelectedExpediente(fila);
                            setSelectedProyecto(null);
                            SetIsAdd(true);
                            SetIsOpen(true);
                          }}
                        >
                          <button type="button">
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
          )
        ) : (
          ''
        )}

        <div className="mt-8">
          {proyectos?.length > 0 && (
            <h2 className="mb-4 text-lg font-semibold text-gray-700 dark:text-gray-200">
              Expedientes Relacionados:
            </h2>
          )}

          {proyectos?.length > 0 && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {proyectos?.map((proyecto: IProyecto, index: number) => (
                <RoundedRibbon
                  key={index}
                  text={`Expediente ${proyecto.detalleExpediente?.nro_de_expediente}`}
                  color="bg-indigo-600"
                  className="p-3"
                >
                  <div className="space-y-1 text-xs">
                    <p>
                      <span className="font-semibold">Sumario: : </span>
                      {proyecto.detalleExpediente?.sumario}
                    </p>
                    <p>
                      <span className="font-semibold">Autores: </span>
                      {proyecto.detalleExpediente?.autor_des}
                    </p>
                    <p>
                      <span className="font-semibold">Tipo: </span>
                      {proyecto.detalleExpediente?.proyecto_tipo_des}
                    </p>
                  </div>

                  <div className="group absolute right-2 bottom-2">
                    <button
                      type="button"
                      className="absolute right-2 bottom-2 inline-flex items-center justify-center rounded-full p-1 transition hover:bg-red-100 dark:hover:bg-red-900/40"
                      onClick={() => {
                        setSelectedProyecto(proyecto);
                        setSelectedExpediente(null);
                        SetIsAdd(false);
                        SetIsOpen(true);
                      }}
                    >
                      <BiTrash className="h-5 w-5 text-red-600 dark:text-red-400" />
                    </button>
                    <div className="pointer-events-none invisible absolute right-0 bottom-8 rounded bg-gray-800 px-2 py-1 text-[10px] whitespace-nowrap text-white opacity-0 transition group-hover:visible group-hover:opacity-100">
                      Eliminar proyecto
                    </div>
                  </div>
                </RoundedRibbon>
              ))}
            </div>
          )}

          {proyectos?.length === 0 && (
            <RoundedRibbon text="Sin resultados" color="bg-gray-500">
              <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                No se encontraron proyectos asociados.
              </p>
            </RoundedRibbon>
          )}
        </div>
      </section>
    </ComponentCard>
  );
}
