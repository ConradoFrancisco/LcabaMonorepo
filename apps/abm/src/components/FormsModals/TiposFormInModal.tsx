'use client';
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Modal } from '../ui/modal';
import Label from '../form/Label';
import Input from '../form/input/InputField';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'react-toastify';
import TypesService from '../../../services/TypesService';

const validationSchema = Yup.object({
  titulo: Yup.string()
    .required('El título es obligatorio')
    .min(3, 'El título debe tener al menos 3 caracteres'),
});

export default function TiposFormInModal({
  isOpen,
  setOpen,
  setFlag,
  table = 'posts_type',
  modalTitle = 'Crear nuevo tipo de publicación',
  editRoute,
}: {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setFlag: React.Dispatch<React.SetStateAction<boolean>>;
  table?: string;
  modalTitle?: string;
  editRoute?: string;
}) {
  const router = useRouter();
  const { auth } = useAuth();
  const closeModal = () => {
    setOpen(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[584px] p-5 lg:p-10">
      <Formik
        initialValues={{
          titulo: '',
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            const response = await TypesService.createType({
              title: values.titulo,
              id_user: auth.user?.id_user || 0,
              table,
            });
            toast.success('¡Tipo creado exitosamente!');
            resetForm();
            if (editRoute && response?.data?.id) {
              router.push(`${editRoute}/${response.data.id}`);
            }
            closeModal();
          } catch (error) {
            console.error('Error al crear tipo', error);
            toast.error('Error al crear el tipo');
          } finally {
            setSubmitting(false);
            setFlag((prev) => !prev);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <h4 className="mb-6 text-lg font-medium text-gray-800 dark:text-white/90">
              {modalTitle}
            </h4>

            <div className="space-y-4">
              <div>
                <Label>Título / Tipo</Label>
                <Field as={Input} type="text" name="titulo" placeholder="Ej: Editorial, Noticia, Entrevista..." />
                <ErrorMessage name="titulo" component="div" className="mt-1 text-sm text-red-500" />
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
                {isSubmitting ? 'Guardando...' : 'Guardar'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}
