import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import { UnauthorizedError, ForbiddenError } from '../errors/http.error';

export interface UserPayload {
  id: string;
  username: string;
  email: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Token de acceso ausente'));
  }

  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, config.jwtSecret) as UserPayload;
    req.user = payload;
    next();
  } catch (error) {
    return next(new UnauthorizedError('Token de acceso inválido o expirado'));
  }
};

export const authorize = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new UnauthorizedError());
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(new ForbiddenError(`Acceso denegado. El rol '${req.user.role}' no tiene permiso para este recurso.`));
    }

    next();
  };
};

export const checkResourceOwnership = (paramName: string = 'id') => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) return next(new UnauthorizedError());
    
    // ADMIN has bypass
    if (req.user.role === 'ADMIN') return next();

    const targetResourceId = req.params[paramName];
    if (targetResourceId && targetResourceId !== req.user.id) {
      return next(new ForbiddenError('No posee permisos para acceder a recursos de otro usuario'));
    }

    next();
  };
};
