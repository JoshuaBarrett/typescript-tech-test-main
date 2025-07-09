import { Request, Response } from 'express';
import { Route } from '../types/route';
import { addUser } from '../services/db/users';

export const userSignupRoute: Route = {
  method: 'post',
  path: '/users/signup',
  handler: (req: Request, res: Response) => {
    const {
      fullName,
      password,
      emailAddress,
      createdDate,
      userType,
    } = req.body;

    addUser(fullName, password, emailAddress, createdDate, userType)
      .then((newId) => {
        return res.status(201).json({ id: newId });
      })
      .catch((error) => {
        return res.status(500).json({ message: 'Db error', error});
      });
  }
}