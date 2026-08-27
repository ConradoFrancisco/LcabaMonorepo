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
import IssueService from '../../../services/IssueService';

const validationSchema = Yup.object({
  titulo: Yup.string()
    .required('El título es obligatorio')
    .min(3, 'El título debe tener al menos 3 caracteres'),
  numero: Yup.number()
    .required('El número de revista es obligatorio')
    .typeError('Debe ser un número')
    .positive('Debe ser mayor a 0'),
});

export default function IssueFormInModal({
  isOpen,
  setOpen,
  setFlag,
}: {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setFlag: React.Dispatch<React.SetStateAction<boolean>>;
  flag?: boolean;
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
          numero: '' as any,
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const response = await IssueService.createIssue({
              title: values.titulo,
              magazine_number: Number(values.numero),
              id_user: auth.user?.id_user || 0,
              table: 'magazine_issue',
            });
            toast.success('¡Edición de revista creada exitosamente!');
            if (response?.data?.id) {
              router.push(`/revista/revistas/edit/${response.data.id}`);
            }
            closeModal();
          } catch (error) {
            console.error('Error al crear issue', error);
            toast.error('Error al crear la edición de revista');
          } finally {
            setSubmitting(false);
            setFlag((prev) => !prev);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <h4 className="mb-6 text-lg font-medium text-gray-800 dark:text-white/90">
              Crear nueva edición de revista
            </h4>

            <div className="space-y-4">
              <div>
                <Label>Título</Label>
                <Field as={Input} type="text" name="titulo" placeholder="Ej: Edición Especial Aniversario" />
                <ErrorMessage name="titulo" component="div" className="mt-1 text-sm text-red-500" />
              </div>

              <div>
                <Label>Número de Revista</Label>
                <Field as={Input} type="number" name="numero" placeholder="Ej: 14" />
                <ErrorMessage name="numero" component="div" className="mt-1 text-sm text-red-500" />
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
