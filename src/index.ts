import app from './app';
import { initDb } from './services/db/db';

const port = process.env.PORT || 3000;

try {
  initDb();
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
} catch (error) {
  console.error('Db failed to initialise - ', error);
  process.exit(1); // Optional: exit if DB init fails
}