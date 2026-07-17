export interface IEditPageParams {
    seteos: {
        id?: number;
        clientid?: number;
        url?: string;
        urlsite?: string;
        font?: string;
        size?: string;
        fontcolor?: string;
        pagebg?: string;
        leftbg?: string;
        rightbg?: string;
        centerbg?: string;
        footerbg?: string;
        bannertxtcolor?: string;
        lefttxtcolor?: string;
        righttxtcolor?: string;
        centertxtcolor?: string;
        footertxtcolor?: string;
        watermark?: string;
        status?: number;
        iduser_ins?: number;
        iduser_upd?: number;
        facebook?: string;
        twitter?: string;
        skype?: string;
        youtube?: string;
        rss?: string;
        linkedin?: string;
        googleplus?: string;
        telephone?: string;
        email_webmaster?: string;
        address?: string;
        themecolor?: string;
        logoluto?: boolean | number;
        email_template?: string;
    };
    textos: {
        lang?: number;
        title?: string;
        description?: string;
        shortdesc?: string;
        terms?: string;
        policy?: string;
        keywords?: string;
        shipping_info?: string;
        text_footer?: string;
        abbreviation?: string;
        email_contact?: string;
        email_info?: string;
        email_sales?: string;
        email_billing?: string;
    };
    redes?: {
        id?: string;
        red?: string;
        icono?: string;
        url?: string;
    }[];
}

class EditPageDTO {
    public mainData: {
        id?: number;
        clientid?: number;
        url?: string;
        urlsite?: string;
        font?: string;
        size?: string;
        fontcolor?: string;
        pagebg?: string;
        leftbg?: string;
        rightbg?: string;
        centerbg?: string;
        footerbg?: string;
        bannertxtcolor?: string;
        lefttxtcolor?: string;
        righttxtcolor?: string;
        centertxtcolor?: string;
        footertxtcolor?: string;
        watermark?: string;
        status?: number;
        iduser_ins?: number;
        iduser_upd?: number;
        facebook?: string;
        twitter?: string;
        skype?: string;
        youtube?: string;
        rss?: string;
        linkedin?: string;
        googleplus?: string;
        telephone?: string;
        email_webmaster?: string;
        address?: string;
        themecolor?: string;
        logoluto?: 0 | 1;
        email_template?: string;
    };
    public translations: {
        lang?: number;
        fk_id?: number;
        title?: string;
        description?: string;
        shortdesc?: string;
        terms?: string;
        policy?: string;
        keywords?: string;
        shipping_info?: string;
        text_footer?: string;
        abbreviation?: string;
        email_contact?: string;
        email_info?: string;
        email_sales?: string;
        email_billing?: string;
    };
    public redes: {
        id?: string;
        red?: string;
        icono?: string;
        url?: string;
    }[];

    constructor(params: IEditPageParams) {
        this.mainData = {
            id: params.seteos.id,
            clientid: params.seteos.clientid,
            url: params.seteos.url || undefined,
            urlsite: params.seteos.urlsite || undefined,
            font: params.seteos.font || 'Verdana',
            size: params.seteos.size || '12px',
            fontcolor: params.seteos.fontcolor || '000000',
            pagebg: params.seteos.pagebg || undefined,
            leftbg: params.seteos.leftbg || undefined,
            rightbg: params.seteos.rightbg || undefined,
            centerbg: params.seteos.centerbg || undefined,
            footerbg: params.seteos.footerbg || undefined,
            bannertxtcolor: params.seteos.bannertxtcolor || undefined,
            lefttxtcolor: params.seteos.lefttxtcolor || undefined,
            righttxtcolor: params.seteos.righttxtcolor || undefined,
            centertxtcolor: params.seteos.centertxtcolor || undefined,
            footertxtcolor: params.seteos.footertxtcolor || undefined,
            watermark: params.seteos.watermark || undefined,
            status: params.seteos.status ?? 1,
            iduser_ins: params.seteos.iduser_ins,
            iduser_upd: params.seteos.iduser_upd,
            facebook: params.seteos.facebook || undefined,
            twitter: params.seteos.twitter || undefined,
            skype: params.seteos.skype || undefined,
            youtube: params.seteos.youtube || undefined,
            rss: params.seteos.rss || undefined,
            linkedin: params.seteos.linkedin || undefined,
            googleplus: params.seteos.googleplus || undefined,
            telephone: params.seteos.telephone || undefined,
            email_webmaster: params.seteos.email_webmaster || undefined,
            address: params.seteos.address || undefined,
            themecolor: params.seteos.themecolor || undefined,
            logoluto: params.seteos.logoluto != null ? (params.seteos.logoluto ? 1 : 0) : undefined,
            email_template: params.seteos.email_template || 'email_template_layout_6.html',
        };

        this.translations = {
            lang: params.textos.lang ?? 2,
            fk_id: params.seteos.id,
            title: params.textos.title || 'NUEVO PAGINA',
            description: params.textos.description || undefined,
            shortdesc: params.textos.shortdesc || undefined,
            terms: params.textos.terms || undefined,
            policy: params.textos.policy || undefined,
            keywords: params.textos.keywords || undefined,
            shipping_info: params.textos.shipping_info || undefined,
            text_footer: params.textos.text_footer || undefined,
            abbreviation: params.textos.abbreviation || undefined,
            email_contact: params.textos.email_contact || undefined,
            email_info: params.textos.email_info || undefined,
            email_sales: params.textos.email_sales || undefined,
            email_billing: params.textos.email_billing || undefined,
        };

        this.redes = params.redes || [];
    }

    public getMainData(): typeof this.mainData {
        return this.mainData;
    }

    public getTranslations(): typeof this.translations {
        return this.translations;
    }

    public getRedes(): typeof this.redes {
        return this.redes;
    }
}

export default EditPageDTO;