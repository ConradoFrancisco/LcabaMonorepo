'use client';

interface SelectDestacadoProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SelectDestacado({ value, onChange }: SelectDestacadoProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="focus:ring-brand-500/20 focus:border-brand-500 h-11 min-w-[140px] cursor-pointer rounded-lg border border-gray-200 bg-white px-4 pr-8 text-sm transition-all focus:ring-2 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white"
    >
      <option value="">Todos</option>
      <option value="1">Sí</option>
      <option value="0">No</option>
    </select>
  );
}
