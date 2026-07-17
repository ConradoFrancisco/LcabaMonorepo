'use client';
import React, { useEffect, useState } from 'react';
import EditComponent, { Itabs } from '@/components/my-components/wizard/EditComponent';
import useHandlerChange from '@/hooks/useHandlerChange';
import Textos, { textosSchema } from '../../../../../add-register/components/Textos';
import RevistaPublicacionSeteos, {
  revistaPublicacionSeteosSchema,
} from './RevistaPublicacionSeteos';
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
  ISeteosPublicacionRevista,
  MagazinePost,
  IDia,
  EditComponentState,
  CulturaPost,
} from '@/types/postTypes';
import { buildPublicUrlLaRevista } from '@/utils/buildPublicUrl';
import QR from '@/components/my-components/wizard/QR';
import InfoParlamentaria from '@/components/my-components/wizard/InfoParlamentaria/InfoParlamentaria';
import PostService from '../../../../../../../../services/PostService';
import { useAuth } from '@/context/AuthContext';

export default function RevistaEditComponent({ data }: { data: MagazinePost }) {
  const { auth } = useAuth();
  // MAIN DATA POR PROPS
  const { textos, seteos, images, archivos, videos, dias, audios, infoParlamentaria } = data;
  //
  const [tituloHeader, setTituloHeader] = useState(data?.textos?.title);
  const [imagesFromDB, setImagesFromDB] = useState<Image[]>(images);
  // IMAGENES NUEVAS
  const [nuevasImagenes, setNewImagenes] = useState<File[]>([]);
  const [infoParlamentariaState, setInfoParlamentariaState] =
    useState<CulturaPost['infoParlamentaria']>(infoParlamentaria);
  // ARCHIVOS NUEVOS
  const [archivosFromDb, setArchivosFromDb] = useState(archivos);
  const [nuevosArchivos, setNuevosArchivos] = useState<File[]>([]);
  const [videosDb, setVideosDb] = useState(videos);
  const [audiosDb, setAudiosDb] = useState(audios);

  //DIAS NUEVOS
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

  const [lineas, setLineas] = useState<IDia[]>(formatLineas(dias));

  useEffect(() => {
    setState((prev) => ({
      ...prev,
      newDays: lineas,
    }));
  }, [lineas]);

  //MAIN STATE PARA EL PAYLOAD
  const [state, setState] = useState<EditComponentState>({
    textos: { ...textos },
    seteos: { ...seteos },
    nuevasImagenes: [],
    nuevosArchivos: [],
    newVideos: [],
    newAudios: [],
    newDays: lineas,
  });
  const setSeteos = (newSeteos: EditComponentState['seteos']) => {
    setState((prev) => ({ ...prev, seteos: newSeteos }));
  };

  const setTextos = (newTextos: EditComponentState['textos']) => {
    setState((prev) => ({ ...prev, textos: newTextos }));
  };

  const siteUrl = process.env.NEXT_PUBLIC_REVISTA_URL || '';

  const publicUrl = seteos?.id
    ? buildPublicUrlLaRevista({
        origin: siteUrl,
        section: 'posts',
        id: seteos.id,
        idcategories: seteos.idcategories,
      })
    : '';

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
        <RevistaPublicacionSeteos
          seteos={state.seteos as ISeteosPublicacionRevista}
          setSeteos={setSeteos}
        />
      ),
    },
    {
      id: 'fecha-y-hora',
      label: 'Fecha y hora',
      icon: Calendar,
      component: (
        <FechaYHora
          lineas={lineas}
          setLineas={setLineas}
          date_ini={seteos.date_ini}
          date_end={seteos.date_end}
          setdateIni={(val) => setSeteos({ ...state.seteos, date_ini: val })}
          setdateEnd={(val) => setSeteos({ ...state.seteos, date_end: val })}
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
          seccion="magazine_posts"
          postId={seteos.id}
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
          archivosFromDb={archivosFromDb}
          newArchivos={nuevosArchivos}
          setNewArchivos={setNuevosArchivos}
          postId={seteos.id}
          seccion="magazine_posts"
          setArchivosFromDb={setArchivosFromDb}
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
      id: 'audios',
      label: 'Audios',
      icon: Mic,
      component: (
        <Audios
          audiosdb={audiosDb}
          setAudiosdb={setAudiosDb}
          newAudios={state.newAudios ?? []}
          setNewAudios={(newV) => setState((prev) => ({ ...prev, newAudios: newV }))}
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
          table="magazine_"
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
          logoSrc="/images/logo/logoLaRevista.png"
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
      return PostService.editPost(updatedPayload);
    },
    rutaDestino: '/revista/publicaciones',
    schemas: [
      { schema: textosSchema, data: state.textos, tab: 'textos' },
      {
        schema: revistaPublicacionSeteosSchema,
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
      // Re-fetch del post para actualizar audiosDb con los IDs reales del backend
      try {
        const refreshed = await PostService.getPostById(String(seteos.id), 'magazine_');
        if (refreshed?.audios) {
          setAudiosDb(refreshed.audios);
        }
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
