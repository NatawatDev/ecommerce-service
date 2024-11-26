import jwt, { Secret, JwtPayload } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import { errorResponse } from "@/utils/response"
import { getTokenFromRequest } from '@/utils/auth/jwtUtils'

export interface CustomRequest extends Request {
  token: string | JwtPayload
}

async function verifyToken(req: Request, res: Response, next: NextFunction){
  try {
    const SECRET_KEY: Secret = process.env.JWT_SECRET || ''
    
    const token = getTokenFromRequest(req)

    const verify = jwt.verify(token as string, SECRET_KEY)
    
    if (!token || !verify) {
      errorResponse(res, StatusCodes.UNAUTHORIZED,'Please authenticate')
    }        
    next()
  } catch (err) {
    console.log(err)
    errorResponse(res, StatusCodes.UNAUTHORIZED,'Please authenticate')
  }
}

export default verifyToken