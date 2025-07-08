import { Request, Response } from 'express';
import { Route } from '../types/route';
import { getDb } from '../services/db/db';

const getUserScript = `
  select u.*
  from Users u
  where u.id = ?
`

export const userGetRoute: Route = {
  method: 'get',
  path: '/users/:userid',
  handler: (req: Request, res: Response) => {
    const db = getDb();

    const userId = Number(req.params.userid);
    if (isNaN(userId)) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }

    db.get(getUserScript, [userId], (err, row) => {
      if (err) {
        console.error('DB error:', err);
      } else {
        if (!row) {
          return res.status(404).json({ error: 'User not found'});
        } else {
          return res.json(row);
        }
      }
    });
  }
}