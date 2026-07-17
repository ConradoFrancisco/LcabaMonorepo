import { Request, Response } from 'express';
import DgpcModel from '../../models/front-get/DgpcModel';

class DgpcController {
  public async inscFecha(req: Request, res: Response): Promise<void> {
    const { date, fk, id } = req.query;

    try {
      const parsedId = parseInt(id as string, 10) || 0;
      const parsedFkIdInscTipo = parseInt(fk as string, 10) || 0;
      if (!parsedFkIdInscTipo) {
        res.status(400).json({ error: 'Foreyng Key inválida o no proporcionada' });
        return;
      }
      if (!date) {
        res.status(400).json({ error: 'No se ha proporcionado una fecha o es invalida' });
        return;
      }

      const row = await DgpcModel.DGPCTemporadaInscFechaExists({
        dateStart: date as string,
        fkIdInscTipo: parsedFkIdInscTipo,
        id: parsedId,
      });
      res.json(row);
    } catch (error) {
      console.error('Error en culturacategoriasGetById:', error);
      res.status(500).json({ error: 'Error al obtener la categoría' });
    }
  }
  public async getInscripcionesActuales(req: Request, res: Response): Promise<void> {
    try {
      let { id } = req.query;

      if (typeof id !== 'string') {
        res.status(400).json({ error: 'ID inválido' });
        return;
      }
      const row = await DgpcModel.getInscripcionesFechaActual({
        id: parseInt(id as string, 10) || false,
      });

      res.json(row);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los tipos de posts' });
    }
  }
  public async getConcursoByUrl(req: Request, res: Response): Promise<void> {
    try {
      const { url } = req.query;
      if (!url) {
        res.status(400).json({ error: 'URL inválido o no proporcionado' });
        return;
      }
      const concurso = await DgpcModel.getConcursoByUrl({
        url: url as string,
      });

      res.json(concurso);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los tipos de posts' });
    }
  }
  public async getConcursoById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ error: 'id inválido o no proporcionado' });
        return;
      }
      const concurso = await DgpcModel.getConcursoById({
        id: parseInt(id as string),
      });

      res.json(concurso);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los tipos de posts' });
    }
  }
  public async getCursosTipoInsc(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      let parsedId = parseInt(id as string, 10);
      if (!id || isNaN(parsedId)) {
        res.status(400).json({ error: 'id inválido o no proporcionado' });
        return;
      }
      const concurso = await DgpcModel.getCursoByTupiInsc({
        FkId: parseInt(id as string),
      });

      res.json(concurso);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener posts por tipo' });
    }
  }
  public async getColegiosNiveles(req: Request, res: Response): Promise<void> {
    const { id } = req.query;
    const parsedId = id && !isNaN(Number(id)) ? Number(id) : false;

    try {
      const nivel = await DgpcModel.getColegiosNiveles({ id: parsedId });
      res.json(nivel);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los niveles por tipo' });
    }
  }
  // SE VA A ILCP
  /* public async getOrigenInsc(req: Request, res: Response): Promise<void> {
      try {
        const { idorigen } = req.query;
        const parsedId = idorigen ? parseInt(idorigen as string, 10) : false;
        const data = await DgpcModel.ilcpOrigenInscListDGPC({ idorigen: parsedId });
        res.json(data);
      } catch (error) {
        res.status(500).json({ error: "Error al obtener los datos" });
      }
    } */
  public async getPostTableByName(req: Request, res: Response): Promise<void> {
    try {
      const { id, name } = req.query;
      if (!id || !name) {
        res.status(400).json({ error: 'Parámetros inválidos' });
        return;
      }
      const data = await DgpcModel.dgpcPostsGetTableByName({
        id: parseInt(id as string, 10),
        name: name as string,
      });
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los datos' });
    }
  }
  public async getPostsByTableNameId(req: Request, res: Response): Promise<void> {
    const { id, name } = req.query;

    if (!id || !name || typeof name !== 'string') {
      res.status(400).json({ error: 'ID o nombre de tabla inválidos' });
      return;
    }

    try {
      const parsedId = parseInt(id as string, 10);
      if (isNaN(parsedId)) {
        res.status(400).json({ error: 'ID inválido' });
        return;
      }

      const data = await DgpcModel.getPostsByTableNameId({
        id: parsedId,
        name,
      });
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los datos' });
    }
  }
  public async getPostsTypes(req: Request, res: Response): Promise<void> {
    const { offset, limit } = req.query;

    try {
      const data = await DgpcModel.postsGetTypes({
        offset: offset ? parseInt(offset as string, 10) : 0,
        limit: limit ? parseInt(limit as string, 10) : false,
      });
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los datos' });
    }
  }
  public async getPostsTypesByUrl(req: Request, res: Response): Promise<void> {
    const { url } = req.query;

    try {
      const data = await DgpcModel.postsGetTypesByUrl({
        url: url as string,
      });
      if (!url) {
        res.status(400).json({ error: 'URL inválida o no proporcionada' });
        return;
      }
      if (!data) {
        res.status(404).json({ error: 'No se encontraron datos' });
        return;
      } else {
        res.json(data);
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los datos' });
    }
  }

  public async getPostsTypesById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      if (!id) {
        res.status(400).json({ error: 'ID no proporcionado' });
        return;
      }
      const parsedId = parseInt(id as string, 10);
      if (isNaN(parsedId)) {
        res.status(400).json({ error: 'ID inválido' });
        return;
      }
      const data = await DgpcModel.postsGetTypesById({
        id: parsedId,
      });
      if (!data) {
        res.status(404).json({ error: 'No se encontraron datos' });
        return;
      } else {
        res.json(data);
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los datos' });
    }
  }
}

export default new DgpcController();
