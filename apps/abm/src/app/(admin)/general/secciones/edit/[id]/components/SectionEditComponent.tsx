'use client';

import React, { useState } from 'react';
import EditComponent, { Itabs } from '@/components/my-components/wizard/EditComponent';
import useHandlerChange from '@/hooks/useHandlerChange';

import { useAuth } from '@/context/AuthContext';
import {
  FileText,
  Settings,
  ImageIcon,
  Video,
  File,
  Info,
  GitBranch,
} from 'lucide-react';
import SectionTextos, { sectionTextosSchema } from './SectionTextos';
import SectionSeteos from './SectionSeteos';
import DropzoneComponent from '@/components/form/form-elements/DropZone';
import FileDropzone from '@/components/my-components/wizard/DropzoneFile';
import { Image } from '@/types/postTypes';
import GeneralService from '../../../../../../../../services/GeneralService';

export default function SectionEditComponent({ data }: { data: any }) {
  const { auth } = useAuth();
  const { textos, seteos, images, archivos } = data;

  const [tituloHeader, setTituloHeader] = useState(data?.textos?.title || 'Sección');
  const [imagesFromDB, setImagesFromDB] = useState<Image[]>(images ?? []);
  const [nuevasImagenes, setNewImagenes] = useState<File[]>([]);
  const [archivosFromDb, setArchivosFromDb] = useState(archivos ?? []);
  const [nuevosArchivos, setNuevosArchivos] = useState<File[]>([]);

  const [state, setState] = useState({
    textos: { ...textos },
    seteos: { ...seteos },
    nuevasImagenes: [],
    nuevosArchivos: [],
  });

  const setTextos = (newTextos: typeof state.textos) => {
    setState((prev) => ({ ...prev, textos: newTextos }));
  };

  const setSeteos = (newSeteos: typeof state.seteos) => {
    setState((prev) => ({ ...prev, seteos: newSeteos }));
  };

  const [activeTab, setActiveTab] = useState('textos');

  const tabs: Itabs[] = [
    {
      id: 'textos',
      label: 'General',
      icon: FileText,
      component: <SectionTextos {...state.textos} setTextos={setTextos} />,
    },
    {
      id: 'seteos',
      label: 'Seteos',
      icon: Settings,
      component: <SectionSeteos setSeteos={setSeteos} seteos={state.seteos} />,
    },
    {
      id: 'imagenes',
      label: 'Imágenes',
      icon: ImageIcon,
      component: (
        <DropzoneComponent
          imagesFromDB={imagesFromDB}
          newImagenes={nuevasImagenes}
          setNewImagenes={setNewImagenes}
          seccion="menu"
          postId={seteos?.id}
          setImagesFromDB={setImagesFromDB}
        />
      ),
    },
    {
      id: 'videos',
      label: 'Videos',
      icon: Video,
      component: (
        <div className="card-surface flex items-center justify-center rounded-2xl border border-gray-200 p-10 dark:border-gray-700">
          <p className="text-sm text-gray-500">Videos — próximamente</p>
        </div>
      ),
    },
    {
      id: 'archivos',
      label: 'Archivos',
      icon: File,
      component: (
        <FileDropzone
          archivosFromDb={archivosFromDb}
          newArchivos={nuevosArchivos}
          setNewArchivos={setNuevosArchivos}
          postId={seteos?.id}
          seccion="menu"
          setArchivosFromDb={setArchivosFromDb}
        />
      ),
    },
    {
      id: 'infoAdicional',
      label: 'Info Adicional',
      icon: Info,
      component: (
        <div className="card-surface flex items-center justify-center rounded-2xl border border-gray-200 p-10 dark:border-gray-700">
          <p className="text-sm text-gray-500">Info Adicional — próximamente</p>
        </div>
      ),
    },
    {
      id: 'subMenus',
      label: 'Sub Menús',
      icon: GitBranch,
      component: (
        <div className="card-surface flex items-center justify-center rounded-2xl border border-gray-200 p-10 dark:border-gray-700">
          <p className="text-sm text-gray-500">Sub Menús — próximamente</p>
        </div>
      ),
    },
  ];

  const handleEditChange = useHandlerChange({
    service: (payload) => {
      const currentUserId = auth.user?.id_user;
      const updatedPayload = {
        ...payload,
        seteos: {
          ...payload.seteos,
          iduser_upd: currentUserId,
          id_userupd: currentUserId,
        },
      };
      return GeneralService.editSection(updatedPayload);
    },
    rutaDestino: '/general/secciones',
    schemas: [{ schema: sectionTextosSchema, data: state.textos, tab: 'textos' }],
    state,
    setActiveTab,
    onSuccess: async () => {
      setTituloHeader(state.textos?.title || 'Sección');
      setState((prev) => ({
        ...prev,
        nuevasImagenes: [],
        nuevosArchivos: [],
      }));
      setNewImagenes([]);
      setNuevosArchivos([]);
    },
  });

  return (
    <EditComponent
      state={state}
      handleEditChange={handleEditChange}
      tabs={tabs}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      tituloPosteo={tituloHeader}
      tituloCard="Editar Sección"
    />
  );
}
