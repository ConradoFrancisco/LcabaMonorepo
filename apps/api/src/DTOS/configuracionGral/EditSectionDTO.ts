export interface IEditSectionParams {
  seteos: {
    id?: number;
    fk_pageid?: number;
    orderby?: number;
    status?: number;
    iduser_ins?: number;
    iduser_upd?: number;
    id_userupd?: number;
    color?: string;
    active?: number | boolean;
    en_seccion_cabecera?: number | boolean;
    mostrar_banners?: number | boolean;
    visible_internet?: number | boolean;
    usar_link_generado?: number | boolean;
    usar_link_absoluto?: number | boolean;
    link_directo?: number | boolean;
    link_rel?: string;
    link_abs?: string;
    contenido_extra?: string;
  };
  textos: {
    lang?: number;
    title?: string;
    subtitle?: string;
    description?: string;
    shortdesc?: string;
    keywords?: string;
    additional_text?: string;
  };
}

class EditSectionDTO {
  public mainData: {
    id?: number;
    fk_pageid?: number;
    orderby?: number;
    status?: number;
    iduser_upd?: number;
    color?: string;
    active?: 0 | 1;
    en_seccion_cabecera?: 0 | 1;
    mostrar_banners?: 0 | 1;
    visible_internet?: 0 | 1;
    usar_link_generado?: 0 | 1;
    usar_link_absoluto?: 0 | 1;
    link_directo?: 0 | 1;
    link_rel?: string;
    link_abs?: string;
    contenido_extra?: string;
  };

  public translations: {
    lang?: number;
    fk_id?: number;
    title?: string;
    subtitle?: string;
    description?: string;
    shortdesc?: string;
    keywords?: string;
    additional_text?: string;
  };

  constructor(params: IEditSectionParams) {
    const toInt = (val: number | boolean | undefined): 0 | 1 | undefined => {
      if (val == null) return undefined;
      return val ? 1 : 0;
    };

    this.mainData = {
      id: params.seteos.id,
      fk_pageid: params.seteos.fk_pageid,
      orderby: params.seteos.orderby,
      status: params.seteos.status,
      iduser_upd: params.seteos.iduser_upd ?? params.seteos.id_userupd,
      color: params.seteos.color || undefined,
      active: toInt(params.seteos.active),
      en_seccion_cabecera: toInt(params.seteos.en_seccion_cabecera),
      mostrar_banners: toInt(params.seteos.mostrar_banners),
      visible_internet: toInt(params.seteos.visible_internet),
      usar_link_generado: toInt(params.seteos.usar_link_generado),
      usar_link_absoluto: toInt(params.seteos.usar_link_absoluto),
      link_directo: toInt(params.seteos.link_directo),
      link_rel: params.seteos.link_rel || undefined,
      link_abs: params.seteos.link_abs || undefined,
      contenido_extra: params.seteos.contenido_extra || undefined,
    };

    this.translations = {
      lang: params.textos.lang ?? 2,
      fk_id: params.seteos.id,
      title: params.textos.title || undefined,
      subtitle: params.textos.subtitle || undefined,
      description: params.textos.description || undefined,
      shortdesc: params.textos.shortdesc || undefined,
      keywords: params.textos.keywords || undefined,
      additional_text: params.textos.additional_text || undefined,
    };
  }

  public getMainData(): typeof this.mainData {
    return this.mainData;
  }

  public getTranslations(): typeof this.translations {
    return this.translations;
  }
}

export default EditSectionDTO;
