'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  title?: string;
  message?: string;
  isLoading?: boolean;
}

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirmar eliminación',
  message = '¿Estás seguro de que deseas eliminar este registro? Esta acción no se puede deshacer.',
  isLoading = false,
}: DeleteConfirmModalProps) {
  const handleConfirm = async () => {
    try {
      await onConfirm();
      toast.success('Registro eliminado correctamente');
      onClose();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al eliminar el registro';
      toast.error(errorMessage);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="mx-4 w-full max-w-sm rounded-lg bg-white p-6 shadow-lg dark:bg-white/[0.05]">
        <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">{title}</h2>

        <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">{message}</p>

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
            className="bg-error-500 hover:bg-error-600 flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-t-2 border-b-2 border-white"></div>
                Eliminando...
              </>
            ) : (
              'Eliminar'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
