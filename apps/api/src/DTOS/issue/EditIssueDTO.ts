import { VideoItem } from '../EditMagazinePostDTO';

export interface IssueEditParams {
  table?: string;
  textos: {
    title: string;
    description: string;
    shortdesc?: string;
    keywords?: string[];
  };
  seteos: {
    id: number;
    magazine_number?: number;
    url?: string;
    bgcolor?: string;
    textcolor?: string;
    status?: number;
    iduser_ins?: number;
    iduser_upd?: number;
    date_ins?: string;
    date_upd?: string;
    [key: string]: any;
  };
  newVideos?: VideoItem[];
}

class EditIssueDTO {
  public PrefixTable: string;
  public id: number;
  public videos: VideoItem[];

  public translations: {
    fk_id: number;
    title: string;
    description: string;
    shortdesc?: string;
    keywords?: string[];
  };

  public mainTable: {
    id: number;
    magazine_number?: number;
    url?: string;
    bgcolor?: string;
    textcolor?: string;
    status?: number;
    iduser_ins?: number;
    iduser_upd?: number;
  };

  constructor(editParams: IssueEditParams) {
    this.PrefixTable = editParams.table || 'magazine_issue';
    this.id = editParams.seteos.id;
    this.videos = editParams.newVideos || [];
    this.translations = {
      fk_id: editParams.seteos.id,
      title: editParams.textos?.title || '',
      description: editParams.textos?.description || '',
      shortdesc: editParams.textos?.shortdesc || '',
      keywords: editParams.textos?.keywords || [],
    };
    this.mainTable = {
      id: editParams.seteos.id,
      magazine_number: editParams.seteos.magazine_number,
      url: editParams.seteos.url,
      bgcolor: editParams.seteos.bgcolor,
      textcolor: editParams.seteos.textcolor,
      status: editParams.seteos.status,
      iduser_ins: editParams.seteos.iduser_ins,
      iduser_upd: editParams.seteos.iduser_upd,
    };
  }
}

export default EditIssueDTO;
