'use client';

import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Modal } from '../ui/modal';
import Label from '../form/Label';
import Input from '../form/input/InputField';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import TypesService from '../../../services/TypesService';
import PostService from '../../../services/PostService';
import { toast } from 'react-toastify';

const validationSchema = Yup.object({
  titulo: Yup.string()
    .required('El título del informe es obligatorio')
    .min(3, 'El título debe tener al menos 3 caracteres'),
  typeId: Yup.number()
    .required('Debes seleccionar un tipo de informe')
    .typeError('Selecciona un tipo de informe válido')
    .min(1, 'Debes seleccionar un tipo de informe'),
});

export default function OipFormInModal({
  isOpen,
  setOpen,
  setFlag,
}: {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setFlag: React.Dispatch<React.SetStateAction<boolean>>;
  flag?: boolean;
}) {
  const [types, setTypes] = useState<{ id: number; titulo?: string; tipo?: string }[]>([]);
  const router = useRouter();
  const { auth } = useAuth();

  const closeModal = () => {
    setOpen(false);
  };

  const getTypes = async () => {
    try {
      const response = await TypesService.getAll({
        limit: 100,
        offset: 0,
        table: 'evidencias_posts_type',
      });
      const sorted = (response.data || []).sort((a: any, b: any) =>
        (a.titulo || a.tipo || '').localeCompare(b.titulo || b.tipo || ''),
      );
      setTypes(sorted);
    } catch (error) {
      console.error('Error al obtener tipos de evidencias:', error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      getTypes();
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[584px] p-5 lg:p-10">
      <Formik
        initialValues={{
          titulo: '',
          typeId: '' as unknown as number,
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            const postData = {
              title: values.titulo,
              typeId: Number(values.typeId),
              id_user: auth.user?.id_user || 0,
              table: 'evidencias_',
            };

            const response = await PostService.create(postData);
            if (response && response.id) {
              toast.success('¡Informe creado exitosamente!');
              resetForm();
              closeModal();
              router.push(`/oip/informes/edit/${response.id}`);
            } else {
              toast.error('Error al crear el informe');
            }
          } catch (error) {
            console.error('Error al crear informe OIP:', error);
            toast.error('Error al crear el informe');
          } finally {
            setSubmitting(false);
            setFlag((prev) => !prev);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <h4 className="mb-6 text-lg font-medium text-gray-800 dark:text-white/90">
              Crear nuevo informe
            </h4>

            <div className="space-y-4">
              <div>
                <Label>Título</Label>
                <Field
                  as={Input}
                  type="text"
                  name="titulo"
                  placeholder="Título del informe"
                />
                <ErrorMessage
                  name="titulo"
                  component="div"
                  className="mt-1 text-sm text-red-500"
                />
              </div>

              <div>
                <Label>Tipo de Informe</Label>
                <Field
                  as="select"
                  name="typeId"
                  className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
                >
                  <option value="">Seleccione un tipo...</option>
                  {types.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.titulo || t.tipo}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="typeId"
                  component="div"
                  className="mt-1 text-sm text-red-500"
                />
              </div>
            </div>

            <div className="mt-6 flex w-full items-center justify-end gap-3">
              <button
                type="button"
                onClick={closeModal}
                className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
              >
                Cancelar
              </button>
              <button
                className="bg-brand-500 shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300 inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-white transition"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Guardando...' : 'Crear Informe'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}
