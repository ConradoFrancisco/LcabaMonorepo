import { Request, Response } from 'express';
import MenuModel from '../../models/front-get/MenuModel';

class MenuController {
  public async menuList(req: Request, res: Response) {
    const { princ = 0, limit = false, offset = 0 } = req.query;
    try {
      const params = {
        princ: parseInt(princ as string, 10) || 0,
        limit: limit === false ? false : parseInt(limit as string, 10) || false,
        offset: parseInt(offset as string, 10) || 0,
      };

      const menus = await MenuModel.menuList(params);
      res.json(menus);
    } catch (error) {
      console.error('Error en menuList:', error);
      res.status(500).json({ error: 'Error al obtener los menús' });
    }
  }

  public async menuGetById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      if (!id) {
        res.status(400).send('No hay menu proporcionado');
      }
      const data = await MenuModel.menuGetById({ id: parseInt(id as string) });
      res.status(200).json(data);
    } catch (e) {
      console.error(e);
    }
  }

  public async getUrlById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      if (!id) {
        res.status(400).send('No hay menu proporcionado');
      }
      const data = await MenuModel.menuGetUrlById({
        id: parseInt(id as string),
      });
      res.status(200).json(data);
    } catch (e) {
      console.error(e);
    }
  }

  public async getByUrl(req: Request, res: Response) {
    const { url } = req.query;
    try {
      if (!url) {
        res.status(400).send('No hay menu proporcionado');
        return;
      } else if (typeof url !== 'string') {
        res.status(400).send('El tipo de dato del menu no debe ser un número');
        return;
      }
      const data = await MenuModel.menuGetByUrl({ url: url as string });
      if (data?.length === 0) {
        res.status(404).send('No se encontraron datos');
        return;
      }
      res.status(200).json(data);
    } catch (e) {
      console.error(e);
    }
  }
}

export default new MenuController();
