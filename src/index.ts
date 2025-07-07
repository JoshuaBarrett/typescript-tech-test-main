import express, { Express, Request, Response } from 'express';
import { routes } from './routes';

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json({limit: '1mb'}));

routes.forEach(route => {
  app[route.method](route.path, route.handler);
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
