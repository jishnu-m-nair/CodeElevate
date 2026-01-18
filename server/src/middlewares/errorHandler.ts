import type { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/CustomError.js';

export const errorHandler = (err: unknown, _req: Request, res: Response, next: NextFunction) => {
  if (err instanceof CustomError) {
    // console.error(`${err.name} [${err.statusCode}]: ${err.message}`);
    console.error(err);
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  } else if (err instanceof Error) {
    // console.error(`Error: ${err.message}`);
    console.error(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  } else {
    console.error('Unknown error:', err);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }

  next?.();
};
