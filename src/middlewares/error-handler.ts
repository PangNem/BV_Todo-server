import { Request, Response, NextFunction } from 'express';

interface IError extends Error {
  status: number;
  message: string;
  data?: any;
}

export function forwardHandler (req: Request, res: Response, next: NextFunction) {
  let error = new Error('Not Found') as IError;
  error.status = 404;
  next(error);
}

export function errorHandler (error: IError, req: Request, res: Response, next: NextFunction) {
  const status = error.status || 500;
  const message = error.message || 'Something went wrong';
  res.status(status).send({
    status,
    message
  });
}
