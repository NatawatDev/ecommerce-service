import jwt, { Secret, JwtPayload } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import { errorResponse } from "@/utils/response"
import dotenv from 'dotenv'

dotenv.config()

async function verifyToken(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const SECRET_KEY: Secret = process.env.JWT_SECRET || ''
    
    
    const token = req.headers.authorization?.split(' ')[1]
    
    
    if (!token) {
      return errorResponse(res, StatusCodes.UNAUTHORIZED, 'Please authenticate');
    }

    
    const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;
    req.user = decoded

    next()
  } catch (err) {
    console.error(err);
    return errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, 'Internal server error.');
  }
}

export default verifyToken;
