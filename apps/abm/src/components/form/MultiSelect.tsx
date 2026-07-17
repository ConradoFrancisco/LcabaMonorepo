import React, { useEffect, useRef, useState, useMemo } from 'react';

interface Option {
  value: string;
  text: string;
  selected: boolean;
}

interface MultiSelectProps {
  label: string;
  options: Option[];
  defaultSelected?: string[];
  onChange?: (selected: string[]) => void;
  disabled?: boolean;
  labelClassName?: string;
  closeOnSelect?: boolean;
  searchable?: boolean;
  searchPlaceholder?: string;
  clearSearchOnSelect?: boolean;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  label,
  options,
  defaultSelected = [],
  onChange,
  disabled = false,
  labelClassName = '',
  closeOnSelect = true,
  searchable = true,
  searchPlaceholder = 'Buscar...',
  clearSearchOnSelect = true,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>(defaultSelected);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const rootRef = useRef<HTMLDivElement | null>(null);
  const searchRef = useRef<HTMLInputElement | null>(null);

  // Sync con el padre (edición/carga)
  useEffect(() => {
    setSelectedOptions(defaultSelected);
  }, [defaultSelected]);

  // Cerrar al click afuera
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Filtrado en vivo
  const filteredOptions = useMemo(() => {
    if (!searchTerm.trim()) return options;
    const q = searchTerm.toLowerCase();
    return options.filter((o) => o.text.toLowerCase().includes(q));
  }, [options, searchTerm]);

  const toggleDropdown = () => {
    if (disabled) return;
    setIsOpen((prev) => !prev);
  };

  const openAndFocusSearch = () => {
    if (disabled) return;
    setIsOpen(true);
    // enfocar input de búsqueda tras abrir
    setTimeout(() => searchRef.current?.focus(), 0);
  };

  const handleSelect = (optionValue: string) => {
    const newSelectedOptions = selectedOptions.includes(optionValue)
      ? selectedOptions.filter((v) => v !== optionValue)
      : [...selectedOptions, optionValue];

    setSelectedOptions(newSelectedOptions);
    onChange?.(newSelectedOptions);

    if (clearSearchOnSelect) setSearchTerm('');
    if (closeOnSelect) setIsOpen(false);
    else {
      // si no cerramos, re-enfocamos el buscador para seguir tipeando
      setTimeout(() => searchRef.current?.focus(), 0);
    }
  };

  const handleRemove = (value: string) => {
    const newSelectedOptions = selectedOptions.filter((v) => v !== value);
    setSelectedOptions(newSelectedOptions);
    onChange?.(newSelectedOptions);
  };

  const selectedChips = selectedOptions
    .map((v) => options.find((o) => o.value === v))
    .filter(Boolean) as Option[];

  return (
    <div className="w-full" ref={rootRef}>
      {label !== '' && (
        <label
          className={`mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400 ${labelClassName}`}
        >
          {label}
        </label>
      )}

      <div className="relative">
        {/* Campo visible */}
        <div
          className={`shadow-theme-xs relative flex min-h-[44px] items-center rounded-lg border select-none ${
            disabled
              ? 'cursor-not-allowed border-gray-200 bg-gray-100 opacity-60 dark:border-gray-800 dark:bg-gray-800'
              : 'cursor-pointer border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-900'
          }`}
          onClick={disabled ? undefined : toggleDropdown}
        >
          {/* Chips o placeholder (alineado IZQ) */}
          <div className="scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 flex max-h-20 w-full flex-wrap items-center gap-2 overflow-y-auto py-1.5 pr-8 pl-3">
            {selectedChips.length > 0 ? (
              selectedChips.map((chip) => (
                <div
                  key={chip.value}
                  className="flex items-center rounded-full bg-gray-100 px-2.5 py-1 text-sm text-gray-800 dark:bg-gray-800 dark:text-white/90"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className="max-w-[200px] truncate">{chip.text}</span>
                  <button
                    type="button"
                    onClick={() => handleRemove(chip.value)}
                    className="ml-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    aria-label={`Quitar ${chip.text}`}
                    title={`Quitar ${chip.text}`}
                  >
                    ✕
                  </button>
                </div>
              ))
            ) : (
              <span className="text-sm text-gray-500 select-none dark:text-gray-400">
                Seleccionar opción
              </span>
            )}
          </div>

          {/* Caret */}
          <div className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2">
            <svg
              className={`h-5 w-5 text-gray-600 transition-transform dark:text-gray-300 ${
                isOpen ? 'rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Dropdown */}
        {isOpen && (
          <div className="absolute z-50 mt-1 w-full rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-900">
            {/* 🔎 Buscador interno opcional */}
            {searchable && (
              <div className="border-b border-gray-200 p-2 dark:border-gray-800">
                <div className="relative">
                  <input
                    ref={searchRef}
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder={searchPlaceholder}
                    className="h-9 w-full rounded-md border border-gray-300 bg-transparent px-8 text-sm text-gray-800 outline-none dark:border-gray-700 dark:text-white/90"
                    onClick={(e) => e.stopPropagation()}
                    onKeyDown={(e) => e.stopPropagation()}
                  />
                  {/* icono lupa */}
                  <span className="absolute top-1/2 left-2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="11" cy="11" r="8"></circle>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                  </span>
                  {/* limpiar */}
                  {searchTerm && (
                    <button
                      type="button"
                      className="absolute top-1/2 right-2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSearchTerm('');
                        searchRef.current?.focus();
                      }}
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Opciones */}
            <div className="max-h-64 overflow-y-auto">
              {filteredOptions.length === 0 ? (
                <div className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
                  Sin resultados
                </div>
              ) : (
                filteredOptions.map((opt) => {
                  const checked = selectedOptions.includes(opt.value);
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      className={`flex w-full items-center justify-between px-3 py-2 text-left text-sm ${
                        checked
                          ? 'bg-brand-50 text-brand-700 dark:text-brand-400 dark:bg-gray-800'
                          : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelect(opt.value);
                      }}
                    >
                      <span className="truncate">{opt.text}</span>
                      {checked && (
                        <svg
                          className="text-brand-500 dark:text-brand-400 h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>

      {/* Abrir y enfocar buscador con teclado/click en label */}
      {!disabled && label === '' && (
        <button
          type="button"
          className="sr-only"
          onClick={openAndFocusSearch}
          aria-hidden
          tabIndex={-1}
        />
      )}
    </div>
  );
};

export default MultiSelect;
