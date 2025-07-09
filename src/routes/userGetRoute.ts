import { Request, Response } from 'express';
import { Route } from '../types/route';
import { getUserById } from '../services/db/usersController';

export const userGetRoute: Route = {
  method: 'get',
  path: '/users/:userid',
  handler: (req: Request, res: Response) => {
    // Could have used Zod here but it felt a little overkill
    const userId = Number(req.params.userid);
    if (isNaN(userId)) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }

    try {
      const user = getUserById(userId);
      if (user) {
        return res.json(user);
      } else {
        return res.status(404).json({ error: 'User not found'});
      }
    } catch (error) {
      console.error('DB error:', error);
      return res.status(500).json({ error: 'Db error'});
    }
  }
}