import { Request, Response } from 'express';

export type Route = {
  path: string,
  method: 'get' | 'post'
  handler: (req: Request, res: Response) => void
}