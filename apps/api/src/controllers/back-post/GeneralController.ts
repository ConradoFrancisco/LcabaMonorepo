import { Request, Response } from 'express';

import ComprasModel from '../../models/back-post/ComprasModel';
import GeneralModel from '../../models/back-post/GeneralModel';
import EditPageDTO, { IEditPageParams } from '../../DTOS/configuracionGral/EditPageDTO';
import EditSectionDTO, { IEditSectionParams } from '../../DTOS/configuracionGral/EditSectionDTO';

class GeneralController {
  public async getAllPages(req: Request, res: Response): Promise<void> {
    try {
      const response = await GeneralModel.getAllPages({
        search: req.query.input as string,
        order: req.query.order as string,
        limit: parseInt(req.query.limit as string),
        offset: parseInt(req.query.offset as string),
      });
      res.status(200);
      res.json(response);
    } catch (error) {
      console.error('Error en getAllPages:', error);
      res.status(500).json({ error: 'Error al obtener las páginas' });
    }
  }
  public async getAllPageSections(req: Request, res: Response): Promise<void> {
    try {
      const pageId = req.query.pageId ? parseInt(req.query.pageId as string) : undefined;
      const response = await GeneralModel.getAllPageSections({
        search: req.query.input as string,
        order: req.query.order as string,
        limit: parseInt(req.query.limit as string),
        offset: parseInt(req.query.offset as string),
        pageId: pageId,
      });
      res.status(200);
      res.json(response);
    } catch (error) {
      console.error('Error en getAllPageSections:', error);
      res.status(500).json({ error: 'Error al obtener las secciones' });
    }
  }
  public async getAllBanners(req: Request, res: Response): Promise<void> {
    try {
      const response = await GeneralModel.getAllBanners({
        search: req.query.input as string,
        order: req.query.order as string,
        limit: parseInt(req.query.limit as string),
        offset: parseInt(req.query.offset as string),
      });
      res.status(200);
      res.json(response);
    } catch (error) {
      console.error('Error en getAllPageSections:', error);
      res.status(500).json({ error: 'Error al obtener las secciones' });
    }
  }
  public async createPage(req: Request, res: Response): Promise<void> {
    try {
      const { title, id_user } = req.body;
      if (!title) {
        res.status(400).json({ error: 'El titulo es obligatorio' });
        return;
      }
      if (!id_user) {
        res.status(400).json({ error: 'El id del usuario es obligatorio' });
        return;
      }
      const response = await GeneralModel.createPage({ title, id_user });
      res.status(200);
      res.json(response);
    } catch (error) {
      console.error('Error en createPage:', error);
      res.status(500).json({ error: 'Error al crear la página' });
    }
  }
  public async getPageById(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;
      const response = await GeneralModel.getPageById({ id });
      res.status(200);
      res.json(response);
    } catch (error) {
      console.error('Error en getPageById:', error);
      res.status(500).json({ error: 'Error al obtener la página' });
    }
  }
  public async getSocials(req: Request, res: Response): Promise<void> {
    try {
      const pageId = req.params.id as string;
      const response = await GeneralModel.getSocials({ pageId });
      res.status(200);
      res.json(response);
    } catch (error) {
      console.error('Error en getSocials:', error);
      res.status(500).json({ error: 'Error al obtener los socials' });
    }
  }
  public async editPage(req: Request, res: Response): Promise<void> {
    try {
      const params = req.body as IEditPageParams;

      if (!params.seteos?.id) {
        res.status(400).json({ error: 'El id de la página es obligatorio' });
        return;
      }

      const dto = new EditPageDTO(params);
      const response = await GeneralModel.editPage({
        mainData: dto.getMainData(),
        translations: dto.getTranslations(),
        redes: dto.getRedes(),
      });

      res.status(200).json(response);
    } catch (error) {
      console.error('Error en editPage:', error);
      res.status(500).json({ error: 'Error al editar la página' });
    }
  }

  public async changeSectionStatus(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const response = await GeneralModel.changeSectionStatus({ id: Number(id), status: Number(status) });
      res.status(200).json(response);
    } catch (error) {
      console.error('Error en changeSectionStatus:', error);
      res.status(500).json({ error: 'Error al cambiar el estado de la sección' });
    }
  }

  public async getSectionById(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;
      const response = await GeneralModel.getSectionById({ id });
      res.status(200);
      res.json(response);
    } catch (error) {
      console.error('Error en getSectionById:', error);
      res.status(500).json({ error: 'Error al obtener la sección' });
    }
  }

  public async editSection(req: Request, res: Response): Promise<void> {
    try {
      const params = req.body as IEditSectionParams;

      if (!params.seteos?.id) {
        res.status(400).json({ error: 'El id de la sección es obligatorio' });
        return;
      }

      const dto = new EditSectionDTO(params);
      const response = await GeneralModel.editSection({
        mainData: dto.getMainData(),
        translations: dto.getTranslations(),
      });
      res.status(200).json(response);
    } catch (error) {
      console.error('Error en editSection:', error);
      res.status(500).json({ error: 'Error al editar la sección' });
    }
  }
}
export default new GeneralController();
