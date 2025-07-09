import { Request, Response } from 'express';
import { Route } from '../types/route';
import { addUser } from '../services/db/usersController';
import { userSignupSchema } from '../validators/user';
import bcrypt from 'bcrypt';

export const userSignupRoute: Route = {
  method: 'post',
  path: '/users/signup',
  handler: async (req: Request, res: Response) => {
    const validationResult = userSignupSchema.safeParse(req.body);

    if (!validationResult.success) {
      const errors = validationResult.error.issues.map(issue => issue.message);

      return res.status(400).json({
        error: 'Validation error',
        details: errors
      })
    }

    const data = validationResult.data;

    // Using bycrypt vs built in cypto as bycrypt is more secure, built-in salt etc.
    data.password = await bcrypt.hash(data.password, 10);

    try {
      const newId = addUser(data);
      return res.status(201).json({ id: newId });
    } catch (error) {
      console.error('DB error:', error);
      return res.status(500).json({ message: 'Db error', error});
    }
  }
}