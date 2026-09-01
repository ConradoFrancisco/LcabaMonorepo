import { Request, Response } from 'express';
import CmMenuModel from '../../models/front-get/CmMenuModel';

class CmMenuController {
  public async sideBarMenuList(req: Request, res: Response): Promise<void> {
    try {
      const menu = await CmMenuModel.sideBarMenuList();
      if (menu) {
        res.json(menu);
      } else {
        res.status(404).json({ message: 'Hubo un problema al traer el menu' });
      }
    } catch (error) {
      console.error('Error en areasList:', error);
      res.status(500).json({ error: 'Error al obtener las áreas' });
    }
  }

  public async fullMenuList(req: Request, res: Response): Promise<void> {

    try {
      const pageId = req.query.pageId ? Number(req.query.pageId) : undefined;
      const menu = await CmMenuModel.fullMenuList(pageId);
      if (menu) {
        res.json(menu);
      } else {
        res.status(404).json({ message: 'Hubo un problema al traer el menu' });
      }
    } catch (error) {
      console.error('Error en areasList:', error);
      res.status(500).json({ error: 'Error al obtener las áreas' });
    }
  }
}

export default new CmMenuController();
