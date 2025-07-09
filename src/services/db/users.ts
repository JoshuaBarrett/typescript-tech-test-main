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

const insertUserSql = `
  INSERT INTO Users(Fullname, Password, EmailAddress, CreatedDate, UserType)
  VALUES(?, ?, ?, ?, ?)
`;

export const addUser = (fullname: string, password: string, emailAddress: string, createdDate: Date, userType: string): Promise<number> => {
  const db = getDb();

  return new Promise((resolve, reject) => {
    db.run(
      insertUserSql,
      [fullname, password, emailAddress, createdDate, userType],
      function (error) {
        if (error) {
          reject(error);
        } else {
          resolve(this.lastID);
        }
      }
    )
  });
}