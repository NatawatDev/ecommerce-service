import { Request } from 'express'
import dotenv from 'dotenv'
import jwt, { JwtPayload } from 'jsonwebtoken'

dotenv.config()

export const getTokenFromRequest = (req: Request): string | null => {
  const token = req.headers.authorization?.split(' ')[1]
  return token || null
}

export const decodeToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as JwtPayload

    return decoded
  } catch (error) {
    console.error('Error decoding token:', error)
    return false
  }
}
