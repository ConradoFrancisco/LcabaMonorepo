
import { EditParams } from '../../models/back-post/MagazineModel';
import { VideoItem } from '../EditMagazinePostDTO';


class EditCategoriesDTO {
    public PrefixTable: string;
    public id: number;
    public videos: VideoItem[];

    public translations: {
        fk_id: number;
        title: string;
        description: string;
        shortdesc?: string;
        keywords?: string[]
    };

    public mainTable: {
        fk_id: number;
        orderby?: number;
        section?: string;
        bgColor?: string;
        fgColor?: string;
        parentid?: number;
        url?: string;
        desta?: number;
        status?: number;
        fk_menuid?: number;
        iduser_ins?: number;
        date_ins?: string;
        iduser_upd?: number;
        date_upd?: string;
    };


    constructor(editParams: EditParams) {
        this.PrefixTable = editParams.table;
        this.id = editParams.seteos.id;
        this.videos = editParams.newVideos;
        this.translations = {
            fk_id: editParams.seteos.id,
            title: editParams.textos.title,
            description: editParams.textos.description,
            shortdesc: editParams.textos.shortdesc,
            keywords: editParams.textos.keywords,
        };
        this.mainTable = {
            fk_id: editParams.seteos.id,
            orderby: editParams.seteos.orderby,
            section: editParams.seteos.section,
            bgColor: editParams.seteos.bgColor,
            fgColor: editParams.seteos.fgColor,
            parentid: editParams.seteos.parentid,
            url: editParams.textos.url,
            desta: editParams.seteos.desta,
            status: editParams.seteos.status,
            fk_menuid: editParams.seteos.fk_menuid,
            iduser_ins: editParams.seteos.iduser_ins,
            date_ins: editParams.seteos.date_ins,
            iduser_upd: editParams.seteos.iduser_upd,
            date_upd: editParams.seteos.date_upd,
        };
    }
}
export default EditCategoriesDTO;
