import { Response } from "express"

export const successResponse = (res: Response, statusCode: number, message: string, data?: any) => {
  res.status(statusCode).json({
    status: 'success',
    message,
    data,
  });
};

export const errorResponse = (res: Response, statusCode: number, message: string) => {
  res.status(statusCode).json({
    status: 'fail',
    message,
  });
};
