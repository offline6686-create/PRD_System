import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../errors/http.error';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof HttpError) {
    return res.status(err.statusCode).json({
      error: true,
      statusCode: err.statusCode,
      message: err.message
    });
  }

  console.error('[UNHANDLED ERROR]', err);
  return res.status(500).json({
    error: true,
    statusCode: 500,
    message: 'Error interno del servidor'
  });
};
