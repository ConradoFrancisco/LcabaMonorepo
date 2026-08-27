
import { EditParams } from '../../models/back-post/MagazineModel';
import { VideoItem } from '../EditMagazinePostDTO';


class EditCategoriesDTO {
    public id: number;
    public videos: VideoItem[];

    public translations: {
        title: string;
        description: string;
        fk_id: number;
        shortdesc?: string;
        keywords?: string[]
    };
    public mainPost?: {
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
        type?: number;
    };
    public days?: {
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
        this.id = editParams.seteos.id;
        this.videos = editParams.newVideos;
        this.audios = editParams.newAudios;
        this.translations = {
            title: editParams.textos.title,
            description: editParams.textos.description,
            extradesc: editParams.textos.extradesc,
            shortdesc: editParams.textos.shortdesc,
            subtitle: editParams.textos.subtitle,
        };
        this.mainPost = {
            source: editParams.seteos.source,
            slider: editParams.seteos.slider,
            type: editParams.seteos.type,
            desta: editParams.seteos.desta,
            url: editParams.textos.url,
            status: editParams.seteos.status,
            iduser_ins: editParams.seteos.iduser_ins,
            date_ini: editParams.seteos.date_ini,
            date_end: editParams.seteos.date_end,
            orderby: editParams.seteos.orderby,
            id_userupd: editParams.seteos.iduser_upd ?? editParams.seteos.id_userupd,
            url_ext: editParams.textos.url_ext,
        };

        const idcategoriesStr = String(editParams.seteos.idcategories || '');
        const idsubcategoriesStr = String(editParams.seteos.idsubcategories || '');

        const catIds = idcategoriesStr
            .split(',')
            .filter((c) => c.trim() !== '')
            .map(Number);
        const subcatIds = idsubcategoriesStr
            .split(',')
            .filter((c) => c.trim() !== '')
            .map(Number);

        this.mappedCategories = [
            ...catIds.map((id) => ({
                fk_idcategory: id,
                fk_idsubcategoria: null,
                fk_idcat: id,
            })),
            ...subcatIds.map((id) => ({
                fk_idcategory: null,
                fk_idsubcategoria: id,
                fk_idcat: id,
            })),
        ];
    }
}
export default EditCategoriesDTO;
