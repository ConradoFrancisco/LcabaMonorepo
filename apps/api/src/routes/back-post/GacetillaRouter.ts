import { Router } from 'express';
import GacetillaController from '../../controllers/back-post/GacetillaController';

const router = Router();

// Búsquedas
router.get('/search-publications', GacetillaController.searchPublications);
router.get('/search-subscribers', GacetillaController.searchSubscribers);

// Acción de envío
router.post('/send', GacetillaController.sendGacetilla);

export default router;
