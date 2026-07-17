import { Request, Response } from 'express';
import LaborservicesModel from '../../models/back-post/LaborServiceModel';
import { kill } from 'node:process';

class LaborservicesController {
  public async getExpediente(req: Request, res: Response) {
    try {
      const { postId } = req.body;

      const expediente = await LaborservicesModel.getExpedienteById({
        id: postId,
      });
      res.status(200).json(expediente);
    } catch (error) {
      console.error('Error en getExpediente:', error);
      res.status(500).json({ error: 'Error al obtener el expediente' });
    }
  }
  public async getExpedienteByNroyAnio(req: Request, res: Response) {
    try {
      const { numero, anio } = req.body;

      const expediente = await LaborservicesModel.getExpedienteByNroyAnio({
        numero,
        anio,
      });
      res.status(200).json(expediente);
    } catch (error) {
      console.error('Error en getExpedienteByNroyAnio:', error);
      res.status(500).json({ error: 'Error al obtener el expediente' });
    }
  }
  public async getDespachoNroAno(req: Request, res: Response) {
    try {
      const { numero, anio } = req.body;
      const expediente = await LaborservicesModel.getDespachoNroAno({
        numero,
        anio,
      });
      res.status(200).json(expediente);
    } catch (error) {
      console.error('Error en GetDespachoNroAno:', error);
      res.status(500).json({ error: 'Error al obtener el expediente' });
    }
  }
  public async getSancionNroDeLey(req: Request, res: Response) {
    try {
      const { numero } = req.body;
      const expediente = await LaborservicesModel.getSancionNroDeLey({
        numero,
      });
      res.status(200).json(expediente);
    } catch (error) {
      console.error('Error en GetSancionNroDeLey:', error);
      res.status(500).json({ error: 'Error al obtener el expediente' });
    }
  }
  public async getSancionNroOrdenAnoParlamentario(req: Request, res: Response) {
    try {
      const { numero, anio } = req.body;
      const expediente = await LaborservicesModel.getSancionNroOrdenAnoParlamentario({
        numero,
        anio,
      });
      res.status(200).json(expediente);
    } catch (error) {
      console.error('Error en GetSancionNroOrdenAnoParlamentario:', error);
      res.status(500).json({ error: 'Error al obtener el expediente' });
    }
  }
  public async getComisionByNombre(req: Request, res: Response) {
    try {
      const { title } = req.query;

      if (!title || (typeof title === 'string' && title.trim() === '')) {
        res.status(400).json({
          error: 'Debe proporcionar un nombre para buscar la comisión.',
        });
        return;
      }

      const comisiones = await LaborservicesModel.getComisionByNombre(title as unknown as string);

      if (comisiones.length === 0) {
        res.status(200).json({
          message: 'No se encontraron comisiones con ese nombre.',
          data: [],
        });
        return;
      }

      res.status(200).json(comisiones);
    } catch (error) {
      console.error('Error en GetComisionesActivas:', error);
      res.status(500).json({ error: 'Error interno al obtener las comisiones activas' });
    }
  }
  public async getAudienciasPorRangoFecha(req: Request, res: Response) {
    try {
      const { fch_desde, fch_hasta } = req.body;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 6;
      const audiencias = await LaborservicesModel.getAudienciasPorRangoFecha(
        fch_desde as unknown as string,
        fch_hasta as unknown as string,
        page,
        limit,
      );
      res.status(200).json(audiencias);
    } catch (error) {
      console.error('Error en getAudienciasPorRangoFecha:', error);
      res.status(500).json({ error: 'Error al obtener las audiencias por rango fecha' });
    }
  }

  public async getSesionesAvanzado(req: Request, res: Response) {
    try {
      let { fch_desde, fch_hasta } = req.body;

      // Función robusta para formatear cualquier fecha a DD/MM/AAAA (entendido por SOAP)
      const formatSqlDate = (dateVal: any) => {
        if (!dateVal) return '';
        const d = new Date(dateVal);
        if (isNaN(d.getTime())) return String(dateVal);
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const dd = String(d.getDate()).padStart(2, '0');
        return `${dd}/${mm}/${yyyy}`;
      };

      fch_desde = formatSqlDate(fch_desde);
      fch_hasta = formatSqlDate(fch_hasta);

      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const sesiones = await LaborservicesModel.getSesionesAvanzado(
        fch_desde,
        fch_hasta,
        page,
        limit,
      );

      res.status(200).json(sesiones);
    } catch (error) {
      console.error('Error en getSesionesAvanzado:', error);
      res.status(500).json({ error: 'Error al obtener las sesiones avanzadas' });
    }
  }
  async getDiputadosHistorico(req: Request, res: Response) {
    try {
      const { search } = req.body;
      const diputados = await LaborservicesModel.getDiputadosHistorico(search as unknown as string);
      res.status(200).json(diputados);
    } catch (error) {
      console.error('Error en getDiputadosHistorico:', error);
      res.status(500).json({ error: 'Error al obtener los diputados historico' });
    }
  }

  async getSesionById(req: Request, res: Response) {
    try {
      const { id } = req.body;
      const sesion = await LaborservicesModel.getSesionById(id as unknown as string);
      res.status(200).json(sesion);
    } catch (error) {
      console.error('Error en getSesionById:', error);
      res.status(500).json({ error: 'Error al obtener la sesion' });
    }
  }
}
export default new LaborservicesController();
