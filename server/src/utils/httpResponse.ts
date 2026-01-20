import type { Response } from 'express';

export const sendResponse = <T>(
  res: Response,
  status: number,
  result: { success: boolean; message: string; data?: T },
) => {
  res.status(status).json({
    success: result.success,
    message: result.message,
    data: result.data ?? null,
  });
};
