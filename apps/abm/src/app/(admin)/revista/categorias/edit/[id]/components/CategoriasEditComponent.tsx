'use cliente';
'use client';
import React, { useEffect, useState } from 'react';
import EditComponent, { Itabs } from '@/components/my-components/wizard/EditComponent';
import useHandlerChange from '@/hooks/useHandlerChange';
import Textos, { textosSchema } from '../../../../../add-register/components/Textos';
import FechaYHora from '@/components/my-components/wizard/FechaYhora';
import Audios from '@/components/my-components/wizard/Audios';
import {
  Calendar,
  File,
  FileText,
  ImageIcon,
  QrCode,
  Mic,
  Settings,
  Video,
  Landmark,
} from 'lucide-react';
import DropzoneComponent from '@/components/form/form-elements/DropZone';
import FileDropzone from '@/components/my-components/wizard/DropzoneFile';
import Videos from '@/components/my-components/wizard/Videos';
import {
  Image,
  ISeteosCategoriasRevista,
  MagazinePost,
  IDia,
  EditComponentState,
  CulturaPost,
} from '@/types/postTypes';
import PostService from '../../../../../../../../services/PostService';
import { useAuth } from '@/context/AuthContext';
import CategoriasRevistaSeteos from './CategoriasRevistaSeteos';

export default function CategoriasEditComponent({ data }: { data: MagazinePost }) {
  const { textos, seteos, images, videos, archivos } = data;
  const [imagesFromDB, setImagesFromDB] = useState<Image[]>(images);
  const [nuevasImagenes, setNewImagenes] = useState<File[]>([]);
  const [videosDb, setVideosDb] = useState(videos);
  const [archivosFromDb, setArchivosFromDb] = useState(archivos);
  const [nuevosArchivos, setNuevosArchivos] = useState<File[]>([]);
  const [tituloHeader, setTituloHeader] = useState(data?.textos?.title);
  const [activeTab, setActiveTab] = useState('textos');
  const { auth } = useAuth();
  const setSeteos = (newSeteos: EditComponentState['seteos']) => {
    setState((prev) => ({ ...prev, seteos: newSeteos }));
  };
  const dayMap: Record<string, string> = {
    sunday: '0',
    monday: '1',
    tuesday: '2',
    wednesday: '3',
    thursday: '4',
    friday: '5',
    saturday: '6',
  };
  const formatLineas = (apiData: IDia[]): IDia[] => {
    if (!apiData) return [];
    return apiData.map((item) => {
      const dayKey = (item.day || '').trim().toLowerCase();
      return {
        ...item,
        dia: item.date ? '8' : dayMap[dayKey] || '',
        desde: item.hour_start ? item.hour_start.substring(0, 5) : '',
        hasta: item.hour_end ? item.hour_end.substring(0, 5) : '',
        descripcion: item.date_desc || '',
        date: item.date || '',
      };
    });
  };
  const [state, setState] = useState<EditComponentState>({
    textos: { ...textos },
    seteos: { ...seteos },
    nuevasImagenes: [],
    nuevosArchivos: [],
    newVideos: [],
    newAudios: [],
  });
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
      return PostService.editPost(updatedPayload);
    },
    rutaDestino: '/revista/categorias',
    state,
    setActiveTab,
    onSuccess: async () => {
      setTituloHeader(state.textos.title);
      setState((prev) => ({
        ...prev,
      }));
    },
  });
  const setTextos = (newTextos: EditComponentState['textos']) => {
    setState((prev) => ({ ...prev, textos: newTextos }));
  };
  const tabs: Itabs[] = [
    {
      id: 'textos',
      label: 'Textos',
      icon: FileText,
      component: <Textos hasUrlExternal={true} {...state.textos} setTextos={setTextos} />,
    },
    {
      id: 'seteos',
      label: 'Seteos',
      icon: Settings,
      component: (
        <CategoriasRevistaSeteos
          seteos={state.seteos as ISeteosCategoriasRevista}
          setSeteos={setSeteos}
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
          seccion="magazine_categories"
          postId={seteos.id}
          setImagesFromDB={setImagesFromDB}
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
          table="magazine_"
        />
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
          postId={seteos.id}
          seccion="magazine_categories"
          setArchivosFromDb={setArchivosFromDb}
        />
      ),
    },
  ];

  return (
    <EditComponent
      state={state}
      handleEditChange={handleEditChange}
      tabs={tabs}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      tituloPosteo={tituloHeader}
      tituloCard="Editar Registro"
    />
  );
}
