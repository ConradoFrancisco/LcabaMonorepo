import 'dotenv/config';
import express, { Request, Response } from 'express';
import cors from 'cors';

import { authJwt } from './middlewares/authJwt';
import { fileServerRouter } from './routes/back-post/FileServerRouter';

import { menuRouter } from './routes/front-get/menuRouter';
import { areaRouter } from './routes/front-get/areaRouter';
import { bannerRouter } from './routes/front-get/BannerRouter';
import { contratacionRouter } from './routes/front-get/ContratacionRouter';
import { culturaRouter } from './routes/front-get/culturaRouter';
import { dgpcRouter } from './routes/front-get/dgpcRouter';
import { cmMenuRouter } from './routes/front-get/cmMenuRouter';
import { navMenuRouter } from './routes/front-get/navMenuRouter';
import { authRouter } from './routes/authRouter';
import { magazineRouter } from './routes/back-post/MagazineRouter';
import { culturaRouterb } from './routes/back-post/CulturaRouter';
import IlcpRouter from './routes/back-post/IlcpRouter';
import { funcionariosRouter } from './routes/back-post/FuncionariosRouter';
import ObrasRouter from './routes/back-post/ObrasRouter';
import ComprasRouter from './routes/back-post/ComprasRouter';
import PrensaRouter from './routes/back-post/PrensaRouter';
import TaquigrafosRouter from './routes/back-post/TaquigrafosRouter';
import { DgpcRouter } from './routes/back-post/DgpcRouter';
import GeneralRouter from './routes/back-post/GeneralRouter';
import { docsRouter } from './routes/back-post/DocsRouter';
import GacetillaRouter from './routes/back-post/GacetillaRouter';
import path from 'path';
import { LaborservicesRouter } from './routes/back-post/LaborservicesRouter';
import { postRouter } from './routes/back-post/PostRouter';
import PagesRouter from './routes/back-post/general/PagesRouter';
import CategoriesRouter from './routes/back-post/CategoriesRouter';
import IssueRouter from './routes/back-post/IssueRouter';
import TypesRouter from './routes/back-post/TypesRouter';

const app = express();
const PORT = Number(process.env.PORT || 3001);
// Para obtener __dirname en ES Modules

app.use('/_pagedata', express.static(path.join(__dirname, '../_pagedata')));

app.use(express.json());
app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:3000' }));

app.get('/health', (_req: Request, res: Response): void => {
  res.json({ ok: true });
});

app.get('/', (_req: Request, res: Response): void => {
  res.send('¡Api Lcaba con Node.js, TypeScript y Express!');
});

// Rutas Públicas y de Autenticación
app.use('/auth', authRouter);
app.use('/menu', menuRouter);
app.use('/cmMenu', cmMenuRouter);
app.use('/nav-menu', navMenuRouter);
app.use('/area', areaRouter);
app.use('/banner', bannerRouter);
app.use('/contratacion', contratacionRouter);
app.use('/culturas', culturaRouter);

// Rutas Administrativas Protegidas con Token JWT
app.use('/cultura', authJwt, culturaRouterb);
app.use('/dgpc', authJwt, DgpcRouter);
app.use('/magazine', authJwt, magazineRouter);
app.use('/ilcp', authJwt, IlcpRouter);
app.use('/funcionarios', authJwt, funcionariosRouter);
app.use('/obras', authJwt, ObrasRouter);
app.use('/compras', authJwt, ComprasRouter);
app.use('/prensa', authJwt, PrensaRouter);
app.use('/gacetilla', authJwt, GacetillaRouter);
app.use('/taquigrafos', authJwt, TaquigrafosRouter);
app.use('/general', GeneralRouter);
app.use('/upload', authJwt, docsRouter);
app.use('/labor', authJwt, LaborservicesRouter);
app.use('/posts', (req, res, next) => {
  if (req.method === 'GET') {
    return next();
  }
  return authJwt(req, res, next);
}, postRouter);
app.use('/fileserver', fileServerRouter);
app.use('/pages', authJwt, PagesRouter);
app.use('/categories', authJwt, CategoriesRouter);
app.use('/issue', authJwt, IssueRouter);
app.use('/types', authJwt, TypesRouter);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
