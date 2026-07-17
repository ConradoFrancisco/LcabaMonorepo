import { Modal } from '@/components/ui/modal';
import { Dispatch, SetStateAction } from 'react';

interface IComfirmationModalProps {
  SetIsOpen: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
  handleRequest: () => Promise<void> | void;
  title: string;
  option: ParlamentariaOptions;
  isAdd?: boolean;
}

export enum ParlamentariaOptions {
  Proyecto = 'proyecto',
  Comision = 'comisión',
  Legislador = 'legislador',
  Sesion = 'sesión',
  Audiencia = 'audiencia',
  Archivo = 'archivo',
  Audio = 'audio',
  Video = 'video',
}

export default function ConfirmationModal({
  SetIsOpen,
  isOpen,
  title,
  handleRequest,
  option,
  isAdd = true,
}: IComfirmationModalProps) {
  const accion = isAdd ? 'añadir' : 'eliminar';
  const verbo = isAdd ? 'proseguir' : 'eliminarlo';

  return (
    <Modal isOpen={isOpen} onClose={() => SetIsOpen(false)} className="flex justify-center">
      <div className="relative m-16 w-full max-w-[577px] rounded-xl bg-white p-6 dark:bg-[#1E2634]">
        <button
          type="button"
          onClick={() => SetIsOpen(false)}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-800 dark:hover:text-white/90"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none">
            <path
              fillRule="evenodd"
              d="M6.043 16.542a1 1 0 1 0 1.414 1.414L12 13.414l4.542 4.542a1 1 0 0 0 1.414-1.414L13.413 12l4.542-4.542a1 1 0 0 0-1.414-1.414l-4.542 4.542-4.542-4.542A1 1 0 1 0 6.043 7.46L10.585 12z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {/* 🔹 Texto dinámico */}
        <p className="mb-6 pr-4 text-xl text-gray-700 dark:text-gray-400">
          {option === ParlamentariaOptions.Audio ? (
            <>
              ¿Está seguro que desea eliminar el audio <span className="font-bold">{title}</span>?
            </>
          ) : option === ParlamentariaOptions.Video ? (
            <>
              ¿Está seguro que desea eliminar el video <span className="font-bold">{title}</span>?
            </>
          ) : (
            <>
              Está a punto de{' '}
              <span className="font-bold">
                {accion} el/la {option} {title}
              </span>
              .
              <br />
              ¿Desea {verbo}?
            </>
          )}
        </p>

        <div className="flex flex-col justify-end gap-6 sm:flex-row sm:items-center sm:gap-4">
          <div className="flex w-full items-center gap-3 sm:w-auto">
            <button
              type="button"
              onClick={() => SetIsOpen(false)}
              className="shadow-theme-xs flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-800 sm:w-auto dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
            >
              Cancelar
            </button>

            <button
              type="button"
              onClick={() => handleRequest()}
              className={`shadow-theme-xs flex w-full justify-center rounded-lg px-4 py-3 text-sm font-medium text-white sm:w-auto ${isAdd ? 'bg-brand-500 hover:bg-brand-600' : 'bg-red-600 hover:bg-red-700'} `}
            >
              Aceptar
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
