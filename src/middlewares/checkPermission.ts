import { Request, Response, NextFunction } from 'express'
import { getTokenFromRequest, decodeToken } from '@/utils/auth/jwtUtils'
import { getUserPermissions } from '@/utils/auth/getUserPermissions'
import { StatusCodes } from 'http-status-codes'


export const checkPermission = (requiredPermission: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = getTokenFromRequest(req)
      const decoded = decodeToken(token as string)
  
      const roleId = decoded && decoded.roleId ? decoded.roleId : null
      const permissions = await getUserPermissions(roleId) 
  
      if (permissions.includes(requiredPermission)) {
        res.status(StatusCodes.FORBIDDEN).json({
          status: StatusCodes.FORBIDDEN,
          message: `You don't have permission to access.`
        })
        return
      }
  
      next()
    } catch (error) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        status: StatusCodes.UNAUTHORIZED,
        message: 'Please authenticate'
      })
    }
    
  }
} 
