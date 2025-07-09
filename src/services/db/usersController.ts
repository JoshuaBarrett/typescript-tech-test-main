import { getDb } from './db';

export interface userSignup {
  fullName: string;
  password: string;
  emailAddress: string;
  createdDate: string;
  userType: string;
}

interface User {
  id: number,
  fullName: string,
  password: string,
  emailAddress: string,
  createdDate: string,
  userType: string
}

const getUserByIdSql = `
  select u.*
  from Users u
  where u.id = ?
`;

const insertUserSql = `
  INSERT INTO Users(Fullname, Password, EmailAddress, CreatedDate, UserType)
  VALUES(?, ?, ?, ?, ?)
`;

export const getUserById = (id: number): User | undefined => {
  const db = getDb();
  const stmt = db.prepare(getUserByIdSql);
  const row = stmt.get(id);
  return row as User | undefined;
}

export const addUser = (userSignup: userSignup): Number | bigint => {
  const db = getDb();
  const stmt = db.prepare(insertUserSql);

  const runResult = stmt.run(
    userSignup.fullName,
    userSignup.password,
    userSignup.emailAddress,
    userSignup.createdDate,
    userSignup.userType
  );

  return runResult.lastInsertRowid;
}