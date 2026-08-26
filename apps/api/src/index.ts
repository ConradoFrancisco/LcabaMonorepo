import 'dotenv/config';
import express, { Request, Response } from 'express';
import cors from 'cors';

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
import DocsController from './controllers/back-post/DocsController';
import { fileURLToPath } from 'node:url';
import path from 'path';
import { LaborservicesRouter } from './routes/back-post/LaborservicesRouter';
import { postRouter } from './routes/back-post/PostRouter';
import PagesRouter from './routes/back-post/general/PagesRouter';
import CategoriesRouter from './routes/back-post/CategoriesRouter';

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

// router
app.use('/auth', authRouter);
app.use('/menu', menuRouter);
app.use('/cmMenu', cmMenuRouter);
app.use('/nav-menu', navMenuRouter);
app.use('/area', areaRouter);
app.use('/banner', bannerRouter);
app.use('/contratacion', contratacionRouter);
app.use('/culturas', culturaRouter);
app.use('/cultura', culturaRouterb);
app.use('/dgpc', DgpcRouter);
app.use('/magazine', magazineRouter);
app.use('/ilcp', IlcpRouter);
app.use('/funcionarios', funcionariosRouter);
app.use('/obras', ObrasRouter);
app.use('/compras', ComprasRouter);
app.use('/prensa', PrensaRouter);
app.use('/gacetilla', GacetillaRouter);
app.use('/taquigrafos', TaquigrafosRouter);
app.use('/general', GeneralRouter);
app.use('/upload', docsRouter);
app.use('/labor', LaborservicesRouter);
app.use('/posts', postRouter);
app.use('/fileserver', fileServerRouter);
app.use('/pages', PagesRouter);
app.use('/categories', CategoriesRouter);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
