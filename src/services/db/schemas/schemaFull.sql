-- NOT USED Schema
-- Nomalises UserTypes to a lookup table

CREATE TABLE IF NOT EXISTS UserTypes (
  Id INTEGER  Primary Key,
  Type TEXT NOT NULL UNIQUE
);

INSERT OR IGNORE INTO userTypes (Id, Type) VALUES
  (1, 'Student'),
  (2, 'Teacher'),
  (3, 'Parent'),
  (4, 'Private Tutor');

CREATE TABLE IF NOT EXISTS Users (
  Id INTEGER PRIMARY KEY AUTOINCREMENT,
  FullName TEXT NOT NULL,
  Password TEXT NOT NULL,
  EmailAddress TEXT NOT NULL UNIQUE,
  CreatedDate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UserTypeId INT,
  CONSTRAINT FK_Users_UserTypes FOREIGN KEY (UserTypeId) REFERENCES UserTypes(Id)
);