import { EditParams } from '../../models/back-post/MagazineModel';

export interface ITranslationsType {
  fk_id: number;
  title: string;
  description?: string;
  shortdesc?: string;
}

export interface IMainTableType {
  id: number;
  url?: string;
  bgcolor?: string;
  textcolor?: string;
  status?: number | boolean | { type: string; data: number[] };
  orderby?: number;
  banner?: number | boolean;
  parentid?: number;
  solo_cultura?: number | boolean;
  gacetilla?: number | boolean;
  showincal?: number | boolean;
  iduser_upd?: number;
  [key: string]: any;
}

class EditTypeDTO {
  public PrefixTable: string;
  public id: number;
  public translations: ITranslationsType;
  public mainTable: IMainTableType;

  constructor(editParams: EditParams) {
    this.PrefixTable = editParams.table || 'posts_type';
    this.id = editParams.seteos.id;
    this.translations = {
      fk_id: editParams.seteos.id,
      title: editParams.textos?.title ?? editParams.seteos?.title ?? '',
      description: editParams.textos?.description ?? editParams.seteos?.description ?? '',
      shortdesc: editParams.textos?.shortdesc ?? editParams.seteos?.shortdesc ?? '',
    };
    this.mainTable = {
      ...editParams.seteos,
      id: editParams.seteos.id,
    };
  }
}

export default EditTypeDTO;
