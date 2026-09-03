'use client';
import React, { useEffect, useState } from 'react';
import EditComponent, { Itabs } from '@/components/my-components/wizard/EditComponent';
import useHandlerChange from '@/hooks/useHandlerChange';
import Textos, { textosSchema } from '../../../../../add-register/components/Textos';
import { Calendar, File, FileText, ImageIcon, Settings, Video } from 'lucide-react';
import DropzoneComponent from '@/components/form/form-elements/DropZone';
import FileDropzone from '@/components/my-components/wizard/DropzoneFile';
import Videos from '@/components/my-components/wizard/Videos';
import {
  Image,
  ISeteosCategoriasRevista,
  MagazinePost,
  EditComponentState,
} from '@/types/postTypes';
import { useAuth } from '@/context/AuthContext';
import CategoriasRevistaSeteos from './CategoriasRevistaSeteos';
import CategoriesServices from '../../../../../../../../services/CategoriesServices';

type CategoriaTipo = Record<string, unknown> & {
  id: number;
  title?: string;
  description?: string;
  shortdesc?: string;
  extradesc?: string;
  subtitle?: string;
  url?: string;
  url_ext?: string;
  images?: Image[];
  videos?: MagazinePost['videos'];
  archivos?: MagazinePost['archivos'];
};

export default function CategoriasEditComponent({ response }: { response: CategoriaTipo }) {
  const {
    title,
    description,
    shortdesc,
    extradesc,
    subtitle,
    url,
    url_ext,
    images,
    videos,
    archivos,
    ...seteos
  } = response;
  const textos = {
    title: title ?? '',
    description: description ?? '',
    shortdesc: shortdesc ?? '',
    extradesc: extradesc ?? '',
    subtitle: subtitle ?? '',
    url: url ?? '',
    url_ext: url_ext ?? '',
  };

  const [imagesFromDB, setImagesFromDB] = useState<Image[]>(images ?? []);
  const [nuevasImagenes, setNewImagenes] = useState<File[]>([]);
  const [videosDb, setVideosDb] = useState(videos ?? []);
  const [archivosFromDb, setArchivosFromDb] = useState(archivos ?? []);
  const [nuevosArchivos, setNuevosArchivos] = useState<File[]>([]);
  const [tituloHeader, setTituloHeader] = useState(title);
  const [activeTab, setActiveTab] = useState('textos');
  const { auth } = useAuth();
  const setSeteos = (newSeteos: EditComponentState['seteos']) => {
    setState((prev) => ({ ...prev, seteos: newSeteos }));
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
      return CategoriesServices.editCategory(updatedPayload);
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
          postId={response.id}
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
          postId={response.id}
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
      tituloCard="Editar categoría"
    />
  );
}
