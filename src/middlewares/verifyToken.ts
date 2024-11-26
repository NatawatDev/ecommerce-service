import jwt, { Secret, JwtPayload } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'


export interface CustomRequest extends Request {
 token: string | JwtPayload
}

async function verifyToken(req: Request, res: Response, next: NextFunction){
  try {
    const SECRET_KEY: Secret = process.env.JWT_SECRET || ''
    const token = req.header('Authorization')?.replace('Bearer ', '') as string
    if (!token) {
      throw new Error()
    }
    jwt.verify(token, SECRET_KEY, (decoded) => {
    (req as CustomRequest).body.token = decoded  
    });
        
    next()

  } catch (err) {
    res.status(401).send('Please authenticate')
  }
}

export default verifyToken