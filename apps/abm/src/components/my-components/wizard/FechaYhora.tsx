import ComponentCard from '@/components/common/ComponentCard';
import { ChangeEvent, useEffect, useState, useCallback } from 'react';
import Select from '@/components/form/Select';
import DatePicker from '@/components/form/date-picker';
import Switch from '@/components/form/switch/Switch';
import Label from '@/components/form/Label';
import Input from '@/components/form/input/InputField';
import { Trash2 } from 'lucide-react';
import { TimeIcon } from '@/icons';
import { IDia } from '@/types/postTypes';

interface DiaLinea extends Partial<IDia> {
  id: number;
  dia: string;
  desde: string;
  date: string;
  hasta: string;
  descripcion: string;
  new?: boolean;
}
import { toast } from 'react-toastify';
import DebugInfo from '@/app/developComponent/DebugInfo';

export default function FechaYhora({
  lineas,
  date_ini,
  date_end,
  setLineas,
  setdateIni,
  setdateEnd,
}: {
  lineas: IDia[];
  date_ini: string | null;
  date_end: string | null;
  setLineas: React.Dispatch<React.SetStateAction<IDia[]>>;
  setdateIni?: (val: string | null) => void;
  setdateEnd?: (val: string | null) => void;
}) {
  // estado para validación de rango de fechas
  const [fechaError, setFechaError] = useState<string>('');
  const [dateIniRango, setdateIniRango] = useState<string>(date_ini || '');
  const [dateEndRango, setdateEndRango] = useState<string>(date_end || '');

  const diasSemana = [
    { value: '0', label: 'Domingo' },
    { value: '1', label: 'Lunes' },
    { value: '2', label: 'Martes' },
    { value: '3', label: 'Miércoles' },
    { value: '4', label: 'Jueves' },
    { value: '5', label: 'Viernes' },
    { value: '6', label: 'Sábado' },
    { value: '7', label: 'Lunes a viernes' },
    { value: '8', label: 'Fecha calendario' },
  ];

  const agregarLinea = () => {
    if (lineas.length >= 7) {
      toast.error('Solo se pueden agregar hasta 7 días.', {
        autoClose: 3000,
      });
      return;
    }

    setLineas((prev) => [
      ...prev,
      {
        id: Date.now(),
        dia: '',
        desde: '',
        date: '',
        hasta: '',
        descripcion: '',
        new: true,
        fecha_article: '',
        fk_idpost: 0,
        day: '',
        iduser_ins: 0,
        date_ins: new Date().toISOString(),
        hour_start: null,
        hour_end: null,
        date_desc: null,
        status: { type: 'Buffer', data: [] },
        iduser_upd: null,
        date_upd: null,
      } as IDia,
    ]);
  };

  const updateLinea = (id: number, field: keyof DiaLinea, value: string) => {
    setLineas((prev) =>
      prev.map((linea) => (linea.id === id ? { ...linea, [field]: value } : linea)),
    );
  };

  const borrarLinea = (id: number) => {
    setLineas((prev) => prev.filter((linea) => linea.id !== id));
  };

  const toYMD = (d: Date | undefined): string => {
    if (!d) return '';
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  };

  const parseFechaFlexible = (s: string): Date | null => {
    if (!s) return null;

    // cortar hora si viene "2025-10-31T00:00:00"
    const soloFecha = s.split('T')[0];
    const partes = soloFecha.split('-').map(Number);
    if (partes.length !== 3 || partes.some((n) => Number.isNaN(n))) {
      return null;
    }

    const [a, b, c] = partes;

    let dia: number;
    let mes: number;
    let anio: number;

    // si el primer número es > 31 asumimos yyyy-mm-dd
    if (a > 31) {
      // yyyy-mm-dd
      anio = a;
      mes = b;
      dia = c;
    } else {
      // dd-mm-yyyy
      dia = a;
      mes = b;
      anio = c;
    }

    if (!dia || !mes || !anio) return null;

    return new Date(Date.UTC(anio, mes - 1, dia, 0, 0, 0));
  };

  const validarRangoFechas = useCallback((desde: string, hasta: string) => {
    const dia1 = parseFechaFlexible(desde);
    const dia2 = parseFechaFlexible(hasta);
    if (dia1 && dia2 && dia2 < dia1) {
      setFechaError("La fecha 'Hasta' no puede ser anterior a 'Desde'.");
    } else {
      setFechaError('');
    }
  }, []);

  useEffect(() => {
    if (dateIniRango || dateEndRango) {
      validarRangoFechas(dateIniRango, dateEndRango);
    }
  }, [dateIniRango, dateEndRango]);

  return (
    <ComponentCard title="Fechas y Horarios">
      <div className="flex flex-col">
        {/* Rango de fechas + switch */}
        <form className="mb-4 flex items-start gap-6">
          <div className="flex flex-col">
            <DatePicker
              value={dateIniRango}
              id="date-picker-desde"
              label="Desde"
              placeholder="Fecha inicio"
              onChange={(selectedDates) => {
                const ymd = toYMD(selectedDates[0]);
                setdateIniRango(ymd);
                if (setdateIni) setdateIni(ymd);
                validarRangoFechas(ymd, dateEndRango);
              }}
            />
          </div>

          <div className="flex flex-col">
            <DatePicker
              value={dateEndRango}
              id="date-picker-hasta"
              label="Hasta"
              placeholder="Fecha fin"
              onChange={(selectedDates) => {
                const ymd = toYMD(selectedDates[0]);
                setdateEndRango(ymd);
                if (setdateEnd) setdateEnd(ymd);
                validarRangoFechas(dateIniRango, ymd);
              }}
            />
            {fechaError && (
              <span className="mt-1 text-sm text-red-600" role="alert">
                {fechaError}
              </span>
            )}
          </div>

          <div className="ml-50 flex min-w-[150px] flex-col">
            <Switch label="Habilitado" defaultChecked={false} />
          </div>
        </form>

        {/* Agregar líneas */}
        <div className="rounded-lg">
          <h2 className="mb-3">Días del evento</h2>
          <button
            type="button"
            onClick={agregarLinea}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white shadow hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
            disabled={!!fechaError || lineas.length >= 7}
            title={
              fechaError
                ? 'Hasta no corregir rango de fechas no se puede agregar días.'
                : lineas.length >= 7
                  ? 'Solo se pueden agregar hasta 7 días.'
                  : ''
            }
          >
            + Agregar día
          </button>
        </div>

        {/* Líneas post boton agregar lineas */}
        <div className="mt-4 space-y-3">
          {lineas.map((linea) => (
            <div
              key={linea.id}
              className="dark:bg-dark-900/40 flex flex-wrap items-end gap-3 rounded-lg bg-gray-50 p-3 md:flex-nowrap"
            >
              {/* Día */}
              <div className="flex w-full flex-col md:w-48">
                <label className="mb-1 text-sm font-medium">Día</label>
                <Select
                  options={diasSemana}
                  value={linea.dia || ''}
                  placeholder="Seleccionar día"
                  className="dark:bg-dark-900 h-10"
                  onChange={(val: string) => {
                    updateLinea(linea.id, 'dia', val);
                    // Si el nuevo día no es "Fecha calendario", limpiar la fecha seleccionada
                    if (val !== '8') {
                      updateLinea(linea.id, 'date', '');
                    }
                  }}
                />
              </div>

              {/* Desde */}
              <div className="flex w-full flex-col md:w-36">
                <Label htmlFor={`tm-desde-${linea.id}`}>Hora inicio</Label>
                <div className="relative">
                  <Input
                    defaultValue={linea.desde}
                    type="time"
                    id={`tm-desde-${linea.id}`}
                    name={`tm-desde-${linea.id}`}
                    onChange={(evento: ChangeEvent<HTMLInputElement>) =>
                      updateLinea(linea.id, 'desde', evento.target.value)
                    }
                  />
                  <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 dark:text-gray-400">
                    <TimeIcon />
                  </span>
                </div>
              </div>

              {/* Hasta */}
              <div className="flex w-full flex-col md:w-36">
                <Label htmlFor={`tm-hasta-${linea.id}`}>Hora fin</Label>
                <div className="relative">
                  <Input
                    type="time"
                    id={`tm-hasta-${linea.id}`}
                    name={`tm-hasta-${linea.id}`}
                    defaultValue={linea.hasta}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      updateLinea(linea.id, 'hasta', e.target.value)
                    }
                  />
                  <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 dark:text-gray-400">
                    <TimeIcon />
                  </span>
                </div>
              </div>

              {/* Fecha calendario */}
              <div className="flex w-full flex-col md:w-36">
                <DatePicker
                  disabled={linea.dia !== '8'}
                  value={linea.date || ''}
                  id={`date-picker-fechaCalendario-${linea.id}`}
                  label="Fecha Calendario"
                  placeholder="Fecha"
                  onChange={(selectedDates) => {
                    updateLinea(linea.id, 'date', toYMD(selectedDates[0]));
                  }}
                />
              </div>

              {/* Descripción */}
              <div className="flex min-w-[180px] flex-1 flex-col">
                <Label>Descripción (máx. 100 caracteres)</Label>
                <Input
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    updateLinea(linea.id, 'descripcion', e.target.value)
                  }
                  type="text"
                  defaultValue={linea.descripcion}
                  placeholder="Breve descripción"
                  className="h-10"
                  maxLength={100}
                />
              </div>

              {/* Icono borrar */}
              <div className="flex md:justify-end">
                <button
                  type="button"
                  onClick={() => borrarLinea(linea.id)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-red-200 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                  title="Borrar"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ComponentCard>
  );
}
