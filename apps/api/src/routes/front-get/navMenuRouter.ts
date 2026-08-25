import { Router } from 'express';
import NavMenuController from '../../controllers/front-get/NavMenuController';

export const navMenuRouter = Router();

/**
 * GET /nav-menu/tree
 * Devuelve el árbol de menú completo con submenús anidados en `subItems`.
 * Query params:
 *   - pageId (opcional): filtra por micrositio (fk_pageid). Ej: ?pageId=3
 *   - lang   (opcional): idioma (default 2). Ej: ?lang=2
 *
 * Ejemplo de uso desde un micrositio:
 *   fetch('http://api.lcaba.gob.ar/nav-menu/tree?pageId=3')
 */
navMenuRouter.get('/tree', NavMenuController.getNavTree);

/**
 * GET /nav-menu/flat
 * Devuelve todos los ítems sin anidar (lista plana).
 * Query params:
 *   - pageId (opcional): filtra por micrositio. Ej: ?pageId=3
 *   - lang   (opcional): idioma (default 2). Ej: ?lang=2
 */
navMenuRouter.get('/flat', NavMenuController.getNavFlat);

/**
 * GET /nav-menu/by-url
 * Busca una sección de menú por su URL — usado por el catch-all route de Next.js.
 * Query params:
 *   - url    (requerido): URL de la sección, ej: ?url=/institucional
 *   - pageId (opcional): filtra por micrositio. Ej: &pageId=3
 *   - lang   (opcional): idioma (default 2). Ej: &lang=2
 */
navMenuRouter.get('/by-url', NavMenuController.getSectionByUrl);

/**
 * GET /nav-menu/debug
 * Solo desarrollo: muestra datos crudos de menu_tables_rel.
 * Query params: pageId (opcional)
 */
navMenuRouter.get('/debug', NavMenuController.debugRelations);
