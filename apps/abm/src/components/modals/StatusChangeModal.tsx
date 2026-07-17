'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

interface StatusChangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (newStatus: number) => Promise<void>;
  currentStatus: number;
  title?: string;
  isLoading?: boolean;
}

export default function StatusChangeModal({
  isOpen,
  onClose,
  onConfirm,
  currentStatus,
  title = 'Cambiar estado',
  isLoading = false,
}: StatusChangeModalProps) {
  const [selectedStatus, setSelectedStatus] = useState<number>(currentStatus);

  // Actualizar el selectedStatus cuando cambie el currentStatus
  useEffect(() => {
    setSelectedStatus(currentStatus);
  }, [currentStatus, isOpen]);

  const newStatus = selectedStatus === 1 ? 0 : 1;
  const currentLabel = selectedStatus === 1 ? 'Activo' : 'Inactivo';
  const newLabel = newStatus === 1 ? 'Activo' : 'Inactivo';

  const handleConfirm = async () => {
    try {
      if (newStatus === currentStatus) {
        toast.info('El estado no ha cambiado');
        return;
      }
      await onConfirm(newStatus);
      toast.success(`Estado cambiado a ${newLabel}`);
      onClose();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al cambiar el estado';
      toast.error(errorMessage);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="mx-4 w-full max-w-sm rounded-lg bg-white p-6 shadow-lg dark:bg-white/[0.05]">
        <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">{title}</h2>

        <div className="mb-6 space-y-3">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Estado actual:{' '}
            <span className="font-semibold text-gray-900 dark:text-white">{currentLabel}</span>
          </p>

          <div className="mt-4 border-t border-gray-200 pt-4 dark:border-white/[0.1]">
            <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
              Cambiar a:{' '}
              <span className="font-semibold text-gray-900 dark:text-white">{newLabel}</span>
            </p>

            <div className="flex items-center gap-3">
              <div
                className={`flex-1 rounded-md px-3 py-2 text-center text-sm font-medium ${
                  newStatus === 1
                    ? 'bg-success-100 dark:bg-success-500/20 text-success-600 dark:text-success-400'
                    : 'bg-warning-100 dark:bg-warning-500/20 text-warning-600 dark:text-warning-400'
                }`}
              >
                {newLabel}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white/[0.1] dark:text-gray-300 dark:hover:bg-white/[0.15]"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            disabled={isLoading}
            className="bg-brand-500 hover:bg-brand-600 flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-t-2 border-b-2 border-white"></div>
                Cambiando...
              </>
            ) : (
              'Cambiar Estado'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
