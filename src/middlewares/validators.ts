import { Request, Response, NextFunction } from 'express';
import * as Joi from 'joi';
import { INVALID_REQUEST_DATA } from '../errors/error';

export function validators (schema: Joi.ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = Joi.validate(req.body, schema);
    const valid: boolean = error == null;

    if (!valid) {
      throw INVALID_REQUEST_DATA;
    }
    next();
  };
}
