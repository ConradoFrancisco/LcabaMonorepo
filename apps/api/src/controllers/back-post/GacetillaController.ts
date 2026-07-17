import { Request, Response } from 'express';
import PrensaModel from '../../models/back-post/PrensaModel';
import MailService from '../../services/mail.service';

class GacetillaController {
  /**
   * Busca publicaciones (Noticias / Comunicados)
   */
  public async searchPublications(req: Request, res: Response) {
    try {
      const { q } = req.query;
      const results = await PrensaModel.getAllPosts({
        search: q as string,
        limit: 10,
        offset: 0,
      });
      res.json(results);
    } catch (error) {
      console.error('Error en searchPublications:', error);
      res.status(500).json({ ok: false, message: 'Error buscando publicaciones' });
    }
  }

  /**
   * Busca suscriptores
   */
  public async searchSubscribers(req: Request, res: Response) {
    try {
      const { q } = req.query;
      const results = await PrensaModel.getSuscriptores({
        search: q as string,
        limit: 50,
        offset: 0,
      });
      res.json(results);
    } catch (error) {
      console.error('Error en searchSubscribers:', error);
      res.status(500).json({ ok: false, message: 'Error buscando suscriptores' });
    }
  }

  /**
   * Procesa el envío de la gacetilla
   */
  public async sendGacetilla(req: Request, res: Response) {
    try {
      const { subscribers, subject, message, publicationId } = req.body;

      if (!subscribers || !subscribers.length || !subject || !message) {
        res.status(400).json({ ok: false, message: 'Faltan datos obligatorios' });
        return;
      }

      console.log(
        `[GACETILLA] Iniciando envío de "${subject}" a ${subscribers.length} suscriptores`,
      );

      const sendPromises = subscribers.map((sub: any) => {
        return MailService.sendWithTemplate(sub.email, subject, 'prensa/prensa.html', {
          titulo: subject,
          mensaje: message,
          link_noticia: `https://legislatura.gob.ar/noticia/${publicationId || 'general'}`,
          link_baja: `https://legislatura.gob.ar/unsubscribe/${sub.id || '0'}`,
        });
      });

      await Promise.all(sendPromises);

      res.json({
        ok: true,
        message: `Gacetilla enviada con éxito a ${subscribers.length} personas`,
      });
    } catch (error: any) {
      console.error('Error en sendGacetilla:', error);
      res.status(500).json({
        ok: false,
        message: 'Error procesando el envío',
        detail: error?.message || String(error),
        code: error?.code,
      });
    }
  }
}

export default new GacetillaController();
