import { Request, Response } from 'express';
import IlcpModel from '../../models/back-post/IlcpModel';

class IlcpController {
  public async getAllBeneficios(req: Request, res: Response): Promise<void> {
    try {
      const response = await IlcpModel.getAllBeneficios({
        search: req.query.input as string,
        order: req.query.order as string,
        limit: parseInt(req.query.limit as string),
        offset: parseInt(req.query.offset as string),
      });
      res.status(200);
      res.json(response);
    } catch (error) {
      console.error('Error en getAllPosts:', error);
      res.status(500).json({ error: 'Error al obtener los posts' });
    }
  }
  public async getAllCursos(req: Request, res: Response): Promise<void> {
    try {
      const response = await IlcpModel.getAllCursos({
        search: req.query.input as string,
        order: req.query.order as string,
        limit: parseInt(req.query.limit as string),
        offset: parseInt(req.query.offset as string),
      });
      res.status(200);
      res.json(response);
    } catch (error) {
      console.error('Error en getAllCursos:', error);
      res.status(500).json({ error: 'Error al obtener los cursos' });
    }
  }
  public async getAllDocentes(req: Request, res: Response): Promise<void> {
    try {
      const response = await IlcpModel.getAllDocentes({
        search: req.query.input as string,
        order: req.query.order as string,
        limit: parseInt(req.query.limit as string),
        offset: parseInt(req.query.offset as string),
      });
      res.status(200);
      res.json(response);
    } catch (error) {
      console.error('Error en getAllDocentes:', error);
      res.status(500).json({ error: 'Error al obtener los Docentes' });
    }
  }
  public async getAllCursosTipo(req: Request, res: Response): Promise<void> {
    try {
      const response = await IlcpModel.getAllCursosTipo({
        search: req.query.input as string,
        order: req.query.order as string,
        limit: parseInt(req.query.limit as string),
        offset: parseInt(req.query.offset as string),
      });
      res.status(200);
      res.json(response);
    } catch (error) {
      console.error('Error en getAllCursosTipo:', error);
      res.status(500).json({ error: 'Error al obtener los Cursos por Tipo' });
    }
  }
  public async getAllCategorias(req: Request, res: Response): Promise<void> {
    try {
      const response = await IlcpModel.getAllCategorias({
        search: req.query.input as string,
        order: req.query.order as string,
        limit: parseInt(req.query.limit as string),
        offset: parseInt(req.query.offset as string),
      });
      res.status(200);
      res.json(response);
    } catch (error) {
      console.error('Error en getAllCursosTipo:', error);
      res.status(500).json({ error: 'Error al obtener los Cursos por Tipo' });
    }
  }
  public async getAllSalones(req: Request, res: Response): Promise<void> {
    try {
      const response = await IlcpModel.getAllSalones({
        search: req.query.input as string,
        order: req.query.order as string,
        limit: parseInt(req.query.limit as string),
        offset: parseInt(req.query.offset as string),
      });
      res.status(200);
      res.json(response);
    } catch (error) {
      console.error('Error en getAllSalones:', error);
      res.status(500).json({ error: 'Error al obtener los Salones' });
    }
  }
  public async getAllOrigenes(req: Request, res: Response): Promise<void> {
    try {
      const response = await IlcpModel.getAllOrigenInscripto({
        search: req.query.input as string,
        order: req.query.order as string,
        limit: parseInt(req.query.limit as string),
        offset: parseInt(req.query.offset as string),
      });
      res.status(200);
      res.json(response);
    } catch (error) {
      console.error('Error en getAllSalones:', error);
      res.status(500).json({ error: 'Error al obtener los Salones' });
    }
  }
  public async getAllPosts(req: Request, res: Response): Promise<void> {
    try {
      const response = await IlcpModel.getAllPosts({
        search: req.query.input as string,
        order: req.query.order as string,
        limit: parseInt(req.query.limit as string),
        offset: parseInt(req.query.offset as string),
      });
      res.status(200);
      res.json(response);
    } catch (error) {
      console.error('Error en getAllPosts:', error);
      res.status(500).json({ error: 'Error al obtener los Posts' });
    }
  }
  public async getAllTipos(req: Request, res: Response): Promise<void> {
    try {
      const response = await IlcpModel.getAllPostsType({
        search: req.query.input as string,
        order: req.query.order as string,
        limit: parseInt(req.query.limit as string),
        offset: parseInt(req.query.offset as string),
      });
      res.status(200);
      res.json(response);
    } catch (error) {
      console.error('Error en getAllPosts:', error);
      res.status(500).json({ error: 'Error al obtener los Posts' });
    }
  }
  public async getAllModulos(req: Request, res: Response): Promise<void> {
    try {
      const response = await IlcpModel.getAllModulos({
        search: req.query.input as string,
        order: req.query.order as string,
        limit: parseInt(req.query.limit as string),
        offset: parseInt(req.query.offset as string),
      });
      res.status(200);
      res.json(response);
    } catch (error) {
      console.error('Error en getAllPosts:', error);
      res.status(500).json({ error: 'Error al obtener los Posts' });
    }
  }
}
export default new IlcpController();
