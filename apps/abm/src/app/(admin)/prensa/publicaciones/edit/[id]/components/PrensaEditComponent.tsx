'use client';
import React, { useEffect, useState } from 'react';
import EditComponent, { Itabs } from '@/components/my-components/wizard/EditComponent';
import useHandlerChange from '@/hooks/useHandlerChange';
import CulturaService from '../../../../../../../../services/CulturaService';
import Textos, { textosSchema } from '../../../../../add-register/components/Textos';
import { File, FileText, ImageIcon, Landmark, Video, QrCode, Settings } from 'lucide-react';
import DropzoneComponent from '@/components/form/form-elements/DropZone';
import FileDropzone from '@/components/my-components/wizard/DropzoneFile';
import Videos from '@/components/my-components/wizard/Videos';
import {
  Image,
  ISeteosPublicacionCultura,
  CulturaPost,
  IArchivo,
  IDia,
  EditComponentState,
} from '@/types/postTypes';
import InfoParlamentaria from '@/components/my-components/wizard/InfoParlamentaria/InfoParlamentaria';
import { buildPublicUrlGeneral } from '@/utils/buildPublicUrl';
import QR from '@/components/my-components/wizard/QR';
import PrensaPublicacionSeteos, { prensaPublicacionSeteosSchema } from './PrensaPublicacionSeteos';
import PrensaService from '../../../../../../../../services/PrensaService';
import PostService from '../../../../../../../../services/PostService';
import { useAuth } from '@/context/AuthContext';

export default function PrensaEditComponent({ data }: { data: CulturaPost }) {
  const { auth } = useAuth();
  // MAIN DATA POR PROPS
  const { textos, seteos, images, archivos, videos, dias, infoParlamentaria } = data;
  console.table(data);
  const [tituloHeader, setTituloHeader] = useState(data?.textos?.title);

  // IMAGENES NUEVAS
  const [imagesFromDB, setImagesFromDB] = useState<Image[]>(images);
  const [nuevasImagenes, setNewImagenes] = useState<File[]>([]);

  // ARCHIVOS NUEVOS
  const [nuevosArchivos, setNuevosArchivos] = useState<File[]>([]);
  const [archivosFromDb, setArchivosFromDb] = useState<IArchivo[]>(archivos);
  const [infoParlamentariaState, setInfoParlamentariaState] =
    useState<CulturaPost['infoParlamentaria']>(infoParlamentaria);

  // Videos existentes (estado, para reflejar delete/edit sin recargar)
  const [videosDb, setVideosDb] = useState(videos);

  //MAIN STATE PARA EL PAYLOAD
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

  const siteUrl = process.env.NEXT_PUBLIC_PRENSA_URL || '';
  const titulo = state.textos?.title || '';

  const publicUrl = titulo
    ? buildPublicUrlGeneral({
        origin: siteUrl,
        section: 'posts',
        title: titulo,
      })
    : '';

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
      id: 'seteos',
      label: 'Seteos',
      icon: Settings,
      component: (
        <PrensaPublicacionSeteos
          seteos={state.seteos as ISeteosPublicacionCultura}
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
          seccion="posts"
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
          seccion="posts"
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
          table=" "
        />
      ),
    },
    {
      id: 'infoParlamentaria',
      label: 'Info. Parlamentaria',
      icon: Landmark,
      component: (
        <InfoParlamentaria
          postId={seteos?.id}
          setInfoParlamentaria={setInfoParlamentariaState}
          infoParlamentaria={infoParlamentariaState}
          table=" "
        />
      ),
    },
    {
      id: 'qr',
      label: 'QR',
      icon: QrCode,
      component: (
        <QR
          title="QR de la publicación"
          value={publicUrl}
          logoSrc="/images/logo/logitoLegis.png"
          size={280}
          logoSize={64}
          level="H"
        />
      ),
    },
  ];

  const [activeTab, setActiveTab] = useState('textos');

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
      return PrensaService.editPost(updatedPayload);
    },
    rutaDestino: '/prensa/publicaciones',
    schemas: [
      { schema: textosSchema, data: state.textos, tab: 'textos' },
      {
        schema: prensaPublicacionSeteosSchema,
        data: state.seteos,
        tab: 'seteos',
      },
    ],
    state,
    setActiveTab,
    onSuccess: async () => {
      setTituloHeader(state.textos.title);
      setState((prev) => ({
        ...prev,
        newAudios: [],
        newVideos: [],
        nuevasImagenes: [],
        nuevosArchivos: [],
      }));
      setNewImagenes([]);
      setNuevosArchivos([]);
      // Re-fetch del post para que los videos recién agregados aparezcan
      // con su id real (sin tener que recargar con F5)
      try {
        const refreshed = await PostService.getPostById(String(seteos?.id), ' ');
        if (refreshed?.videos) {
          setVideosDb(refreshed.videos);
        }
      } catch {
        // Si falla el re-fetch, no es crítico
      }
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
      tituloCard="Editar Registro"
    />
  );
}
