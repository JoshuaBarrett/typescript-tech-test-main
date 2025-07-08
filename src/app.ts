import express, { Express, Request, Response } from 'express';
import { routes } from './routes';

const app: Express = express();
app.use(express.json({limit: '1mb'}));

//Add routes array to app
routes.forEach(route => {
  app[route.method](route.path, route.handler);
});

export default app;