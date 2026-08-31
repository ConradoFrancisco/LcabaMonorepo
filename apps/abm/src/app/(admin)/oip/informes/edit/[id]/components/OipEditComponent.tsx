'use client';

import React, { useState } from 'react';
import EditComponent, { Itabs } from '@/components/my-components/wizard/EditComponent';
import useHandlerChange from '@/hooks/useHandlerChange';
import Textos, { textosSchema } from '../../../../../add-register/components/Textos';
import {
  File,
  FileText,
  ImageIcon,
  Landmark,
  Video,
  Settings,
  Info,
} from 'lucide-react';
import DropzoneComponent from '@/components/form/form-elements/DropZone';
import FileDropzone from '@/components/my-components/wizard/DropzoneFile';
import Videos from '@/components/my-components/wizard/Videos';
import {
  Image,
  CulturaPost,
  IArchivo,
  EditComponentState,
} from '@/types/postTypes';
import InfoParlamentaria from '@/components/my-components/wizard/InfoParlamentaria/InfoParlamentaria';
import OipPublicacionSeteos, {
  oipPublicacionSeteosSchema,
} from './OipPublicacionSeteos';
import PostService from '../../../../../../../../services/PostService';
import { useAuth } from '@/context/AuthContext';

export default function OipEditComponent({ data }: { data: CulturaPost }) {
  const { auth } = useAuth();
  const { textos, seteos, images, archivos, videos, infoParlamentaria } = data;
  const [tituloHeader, setTituloHeader] = useState(data?.textos?.title);

  // Imágenes existentes y nuevas
  const [imagesFromDB, setImagesFromDB] = useState<Image[]>(images || []);
  const [nuevasImagenes, setNewImagenes] = useState<File[]>([]);

  // Archivos existentes y nuevos
  const [nuevosArchivos, setNuevosArchivos] = useState<File[]>([]);
  const [archivosFromDb, setArchivosFromDb] = useState<IArchivo[]>(archivos || []);
  const [infoParlamentariaState, setInfoParlamentariaState] =
    useState<CulturaPost['infoParlamentaria']>(infoParlamentaria);

  // Videos existentes
  const [videosDb, setVideosDb] = useState(videos || []);

  const [state, setState] = useState<EditComponentState>({
    textos: { ...textos },
    seteos: { ...seteos },
    nuevasImagenes: [],
    nuevosArchivos: [],
    newVideos: [],
    newAudios: [],
    newDays: [],
  });

  const setSeteos = (newSeteos: EditComponentState['seteos']) => {
    setState((prev) => ({ ...prev, seteos: newSeteos }));
  };

  const setTextos = (newTextos: EditComponentState['textos']) => {
    setState((prev) => ({ ...prev, textos: newTextos }));
  };

  // Pestañas exactas solicitadas en las capturas:
  // Textos | Info Parlamentaria | Seteos | Imágenes | Archivos | Videos | Info Adicional
  const tabs: Itabs[] = [
    {
      id: 'textos',
      label: 'Textos',
      icon: FileText,
      component: (
        <Textos
          hasUrlExternal={false}
          generaUrlDesdeTitulo={true}
          {...state.textos}
          setTextos={setTextos}
        />
      ),
    },
    {
      id: 'infoParlamentaria',
      label: 'Info Parlamentaria',
      icon: Landmark,
      component: (
        <InfoParlamentaria
          postId={seteos?.id}
          setInfoParlamentaria={setInfoParlamentariaState}
          infoParlamentaria={infoParlamentariaState}
          table="evidencias_"
        />
      ),
    },
    {
      id: 'seteos',
      label: 'Seteos',
      icon: Settings,
      component: (
        <OipPublicacionSeteos
          seteos={state.seteos}
          setSeteos={setSeteos}
          textos={state.textos}
          setTextos={setTextos}
        />
      ),
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
          seccion="evidencias_posts"
          postId={seteos?.id}
          setImagesFromDB={setImagesFromDB}
        />
      ),
    },
    {
      id: 'archivos',
      label: 'Archivos',
      icon: File,
      component: (
        <FileDropzone
          setArchivosFromDb={setArchivosFromDb}
          archivosFromDb={archivosFromDb}
          newArchivos={nuevosArchivos}
          setNewArchivos={setNuevosArchivos}
          seccion="evidencias_posts"
          postId={seteos?.id}
        />
      ),
    },
    {
      id: 'videos',
      label: 'Videos',
      icon: Video,
      component: (
        <Videos
          videosdb={videosDb}
          setVideosdb={setVideosDb}
          newVideos={state.newVideos}
          setNewVideos={(newV) => setState((prev) => ({ ...prev, newVideos: newV }))}
          table="evidencias_"
        />
      ),
    },
    {
      id: 'infoAdicional',
      label: 'Info Adicional',
      icon: Info,
      component: (
        <div className="card-surface flex items-center justify-center rounded-2xl border border-gray-200 p-10 dark:border-gray-700">
          <p className="text-sm text-gray-500">Info Adicional — disponible próximamente</p>
        </div>
      ),
    },
  ];

  const [activeTab, setActiveTab] = useState('textos');

  const handleEditChange = useHandlerChange({
    service: (payload) => {
      const currentUserId = auth.user?.id_user;
      const updatedPayload = {
        ...payload,
        table: 'evidencias_',
        seteos: {
          ...payload.seteos,
          iduser_upd: currentUserId,
          id_userupd: currentUserId,
        },
      };
      return PostService.editOipPost(updatedPayload);
    },
    rutaDestino: '/oip/informes',
    schemas: [
      { schema: textosSchema, data: state.textos, tab: 'textos' },
      {
        schema: oipPublicacionSeteosSchema,
        data: state.seteos,
        tab: 'seteos',
      },
    ],
    state,
    setActiveTab,
    onSuccess: async () => {
      setTituloHeader(state.textos?.title);
    },
  });

  return (
    <EditComponent
      state={state}
      tabs={tabs}
      handleEditChange={handleEditChange}
      setActiveTab={setActiveTab}
      activeTab={activeTab}
      tituloPosteo={tituloHeader}
      tituloCard="Editar Informe - OIP"
    />
  );
}
