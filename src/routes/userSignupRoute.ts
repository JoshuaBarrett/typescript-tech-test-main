import { Request, Response } from 'express';
import { Route } from '../types/route';
import { addUser } from '../services/db/users';
import { userSignupSchema } from '../validators/user';

export const userSignupRoute: Route = {
  method: 'post',
  path: '/users/signup',
  handler: (req: Request, res: Response) => {
    const validationResult = userSignupSchema.safeParse(req.body);

    if (!validationResult.success) {
      const errors = validationResult.error.issues.map(issue => issue.message);

      return res.status(400).json({
        error: 'Validation error',
        details: errors
      })
    }

    const data = validationResult.data;

    addUser(data)
      .then((newId) => {
        return res.status(201).json({ id: newId });
      })
      .catch((error) => {
        return res.status(500).json({ message: 'Db error', error});
      });
  }
}