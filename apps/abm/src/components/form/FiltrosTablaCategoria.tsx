'use client';

import DatePicker from '@/components/form/date-picker';
import SelectStatus from '@/components/form/SelectStatus';
import SelectDestacado from '@/components/form/SelectDestacado';
import { Dispatch, SetStateAction, useState } from 'react';
import Button from '../ui/button/Button';
import Label from './Label';
import { ChevronDown, ChevronUp } from 'lucide-react';

export type FiltrosCategoriaState = {
  search?: string;
  fechaDesde?: string;
  fechaHasta?: string;
  status?: string;
  destacado?: number;
};

interface IFilterCategoriaProps {
  filtros: FiltrosCategoriaState;
  setFiltros: Dispatch<SetStateAction<FiltrosCategoriaState>>;
  setFlag: Dispatch<SetStateAction<boolean>>;
  setOffset: Dispatch<SetStateAction<number>>;
}

export default function FiltrosTablaCategoria({
  filtros,
  setFiltros,
  setFlag,
  setOffset,
}: IFilterCategoriaProps) {
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [localSearch, setLocalSearch] = useState<string>(filtros.search || '');

  const handleBuscar = () => {
    setOffset(0);
    setFiltros((prev) => ({ ...prev, search: localSearch }));
    setFlag((f) => !f);
  };

  const handleLimpiar = () => {
    setOffset(0);
    setLocalSearch('');
    setFiltros({
      search: '',
      fechaDesde: '',
      fechaHasta: '',
      status: '',
      destacado: undefined,
    });
    setFlag((f) => !f);
  };

  return (
    <div className="mb-6 space-y-5">
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
                <input
                  type="text"
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleBuscar()}
                  placeholder="Buscar por título"
                  className="shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/10 dark:focus:border-brand-800 h-11 w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 hover:cursor-pointer focus:ring-3 focus:outline-hidden xl:w-[230px] dark:border-gray-800 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
                />
              </div>

              {/* Fecha desde */}
              <div className="flex w-[150px] flex-col gap-1.5">
                <Label className="text-xs font-semibold uppercase">Fecha Desde</Label>
                <DatePicker
                  id="fechaDesdeCategoria"
                  value={filtros.fechaDesde ?? ''}
                  placeholder="dd/mm/aaaa"
                  onChange={(_d, s) =>
                    setFiltros((prev) => ({ ...prev, fechaDesde: s }))
                  }
                />
              </div>

              {/* Fecha hasta */}
              <div className="flex w-[150px] flex-col gap-1.5">
                <Label className="text-xs font-semibold uppercase">Fecha Hasta</Label>
                <DatePicker
                  id="fechaHastaCategoria"
                  value={filtros.fechaHasta ?? ''}
                  placeholder="dd/mm/aaaa"
                  onChange={(_d, s) =>
                    setFiltros((prev) => ({ ...prev, fechaHasta: s }))
                  }
                />
              </div>

              {/* Status */}
              <div className="flex flex-col gap-1.5">
                <Label className="text-xs font-semibold uppercase">Status</Label>
                <SelectStatus
                  value={filtros.status ?? ''}
                  onChange={(val) => setFiltros((prev) => ({ ...prev, status: val }))}
                />
              </div>

              {/* Destacado */}
              <div className="flex flex-col gap-1.5">
                <Label className="text-xs font-semibold uppercase">Destacado</Label>
                <SelectDestacado
                  value={filtros.destacado?.toString() ?? ''}
                  onChange={(val) =>
                    setFiltros((prev) => ({
                      ...prev,
                      destacado: val ? Number(val) : undefined,
                    }))
                  }
                />
              </div>

              {/* Botones */}
              <div className="flex gap-2 self-end">
                <Button onClick={handleBuscar} className="px-6">
                  Buscar
                </Button>
                <Button onClick={handleLimpiar}>Limpiar</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
