import { Request, Response } from 'express';
import { Route } from '../types/route';
import { getDb } from '../services/db/db';
import { getUserById } from '../services/db/users';

export const userGetRoute: Route = {
  method: 'get',
  path: '/users/:userid',
  handler: (req: Request, res: Response) => {
    const db = getDb();

    const userId = Number(req.params.userid);
    if (isNaN(userId)) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }

    getUserById(userId)
      .then((row) => {
        if (row) {
          return res.json(row);
        } else {
          return res.status(404).json({ error: 'User not found'});
        }
      })
      .catch((error) => {
        console.error('DB error:', error);
        return res.status(500).json({ error: 'Db error'});
      });

  }
}