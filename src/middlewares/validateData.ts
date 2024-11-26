import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';
import { StatusCodes } from 'http-status-codes';

export const validateData = (schema: z.ZodObject<any, any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body)
      next()
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(StatusCodes.BAD_REQUEST).json({ 
          error: 'Invalid data', 
          statusCode: StatusCodes.BAD_REQUEST, 
          message: 'Please fill out the information completely.'
        })
      } else {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
          error: 'Internal Server Error', 
          statusCode: StatusCodes.INTERNAL_SERVER_ERROR, 
          message: 'Something Went wrong.' 
        })
      }
    }
  };
}