import { Request, Response } from 'express';
import { Route } from '../types/route';

export const userGetRoute: Route = {
  method: 'get',
  path: '/users/:userid',
  handler: (req: Request, res: Response) => {
    res.status(501).json({ error: 'Get User not implemented yet!'});
  }
}