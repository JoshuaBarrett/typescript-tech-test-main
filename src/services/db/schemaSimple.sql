CREATE TABLE IF NOT EXISTS Users (
  Id INTEGER PRIMARY KEY AUTOINCREMENT,
  FullName TEXT NOT NULL,
  Password TEXT NOT NULL,
  EmailAddress TEXT NOT NULL UNIQUE,
  CreatedDate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UserType TEXT CHECK (UserType IN ('student', 'teacher', 'parent', 'privatetutor'))
);

INSERT OR IGNORE INTO Users (Fullname, Password, EmailAddress, UserType)
values ('Joshua Barrett', 'c3ab8ff13720e8ad9047dd39466b3c89b4a2f72a5f20141a34bb9b3b7f4b2b6e', 'joshua.barrett@example.com', 'privatetutor'),
  ('John Doe', 'c3ab8ff13720e8ad9047dd39466b3c89b4a2f72a5f20141a34bb9b3b7f4b2b6e', 'john@example.com', 'student'),
  ('Phil Gilbert', 'c3ab8ff13720e8ad9047dd39466b3c89b4a2f72a5f20141a34bb9b3b7f4b2b6e', 'jane@internet.com', 'teacher')
