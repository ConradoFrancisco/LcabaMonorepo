'use client';
import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Trash2 } from 'lucide-react';
import ComponentCard from '../../common/ComponentCard';
import Badge from '../../ui/badge/Badge';
import { getFileIcon } from '@/app/utils/getIcon';
import { IArchivo } from '@/types/postTypes';

import { toast } from 'react-toastify';
import { useAuth } from '@/context/AuthContext';
import { Modal } from '@/components/ui/modal';
import Input from '@/components/form/input/InputField';
import Switch from '@/components/form/switch/Switch';
import ConfirmationModal, {
  ParlamentariaOptions,
} from './InfoParlamentaria/components/modals/ConfirmationModal';
import apiClient from '../../../../services/apiClient';
export interface FileDropzoneProps {
  archivosFromDb: IArchivo[];
  newArchivos: File[];
  setNewArchivos: React.Dispatch<React.SetStateAction<File[]>>;
  postId?: number;
  seccion?: string;
  setArchivosFromDb: React.Dispatch<React.SetStateAction<IArchivo[]>>;
}

const allowedExtensions = [
  '.xls',
  '.xlsx',
  '.csv',
  '.doc',
  '.docx',
  '.dotx',
  '.pdf',
  '.zip',
  '.rar',
  '.7z',
  '.001',
  '.002',
  '.003',
  '.004',
  '.005',
  '.006',
  '.007',
  '.008',
  '.009',
  '.010',
];

const FileDropzone: React.FC<FileDropzoneProps> = ({
  archivosFromDb,
  newArchivos,
  setNewArchivos,
  seccion,
  postId,
  setArchivosFromDb,
}) => {
  const { auth } = useAuth();
  const [tipos, setTipos] = useState<string[]>([]);

  // Estados para el modal de edición
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [archivoToEdit, setArchivoToEdit] = useState<IArchivo | null>(null);

  // Estados para el modal de confirmación de eliminación
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null);
  const [pendingDeleteTitle, setPendingDeleteTitle] = useState('');

  const onDrop = (acceptedFiles: File[]) => {
    const filtered = acceptedFiles.filter((file) =>
      allowedExtensions.some((ext) => file.name.toLowerCase().endsWith(ext)),
    );
    setNewArchivos((prev: File[]) => [...prev, ...filtered]);
    setTipos((prev) => [...prev, ...filtered.map(() => '')]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'text/csv': ['.csv'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.template': ['.dotx'],
      'application/zip': ['.zip'],
      'application/x-rar-compressed': ['.rar'],
      'application/x-7z-compressed': ['.7z'],
      'application/octet-stream': [
        '.001',
        '.002',
        '.003',
        '.004',
        '.005',
        '.006',
        '.007',
        '.008',
        '.009',
        '.010',
      ],
    },
  });

  const handleEliminar = (index: number) => {
    setNewArchivos((prev) => prev.filter((_, i) => i !== index));
    setTipos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleEliminarFromDb = async () => {
    if (pendingDeleteId === null) return;
    try {
      await apiClient.delete('/upload/delete-file', {
        data: { fk_iddoc: pendingDeleteId, table: seccion, postId },
      });
      setArchivosFromDb((prev) => prev.filter((a) => a.fk_iddoc !== pendingDeleteId));
      toast.success('Archivo eliminado correctamente');
    } catch (error) {
      console.error('Error al eliminar archivo', error);
      toast.error('Error al eliminar archivo');
    } finally {
      setIsDeleteModalOpen(false);
      setPendingDeleteId(null);
      setPendingDeleteTitle('');
    }
  };

  const handleTipoChange = (index: number, value: string) => {
    setTipos((prev) => prev.map((t, i) => (i === index ? value : t)));
  };

  // Normaliza el file_type guardado a una de las opciones conocidas (tolera
  // diferencias de capitalización y espacios). Devuelve '' si no coincide.
  const tipoOptions = ['Planilla', 'Info', 'Ficha'];
  const getTipoOption = (fileType?: string | null) => {
    if (!fileType) return '';
    const match = tipoOptions.find((opt) => opt.toLowerCase() === fileType.trim().toLowerCase());
    return match ?? '';
  };

  useEffect(() => {
    console.log('Archivos cargados:', newArchivos);
  }, [newArchivos]);

  const uploadFileHandler = async () => {
    if (newArchivos.length === 0) return toast.error('No hay archivos para subir');
    if (tipos.some((t) => !t)) return toast.error('Debes seleccionar un tipo para cada archivo');
    try {
      const formData = new FormData();
      newArchivos.forEach((file) => {
        formData.append('file', file);
      });

      const response = await apiClient.post(
        '/upload/upload-files',
        formData,
        {
          params: { table: seccion, postId, username: auth.user?.username },
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      setArchivosFromDb(response.data.files);
      setNewArchivos([]);
      setTipos([]);
      toast.success('Archivos subidos correctamente!');
    } catch (error) {
      console.error('Error al subir archivos', error);
      toast.error('Error al subir archivos');
    }
  };

  return (
    <ComponentCard title="Subir Archivos">
      <div className="dark:hover:border-brand-500 hover:border-brand-500 cursor-pointer rounded-xl border border-dashed border-gray-300 transition dark:border-gray-700">
        <form
          {...getRootProps()}
          className={`dropzone rounded-xl border-dashed border-gray-300 p-7 lg:p-10 ${isDragActive
              ? 'border-brand-500 bg-gray-100 dark:bg-gray-800'
              : 'border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-900'
            }`}
          id="demo-upload"
        >
          <input {...getInputProps()} />
          <div className="dz-message flex flex-col items-center">
            <div className="mb-[22px] flex justify-center">
              <div className="flex h-[68px] w-[68px] items-center justify-center rounded-full bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-400">
                📄
              </div>
            </div>
            <h4 className="text-theme-xl mb-3 font-semibold text-gray-800 dark:text-white/90">
              {isDragActive ? 'Suelta los archivos aquí' : 'Arrastra y suelta archivos aquí'}
            </h4>
            <span className="mb-5 block w-full max-w-[290px] text-center text-sm text-gray-700 dark:text-gray-400">
              Archivos permitidos: {allowedExtensions.join(', ')}
            </span>
            <span className="bg-brand-500 shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300 rounded-md p-3 text-sm font-medium text-white transition">
              Buscar Archivos
            </span>
          </div>
        </form>
      </div>

      {(newArchivos?.length ?? 0) > 0 && (
        <div className="mt-6 rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="py-5">
            <h3 className="px-6 text-base font-medium text-gray-800 dark:text-white/90">
              Archivos seleccionados
            </h3>
            <div className="mt-6 grid grid-cols-1 gap-4 border-t border-gray-100 sm:grid-cols-2 sm:p-6 md:grid-cols-3 dark:border-gray-800">
              {newArchivos.map((file, index) => (
                <div className="flex flex-col" key={index}>
                  <label className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Archivo seleccionado:
                  </label>
                  <div className="group relative flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4 shadow-md dark:border-gray-700 dark:bg-gray-800">
                    {getFileIcon(file)}
                    <p className="flex-1 truncate text-sm text-gray-700 dark:text-gray-300">
                      {file.name}
                    </p>
                    <button
                      onClick={() => handleEliminar(index)}
                      className="absolute top-2 right-2 rounded-full bg-red-500 p-1 text-white opacity-0 shadow transition group-hover:opacity-100 hover:bg-red-600"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <label className="mt-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Seleccionar tipo <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={tipos[index] ?? ''}
                    onChange={(e) => handleTipoChange(index, e.target.value)}
                    className="shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/10 dark:focus:border-brand-800 mt-2 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 pr-11 text-sm text-black placeholder:text-black focus:ring-3 focus:outline-hidden dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
                  >
                    <option value="" className="text-black dark:bg-gray-900 dark:text-gray-400">
                      Seleccionar tipo
                    </option>
                    <option
                      value="Planilla"
                      className="text-black dark:bg-gray-900 dark:text-gray-400"
                    >
                      Planilla
                    </option>
                    <option value="Info" className="text-black dark:bg-gray-900 dark:text-gray-400">
                      Info
                    </option>
                    <option
                      value="Ficha"
                      className="text-black dark:bg-gray-900 dark:text-gray-400"
                    >
                      Ficha
                    </option>
                  </select>
                </div>
              ))}
            </div>
            <div className="ms-4 flex flex-row justify-start">
              <button
                type="button"
                onClick={uploadFileHandler}
                className="bg-brand-500 shadow-theme-xs hover:bg-brand-600 rounded-md p-3 text-sm font-medium text-white transition"
              >
                Subir archivos
              </button>
            </div>
          </div>
        </div>
      )}

      {(archivosFromDb?.length ?? 0) > 0 && (
        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="px-6 py-5">
            <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
              Tabla de archivos cargadas
            </h3>
          </div>
          <div className="border-t border-gray-100 p-4 sm:p-6 dark:border-gray-800">
            <div className="overflow-hidden rounded-xl bg-white dark:bg-white/[0.03]">
              <div className="custom-scrollbar max-w-full overflow-x-auto">
                <table className="min-w-full">
                  <thead className="border-t border-gray-100 dark:border-white/[0.05]">
                    <tr>
                      {['#', 'Titulo', 'Tipo', 'Status', 'Acciones'].map((col) => (
                        <th
                          key={col}
                          className="border border-gray-100 px-4 py-3 dark:border-white/[0.05]"
                        >
                          <p className="text-theme-xs font-medium text-gray-700 dark:text-gray-400">
                            {col}
                          </p>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {archivosFromDb.map((img, index) => (
                      <tr key={index}>
                        <td className="border border-gray-100 px-4 py-3 whitespace-nowrap dark:border-white/[0.05]">
                          {img.id}
                        </td>
                        <td className="border border-gray-100 px-4 py-3 text-sm whitespace-nowrap text-gray-800 dark:border-white/[0.05] dark:text-gray-400">
                          {img.title ?? '-'}
                        </td>
                        <td className="border border-gray-100 px-4 py-3 text-sm whitespace-nowrap text-gray-800 dark:border-white/[0.05] dark:text-gray-400">
                          {img.file_type}
                        </td>
                        <td className="border border-gray-100 px-4 py-3 whitespace-nowrap dark:border-white/[0.05]">
                          <Badge size="sm" color={img.status.data[0] === 1 ? 'success' : 'warning'}>
                            {img.status.data[0] === 1 ? 'Activo' : 'Inactivo'}
                          </Badge>
                        </td>
                        <td className="border border-gray-100 px-4 py-3 whitespace-nowrap dark:border-white/[0.05]">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                setPendingDeleteId(img.fk_iddoc);
                                setPendingDeleteTitle(img.title || img.filename || '');
                                setIsDeleteModalOpen(true);
                              }}
                              className="hover:text-error-500 text-gray-500 dark:text-gray-400"
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
                              onClick={() => {
                                setArchivoToEdit(img);
                                setIsEditModalOpen(true);
                              }}
                              className="text-gray-500 hover:text-gray-800 dark:text-gray-400"
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
      )}

      {/* Modal para editar archivo */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        className="max-w-[500px] p-6 lg:p-10"
      >
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Editar Archivo</h3>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Título
            </label>
            <Input
              placeholder="Ingrese el título"
              value={archivoToEdit?.title || ''}
              onChange={(e) =>
                setArchivoToEdit((prev) => (prev ? { ...prev, title: e.target.value } : null))
              }
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Descripción
            </label>
            <textarea
              rows={3}
              value={archivoToEdit?.description || ''}
              onChange={(e) =>
                setArchivoToEdit((prev) => (prev ? { ...prev, description: e.target.value } : null))
              }
              className="focus:border-brand-300 focus:ring-brand-500/10 dark:focus:border-brand-800 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2 text-sm text-black focus:ring-3 focus:outline-hidden dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
              placeholder="Ingrese la descripción"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Tipo de Archivo
            </label>
            <select
              value={getTipoOption(archivoToEdit?.file_type)}
              onChange={(e) =>
                setArchivoToEdit((prev) => (prev ? { ...prev, file_type: e.target.value } : null))
              }
              className="shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/10 dark:focus:border-brand-800 mt-2 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-black focus:ring-3 focus:outline-hidden dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
            >
              <option value="">Seleccionar tipo</option>
              <option value="planilla">Planilla</option>
              <option value="info">Info</option>
              <option value="fichas">Ficha</option>

              {archivoToEdit?.file_type && getTipoOption(archivoToEdit.file_type) === '' && (
                <option value={archivoToEdit.file_type}>{archivoToEdit.file_type}</option>
              )}
            </select>
          </div>

          <div className="flex items-center gap-3">
            <Switch
              key={archivoToEdit?.fk_iddoc || 'new'}
              label="Publicado"
              color="blue"
              defaultChecked={archivoToEdit?.status?.data?.[0] === 1}
              onChange={(checked) =>
                setArchivoToEdit((prev) =>
                  prev ? { ...prev, status: { type: 'Buffer', data: [checked ? 1 : 0] } } : null,
                )
              }
            />
          </div>

          <div className="mt-4 flex justify-end gap-3">
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300"
            >
              Cancelar
            </button>
            <button
              onClick={async () => {
                if (archivoToEdit) {
                  console.log(archivoToEdit);

                  try {
                    await apiClient.put(
                      '/upload/update-file',
                      {
                        id: postId,
                        fk_iddoc: archivoToEdit.fk_iddoc,
                        title: archivoToEdit.title,
                        desc: archivoToEdit.description,
                        type: archivoToEdit.file_type,
                        status: archivoToEdit.status.data[0],
                      },
                      {
                        params: { table: seccion },
                      },
                    );
                    setArchivosFromDb((prev) =>
                      prev.map((a) => (a.fk_iddoc === archivoToEdit.fk_iddoc ? archivoToEdit : a)),
                    );
                    setIsEditModalOpen(false);
                    toast.success('Archivo actualizado correctamente');
                  } catch (error) {
                    console.error('Error al actualizar archivo', error);
                    toast.error('Error al actualizar archivo');
                  }
                }
              }}
              className="bg-brand-500 hover:bg-brand-600 rounded-lg px-4 py-2 text-sm font-medium text-white"
            >
              Guardar Cambios
            </button>
          </div>
        </div>
      </Modal>

      {/* Modal de Confirmación de Eliminación */}
      <ConfirmationModal
        SetIsOpen={setIsDeleteModalOpen}
        isOpen={isDeleteModalOpen}
        handleRequest={handleEliminarFromDb}
        title={pendingDeleteTitle}
        option={ParlamentariaOptions.Archivo}
        isAdd={false}
      />
    </ComponentCard>
  );
};

export default FileDropzone;
