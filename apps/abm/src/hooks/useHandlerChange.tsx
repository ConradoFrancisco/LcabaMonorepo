/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { EditComponentState } from '@/types/postTypes';

export type SchemaItem<T> = {
  schema: Yup.ObjectSchema<any>;
  data: T;
  tab?: string;
};

interface UseHandlerChangeProps {
  service: (formData: EditComponentState) => Promise<unknown>;
  rutaDestino: string;
  schemas?: SchemaItem<any>[];
  state: EditComponentState;
  setActiveTab: (tab: string) => void;
  onSuccess?: (response?: unknown) => void;

}

export default function useHandlerChange({
  service,
  rutaDestino,
  schemas = [],
  state,
  setActiveTab,
  onSuccess,
}: UseHandlerChangeProps) {
  const router = useRouter();

  const handler = async () => {
    try {
      let firstTabWithError: string | null = null;

      // 🔹 Validar todos los schemas
      for (const { schema, data, tab } of schemas) {
        try {
          await schema.validate(data, { abortEarly: false });
        } catch (err) {
          if (err instanceof Yup.ValidationError) {
            // Guardar la primera pestaña con error
            if (!firstTabWithError && tab) firstTabWithError = tab;

            // Mostrar cada error por separado, indicando la pestaña
            err.errors.forEach((msg) => {
              toast.error(
                <div className="flex w-100 flex-col">
                  <span>{msg}</span>
                  {tab && <span className="mt-1 self-end text-xs italic">{tab}</span>}
                </div>,
                {
                  className: 'bg-red-500 text-white px-4 py-2 rounded shadow-lg',
                  autoClose: 5000,
                },
              );
            });
          }
        }
      }

      // 🔹 Si hubo errores → activar la primera pestaña con error
      if (firstTabWithError) {
        setActiveTab(firstTabWithError);
        return;
      }

      // 🔹 Si todo OK → llamar al servicio
      console.log(state)
      const response = await service(state);
      toast.success(response?.msg || 'Post editado correctamente');
      onSuccess?.(response);
    } catch (err) {
      console.error('Error en edición:', err);
      toast.error('Error al editar el post');
    }
  };

  return handler;
}
