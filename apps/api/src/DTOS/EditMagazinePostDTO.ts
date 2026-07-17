import dayFormater, { dtoDateData } from '../helpers/functions';
import { EditParams } from '../models/back-post/MagazineModel';
export interface VideoItem {
  fk_id: number;
  url: string;
  title: string;
  description: string;
  iduser_ins: number;
  iduser_upd: number | null;
  date_upd: string | null;
  orderby: number;
}

export interface AudioItem {
  fk_id: number;
  url: string;
  title: string;
  description: string;
  iduser_ins: number;
  iduser_upd: number | null;
  date_upd: string | null;
  orderby: number;
}

class EditMagazinePostDTO {
  public id: number;
  public videos: VideoItem[];
  public audios: AudioItem[];
  public translations: {
    title: string;
    description: string;
    extradesc: string;
    shortdesc: string;
    subtitle: string;
  };
  public categories: {
    id?: number;
    fk_idpost?: number;
    fk_idcategory?: number;
    fk_idsubcategoria?: number;
    fk_idcat?: number;
  };
  public mainPost: {
    fk_id_magazine_issue?: number;
    source?: string;
    slider?: number;
    desta?: number;
    url?: string;
    status?: number;
    iduser_ins?: number;
    date_ini?: string;
    date_end?: string;
    orderby?: number;
    id_userupd?: number;
    url_ext?: string;
    date_article?: string;
  };
  public days: {
    id?: number;
    isNew?: boolean;
    fk_idpost: number;
    day: string | null;
    date: string | null;
    hour_start: string | null;
    hour_end: string | null;
    date_desc: string | null;
    status: number;
    id_user_ins: number;
    id_user_upd: number | undefined;
    date_upd: string;
  }[];

  constructor(editParams: EditParams) {
    console.log(editParams, 'DTO');

    if (!editParams.seteos?.id) {
      throw new Error('ID requerido para edición');
    }

    this.id = parseInt(editParams.seteos.id as unknown as string, 10);

    this.videos =
      editParams.newVideos?.map((video) => ({
        fk_id: this.id,
        url: video.url,
        title: video.title,
        description: video.description,
        iduser_ins: parseInt(editParams.seteos.iduser_ins as string, 10) || 0,
        iduser_upd: parseInt(editParams.seteos.iduser_ins as string, 10) || 0,
        date_upd: new Date().toString(),
        orderby: video.orderby,
      })) || [];

    this.audios =
      editParams.newAudios?.map((audio) => ({
        fk_id: this.id,
        url: audio.url,
        title: audio.title,
        description: audio.description,
        iduser_ins: parseInt(editParams.seteos.iduser_ins as string, 10) || 0,
        iduser_upd: parseInt(editParams.seteos.iduser_ins as string, 10) || 0,
        date_upd: new Date().toString(),
        orderby: audio.orderby,
      })) || [];

    this.translations = {
      title: editParams.textos.title || '',
      description: editParams.textos.description || '',
      extradesc: editParams.textos.extradesc || '',
      shortdesc: editParams.textos.shortdesc || '',
      subtitle: editParams.textos.subtitle || '',
    };

    this.categories = {
      fk_idpost: this.id,
      fk_idcategory: editParams.seteos.fk_idcat
        ? parseInt(editParams.seteos.fk_idcat as unknown as string, 10)
        : undefined,
      fk_idsubcategoria: editParams.seteos?.idsubcategories
        ? parseInt(editParams.seteos.idsubcategories as unknown as string, 10)
        : undefined,
      fk_idcat: editParams.seteos?.fk_idcat
        ? parseInt(editParams.seteos.fk_idcat as unknown as string, 10)
        : undefined,
    };

    this.mainPost = {
      fk_id_magazine_issue:
        parseInt(editParams.seteos.fk_id_magazine_issue as string, 10) || undefined,
      source: editParams.seteos.source || undefined,
      slider: parseInt(editParams.seteos.slider?.data?.[0] ?? undefined, 10) || 0,
      desta: parseInt(editParams.seteos.desta?.data?.[0] ?? undefined, 10) || 0,
      status: parseInt(editParams.seteos.status?.data?.[0] ?? undefined, 10) || 0,
      iduser_ins: parseInt(editParams.seteos.iduser_ins as string, 10) || 0,
      date_ini: editParams.seteos.date_ini || undefined,
      date_end: editParams.seteos.date_end || undefined,
      orderby: parseInt(editParams.seteos.orderby as string, 10) || undefined,
      id_userupd:
        parseInt((editParams.seteos.iduser_upd ?? editParams.seteos.id_userupd) as string, 10) ||
        undefined,
      url: editParams.textos.url || undefined,
      url_ext: editParams.textos.url_ext || undefined,
      date_article: editParams.seteos.date_article || undefined,
    };

    this.days =
      editParams.newDays?.map((dia: any) => ({
        id: dia.new === true || dia.new === 'true' ? undefined : parseInt(dia.id as string, 10),
        isNew: dia.new === true || dia.new === 'true',
        fk_idpost: this.id,
        day: dtoDateData(dia.dia) ?? '',
        date: dia.date ? dia.date.split('T')[0] : null,
        hour_start: dia.desde || null,
        hour_end: dia.hasta || null,
        date_desc: dia.descripcion || null,
        status: 1,
        id_user_ins: parseInt(editParams.seteos.iduser_ins as string, 10) || 0,
        date_upd: new Date().toString(),
        id_user_upd: editParams.seteos.iduser_ins
          ? parseInt(editParams.seteos.iduser_ins as string, 10)
          : undefined,
        /* fk_idpost: this.id,
      day: dayFormater(dia.dia) ?? '',
      date: dia.fecha || undefined,
      hour_start: dia.desde || undefined,
      hour_end: dia.hasta || undefined,
      date_desc: dia.date_desc || undefined,
      status: 1,
      id_user_ins: parseInt(editParams.seteos.iduser_ins as string, 10) || 0,
      date_ins: new Date().toString(),
      id_user_upd: editParams.seteos.iduser_ins ? parseInt(editParams.seteos.iduser_ins as string, 10) : undefined,
      date_upd: new Date().toString(), */
      })) || [];
  }

  public getId(): number {
    return this.id;
  }

  public getTranslations(): typeof this.translations {
    return this.translations;
  }

  public getCategories(): typeof this.categories {
    return this.categories;
  }

  public getMainPost(): typeof this.mainPost {
    return this.mainPost;
  }

  public getVideos(): typeof this.videos {
    return this.videos;
  }

  public getDays(): typeof this.days {
    return this.days;
  }
  public getAudios(): typeof this.audios {
    return this.audios;
  }
}

export default EditMagazinePostDTO;
