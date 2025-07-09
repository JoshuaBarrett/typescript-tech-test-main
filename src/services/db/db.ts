import { Database } from 'sqlite3';
import fs from 'fs';
import path from 'path';

const schemaFilePath = path.join(__dirname, './schemas/schemaSimple.sql');
const testDataFilePath = path.join(__dirname, './schemas/schemaTestData.sql');

let db: Database;

// Loads local db and applies schema - Schema has prechecks for tables that dont exist
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

// Creates fresh db under simple schema and pre loads it was test data
export const initTestDb = (): Promise<void> =>
  new Promise((resolve, reject) => {
    db = new Database(':memory:');
    const schemaSql = fs.readFileSync(schemaFilePath, 'utf-8');
    const testDataSql = fs.readFileSync(testDataFilePath, 'utf-8');
    db.serialize(() => {
      db.exec(schemaSql, (error) => {
        if (error) {
          reject(error);
        } else {
          db.exec(testDataSql, (error) => {
            if (error) {
              reject(error);
            } else {
              console.log('ping');
              resolve();
            }
          });
        }
      });
    });
  });

export const getDb = (): Database => {
  if (db) {
    return db;
  } else {
    throw new Error('DB has not been intialised');
  }
}