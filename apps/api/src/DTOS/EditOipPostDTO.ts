import { AudioItem, VideoItem } from './EditMagazinePostDTO';

export type EditOipParams = {
  textos: {
    title: string;
    subtitle?: string;
    shortdesc?: string;
    extradesc?: string;
    url?: string;
    description?: string;
    keywords?: string;
  };
  seteos: {
    id: number;
    source?: string;
    desta?: number | { type: string; data: number[] };
    fk_menuid?: number | null;
    status?: number | { type: string; data: number[] };
    comments?: number | { type: string; data: number[] };
    loadcontent?: string | null;
    type?: number | string;
    tipo_post_id?: number | string;
    removed?: number | { type: string; data: number[] };
    date_end?: string | null;
    date_article?: string | null;
    orderby?: number | string;
    iduser_ins?: number | string;
    iduser_upd?: number | string;
    id_userupd?: number | string;
    [key: string]: any;
  };
  nuevasImagenes?: File[];
  nuevosArchivos?: File[];
  newVideos?: VideoItem[];
  newAudios?: AudioItem[];
};

class EditOipPostDTO {
  public id: number;
  public videos: VideoItem[];
  public translations: {
    title: string;
    description: string;
    extradesc: string;
    shortdesc: string;
    subtitle: string;
    keywords: string;
  };

  public mainPost: {
    source: string;
    desta: number;
    fk_menuid: number | null;
    url: string | null;
    status: number;
    comments: number;
    loadcontent: string | null;
    type: number | null;
    removed: number;
    date_end: string | null;
    date_article: string | null;
    orderby: number;
    iduser_upd: number | null;
  };

  constructor(editParams: EditOipParams) {
    if (!editParams.seteos?.id) {
      throw new Error('ID requerido para edición del informe');
    }

    this.id = parseInt(editParams.seteos.id as unknown as string, 10);

    this.videos =
      editParams.newVideos?.map((video: any) => ({
        fk_id: this.id,
        url: video.url,
        title: video.title,
        description: video.description,
        iduser_ins: parseInt(editParams.seteos.iduser_ins as string, 10) || 0,
        iduser_upd: parseInt(
          (editParams.seteos.iduser_upd ?? editParams.seteos.id_userupd) as string,
          10,
        ) || 0,
        date_upd: new Date().toISOString(),
        orderby: video.orderby ?? 0,
      })) || [];

    this.translations = {
      title: editParams.textos?.title || '',
      description: editParams.textos?.description || '',
      extradesc: editParams.textos?.extradesc || '',
      shortdesc: editParams.textos?.shortdesc || '',
      subtitle: editParams.textos?.subtitle || '',
      keywords: editParams.textos?.keywords || '',
    };

    const parseBit = (val: any, defaultVal = 0): number => {
      if (val === undefined || val === null) return defaultVal;
      if (typeof val === 'object' && val.data && Array.isArray(val.data)) {
        return Number(val.data[0]) || 0;
      }
      return val ? 1 : 0;
    };

    const parseDate = (val?: string | null): string | null => {
      if (!val) return null;
      return val.split('T')[0] || null;
    };

    this.mainPost = {
      source: editParams.seteos.source || 'OIP',
      desta: parseBit(editParams.seteos.desta, 0),
      fk_menuid: editParams.seteos.fk_menuid ? Number(editParams.seteos.fk_menuid) : null,
      url: editParams.textos?.url || editParams.seteos.url || null,
      status: parseBit(editParams.seteos.status, 1),
      comments: parseBit(editParams.seteos.comments, 0),
      loadcontent: editParams.seteos.loadcontent || null,
      type:
        parseInt(
          (editParams.seteos.tipo_post_id ?? editParams.seteos.type) as string,
          10,
        ) || null,
      removed: parseBit(editParams.seteos.removed, 0),
      date_end: parseDate(editParams.seteos.date_end),
      date_article: parseDate(editParams.seteos.date_article),
      orderby: parseInt(editParams.seteos.orderby as string, 10) || 0,
      iduser_upd:
        parseInt(
          (editParams.seteos.iduser_upd ?? editParams.seteos.id_userupd) as string,
          10,
        ) || null,
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

export default EditOipPostDTO;
