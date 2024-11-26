import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { successResponse, errorResponse } from "@/utils/response"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { getUserByUsername, checkExistUser, insertUserData } from '@/services/auth'


export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body

    const user = await getUserByUsername(username)

    if (!user) {
      return errorResponse(res, StatusCodes.BAD_GATEWAY, 'Invalid username or password.') 
    }

    const storedPassword = user.password

    const isPasswordValid = await bcrypt.compare(password, storedPassword)

    if (!isPasswordValid) {
      return errorResponse(res, StatusCodes.BAD_GATEWAY, 'Invalid username or password.') 
    }
    
    const token = jwt.sign({ username: user.username, userId: user.id, email: user.email, roleId: user.role_id }, process.env.JWT_SECRET as string, {
      expiresIn: "1h"
    })

    return successResponse(res, StatusCodes.OK,'Logedin successfully.', { token: token })

  } catch (error) {
    console.error(error)
    errorResponse(res, StatusCodes.BAD_GATEWAY, 'Internal Server Error.')
  }
};

export const registerUser = async (req: Request, res: Response): Promise<void> => {  
  try {
    const { username, email, password, firstname, lastname, phonenumber } = req.body
    
    const existUser = await checkExistUser(username, email)

    if (existUser) {
      return errorResponse(res, StatusCodes.BAD_REQUEST, 'This username or email already exists in the system.') 
    }
    await insertUserData(username, email, password, firstname, lastname, phonenumber)
    
    successResponse(res, StatusCodes.CREATED,'Registered successfully.')

  } catch (error) {
    console.error(error)
    errorResponse(res, StatusCodes.BAD_GATEWAY, 'Internal Server Error.')
  }
}