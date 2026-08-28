'use client';

import React, { useState } from 'react';
import EditComponent, { Itabs } from '@/components/my-components/wizard/EditComponent';
import useHandlerChange from '@/hooks/useHandlerChange';
import { Settings } from 'lucide-react';
import { ISeteosType, EditComponentState } from '@/types/postTypes';
import { useAuth } from '@/context/AuthContext';
import TypesService from '../../../../../../../../services/TypesService';
import TiposSeteos from '@/components/my-components/wizard/TiposSeteos';

type TypeResponse = Record<string, unknown> & {
  id: number;
  title?: string;
  tipo?: string;
  titulo?: string;
  description?: string;
  shortdesc?: string;
  url?: string;
  bgcolor?: string;
  textcolor?: string;
  status?: any;
  orderby?: number;
  orden?: number;
  banner?: any;
  parentid?: number;
  solo_cultura?: any;
  gacetilla?: any;
  showincal?: any;
};

export default function RevistaTiposEditComponent({ response }: { response: TypeResponse }) {
  const {
    title,
    tipo,
    titulo,
    description,
    shortdesc,
    ...restSeteos
  } = response;

  const resolvedTitle = title ?? tipo ?? titulo ?? '';
  const [tituloHeader, setTituloHeader] = useState(resolvedTitle);
  const [activeTab, setActiveTab] = useState('tipos');
  const { auth } = useAuth();

  const [state, setState] = useState<EditComponentState<ISeteosType>>({
    textos: {
      title: resolvedTitle,
      description: description ?? '',
      shortdesc: shortdesc ?? '',
    } as any,
    seteos: {
      ...restSeteos,
      id: response.id,
      title: resolvedTitle,
      description: description ?? '',
      shortdesc: shortdesc ?? '',
    } as unknown as ISeteosType,
    nuevasImagenes: [],
    nuevosArchivos: [],
    newVideos: [],
    newAudios: [],
  });

  const setSeteos = (newSeteos: ISeteosType) => {
    setState((prev) => ({
      ...prev,
      seteos: newSeteos,
      textos: {
        ...prev.textos,
        title: newSeteos.title ?? newSeteos.titulo ?? prev.textos?.title ?? '',
        description: newSeteos.description ?? prev.textos?.description ?? '',
        shortdesc: newSeteos.shortdesc ?? prev.textos?.shortdesc ?? '',
      } as any,
    }));
  };

  const handleEditChange = useHandlerChange({
    service: (payload) => {
      const currentUserId = auth.user?.id_user;
      const updatedPayload = {
        ...payload,
        table: 'magazine_posts_type',
        seteos: {
          ...payload.seteos,
          iduser_upd: currentUserId,
        },
      };
      return TypesService.editType(updatedPayload);
    },
    rutaDestino: '/revista/tipos',
    state: state as any,
    setActiveTab,
    onSuccess: async () => {
      setTituloHeader(state.seteos.title ?? state.seteos.titulo ?? '');
    },
  });

  const tabs: Itabs[] = [
    {
      id: 'tipos',
      label: 'Tipos',
      icon: Settings,
      component: (
        <TiposSeteos
          seteos={state.seteos}
          setSeteos={setSeteos}
          tableType="revista"
        />
      ),
    },
  ];

  return (
    <EditComponent
      state={state}
      tabs={tabs}
      handleEditChange={handleEditChange}
      setActiveTab={setActiveTab}
      activeTab={activeTab}
      tituloPosteo={tituloHeader}
      tituloCard="Editar Tipo de Publicaciones - Revista"
    />
  );
}
