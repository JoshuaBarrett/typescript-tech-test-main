import { Request, Response } from 'express';
import { Route } from '../types/route';

export const userSignupRoute: Route = {
  method: 'post',
  path: '/users/signup',
  handler: (req: Request, res: Response) => {
    res.status(501).json({ error: 'User signup not implemented yet!'});
  }
}