'use client';
import React, { useEffect, useState } from 'react';
import EditComponent, { Itabs } from '@/components/my-components/wizard/EditComponent';
import useHandlerChange from '@/hooks/useHandlerChange';

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
  Layout,
  Share2,
} from 'lucide-react';
import { Image, EditComponentState, CulturaPost } from '@/types/postTypes';
import PostService from '../../../../../../../../services/PostService';
import { useAuth } from '@/context/AuthContext';
import PageTextos, { textosSchema } from './PageTextos';
import PageSeteosComponent from './pageSeteosComponent';
import RedesSocialesComponent, { RedSocial } from './RedesSocialesComponent';
import DropzoneComponent from '@/components/form/form-elements/DropZone';
import FileDropzone from '@/components/my-components/wizard/DropzoneFile';
import PageSections from './PageSections';
import GeneralService from '../../../../../../../../services/GeneralService';

export default function PageEditComponent({ data }: { data: any }) {
  const { auth } = useAuth();
  // MAIN DATA POR PROPS
  const { textos, seteos, images, archivos, infoParlamentaria, redes } = data;
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
  // REDES SOCIALES
  const [redesSociales, setRedesSociales] = useState<RedSocial[]>(() => {
    if (!redes) return [];
    return redes.map((r: any) => {
      let label = r.title;
      let icono = r.icon;
      if (label === 'Twitter' || label === 'Twitter / X') {
        label = 'X';
        icono = 'fa-x-twitter';
      }
      return {
        id: r.id?.toString() || Date.now().toString() + Math.random().toString(36).substring(2, 9),
        url: r.url || '',
        red: label || '',
        icono: icono || '',
      };
    });
  });

  //MAIN STATE PARA EL PAYLOAD
  const [state, setState] = useState<EditComponentState>({
    textos: { ...textos },
    seteos: { ...seteos },
    nuevasImagenes: [],
    nuevosArchivos: [],
  });
  const setSeteos = (newSeteos: EditComponentState['seteos']) => {
    setState((prev) => ({ ...prev, seteos: newSeteos }));
  };

  const setTextos = (newTextos: EditComponentState['textos']) => {
    setState((prev) => ({ ...prev, textos: newTextos }));
  };

  const tabs: Itabs[] = [
    {
      id: 'textos',
      label: 'Textos',
      icon: FileText,
      component: <PageTextos {...state.textos} setTextos={setTextos} />,
    },
    {
      id: 'seteos',
      label: 'Seteos',
      icon: Settings,
      component: <PageSeteosComponent setSeteos={setSeteos} seteos={state.seteos} />,
    },
    {
      id: 'redesSociales',
      label: 'Redes Sociales',
      icon: Share2,
      component: <RedesSocialesComponent redes={redesSociales} setRedes={setRedesSociales} />,
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
          seccion="page"
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
          seccion="page"
          setArchivosFromDb={setArchivosFromDb}
        />
      ),
    },
    {
      id: 'sections',
      label: 'Secciones',
      icon: Layout,
      component: <PageSections pageId={seteos?.id} />,
    },
  ];

  const [activeTab, setActiveTab] = useState('textos');

  const handleEditChange = useHandlerChange({
    service: (payload) => {
      console.log(payload);
      const currentUserId = auth.user?.id_user;
      const updatedPayload = {
        ...payload,
        seteos: {
          ...payload.seteos,
          iduser_upd: currentUserId,
          id_userupd: currentUserId,
        },
        redes: redesSociales,
      };
      return GeneralService.editPage(updatedPayload);
    },
    rutaDestino: '/general/paginas',
    schemas: [{ schema: textosSchema, data: state.textos, tab: 'textos' }],
    state,
    setActiveTab,
    onSuccess: async () => {
      setTituloHeader(state.textos.title);
      setState((prev) => ({
        ...prev,
        nuevasImagenes: [],
        nuevosArchivos: [],
      }));
      setNewImagenes([]);
      setNuevosArchivos([]);
      // Re-fetch del post para actualizar audiosDb con los IDs reales del backend
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
