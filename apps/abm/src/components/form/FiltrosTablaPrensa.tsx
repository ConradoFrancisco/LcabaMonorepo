// Lcaba-Admin\src\components\form\FiltrosTablaPrensa.tsx
// Aclaraciones:
// -El usuario al colocar rangos en los filtros "fecha hasta" y "fecha desde", van a compararse en la BBDD con el campo "date_ins".

'use client';

import Search from '@/components/my-components/Search';
import DatePicker from '@/components/form/date-picker';
import MultiSelect from '@/components/form/MultiSelect';
import SelectStatus from '@/components/form/SelectStatus';
import SelectTipo from '@/components/form/SelectTipo';
import SelectDestacado from '@/components/form/SelectDestacado';
import { Dispatch, SetStateAction, useState } from 'react';
import Button from '../ui/button/Button';
import Label from './Label';
import { ChevronDown, ChevronUp } from 'lucide-react';
import DebugInfo from '@/app/developComponent/DebugInfo';

export type FiltrosState = {
  search?: string;
  fechaDesde?: string;
  fechaHasta?: string;
  categorias?: number[];
  status?: string;
  tipo?: number;
  destacado?: number;
};

interface IFilterProps {
  categorias: any[];
  filtros: FiltrosState;
  setFiltros: Dispatch<SetStateAction<FiltrosState>>;
  types: any[];
  setFlag: Dispatch<SetStateAction<boolean>>;
  setOffset: Dispatch<SetStateAction<number>>;
}

export default function FiltrosTablaPrensa({
  categorias = [],
  filtros,
  setFiltros,
  types = [],
  setFlag,
  setOffset,
}: IFilterProps) {
  // Convertimos las categorías que vienen del backend al formato que necesita el componente MultiSelect
  const categoriasOptions = categorias.map((categoria) => {
    // Guardamos el id de la categoría como string (el MultiSelect trabaja con strings)
    const id = String(categoria.fk_id);

    // Devolvemos el objeto que usa el MultiSelect
    return {
      value: id,
      text: categoria.title,
      selected: filtros.categorias?.includes(Number(id)) || false,
    };
  });

  const handleLimpiar = () => {
    setOffset(0);
    setFlag((prev) => !prev);
    setFiltros((prev) => ({
      ...prev,
      search: '',
      fechaDesde: '',
      fechaHasta: '',
      categorias: [],
      status: '',
      tipo: undefined,
      destacado: undefined,
    }));
  };

  const setSearch: Dispatch<SetStateAction<string>> = (value) =>
    setFiltros((prev) => ({
      ...prev,
      search: value as string,
    }));

  const setFechaDesde = (value: string) =>
    setFiltros((prev) => ({
      ...prev,
      fechaDesde: value,
    }));

  const setFechaHasta = (value: string) =>
    setFiltros((prev) => ({
      ...prev,
      fechaHasta: value,
    }));

  const setStatus = (stat: string) => {
    setFiltros((prev) => ({ ...prev, status: stat }));
  };

  const setTipo = (t: string) => {
    setFiltros((prev) => ({ ...prev, tipo: t ? Number(t) : undefined }));
  };

  const setDestacado = (dest: string) => {
    setFiltros((prev) => ({
      ...prev,
      destacado: dest ? Number(dest) : undefined,
    }));
  };

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showFilters, setShowFilters] = useState<boolean>(false);

  const handleBuscar = () => {
    setOffset(0);
    setFlag((flag) => !flag);
  };

  return (
    <div className="mb-6 space-y-5">
      {/* Filtros */}
      <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 transition-all duration-200 dark:border-gray-700 dark:bg-gray-800">
        <div
          className="flex cursor-pointer items-center justify-between"
          onClick={() => setShowFilters(!showFilters)}
        >
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Filtros</h2>
          <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            {showFilters ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>

        {showFilters && (
          <div className="animate-fadeIn mt-4">
            <div className="flex flex-wrap items-end gap-3">
              {/* Buscador */}
              <div className="flex flex-col gap-1.5">
                <Label className="text-xs font-semibold uppercase">Buscador</Label>
                <Search
                  setSearch={setSearch}
                  tipo="publicaciones"
                  setOffset={() => {}}
                  variant="filters"
                  value={filtros.search}
                />
              </div>
              {/* Fecha desde */}
              <div className="flex w-[150px] flex-col gap-1.5">
                <Label className="text-xs font-semibold uppercase">Fecha Desde </Label>
                <DatePicker
                  id="fechaDesde"
                  value={filtros.fechaDesde ?? ''}
                  placeholder="dd/mm/aaaa"
                  onChange={(d, s) => setFechaDesde(s)}
                />
              </div>

              {/* Fecha hasta */}
              <div className="flex w-[150px] flex-col gap-1.5">
                <Label className="text-xs font-semibold uppercase">Fecha Hasta</Label>
                <DatePicker
                  id="fechaHasta"
                  value={filtros.fechaHasta ?? ''}
                  placeholder="dd/mm/aaaa"
                  onChange={(d, s) => setFechaHasta(s)}
                />
              </div>

              {/* Status */}
              <div className="flex flex-col gap-1.5">
                <Label className="text-xs font-semibold uppercase">Status</Label>
                <SelectStatus value={filtros.status ?? ''} onChange={(val) => setStatus(val)} />
              </div>

              {/* Tipo */}
              <div className="flex flex-col gap-1.5">
                <Label className="text-xs font-semibold uppercase">Tipo</Label>
                <SelectTipo
                  value={filtros.tipo?.toString() ?? ''}
                  onChange={(val) => setTipo(val)}
                  opciones={types}
                />
              </div>

              {/* Destacado */}
              <div className="flex flex-col gap-1.5">
                <Label className="text-xs font-semibold uppercase">Destacado</Label>
                <SelectDestacado
                  value={filtros.destacado?.toString() ?? ''}
                  onChange={(val) => setDestacado(val)}
                />
              </div>

              {/* Botones */}
              <div className="flex gap-2 self-end">
                <Button onClick={handleBuscar} disabled={isLoading} className="px-6">
                  Buscar
                </Button>

                <Button
                  onClick={() => {
                    handleLimpiar();
                  }}
                >
                  Limpiar
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
