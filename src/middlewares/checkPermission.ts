import { Request, Response, NextFunction } from 'express'
import { getUserPermissions } from '@/utils/auth/getUserPermissions'
import { errorResponse } from "@/utils/response"
import { StatusCodes } from 'http-status-codes'


export const checkPermission = (requiredPermission: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user
      const roleId = user && user.roleId ? user.roleId : null
      const permissions = await getUserPermissions(roleId) 
  
      if (!permissions.includes(requiredPermission)) {
        return errorResponse(res, StatusCodes.FORBIDDEN, `You don't have permission to access.`);
      }
  
      next()
    } catch (error) {
      console.log(error)
      errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, 'Internal Sever Error.');
    }
    
  }
} 
