'use client';
import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Modal } from '../../ui/modal';
import Label from '../../form/Label';
import Input from '../../form/input/InputField';
import MagazineService from '../../../../services/MagazineService';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import PostService from '../../../../services/PostService';
// Definimos el esquema de validación con Yup
const validationSchema = Yup.object({
  titulo: Yup.string()
    .required('El título es obligatorio')
    .min(3, 'El título debe tener al menos 3 caracteres'),
  typeId: Yup.number()
    .required('Debes seleccionar un tipo de publicación')
    .typeError('Selecciona un tipo de publicación válido'),
});

export default function PrensaFormInModal({
  isOpen,
  setOpen,
  setFlag,
  flag,
  types,
}: {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setFlag: React.Dispatch<React.SetStateAction<boolean>>;
  flag: boolean;
  types: { id: number; title: string }[];
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
          typeId: '',
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          console.log('PrensaFormInModal: Submitting values:', values);
          try {
            const postData = {
              typeId: values.typeId,
              title: values.titulo,
              id_user: auth.user?.id_user || 0,
            };
            console.log('PrensaFormInModal: Calling PostService.create with:', postData);

            const response = await PostService.create(postData);
            console.log(response);
            if (response && response.id) {
              console.log('PrensaFormInModal: Creation successful, ID:', response.id);

              closeModal();
            } else {
              console.error(
                'PrensaFormInModal: Creation failed or returned invalid response:',
                response,
              );
              alert('Error al crear la publicación. Por favor, verifica los datos.');
            }
          } catch (error) {
            console.error('PrensaFormInModal: Error exception during save:', error);
            alert('Ocurrió un error inesperado al guardar.');
          } finally {
            setSubmitting(false);
            setFlag((flag) => !flag);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <h4 className="mb-6 text-lg font-medium text-gray-800 dark:text-white/90">
              Crear nueva publicación de Prensa
            </h4>

            {/* Campo Título */}
            <div className="col-span-2">
              <Label>Título</Label>
              <Field as={Input} type="text" name="titulo" placeholder="Título de la publicación" />
              <ErrorMessage name="titulo" component="div" className="mt-1 text-sm text-red-500" />
            </div>

            {/* Campo N° de revista */}
            <div className="col-span-2 mt-4">
              <Label>Tipo de publicación</Label>
              <Field
                as="select"
                name="typeId"
                className="dark:bg-dark-900 shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/10 dark:focus:border-brand-800 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 pr-11 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
              >
                <option value="">Selecciona un tipo de publicación</option>
                {types?.map((type, index) => (
                  <option key={index} value={type.id}>
                    {type.title}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="typeId" component="div" className="mt-1 text-sm text-red-500" />
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
