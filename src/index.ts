import express, { Express, Request, Response } from 'express';
import { routes } from './routes';
import { initDb } from './services/db/db';

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json({limit: '1mb'}));

initDb()
  .then(() => {
    app.listen(port, () => {

      //Add routes array to app
      routes.forEach(route => {
        app[route.method](route.path, route.handler);
      });

      // eslint-disable-next-line no-console
      console.log(`[server]: Server is running at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log('Db failed to initialise - ', error);
  })
