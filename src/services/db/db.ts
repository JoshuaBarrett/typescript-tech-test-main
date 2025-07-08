import { Database } from 'sqlite3';
import fs from 'fs';
import path from 'path';

const schemaFilePath = path.join(__dirname, 'schemaSimple.sql');

let db: Database;

export const initDb = (): Promise<void> =>
  new Promise((resolve, reject) => {
    db = new Database('./database.sqlite');
    const schemaSql = fs.readFileSync(schemaFilePath, 'utf-8');
    db.serialize(() => (
      db.exec(schemaSql, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      })
    ));
  });

export const getDb = (): Database => {
  if (db) {
    return db;
  } else {
    throw new Error('DB has not been intialised');
  }
}