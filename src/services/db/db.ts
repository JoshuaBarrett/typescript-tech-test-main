import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';

const schemaFilePath = path.join(__dirname, './schemas/schemaSimple.sql');
const testDataFilePath = path.join(__dirname, './schemas/schemaTestData.sql');

let db: Database.Database;

// Loads local db and applies schema - Schema has prechecks for tables that dont exist
export const initDb = () => {
  db = new Database('./database.sqlite');
  const schemaSql = fs.readFileSync(schemaFilePath, 'utf-8');
  db.exec(schemaSql);
}

// Creates fresh db under simple schema and pre loads it was test data
export const initTestDb = () => {
  db = new Database(':memory:');
  const schemaSql = fs.readFileSync(schemaFilePath, 'utf-8');
  const testDataSql = fs.readFileSync(testDataFilePath, 'utf-8');

  db.exec(schemaSql);
  db.exec(testDataSql);
}

export const getDb = (): Database.Database => {
  if (!db) throw new Error('DB has not been intialised');
  return db;
}