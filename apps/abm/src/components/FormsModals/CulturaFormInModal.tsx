'use client';
import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Modal } from '../ui/modal';
import Label from '../form/Label';
import Input from '../form/input/InputField';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import CulturaService from '../../../services/CulturaService';
// Definimos el esquema de validación con Yup
const validationSchema = Yup.object({
  titulo: Yup.string()
    .required('El título es obligatorio')
    .min(3, 'El título debe tener al menos 3 caracteres'),
  categoryId: Yup.number()
    .required('Debes seleccionar una categoria')
    .typeError('Selecciona una categoria válida'),
});

export default function CulturaFormInModal({
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
  const [categories, setCategories] = useState<{ id: number; titulo: string }[]>([]);
  const navigation = useRouter();
  const { auth } = useAuth();
  const closeModal = () => {
    setOpen(false);
  };

  const getCategories = async () => {
    const response = await CulturaService.getAllCategories({
      limit: 70,
      offset: 0,
    });
    const sorted = (response.data || []).sort((a, b) => a.titulo.localeCompare(b.titulo));
    setCategories(sorted);
    console.log(sorted);
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[584px] p-5 lg:p-10">
      <Formik
        initialValues={{
          titulo: '',
          categoryId: 0,
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            // Simulamos un guardado en backend
            const response = await CulturaService.create({
              categoryId: values.categoryId,
              title: values.titulo,
              id_user: auth.user?.id_user || 0,
            });
            navigation.push(`/cultura/publicaciones/edit/${(response as { id: number }).id}`);
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
              Crear nueva publicación
            </h4>

            {/* Campo Título */}
            <div className="col-span-2">
              <Label>Título</Label>
              <Field as={Input} type="text" name="titulo" placeholder="Título de la publicación" />
              <ErrorMessage name="titulo" component="div" className="mt-1 text-sm text-red-500" />
            </div>

            {/* Campo N° de revista */}
            <div className="col-span-2 mt-4">
              <Label>Categoría</Label>
              <Field
                as="select"
                name="categoryId"
                className="dark:bg-dark-900 shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/10 dark:focus:border-brand-800 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 pr-11 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
              >
                <option value="">Selecciona una categoria</option>
                {categories?.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.titulo}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="categoryId"
                component="div"
                className="mt-1 text-sm text-red-500"
              />
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
