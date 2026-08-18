import { Request, Response } from 'express';
import NavMenuModel from '../../models/front-get/NavMenuModel';

class NavMenuController {
  /**
   * GET /nav-menu/tree
   * Query params:
   *   - pageId (optional): ID del micrositio/page. Si se omite, devuelve todos los sites.
   *   - lang   (optional): ID de idioma (default 2 = español).
   *
   * Devuelve el árbol de menú completo con submenús anidados en `subItems`.
   * Útil para renderizar el menú de navegación en cualquier micrositio.
   */
  public async getNavTree(req: Request, res: Response): Promise<void> {
    try {
      const { pageId, lang } = req.query;

      const params: { pageId?: number; lang?: number } = {};

      if (pageId !== undefined) {
        const parsed = parseInt(pageId as string, 10);
        if (isNaN(parsed) || parsed <= 0) {
          res.status(400).json({ error: 'pageId debe ser un número entero positivo' });
          return;
        }
        params.pageId = parsed;
      }

      if (lang !== undefined) {
        const parsedLang = parseInt(lang as string, 10);
        if (!isNaN(parsedLang) && parsedLang > 0) {
          params.lang = parsedLang;
        }
      }

      const tree = await NavMenuModel.getNavTree(params);

      if (!tree || tree.length === 0) {
        res.status(404).json({ message: 'No se encontró menú para los parámetros indicados' });
        return;
      }

      res.status(200).json(tree);
    } catch (error) {
      console.error('Error en getNavTree:', error);
      res.status(500).json({ error: 'Error al obtener el árbol de menú de navegación' });
    }
  }

  /**
   * GET /nav-menu/flat
   * Query params:
   *   - pageId (optional): ID del micrositio/page.
   *   - lang   (optional): ID de idioma (default 2 = español).
   *
   * Devuelve todos los ítems sin anidar.
   * Útil para depuración o cuando el front prefiere construir el árbol en el cliente.
   */
  public async getNavFlat(req: Request, res: Response): Promise<void> {
    try {
      const { pageId, lang } = req.query;

      const params: { pageId?: number; lang?: number } = {};

      if (pageId !== undefined) {
        const parsed = parseInt(pageId as string, 10);
        if (isNaN(parsed) || parsed <= 0) {
          res.status(400).json({ error: 'pageId debe ser un número entero positivo' });
          return;
        }
        params.pageId = parsed;
      }

      if (lang !== undefined) {
        const parsedLang = parseInt(lang as string, 10);
        if (!isNaN(parsedLang) && parsedLang > 0) {
          params.lang = parsedLang;
        }
      }

      const items = await NavMenuModel.getNavFlat(params);

      if (!items || items.length === 0) {
        res.status(404).json({ message: 'No se encontró menú para los parámetros indicados' });
        return;
      }

      res.status(200).json(items);
    } catch (error) {
      console.error('Error en getNavFlat:', error);
      res.status(500).json({ error: 'Error al obtener el menú plano de navegación' });
    }
  }
  /**
   * GET /nav-menu/debug
   * Muestra los datos crudos de menu_tables_rel para diagnosticar la relación padre-hijo.
   * Query params: pageId (opcional)
   */
  public async debugRelations(req: Request, res: Response): Promise<void> {
    try {
      const { pageId } = req.query;
      const params: { pageId?: number } = {};
      if (pageId !== undefined) {
        params.pageId = parseInt(pageId as string, 10) || undefined;
      }
      const data = await NavMenuModel.debugRelations(params);
      res.status(200).json(data);
    } catch (error) {
      console.error('Error en debugRelations:', error);
      res.status(500).json({ error: 'Error en diagnóstico' });
    }
  }
}

export default new NavMenuController();
