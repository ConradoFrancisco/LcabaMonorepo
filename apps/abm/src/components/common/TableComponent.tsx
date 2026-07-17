'use client';

import formatDate from '@/utils/dateFormater';
import Badge from '../ui/badge/Badge';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '../ui/table';
import Paginator from './Paginator';
import Link from 'next/link';
import { ChevronDown, ExternalLink, GitCompareArrows, Pencil, Trash2 } from 'lucide-react';
import { normalizarTitulo } from '@/utils/buildPublicUrl';
import DeleteConfirmModal from '../modals/DeleteConfirmModal';
import StatusChangeModal from '../modals/StatusChangeModal';
import { useState } from 'react';

// Acrónimos comunes que deben mostrarse en mayúsculas
const ACRONYMS = ['id', 'url', 'api', 'html', 'css', 'pdf', 'dni', 'cuit'];

// Convierte camelCase a Title Case con espacios
// Ejemplo: "ultimaAccion" -> "Ultima Accion", "userId" -> "User ID"
function formatHeader(clave: string): string {
  return (
    clave
      // Inserta un espacio entre minúscula y mayúscula (ej: ultimaAccion -> ultima Accion)
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      // Limpia espacios extras al inicio
      .trim()
      // Divide en palabras y procesa cada una
      .split(' ')
      .map((word) => {
        const lowerWord = word.toLowerCase();
        // Si es un acrónimo, ponlo en mayúsculas
        if (ACRONYMS.includes(lowerWord)) {
          return word.toUpperCase();
        }
        // Sino, capitaliza la primera letra
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(' ')
  );
}

export default function TableComponent({
  data,
  loading,
  total,
  limit,
  offset,
  setOffset,
  claves,
  section,
  onDelete,
  onStatusChange,
  setLimit = () => {},
}: {
  data: unknown[];
  loading: boolean;
  total: number;
  limit: number;
  offset: number;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
  setLimit?: React.Dispatch<React.SetStateAction<number>>;
  claves: string[];
  section?: string;
  onDelete?: (id: unknown) => Promise<void>;
  onStatusChange?: (id: unknown, newStatus: number) => Promise<void>;
}) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState<unknown>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [selectedStatusRowId, setSelectedStatusRowId] = useState<unknown>(null);
  const [selectedRowStatus, setSelectedRowStatus] = useState<number>(1);
  const [isChangingStatus, setIsChangingStatus] = useState(false);

  const handleDeleteClick = (id: unknown) => {
    setSelectedRowId(id);
    setIsDeleteModalOpen(true);
  };

  const handleStatusClick = (id: unknown, currentStatus: number) => {
    setSelectedStatusRowId(id);
    setSelectedRowStatus(currentStatus);
    setIsStatusModalOpen(true);
  };

  const getStatusValue = (status: unknown): number => {
    if (typeof status === 'number') {
      return status;
    }
    if (typeof status === 'object' && status !== null && 'data' in status) {
      const data = (status as { data?: unknown[] }).data?.[0];
      return data === 1 || data === true ? 1 : 0;
    }
    return 0;
  };

  const handleConfirmDelete = async () => {
    if (!onDelete || selectedRowId === null) return;

    setIsDeleting(true);
    try {
      await onDelete(selectedRowId);
      setIsDeleteModalOpen(false);
      setSelectedRowId(null);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleConfirmStatusChange = async (newStatus: number) => {
    if (!onStatusChange || selectedStatusRowId === null) return;

    setIsChangingStatus(true);
    try {
      await onStatusChange(selectedStatusRowId, newStatus);
      setIsStatusModalOpen(false);
      setSelectedStatusRowId(null);
    } finally {
      setIsChangingStatus(false);
    }
  };

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <span>
          Mostrando registros del {offset + 1} al {offset + limit > total ? total : offset + limit}{' '}
          de un total de {total} registros
        </span>
        <div className="flex items-center gap-2 text-sm text-gray-900 dark:text-gray-100">
          <span>Mostrar</span>
          <div className="relative">
            <select
              onChange={(e) => setLimit(Number(e.target.value))}
              className="focus:border-brand-500 focus:ring-brand-500 cursor-pointer appearance-none rounded-lg border border-gray-200 bg-white py-1.5 pr-7 pl-3 text-sm font-medium text-gray-700 shadow-sm transition outline-none hover:border-gray-300 focus:ring-1 dark:border-white/[0.08] dark:bg-gray-900 dark:text-gray-300 dark:hover:border-white/20"
            >
              <option value={7}>7</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <ChevronDown
              size={14}
              className="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 text-gray-900 dark:text-gray-100"
            />
          </div>
          <span>registros</span>
        </div>
      </div>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <div className="min-w-[1102px]">
            <Table>
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                <TableRow>
                  {claves?.map((clave, index) => (
                    <TableCell
                      key={index}
                      isHeader
                      className="text-theme-xs px-5 py-3 text-center font-medium text-gray-500 dark:text-gray-400"
                    >
                      {formatHeader(clave)}
                    </TableCell>
                  ))}
                  {!loading && (
                    <TableCell
                      isHeader
                      className="text-theme-xs px-5 py-3 text-center font-medium text-gray-500 dark:text-gray-400"
                    >
                      Acciones
                    </TableCell>
                  )}
                </TableRow>
              </TableHeader>

              {loading ? (
                <TableBody>
                  <TableRow>
                    <TableCell className="mx-7 py-4 text-center">
                      <div className="h-8 w-8 animate-spin rounded-full border-t-2 border-b-2 border-blue-500"></div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              ) : (
                <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                  {data.length > 0 ? (
                    data?.map((row, index) => (
                      <TableRow key={index} className="group">
                        {claves?.map((clave, subIndex) => (
                          <TableCell
                            key={subIndex}
                            className="px-5 py-3 text-center text-sm transition-colors group-hover:bg-gray-200 dark:group-hover:bg-white/[0.12]"
                          >
                            {(() => {
                              const cellValue = (row as Record<string, unknown>)[clave];

                              if (clave === 'status' || clave === 'estado' || clave === 'Estado') {
                                const isObject =
                                  typeof cellValue === 'object' && cellValue !== null;
                                const hasDataArray =
                                  isObject &&
                                  Array.isArray((cellValue as { data?: unknown[] }).data);
                                const isActive =
                                  hasDataArray &&
                                  (cellValue as { data?: unknown[] }).data?.[0] === 1;

                                return (
                                  <Badge size="sm" color={isActive ? 'success' : 'warning'}>
                                    {isActive ? 'Activo' : 'Inactivo'}
                                  </Badge>
                                );
                              }

                              if (
                                cellValue === null ||
                                cellValue === undefined ||
                                String(cellValue).trim().toLowerCase() === 'null'
                              ) {
                                return '';
                              }

                              if (clave === 'fecha') {
                                return formatDate(String(cellValue));
                              }

                              if (
                                typeof cellValue === 'object' &&
                                cellValue !== null &&
                                'data' in cellValue
                              ) {
                                const val = (cellValue as { data?: unknown[] }).data?.[0];
                                return val ? String(val === 1 ? 'Sí' : 'No') : 'No';
                              }

                              if (clave.toLowerCase() === 'url' && typeof cellValue === 'string') {
                                let absoluteUrl = cellValue;
                                if (section?.includes('/prensa')) {
                                  const baseUrl = process.env.NEXT_PUBLIC_PRENSA_URL || '';
                                  const cleanedBase = baseUrl.endsWith('/')
                                    ? baseUrl.slice(0, -1)
                                    : baseUrl;
                                  // Usar la URL guardada (respeta el acortado manual). Solo si viene vacía, derivar del título.
                                  let path = cellValue?.trim() || '';
                                  if (!path) {
                                    const title =
                                      (row as Record<string, any>).titulo ||
                                      (row as Record<string, any>).Titulo ||
                                      (row as Record<string, any>).title ||
                                      '';
                                    path = `posts/${normalizarTitulo(title)}.html`;
                                  }
                                  const cleanedCell = path.startsWith('/') ? path.slice(1) : path;
                                  absoluteUrl = `${cleanedBase}/${cleanedCell}`;
                                } else if (cellValue && !cellValue.startsWith('http')) {
                                  let baseUrl = '';
                                  if (section?.includes('/cultura')) {
                                    baseUrl = process.env.NEXT_PUBLIC_CULTURA_URL || '';
                                  } else if (section?.includes('/revista')) {
                                    baseUrl = process.env.NEXT_PUBLIC_REVISTA_URL || '';
                                  }

                                  if (baseUrl) {
                                    const cleanedBase = baseUrl.endsWith('/')
                                      ? baseUrl.slice(0, -1)
                                      : baseUrl;
                                    const cleanedCell = cellValue.startsWith('/')
                                      ? cellValue.slice(1)
                                      : cellValue;
                                    absoluteUrl = `${cleanedBase}/${cleanedCell}`;
                                  }
                                }

                                return (
                                  <a
                                    href={absoluteUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title="Ver publicación"
                                    className="text-brand-500 hover:text-brand-700 inline-flex items-center justify-center"
                                  >
                                    <ExternalLink size={18} />
                                  </a>
                                );
                              }

                              if (clave === 'Descripcion') {
                                const htmlString = String(cellValue);
                                let plainText = htmlString.replace(/<[^>]+>/g, '');
                                if (typeof window !== 'undefined') {
                                  const txt = document.createElement('textarea');
                                  txt.innerHTML = plainText;
                                  plainText = txt.value;
                                }
                                return plainText;
                              }

                              return String(cellValue);
                            })()}
                          </TableCell>
                        ))}
                        <TableCell className="px-5 py-3 text-center text-sm transition-colors group-hover:bg-gray-200 dark:group-hover:bg-white/[0.12]">
                          <div className="col-span-1 flex items-center px-4 py-[17.5px]">
                            <div className="flex w-full items-center gap-2">
                              <button
                                onClick={() =>
                                  handleStatusClick(
                                    (row as Record<string, unknown>).id,
                                    getStatusValue((row as Record<string, unknown>).status),
                                  )
                                }
                                className="hover:text-brand-500 dark:hover:text-brand-400 text-gray-500 transition-colors dark:text-gray-400"
                                title="Cambiar estado"
                              >
                                <GitCompareArrows size={18} />
                              </button>
                              <button
                                onClick={() =>
                                  handleDeleteClick((row as Record<string, unknown>).id)
                                }
                                className="hover:text-error-500 dark:hover:text-error-500 text-gray-500 transition-colors dark:text-gray-400"
                                title="Eliminar"
                              >
                                <Trash2 size={18} />
                              </button>
                              <Link
                                href={`${section}/edit/${(row as Record<string, unknown>).id}`}
                                className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white/90"
                                title="Editar"
                              >
                                <Pencil size={18} />
                              </Link>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell className="py-4 text-center">
                        No se encontraron resultados que coincidan con tu búsqueda.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              )}
            </Table>
            {!loading ? (
              <Paginator cantidad={total} setOffset={setOffset} offset={offset} limit={limit} />
            ) : (
              ''
            )}
          </div>
        </div>
      </div>

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        isLoading={isDeleting}
      />

      <StatusChangeModal
        isOpen={isStatusModalOpen}
        onClose={() => setIsStatusModalOpen(false)}
        onConfirm={handleConfirmStatusChange}
        currentStatus={selectedRowStatus}
        isLoading={isChangingStatus}
      />
    </>
  );
}
