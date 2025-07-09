import { getDb } from './db';

export interface userSignup {
    fullName: string;
    password: string;
    emailAddress: string;
    createdDate: string;
    userType: string;
}

const getUserByIdScript = `
  select u.*
  from Users u
  where u.id = ?
`;

const insertUserSql = `
  INSERT INTO Users(Fullname, Password, EmailAddress, CreatedDate, UserType)
  VALUES(?, ?, ?, ?, ?)
`;

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

export const addUser = (userSignup: userSignup): Promise<number> => {
  const db = getDb();

  return new Promise((resolve, reject) => {
    db.run(
      insertUserSql,
      [userSignup.fullName, userSignup.password, userSignup.emailAddress, userSignup.createdDate, userSignup.userType],
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