export class HttpError extends Error {
  public statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class UnauthorizedError extends HttpError {
  constructor(message: string = 'No autorizado') {
    super(401, message);
  }
}

export class ForbiddenError extends HttpError {
  constructor(message: string = 'Acceso denegado') {
    super(403, message);
  }
}

export class NotFoundError extends HttpError {
  constructor(message: string = 'Recurso no encontrado') {
    super(404, message);
  }
}
