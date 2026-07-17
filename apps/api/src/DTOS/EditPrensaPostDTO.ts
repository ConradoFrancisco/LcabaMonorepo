import { AudioItem, VideoItem } from './EditMagazinePostDTO';

export type EditPrensaParams = {
  textos: {
    title: string;
    subtitle: string;
    shortdesc: string;
    extradesc: string;
    url: string;
    url_ext: string;
    description: string;
  };
  seteos: { id: number; [key: string]: any };
  nuevasImagenes: File[];
  nuevosArchivos: File[];
  newVideos: VideoItem[];
  newAudios: AudioItem[];
};

class EditPrensaPostDTO {
  public id: number;
  public videos: VideoItem[];
  public translations: {
    title: string;
    description: string;
    extradesc: string;
    shortdesc: string;
    subtitle: string;
  };

  public mainPost: {
    type?: number;
    source?: string;
    slider?: number;
    desta?: number;
    url?: string;
    status?: number;
    date_article?: string;
    date_efemerides?: string;
    date_end?: string;
    orderby?: number;
    id_userupd?: number;
  };

  constructor(editParams: EditPrensaParams) {
    console.log(editParams, 'DTO prensa');
    if (!editParams.seteos?.id) {
      throw new Error('ID requerido para edición');
    }

    this.id = parseInt(editParams.seteos.id as unknown as string, 10);

    this.videos =
      editParams.newVideos?.map((video: any) => ({
        fk_id: this.id,
        url: video.url,
        title: video.title,
        description: video.description,
        iduser_ins: parseInt(editParams.seteos.iduser_ins as string, 10) || 0,
        iduser_upd: parseInt(editParams.seteos.iduser_ins as string, 10) || 0,
        date_upd: new Date().toString(),
        orderby: video.orderby,
      })) || [];

    this.translations = {
      title: editParams.textos.title || '',
      description: editParams.textos.description || '',
      extradesc: editParams.textos.extradesc || '',
      shortdesc: editParams.textos.shortdesc || '',
      subtitle: editParams.textos.subtitle || '',
    };

    this.mainPost = {
      type: parseInt(editParams.seteos.tipo_post_id as string, 10) || undefined,
      source: editParams.seteos.source || undefined,
      slider: parseInt(editParams.seteos.slider?.data?.[0] ?? undefined, 10) || 0,
      desta: parseInt(editParams.seteos.desta?.data?.[0] ?? undefined, 10) || 0,
      url: editParams.textos.url || undefined,
      status: parseInt(editParams.seteos.status?.data?.[0] ?? undefined, 10) || 0,

      date_article: editParams.seteos.date_article || undefined,
      date_end: editParams.seteos.date_end || undefined,
      orderby: parseInt(editParams.seteos.orderby as string, 10) || undefined,
      id_userupd:
        parseInt((editParams.seteos.iduser_upd ?? editParams.seteos.id_userupd) as string, 10) ||
        undefined,
      date_efemerides: editParams.seteos.date_efemerides || undefined,
    };
  }

  public getId(): number {
    return this.id;
  }

  public getTranslations(): typeof this.translations {
    return this.translations;
  }

  public getMainPost(): typeof this.mainPost {
    return this.mainPost;
  }

  public getVideos(): typeof this.videos {
    return this.videos;
  }
}

export default EditPrensaPostDTO;
