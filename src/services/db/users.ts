import { getDb } from './db';

const getUserByIdScript = `
  select u.*
  from Users u
  where u.id = ?
`

export const getUserById = (id: number): Promise<any> => {
  const db = getDb();
  return new Promise((resolve, reject) => {
    db.get(getUserByIdScript, [id], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    })
  });
}