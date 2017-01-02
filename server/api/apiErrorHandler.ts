import { Request, Response, NextFunction } from 'express';

export function apiErrorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction) {

  console.error('API error handler triggered', err);

  res.status(500).json({ errorCode: 'ERR-01', message: 'Internal Server Error' });

}
