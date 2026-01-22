import type { Request, Response, NextFunction } from 'express';
import { ZodError, type ZodType } from 'zod';
import { CustomError } from '../errors/CustomError.js';

type RequestProperty = 'body' | 'params' | 'query';

const validate =
  <T>(schema: ZodType<T>, property: RequestProperty) =>
  (req: Request, _res: Response, next: NextFunction) => {
    try {
      req[property] = schema.parse(req[property]);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        return next(new CustomError('Validation failed', 400));
      }
      next(err);
    }
  };

export const validateBody = <T>(schema: ZodType<T>) => validate(schema, 'body');

export const validateQuery = <T>(schema: ZodType<T>) => validate(schema, 'query');

export const validateParams = <T>(schema: ZodType<T>) => validate(schema, 'params');
