import { Request, Response } from 'express';
import BannerModel from '../../models/front-get/AreaModel';
import AreaModel from '../../models/front-get/AreaModel';

class AreaController {
  public async areasList(req: Request, res: Response): Promise<void> {
    try {
      // Extraer y validar los parámetros de req.query
      const { section, offset = 0, limit = false } = req.query;
      // Transformar los parámetros a los tipos correctos
      const params = {
        section: section ? (typeof section === 'string' ? section : false) : undefined,

        offset: parseInt(offset as string, 10) || 0,
        limit: limit ? parseInt(limit as string, 10) : false,
      };

      // Llamar al modelo para obtener los datos
      const areas = await AreaModel.areasList(params);

      if (areas) {
        res.json(areas);
      } else {
        res.status(404).json({ message: 'No se encontraron áreas' });
      }
    } catch (error) {
      console.error('Error en areasList:', error);
      res.status(500).json({ error: 'Error al obtener las áreas' });
    }
  }

  public async GetById(req: Request, res: Response): Promise<void> {
    try {
      // Validar y obtener el parámetro ID
      const id = parseInt(req.params.id as string, 10);

      if (isNaN(id)) {
        res.status(400).json({ error: 'El ID proporcionado no es válido' });
        return;
      }

      // Llamar al modelo para obtener los datos
      const banners = await AreaModel.GetById(id);

      if (banners) {
        res.json(banners);
      } else {
        res.status(404).json({
          message: 'No se encontraron banners con el ID especificado',
        });
      }
    } catch (error) {
      console.error('Error en bannersGetById:', error);
      res.status(500).json({ error: 'Error al obtener los banners' });
    }
  }
  public async GetByUrl(req: Request, res: Response): Promise<void> {
    try {
      const { url } = req.query;

      if (!url || typeof url !== 'string') {
        res.status(400).json({
          error: "El parámetro 'url' es obligatorio y debe ser una cadena de texto",
        });
        return;
      }
      const banners = await AreaModel.getByUrl(url);

      // Llamar al modelo para obtener los datos

      if (banners) {
        res.json(banners);
      } else {
        res.status(404).json({ message: 'No se encontraron areas con el ID especificado' });
      }
    } catch (error) {
      console.error('Error en areasGetById:', error);
      res.status(500).json({ error: 'Error al obtener las areas' });
    }
  }
}
export default new AreaController();
