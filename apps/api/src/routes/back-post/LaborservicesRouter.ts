import { Router } from 'express';
import LaborservicesController from '../../controllers/back-post/LaborservicesController';
export const LaborservicesRouter = Router();

LaborservicesRouter.post('/getExpedienteById', LaborservicesController.getExpediente);
LaborservicesRouter.post(
  '/getExpedienteByNroyAnio',
  LaborservicesController.getExpedienteByNroyAnio,
);
LaborservicesRouter.post('/GetDespachoNroAno', LaborservicesController.getDespachoNroAno);
LaborservicesRouter.post('/GetSancionNroDeLey', LaborservicesController.getSancionNroDeLey);
LaborservicesRouter.post(
  '/GetSancionNroOrdenAnoParlamentario',
  LaborservicesController.getSancionNroOrdenAnoParlamentario,
);
LaborservicesRouter.get('/GetComisionesActivas', LaborservicesController.getComisionByNombre);
LaborservicesRouter.post(
  '/getAudienciasPorRangoFecha',
  LaborservicesController.getAudienciasPorRangoFecha,
);
LaborservicesRouter.post('/GetDiputadosHistorico', LaborservicesController.getDiputadosHistorico);
LaborservicesRouter.post('/GetSesionesAvanzado', LaborservicesController.getSesionesAvanzado);
