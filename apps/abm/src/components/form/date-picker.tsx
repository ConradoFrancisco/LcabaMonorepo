import { useEffect, useMemo, useRef } from 'react';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.css';
import { Spanish } from 'flatpickr/dist/l10n/es.js';
import Label from './Label';
import { CalenderIcon } from '../../icons';
import Hook = flatpickr.Options.Hook;
import DateOption = flatpickr.Options.DateOption;

// Se usa un objeto Date (no un string) para que flatpickr no lo parsee con
// el dateFormat configurado ('d-m-Y'), lo cual rompía el valor real de 1900.
const DEFAULT_MIN_DATE: DateOption = new Date(1900, 0, 1);
// El maxDate se calcula en base al año actual (no hardcodeado) para que
// el rango se corra solo con el paso de los años.
const YEARS_AHEAD_ALLOWED = 5;

type PropsType = {
  id: string;
  mode?: 'single' | 'multiple' | 'range' | 'time';
  onChange?: Hook | Hook[];
  defaultDate?: DateOption;
  minDate?: DateOption;
  maxDate?: DateOption;
  label?: string;
  placeholder?: string;
  value: string;
  disabled?: boolean;
  className?: string;
};

export default function DatePicker({
  id,
  mode,
  onChange,
  value,
  label,
  defaultDate,
  minDate = DEFAULT_MIN_DATE,
  maxDate,
  placeholder,
  disabled = false,
  className = '',
}: PropsType) {
  const flatpickrRef = useRef<flatpickr.Instance | null>(null);
  const onChangeRef = useRef(onChange);

  // Se recalcula solo cuando cambia la prop maxDate para no crear un Date
  // nuevo en cada render (rompería la referencia usada en las deps del efecto).
  const resolvedMaxDate = useMemo(
    () => maxDate ?? new Date(new Date().getFullYear() + YEARS_AHEAD_ALLOWED, 11, 31),
    [maxDate],
  );

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    const flatPickr = flatpickr(`#${id}`, {
      mode: mode || 'single',
      static: true,
      monthSelectorType: 'static',
      dateFormat: 'd-m-Y',
      defaultDate,
      minDate,
      maxDate: resolvedMaxDate,
      onChange: (selectedDates, dateStr, instance) => {
        // Call the latest onChange callback
        if (onChangeRef.current) {
          if (Array.isArray(onChangeRef.current)) {
            onChangeRef.current.forEach((fn) => fn(selectedDates, dateStr, instance));
          } else {
            onChangeRef.current(selectedDates, dateStr, instance);
          }
        }
      },
      locale: Spanish,
      onReady: (_selectedDates, _dateStr, instance) => {
        const todayButton = document.createElement('button');
        todayButton.type = 'button';
        todayButton.textContent = 'Hoy';
        todayButton.className =
          'text-brand-500 hover:text-brand-600 dark:text-brand-400 mt-4 w-full border-t border-gray-200 pt-3 text-center text-sm font-medium dark:border-gray-800';
        todayButton.addEventListener('click', () => {
          instance.setDate(new Date(), true);
          instance.close();
        });
        instance.calendarContainer.appendChild(todayButton);
      },
    });

    flatpickrRef.current = Array.isArray(flatPickr) ? null : flatPickr;

    // El input de año es un <input type="number"> con min/max seteados por
    // flatpickr en base a minDate/maxDate. El navegador no bloquea el tipeo
    // de un valor fuera de rango, así que avisamos con el mensaje nativo al
    // salir del campo (flatpickr, por su lado, ya ignora la navegación a un
    // año inválido).
    const yearElement = !Array.isArray(flatPickr) ? flatPickr.currentYearElement : undefined;
    const handleYearBlur = () => {
      if (yearElement && !yearElement.checkValidity()) {
        yearElement.reportValidity();
      }
    };
    yearElement?.addEventListener('blur', handleYearBlur);

    return () => {
      yearElement?.removeEventListener('blur', handleYearBlur);
      if (!Array.isArray(flatPickr)) {
        flatPickr.destroy();
      }
    };
  }, [mode, id, defaultDate, minDate, resolvedMaxDate]); // Removed onChange from dependencies

  // Update flatpickr when value prop changes
  useEffect(() => {
    if (flatpickrRef.current) {
      if (value) {
        const isIso = /^\d{4}-\d{2}-\d{2}/.test(value);
        flatpickrRef.current.setDate(value, false, isIso ? 'Y-m-d' : 'd-m-Y');
      } else {
        flatpickrRef.current.clear();
      }
    }
  }, [value]);

  return (
    <div>
      {label && <Label htmlFor={id}>{label}</Label>}

      <div className="relative">
        <input
          disabled={disabled}
          id={id}
          defaultValue={value}
          placeholder={placeholder}
          className={`shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/20 dark:focus:border-brand-800 h-10 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-3 py-2 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 ${className}`}
        />

        <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 dark:text-gray-400">
          <CalenderIcon className="size-6" />
        </span>
      </div>
    </div>
  );
}
