interface BufferField {
  type: 'Buffer';
  data: number[];
}

export interface ISeteosType {
  id: number;
  title?: string;
  titulo?: string;
  description?: string;
  shortdesc?: string;
  url?: string;
  bgcolor?: string;
  textcolor?: string;
  status?: number | boolean | BufferField;
  orderby?: number;
  orden?: number;
  banner?: number | boolean | BufferField;
  parentid?: number;
  solo_cultura?: number | boolean | BufferField;
  gacetilla?: number | boolean | BufferField;
  showincal?: number | boolean | BufferField;
  iduser_upd?: number;
  [key: string]: any;
}

export interface Post {
  id: number;
  fk_pageid: number;
  source: string;
  desta: BufferField;
  fk_menuid: number | null;
  url: string;
  status: BufferField;
  comments: BufferField;
  loadcontent: string | null;
  type: number;
  removed: BufferField;
  date_ini: string | null;
  date_end: string | null;
  date_article: string | null;
  date_efemerides: string | null;
  date_end_pub: string | null;
  orderby: number;
  slider: BufferField;
  iduser_ins: number;
  date_ins: string; // formato ISO
  iduser_upd: number;
  date_upd: string; // formato ISO
  date_ins_parsed: string; // dd/mm/yyyy
  date_article_parsed: string | null;
  date_end_parsed: string | null;
  lang: number;
  title: string;
  description: string;
  extradesc: string;
  shortdesc: string;
  keywords: string;
  subtitle: string;
  tipo_post: string;
  tipo_post_id: number;
  urltype: string;
  banner: BufferField;
  solo_cultura: BufferField;
  gacetilla: BufferField;
  typeorder: number;
  bgcolor: string | null;
  textcolor: string | null;
  menu_title: string | null;
  menu_subtitle: string | null;
  menu_url: string | null;
  fk_idcat: string;
  idcategories: string | null;
  idsubcategories: string;
}

export interface IDtoPost {
  title: string;
  extradesc: string;
  shortdesc: string;
  content: string;
  description: string;

  images: (File | string)[];
  files: (File | string)[];
}

export interface MagazinePost {
  textos: {
    title: string;
    description: string;
    shortdesc: string;
    extradesc: string;
    subtitle: string;
    url: string;
    url_ext: string;
  };
  infoParlamentaria: InfoParlamentariaData;
  seteos: ISeteosPublicacionRevista;
  images: Image[];
  archivos: IArchivo[];
  videos: IVideo[];
  dias: IDia[];
  audios: IAudio[];
}

export interface CulturaPost {
  textos: {
    title: string;
    description: string;
    shortdesc: string;
    extradesc: string;
    subtitle: string;
    url: string;
    url_ext: string;
    text_footer?: string;
    abbreviation?: string;
    keywords?: string;
  };
  infoParlamentaria: InfoParlamentariaData;
  seteos: ISeteosPublicacionCultura;
  images: Image[];
  archivos: IArchivo[];
  videos: IVideo[];
  dias: IDia[];
  audios: IAudio[];
}

export interface ISeteosIssue {
  id: number;
  magazine_number?: number;
  numero?: number;
  url?: string;
  bgcolor?: string | null;
  textcolor?: string | null;
  status?: BufferField | number | boolean;
  iduser_ins?: number;
  date_ins?: string;
  iduser_upd?: number;
  date_upd?: string;
  title?: string;
  titulo?: string;
  description?: string;
  shortdesc?: string;
  keywords?: string[];
  [key: string]: any;
}

export interface ISeteosCategoriasRevista {
  titulo: string;
  fk_id_category: number;
  type: number;
  banner: { type: string; data: number[] };
  bgcolor: string | null;
  categoria: string;
  comments: number | null;
  date_article: string | null;
  date_ini: string | null;
  date_end: string | null;
  desta: { type: string; data: number[] };
  id_entidad: number;
  idpost: number;
  imagen: string;
  lang: number;
  loadcontent: string | null;
  menu: number | null;
  menu_subtitle: string | null;
  menu_title: string | null;
  menu_url: string | null;
  orderby: number;
  pagina: number;
  orden: number;
  publicado: number;
  remove: number | null;
  tipo_post: string;
  tipo_post_id: number;
  title: string;
  url: string;
  urltype: string;
  entidad: string;
}

export interface InfoParlamentariaData {
  proyectos: IProyecto[];
  legisladores: any[];
  comisiones: IComision[];
  sesiones: any[];
  audiencias: IAudiencia[];
}

export interface IProyecto {
  id: number;
  fk_idpost: number;
  expediente_id: number;
  iduser_ins: number;
  date_ins: string;
  iduser_upd: number | null;
  date_upd: string;
  detalleExpediente: IDetalleExpediente;
}

export interface IDetalleExpediente {
  id_expediente: string;
  nro_de_orden: string;
  ano_parlamentario: string;
  proyecto_origen_tipo_des: string;
  nro_de_expediente: string;
  sumario: string;
  proyecto_tipo_des: string;
  categoria_tipo_des: string;
  fch_inicio: string;
  nro_de_orden_JefeGob: string;
  ano_parlamentario_orden_jefegob: string;
  mensaje: string;
  ano_parlamentario_JefeGob: string;
  autor_des: string;
  coautores_des: string;
  autor_id: string;
  coautores_id: string;
  urlDoc: string;
}

export interface IAudiencia {
  id: number;
  audiencia_id: number;
  fk_idpost: number;
  expediente_id: number;
  iduser_ins: number;
  date_ins: string;
  iduser_upd: number | null;
  date_upd: string;
  detalleAudiencia: IDetalleAudiencia;
}

export interface IDetalleAudiencia {
  id_audiencia: number;
  id_comision: number;
  id_expediente: number;
  expediente: string;
  comision: string;
  fecha_hora: string;
  fecha_agrupacion: string;
  insc_fecha_desde: string;
  insc_fecha_hasta: string;
  total_inscriptos: number;
  cupo: number;
  observaciones: string;
  sumario: string;
  sala_reunion: string;
  is_valid: number;
}

export interface IComision {
  id: number;
  comision_id: number;
  fk_idpost: number;
  iduser_ins: number;
  date_ins: string;
  iduser_upd: number | null;
  date_upd: string;
  detalleComision: IDetalleComision[];
}

export interface IDetalleComision {
  id_comision: number;
  nombre: string;
  competencia: string;
  id_entidad: number;
  entidad: string;
  tipo: string;
}

export interface ISesiones {
  id: number;
  comision_id: number;
  fk_idpost: number;
  iduser_ins: number;
  date_ins: string;
  iduser_upd: number | null;
  date_upd: string;
  detalleSesiones: IDetalleSesiones[];
}

export interface IDetalleSesiones {
  id_comision: number;
  nombre: string;
  competencia: string;
  id_entidad: number;
  entidad: string;
  tipo: string;
}

// Subtipos reutilizables

export interface IVideo {
  id: number;
  fk_id: number;
  url: string;
  title: string;
  description: string;
  iduser_ins: number;
  date_ins: string; // ISO string
  iduser_upd: number | null;
  date_upd: string | null;
  orderby: number;
}

export interface IArchivo {
  fk_iddoc: number;
  fk_id: number;
  file_type: string;
  orderby: number;
  id: number;
  title: string;
  description: string | null;
  location: string;
  filename: string;
  tn: string;
  mimetype: string;
  size: string; // viene como string en JSON
  status: {
    type: string;
    data: number[];
  };
  dt_ins: string; // ISO string
  dt_upd: string | null;
}
export interface ISeteosPublicacionRevista {
  id: number;
  fk_pageid: number;
  fk_id_magazine_issue: number;
  source: string;
  desta: BufferData;
  fk_menuid: number | null;
  status: BufferData;
  comments: BufferData;
  loadcontent: string | null;
  type: number;
  removed: BufferData;
  date_ini: string | null;
  date_end: string | null;
  date_article: string | null;
  date_efemerides: string | null;
  date_end_pub: string | null;
  orderby: number;
  slider: BufferData;
  iduser_ins: number;
  date_ins: string;
  iduser_upd: number | null;
  date_upd: string | null;
  date_ins_parsed: string | null;
  date_article_parsed: string | null;
  date_end_parsed: string | null;
  lang: number;
  keywords: string;
  tipo_post: string;
  tipo_post_id: number;
  urltype: string;
  banner: BufferData;
  gacetilla: BufferData;
  typeorder: number;
  bgcolor: string | null;
  textcolor: string | null;
  menu_title: string | null;
  menu_subtitle: string | null;
  menu_url: string | null;
  magazine_title: string;
  magazine_shortdesc: string;
  magazine_url: string;
  categoria: string;
  fk_idcat: string;
  idcategories: string;
  idsubcategories: string | null;
}

export interface ISeteosPublicacionCultura {
  fk_id_category: number;
  type: number;
  banner: { type: string; data: number[] };
  bgcolor: string | null;
  categoria: string;
  comments: number | null;
  date_article: string | null;
  date_article_parsed: string | null;
  date_efemerides: string | null;
  date_end: string | null;
  date_end_parsed: string | null;
  date_end_pub: string | null;
  date_ini: string | null;
  date_ins: string;
  date_ins_parsed: string;
  date_upd: string | null;
  desta: { type: string; data: number[] };
  fk_idcat: string;
  fk_menuid: number | null;
  fk_pageid: number;
  gacetilla: { type: string; data: number[] };
  id: number;
  idcategories: string; // CSV
  idsubcategories: string | null; // CSV o null
  iduser_ins: number;
  iduser_upd: number | null;
  keywords: string;
  lang: number;
  loadcontent: unknown | null;
  magazine_shortdesc: string;
  magazine_title: string;
  magazine_url: string;
  menu_subtitle: string | null;
  menu_title: string | null;
  menu_url: string | null;
  orderby: number;
  removed: { type: string; data: number[] };
  slider: { type: string; data: number[] };
  source: string;
  status: { type: string; data: number[] };
  textcolor: string | null;
  tipo_post: string;
  tipo_post_id: number;
  typeorder: number;
  urltype: string;
}

export interface AudioItem {
  id: number;
  fk_id: number;
  url: string;
  title: string;
  description: string;
  iduser_ins: number;
  date_ins: string;
  iduser_upd: number | null;
  date_upd: string | null;
  orderby: number;
}

export interface NewAudioItem {
  url: string;
  title: string;
  description: string;
}

export interface VideoItem {
  id: number;
  fk_id: number;
  url: string;
  title: string;
  description: string;
  iduser_ins: number;
  date_ins: string;
  iduser_upd: number | null;
  date_upd: string | null;
  orderby: number;
}

export interface NewVideoItem {
  url: string;
  title: string;
  description: string;
}

export type EditComponentState<T = any> = {
  textos: {
    title: string;
    subtitle?: string;
    shortdesc?: string;
    extradesc?: string;
    url?: string;
    url_ext?: string;
    description?: string;
    text_footer?: string;
    abbreviation?: string;
    keywords?: string;
  };
  seteos: T;
  nuevasImagenes?: File[];
  nuevosArchivos?: File[];
  newVideos?: NewVideoItem[];
  newAudios?: NewAudioItem[];
  newDays?: IDia[];
};

export interface BufferData {
  type: 'Buffer';
  data: number[];
}

export interface Image {
  fk_iddoc: number;
  fk_id: number;
  image_type: string;
  orderby: number;
  id: number;
  title: string;
  description: string | null;
  location: string;
  filename: string;
  tn: string;
  mimetype: string;
  size: string;
  status: BufferData;
  dt_ins: string;
  dt_upd: string | null;
}

export interface IAudio {
  id: number;
  fk_id: number;
  url: string;
  title: string;
  description: string;
  orderby: number;
  iduser_ins: number;
  date_ins: string;
  iduser_upd: number;
  date_upd: string;
}

export interface IDia {
  id: number;
  dia: string;
  desde: string;
  hasta: string;
  descripcion: string;
  fecha_article: string;
  fk_idpost: number;
  day: string;
  date: string | null;
  hour_start: string | null;
  hour_end: string | null;
  date_desc: string | null;
  status: {
    type: string;
    data: number[];
  };
  iduser_ins: number;
  date_ins: string; // ISO string
  iduser_upd: number | null;
  date_upd: string | null;
}
