"use client";

import { useEffect, useMemo, useRef } from "react";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.css";
import { Spanish } from "flatpickr/dist/l10n/es.js";
import Hook = flatpickr.Options.Hook;
import DateOption = flatpickr.Options.DateOption;

const DEFAULT_MIN_DATE: DateOption = new Date(1900, 0, 1);
const YEARS_AHEAD_ALLOWED = 5;

type DatePickerProps = {
  id: string;
  label: string;
  value: string;
  placeholder?: string;
  minDate?: DateOption;
  maxDate?: DateOption;
  onChange: Hook;
};

export default function DatePicker({
  id,
  label,
  value,
  placeholder = "dd/mm/aaaa",
  minDate = DEFAULT_MIN_DATE,
  maxDate,
  onChange,
}: DatePickerProps) {
  const flatpickrRef = useRef<flatpickr.Instance | null>(null);
  const onChangeRef = useRef(onChange);

  // El maxDate se calcula en base al año actual para que el rango se corra
  // solo con el paso de los años (igual que el DatePicker admin).
  const resolvedMaxDate = useMemo(
    () => maxDate ?? new Date(new Date().getFullYear() + YEARS_AHEAD_ALLOWED, 11, 31),
    [maxDate],
  );

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    const instance = flatpickr(`#${id}`, {
      mode: "single",
      static: true,
      monthSelectorType: "static",
      dateFormat: "d-m-Y",
      minDate,
      maxDate: resolvedMaxDate,
      locale: Spanish,
      onChange: (selectedDates, dateStr, inst) => {
        onChangeRef.current?.(selectedDates, dateStr, inst);
      },
    });

    flatpickrRef.current = Array.isArray(instance) ? null : instance;

    return () => {
      if (!Array.isArray(instance)) instance.destroy();
    };
  }, [id, minDate, resolvedMaxDate]);

  // Sincroniza el valor externo (por ejemplo, al limpiar filtros) con flatpickr.
  useEffect(() => {
    if (!flatpickrRef.current) return;
    if (value) {
      const isIso = /^\d{4}-\d{2}-\d{2}/.test(value);
      flatpickrRef.current.setDate(value, false, isIso ? "Y-m-d" : "d-m-Y");
    } else {
      flatpickrRef.current.clear();
    }
  }, [value]);

  return (
    <div className="d-flex flex-column gap-1" style={{ width: 145 }}>
      <label
        htmlFor={id}
        className="text-uppercase fw-semibold text-muted"
        style={{ fontSize: ".7rem", letterSpacing: ".02em" }}
      >
        {label}
      </label>
      <div className="position-relative">
        <input
          id={id}
          defaultValue={value}
          placeholder={placeholder}
          autoComplete="off"
          className="cultura-filtro-input w-100"
          style={{ paddingRight: 34 }}
        />
        <i
          className="bi bi-calendar3 position-absolute text-muted"
          style={{
            right: 12,
            top: "50%",
            transform: "translateY(-50%)",
            pointerEvents: "none",
            fontSize: ".85rem",
          }}
        />
      </div>
    </div>
  );
}
