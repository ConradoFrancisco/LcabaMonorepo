import { Request, Response } from 'express';
import BannerModel from '../../models/front-get/BannerModel';

class BannerController {
  /**
   * Controlador para obtener la lista de banners con filtros.
   */
  public async bannerList(req: Request, res: Response): Promise<void> {
    try {
      const {
        section = false,
        homeslide = false,
        offset = 0,
        limit = false,
        datevalidate = false,
        orderby = 'section',
        order = 'DESC',
      } = req.query;

      console.log(req.query);
      // Transformar los parámetros y garantizar que cumplan con los tipos esperados
      console.log(homeslide === 'true');
      const params = {
        section: typeof section === 'string' ? section : false,
        homeslide: homeslide === 'true' ? true : false,
        offset: parseInt(offset as string, 10) || 0,
        limit: limit ? parseInt(limit as string, 10) : false,
        datevalidate: datevalidate === 'true',
        orderby: typeof orderby === 'string' ? orderby : 'section',
        order: order === 'ASC' || order === 'DESC' ? (order as 'ASC' | 'DESC') : 'DESC',
      };

      // Llamar al modelo
      const banners = await BannerModel.bannerList(params);

      if (banners) {
        res.json(banners);
      } else {
        res.status(404).json({ message: 'No se encontraron banners' });
      }
    } catch (error) {
      console.error('Error en bannerList:', error);
      res.status(500).json({ error: 'Error al obtener los banners' });
    }
  }
}

export default new BannerController();
