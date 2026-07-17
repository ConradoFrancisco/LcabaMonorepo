import { Request, Response } from 'express';
import CulturaModel from '../../models/front-get/CulturaModel';

class CulturaController {
  public async culturaCategoriasGetById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      const parsedId = parseInt(id as string, 10) || 0;

      if (!parsedId) {
        res.status(400).json({ error: 'ID inválido o no proporcionado' });
      }

      const categoria = await CulturaModel.culturacategoriasGetById(parsedId);
      res.json(categoria);
    } catch (error) {
      console.error('Error en culturacategoriasGetById:', error);
      res.status(500).json({ error: 'Error al obtener la categoría' });
    }
  }
  public async culturaCategoriasGetByUrl(req: Request, res: Response): Promise<void> {
    const { url } = req.query;

    try {
      if (!url) {
        res.status(400).json({ error: 'URL inválido o no proporcionado' });
        return;
      }

      const categoria = await CulturaModel.culturaCategoriasGetByUrl(url as string);
      res.json(categoria);
    } catch (error) {
      console.error('Error en culturacategoriasGetById:', error);
      res.status(500).json({ error: 'Error al obtener la categoría' });
    }
  }

  public async fetchCategoriesCultura(req: Request, res: Response) {
    const {
      categories = false,
      searchsubcat = false,
      desta = false,
      offset = 0,
      limit = false,
    } = req.query;

    try {
      const params: {
        categories?: number | false;
        searchsubcat?: boolean;
        desta?: boolean;
        offset?: number;
        limit?: number | false;
      } = {
        categories:
          categories && categories !== 'true' && categories !== 'false'
            ? parseInt(categories as string, 10)
            : false,
        searchsubcat: searchsubcat === 'true',
        desta: desta === 'true',
        offset: parseInt(offset as string, 10) || 0,
        limit:
          limit && limit !== 'true' && limit !== 'false' ? parseInt(limit as string, 10) : false,
      };

      const categoriesList = await CulturaModel.fetchCategoriesCultura(params);
      res.json(categoriesList);
    } catch (error) {
      console.error('Error en fetchCategoriesCultura:', error);
      res.status(500).json({ error: 'Error al obtener las categorías' });
    }
  }

  public async getCulturaPostDias(req: Request, res: Response) {
    const { id, status = false, offset = 0, limit = false } = req.query;

    try {
      if (!id) {
        res.status(400).json({ error: 'Falta el parámetro id' });
      }

      const params = {
        fk_idpost: parseInt(id as string, 10),
        status: status && status === 'true' ? 1 : false,
        offset: parseInt(offset as string, 10) || 0,
        limit: limit === 'false' ? false : parseInt(limit as string, 10) || false,
      };

      const data = await CulturaModel.getCulturaPostDias(params);
      res.json(data);
    } catch (error) {
      console.error('Error en getCulturaPostDias:', error);
      res.status(500).json({ error: 'Error al obtener los datos' });
    }
  }

  public async culturaPostsGetByTableName(req: Request, res: Response): Promise<void> {
    const { id, name } = req.params;

    if (!id || !name) {
      res.status(400).json({ error: 'Faltan parámetros obligatorios' });
      return;
    }

    try {
      const result = await CulturaModel.cultPostsGetTableByName(parseInt(id as string, 10), name as string);
      res.json(result);
    } catch (error) {
      console.error('Error en :', error);
      res.status(500).json({ error: 'Error al obtener los datos' });
    }
  }
  public async cultPostsAll(req: Request, res: Response): Promise<void> {
    try {
      const { banner, desta, datevalidate, offset, limit } = req.query;

      const posts = await CulturaModel.getCulturaPosts({
        banner: banner === 'true',
        desta: desta === 'true',
        datevalidate: datevalidate === 'true',
        offset: offset ? parseInt(offset as string) : 0,
        limit: limit ? parseInt(limit as string) : false,
      });

      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los posts' });
    }
  }
  public async cultPostsAgenda(req: Request, res: Response): Promise<void> {
    try {
      const { type, desta, start, end } = req.query;

      const posts = await CulturaModel.getCulturaPostsAgenda({
        type: type ? parseInt(type as string) : false,
        desta: desta === 'true',
        start: start ? (start as string) : false,
        end: end ? (end as string) : false,
      });

      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los posts de agenda' });
    }
  }
  public async getCulturaPostTypes(req: Request, res: Response): Promise<void> {
    try {
      const { offset, limit } = req.query;

      const postTypes = await CulturaModel.getCulturaPostTypes({
        offset: offset ? parseInt(offset as string) : 0,
        limit: limit ? parseInt(limit as string) : false,
      });

      res.json(postTypes);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los tipos de posts' });
    }
  }
  public async getCulturaPostTypesByUrl(req: Request, res: Response): Promise<void> {
    try {
      const { url } = req.query;
      if (!url) {
        res.status(400).json({ error: 'URL inválido o no proporcionado' });
        return;
      }
      const postTypes = await CulturaModel.getCulturaPostTypesByUrl({
        url: url as string,
      });

      res.json(postTypes);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los tipos de posts' });
    }
  }
}

export default new CulturaController();
