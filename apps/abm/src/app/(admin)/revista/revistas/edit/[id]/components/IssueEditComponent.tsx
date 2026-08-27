'use client';

import React, { useState } from 'react';
import EditComponent, { Itabs } from '@/components/my-components/wizard/EditComponent';
import useHandlerChange from '@/hooks/useHandlerChange';
import IssueTextos, { issueTextosSchema } from './IssueTextos';
import { File, FileText, ImageIcon, Settings, Video } from 'lucide-react';
import DropzoneComponent from '@/components/form/form-elements/DropZone';
import FileDropzone from '@/components/my-components/wizard/DropzoneFile';
import Videos from '@/components/my-components/wizard/Videos';
import { Image, ISeteosIssue, MagazinePost, EditComponentState } from '@/types/postTypes';
import { useAuth } from '@/context/AuthContext';
import IssueSeteos from './IssueSeteos';
import IssueService from '../../../../../../../../services/IssueService';

type IssueTipo = Record<string, unknown> & {
  id: number;
  title?: string;
  description?: string;
  shortdesc?: string;
  extradesc?: string;
  subtitle?: string;
  url?: string;
  url_ext?: string;
  keywords?: string | string[];
  magazine_number?: number;
  numero?: number;
  bgcolor?: string;
  textcolor?: string;
  images?: Image[];
  videos?: MagazinePost['videos'];
  archivos?: MagazinePost['archivos'];
};

export default function IssueEditComponent({ response }: { response: IssueTipo }) {
  const {
    title,
    description,
    shortdesc,
    extradesc,
    subtitle,
    url,
    url_ext,
    keywords: rawKeywords,
    images,
    videos,
    archivos,
    status: rawStatus,
    ...restSeteos
  } = response;

  let parsedStatus = rawStatus;
  if (typeof rawStatus === 'object' && rawStatus !== null && 'data' in (rawStatus as any)) {
    parsedStatus = (rawStatus as any).data?.[0] ?? 0;
  } else if (rawStatus === true) {
    parsedStatus = 1;
  } else if (rawStatus === false) {
    parsedStatus = 0;
  }

  const seteos = { ...restSeteos, status: parsedStatus };

  let parsedKeywords = rawKeywords ?? '';
  if (Array.isArray(parsedKeywords)) {
    parsedKeywords = parsedKeywords.join(',');
  }

  const textos = {
    title: title ?? '',
    description: description ?? '',
    shortdesc: shortdesc ?? '',
    keywords: parsedKeywords,
  };

  const [imagesFromDB, setImagesFromDB] = useState<Image[]>(images ?? []);
  const [nuevasImagenes, setNewImagenes] = useState<File[]>([]);
  const [videosDb, setVideosDb] = useState(videos ?? []);
  const [archivosFromDb, setArchivosFromDb] = useState(archivos ?? []);
  const [nuevosArchivos, setNuevosArchivos] = useState<File[]>([]);
  const [tituloHeader, setTituloHeader] = useState(title);
  const [activeTab, setActiveTab] = useState('textos');
  const { auth } = useAuth();

  const [state, setState] = useState<EditComponentState<ISeteosIssue>>({
    textos: { ...textos },
    seteos: { id: response.id, ...seteos } as unknown as ISeteosIssue,
    nuevasImagenes: [],
    nuevosArchivos: [],
    newVideos: [],
    newAudios: [],
  });

  const setSeteos = (newSeteos: ISeteosIssue) => {
    setState((prev) => ({ ...prev, seteos: newSeteos }));
  };

  const setTextos = (newTextos: EditComponentState['textos']) => {
    setState((prev) => ({ ...prev, textos: newTextos }));
  };

  const handleEditChange = useHandlerChange({
    service: (payload) => {
      const currentUserId = auth.user?.id_user;
      let statusToSave = payload.seteos.status;
      if (typeof statusToSave === 'object' && statusToSave !== null && 'data' in (statusToSave as any)) {
        statusToSave = (statusToSave as any).data?.[0] ?? 0;
      } else if (statusToSave === true) {
        statusToSave = 1;
      } else if (statusToSave === false) {
        statusToSave = 0;
      }

      const updatedPayload = {
        ...payload,
        table: 'magazine_issue',
        seteos: {
          ...payload.seteos,
          status: statusToSave,
          iduser_upd: currentUserId,
          id_userupd: currentUserId,
        },
      };
      return IssueService.editIssue(updatedPayload);
    },
    rutaDestino: '/revista/revistas',
    state,
    setActiveTab,
    onSuccess: async () => {
      setTituloHeader(state.textos.title);
      setState((prev) => ({
        ...prev,
      }));
    },
  });

  const tabs: Itabs[] = [
    {
      id: 'textos',
      label: 'Textos',
      icon: FileText,
      component: (
        <IssueTextos
          {...state.textos}
          numero={response.magazine_number ?? response.numero}
          setTextos={setTextos}
        />
      ),
    },
    {
      id: 'seteos',
      label: 'Seteos',
      icon: Settings,
      component: <IssueSeteos seteos={state.seteos} setSeteos={setSeteos} />,
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
          seccion="magazine_issue"
          postId={response.id as number}
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
          postId={response.id as number}
          seccion="magazine_issue"
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
      tituloCard="Editar Revista (Número)"
    />
  );
}
