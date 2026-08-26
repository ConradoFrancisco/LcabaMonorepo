'use client';
import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Modal } from '../ui/modal';
import Label from '../form/Label';
import Input from '../form/input/InputField';
import MagazineService from '../../../services/MagazineService';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import GeneralService from '../../../services/GeneralService';
// Definimos el esquema de validación con Yup
const validationSchema = Yup.object({
  titulo: Yup.string()
    .required('El título es obligatorio')
    .min(3, 'El título debe tener al menos 3 caracteres'),
});

export default function PageFormModal({
  isOpen,
  setOpen,
  setFlag,
  flag,
}: {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setFlag: React.Dispatch<React.SetStateAction<boolean>>;
  flag: boolean;
}) {
  const navigation = useRouter();
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
        onSubmit={async (values, { setSubmitting }) => {
          try {
            // Simulamos un guardado en backend
            const response = await GeneralService.createPage({
              title: values.titulo,
              id_user: auth.user?.id_user || 0,
            });
            navigation.push(`/general/paginas/edit/${(response as { id: number }).id}`);
            console.log('response', response);
            // si salió bien => cerrar modal
            closeModal();
          } catch (error) {
            console.error('Error al guardar', error);
          } finally {
            setSubmitting(false);
            setFlag((flag) => !flag);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <h4 className="mb-6 text-lg font-medium text-gray-800 dark:text-white/90">
              Crear nueva Página
            </h4>

            {/* Campo Título */}
            <div className="col-span-2">
              <Label>Titulo</Label>
              <Field as={Input} type="text" name="titulo" placeholder="Titulo de la página" />
              <ErrorMessage name="titulo" component="div" className="mt-1 text-sm text-red-500" />
            </div>

            {/* Botón guardar */}
            <div className="mt-6 flex w-full items-center justify-end gap-3">
              <button
                className="bg-brand-500 shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300 inline-flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium text-white transition"
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
