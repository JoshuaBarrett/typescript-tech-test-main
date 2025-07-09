-- Simple schema

CREATE TABLE IF NOT EXISTS Users (
  Id INTEGER PRIMARY KEY AUTOINCREMENT,
  FullName TEXT NOT NULL,
  Password TEXT NOT NULL,
  EmailAddress TEXT NOT NULL UNIQUE,
  CreatedDate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UserType TEXT CHECK (UserType IN ('student', 'teacher', 'parent', 'privatetutor'))
);

