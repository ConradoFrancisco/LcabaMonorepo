'use client';
import React, { useState } from 'react';
import Badge from '../../ui/badge/Badge';
import { Modal } from '../../ui/modal';
import Select from '../../form/Select';
import Switch from '../../form/switch/Switch';
import { toast } from 'react-toastify';
import apiClient from '../../../../services/apiClient';


/* eslint-disable @next/next/no-img-element */
export default function ImageTable({
  images,
  setImagesFromDB,
  postId,
  seccion,
}: {
  images?: any[];
  setImagesFromDB: React.Dispatch<React.SetStateAction<any[]>>;
  postId: number;
  seccion: string;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<any | null>(null);
  const [editData, setEditData] = useState<{ title: string; type: string }>({
    title: '',
    type: '',
  });
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);

  const handleOpenModal = (image: any) => {
    setSelectedImage(image);
    setEditData({
      title: image.title || '',
      type: image.image_type || 'render',
    });
    setIsOpen(true);
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedImage) return;

    try {
      await apiClient.put(
        '/upload/update-image',
        {
          id: postId,
          type: editData.type,
          fk_iddoc: selectedImage.fk_iddoc,
          title: editData.title,
        },
        {
          params: { table: seccion },
        },
      );

      if (images) {
        setImagesFromDB(
          images.map((img) =>
            img.fk_iddoc === selectedImage.fk_iddoc
              ? { ...img, title: editData.title, image_type: editData.type }
              : img,
          ),
        );
      }

      toast.success('Imagen actualizada correctamente');
      setIsOpen(false);
    } catch (error) {
      console.error('Error al actualizar la imagen:', error);
      toast.error('Error al actualizar la imagen');
    }
  };

  const openDeleteModal = (fk_iddoc: number) => {
    setItemToDelete(fk_iddoc);
    setIsDeleteOpen(true);
  };

  const handleDelete = async () => {
    if (!itemToDelete) return;

    try {
      await apiClient.delete('/upload/delete-image', {
        data: {
          fk_iddoc: itemToDelete,
          table: seccion,
          postId,
        },
      });

      if (images) {
        setImagesFromDB(images.filter((img) => img.fk_iddoc !== itemToDelete));
      }
      toast.success('Imagen eliminada correctamente');
      setIsDeleteOpen(false);
    } catch (error) {
      console.error('Error eliminando imagen:', error);
      toast.error('Error al eliminar la imagen');
    }
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="px-6 py-5">
        <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
          Tabla de imagenes cargadas
        </h3>
      </div>
      <div className="border-t border-gray-100 p-4 sm:p-6 dark:border-gray-800">
        <div className="space-y-6">
          <div className="overflow-hidden rounded-xl bg-white dark:bg-white/[0.03]">
            <div className="custom-scrollbar max-w-full overflow-x-auto">
              <table className="min-w-full">
                <thead className="border-t border-gray-100 dark:border-white/[0.05]">
                  <tr>
                    <th className="border border-gray-100 px-4 py-3 dark:border-white/[0.05]">
                      <div className="flex items-center justify-between">
                        <p className="text-theme-xs font-medium text-gray-700 dark:text-gray-400">
                          #
                        </p>
                      </div>
                    </th>
                    <th className="border border-gray-100 px-4 py-3 dark:border-white/[0.05]">
                      <div className="flex items-center justify-between">
                        <p className="text-theme-xs font-medium text-gray-700 dark:text-gray-400">
                          Img
                        </p>
                      </div>
                    </th>
                    <th className="border border-gray-100 px-4 py-3 dark:border-white/[0.05]">
                      <div className="flex items-center justify-between">
                        <p className="text-theme-xs font-medium text-gray-700 dark:text-gray-400">
                          Titulo
                        </p>
                      </div>
                    </th>
                    <th className="border border-gray-100 px-4 py-3 dark:border-white/[0.05]">
                      <div className="flex items-center justify-between">
                        <p className="text-theme-xs font-medium text-gray-700 dark:text-gray-400">
                          Tipo
                        </p>
                      </div>
                    </th>
                    <th className="border border-gray-100 px-4 py-3 dark:border-white/[0.05]">
                      <div className="flex items-center justify-between">
                        <p className="text-theme-xs font-medium text-gray-700 dark:text-gray-400">
                          Status
                        </p>
                      </div>
                    </th>
                    <th className="border border-gray-100 px-4 py-3 dark:border-white/[0.05]">
                      <div className="flex items-center justify-between">
                        <p className="text-theme-xs font-medium text-gray-700 dark:text-gray-400">
                          Acciones
                        </p>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                  {images &&
                    images.length > 0 &&
                    images.map((img: any, index: number) => (
                      <tr key={index}>
                        <td className="border border-gray-100 px-4 py-3 whitespace-nowrap dark:border-white/[0.05]">
                          <span className="text-theme-sm text-gray-500">{img.id}</span>
                        </td>
                        <td className="border border-gray-100 px-4 py-3 whitespace-nowrap dark:border-white/[0.05]">
                          <img
                            width={128}
                            className="rounded-lg"
                            src={`${process.env.NEXT_PUBLIC_IMAGES}/${img.location}/${img.filename}?key=${process.env.NEXT_PUBLIC_FILESERVER_KEY}`}
                            alt={img.title || 'Imagen cargada'}
                          />
                        </td>
                        <td className="text-theme-sm border border-gray-100 px-4 py-3 text-gray-800 dark:border-white/[0.05] dark:text-gray-400/90">
                          {img.title || '-'}
                        </td>
                        <td className="text-theme-sm border border-gray-100 px-4 py-3 text-gray-800 dark:border-white/[0.05] dark:text-gray-400/90">
                          {img.image_type}
                        </td>
                        <td className="border border-gray-100 px-4 py-3 whitespace-nowrap dark:border-white/[0.05]">
                          <Badge size="sm" color={img.status ? 'success' : 'warning'}>
                            {img.status ? 'Activo' : 'Inactivo'}
                          </Badge>
                        </td>
                        <td className="border border-gray-100 px-4 py-3 whitespace-nowrap dark:border-white/[0.05]">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => openDeleteModal(img.fk_iddoc)}
                              className="hover:text-error-500 text-gray-500 transition-colors"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={20}
                                height={20}
                                fill="none"
                              >
                                <path
                                  fill="currentColor"
                                  fillRule="evenodd"
                                  d="M6.541 3.792a2.25 2.25 0 0 1 2.25-2.25h2.417a2.25 2.25 0 0 1 2.25 2.25v.25h3.208a.75.75 0 0 1 0 1.5h-.29v10.666a2.25 2.25 0 0 1-2.25 2.25h-8.25a2.25 2.25 0 0 1-2.25-2.25V5.541h-.292a.75.75 0 1 1 0-1.5H6.54zm8.334 9.454V5.541h-9.75v10.667c0 .414.336.75.75.75h8.25a.75.75 0 0 0 .75-.75zM8.041 4.041h3.917v-.25a.75.75 0 0 0-.75-.75H8.791a.75.75 0 0 0-.75.75zM8.334 8a.75.75 0 0 1 .75.75v5a.75.75 0 1 1-1.5 0v-5a.75.75 0 0 1 .75-.75m4.083.75a.75.75 0 0 0-1.5 0v5a.75.75 0 1 0 1.5 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleOpenModal(img)}
                              className="hover:text-brand-500 text-gray-500 transition-colors"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={21}
                                height={21}
                                fill="none"
                              >
                                <path
                                  fill="currentColor"
                                  fillRule="evenodd"
                                  d="M17.091 3.532a2.25 2.25 0 0 0-3.182 0l-8.302 8.302c-.308.308-.52.7-.61 1.126l-.735 3.485a.75.75 0 0 0 .888.889l3.485-.735a2.25 2.25 0 0 0 1.127-.611l8.301-8.302a2.25 2.25 0 0 0 0-3.182zm-2.121 1.06a.75.75 0 0 1 1.06 0l.973.973a.75.75 0 0 1 0 1.06l-.899.899-2.033-2.033zm-1.96 1.96-6.342 6.342a.75.75 0 0 0-.203.376l-.498 2.358 2.358-.497a.75.75 0 0 0 .376-.204l6.343-6.342z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Editar */}
      {selectedImage && (
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <div className="p-6">
            <form onSubmit={handleSaveEdit}>
              <h4 className="mb-6 text-lg font-medium text-gray-800 dark:text-white/90">
                Editar Imagen
              </h4>
              <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
                <div className="col-span-2">
                  <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                    Titulo
                  </label>
                  <input
                    value={editData.title}
                    onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                    placeholder="Escribe un título..."
                    className="focus:border-brand-300 focus:ring-brand-500/20 h-11 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:ring-3 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
                    type="text"
                  />
                </div>
                <div className="col-span-1">
                  <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                    Tipo
                  </label>
                  <div className="mb-6">
                    <Select
                      value={editData.type}
                      options={[
                        { value: 'render', label: 'RENDER' },
                        { value: 'extras', label: 'EXTRAS' },
                        { value: 'premiaciones', label: 'PREMIACIONES' },
                        { value: 'slider', label: 'SLIDER' },
                      ]}
                      onChange={(value) => setEditData({ ...editData, type: value })}
                    />
                  </div>
                  <Switch
                    label="Estado"
                    defaultChecked={true}
                    onChange={(e) => console.log(e, 'a')}
                  />
                </div>

                <div className="col-span-1">
                  <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                    Vista Previa
                  </label>
                  <div className="relative overflow-hidden rounded-lg border border-gray-100 dark:border-gray-800">
                    <img
                      className="w-full object-cover"
                      src={`${process.env.NEXT_PUBLIC_IMAGES}/${selectedImage.location}/${selectedImage.filename}?key=${process.env.NEXT_PUBLIC_FILESERVER_KEY}`}
                      alt="Preview"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 flex w-full items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-brand-500 hover:bg-brand-600 shadow-theme-xs rounded-lg px-4 py-2 text-sm font-medium text-white"
                >
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </Modal>
      )}

      {/* Modal Eliminar */}
      <Modal isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)}>
        <div className="p-6 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 dark:bg-red-500/10">
            <svg
              className="h-8 w-8 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </div>
          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-white/90">
            Confirmar eliminación
          </h3>
          <p className="mb-8 text-sm text-gray-500 dark:text-gray-400">
            ¿Estás seguro de que deseas eliminar esta imagen? Esta acción no se puede deshacer y el
            vínculo con el post se perderá.
          </p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => setIsDeleteOpen(false)}
              className="rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
            >
              Cancelar
            </button>
            <button
              onClick={handleDelete}
              className="shadow-theme-xs rounded-lg bg-red-600 px-6 py-3 text-sm font-medium text-white hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none"
            >
              Eliminar imagen
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
