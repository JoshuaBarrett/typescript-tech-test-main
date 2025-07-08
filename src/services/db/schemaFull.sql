
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

INSERT OR IGNORE INTO Users (Fullname, Password, EmailAddress, UserTypeId)
values ('Joshua Barrett', 'c3ab8ff13720e8ad9047dd39466b3c89b4a2f72a5f20141a34bb9b3b7f4b2b6e', 'joshua.barrett@example.com', 4),
  ('John Doe', 'c3ab8ff13720e8ad9047dd39466b3c89b4a2f72a5f20141a34bb9b3b7f4b2b6e', 'john@example.com', 1),
  ('Phil Gilbert', 'c3ab8ff13720e8ad9047dd39466b3c89b4a2f72a5f20141a34bb9b3b7f4b2b6e', 'jane@internet.com', 2)
