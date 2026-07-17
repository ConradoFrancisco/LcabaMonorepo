'use client';

import Select from './Select';

export interface OpcionesNumber {
  value: number;
  label: string;
}

interface SelectNumberProps {
  value?: number | null;
  options: OpcionesNumber[];
  placeholder?: string;
  onChange: (value: number) => void;
  className?: string;
  disabled?: boolean;
}

export default function SelectNumber({
  disabled = false,
  value,
  options,
  placeholder,
  onChange,
  className,
}: SelectNumberProps) {
  const stringOptions = options.map((o) => ({
    value: String(o.value),
    label: o.label,
  }));

  return (
    <Select
      disabled={disabled}
      value={value !== undefined ? String(value) : ''}
      options={stringOptions}
      placeholder={placeholder}
      className={className}
      onChange={(v) => onChange(Number(v))} // Convertimos a number para el padre
    />
  );
}
