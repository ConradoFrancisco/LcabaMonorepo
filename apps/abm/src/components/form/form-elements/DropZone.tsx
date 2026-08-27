'use client';
import React from 'react';
import ComponentCard from '../../common/ComponentCard';
import { useDropzone } from 'react-dropzone';
import { Trash2 } from 'lucide-react';
import ImageTable from '@/components/my-components/wizard/ImageTable';
import axios from 'axios';
import { Image } from '@/types/postTypes';
import { toast } from 'react-toastify';
import { useAuth } from '@/context/AuthContext';
import apiClient from '../../../../services/apiClient';

interface DropzoneProps {
  imagesFromDB: Image[];
  newImagenes: File[];
  setNewImagenes: React.Dispatch<React.SetStateAction<File[]>>;
  seccion?: string;
  postId: number;
  setImagesFromDB: React.Dispatch<React.SetStateAction<Image[]>>;
}

const DropzoneComponent: React.FC<DropzoneProps> = ({
  imagesFromDB,
  newImagenes,
  setNewImagenes,
  seccion,
  postId,
  setImagesFromDB,
}) => {
  const onDrop = (acceptedFiles: File[]) => {
    setNewImagenes((prev: File[]) => [...prev, ...acceptedFiles]);
  };

  const { auth } = useAuth();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/png': [],
      'image/jpeg': [],
      'image/webp': [],
      'image/svg+xml': [],
    },
  });

  const handleEliminar = (index: number) => {
    setNewImagenes((prev) => prev.filter((_, i) => i !== index));
  };

  const uploadImageHandler = async () => {
    if (newImagenes.length === 0) return alert('No hay imágenes para subir');
    try {
      const formData = new FormData();
      newImagenes.forEach((file) => {
        formData.append('file', file);
      });

      const response = await apiClient.post(
        '/upload/upload-images',
        formData,
        {
          params: {
            table: seccion,
            postId,
            username: auth.user?.username,
          },
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      setImagesFromDB(response.data.files);
      setNewImagenes([]);
      toast.success('Imágenes subidas correctamente!');
    } catch (error) {
      console.error('Error al subir imágenes', error);
      alert('Error al subir imágenes');
    }
  };

  return (
    <ComponentCard title="Subir Imágenes">
      <div
        {...getRootProps()}
        className={`cursor-pointer rounded-xl border border-dashed p-7 transition lg:p-10 ${isDragActive
          ? 'border-brand-500 bg-gray-100 dark:bg-gray-800'
          : 'border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-900'
          }`}
      >
        <input {...getInputProps()} />
        <div className="text-center">
          <div className="mb-3 flex justify-center">
            <div className="flex h-[68px] w-[68px] items-center justify-center rounded-full bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-400">
              📁
            </div>
          </div>
          <h4 className="text-theme-xl mb-3 font-semibold text-gray-800 dark:text-white/90">
            {isDragActive ? 'Suelta imágenes aquí' : 'Arrastra y suelta archivos aquí'}
          </h4>
          <span className="block text-sm text-gray-700 dark:text-gray-400">
            PNG, JPG, WebP, SVG
          </span>
        </div>
      </div>

      {newImagenes.length > 0 && (
        <div className="mt-5 rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="px-6 py-5">
            <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
              Nuevas imágenes
            </h3>
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {newImagenes.map((file, index) => {
                const src = URL.createObjectURL(file);
                return (
                  <div key={index} className="group relative">
                    <img
                      width={128}
                      height={128}
                      src={src}
                      alt={`Vista previa de ${file.name}`}
                      className="h-full w-full rounded-lg object-cover shadow-md"
                    />
                    <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/50 opacity-0 transition group-hover:opacity-100">
                      <button
                        onClick={() => handleEliminar(index)}
                        className="rounded-lg bg-red-500 px-3 py-1 text-white shadow hover:bg-red-600"
                      >
                        <Trash2 />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 flex justify-start">
              <button
                onClick={uploadImageHandler}
                className="bg-brand-500 shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300 rounded-md p-3 text-sm font-medium text-white transition"
              >
                Guardar imágenes
              </button>
            </div>
          </div>
        </div>
      )}

      {(imagesFromDB?.length ?? 0) > 0 && (
        <ImageTable
          images={imagesFromDB}
          setImagesFromDB={setImagesFromDB}
          postId={postId}
          seccion={seccion || 'magazine_posts'}
        />
      )}
    </ComponentCard>
  );
};

export default DropzoneComponent;
