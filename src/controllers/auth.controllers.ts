import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { getUserByUsername, checkExistUser, insertUserData } from '@/services/auth'


export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body

    const user = await getUserByUsername(username)

    if (!user) {
      res.status(StatusCodes.BAD_REQUEST).json(
        { 
          status: 'fail',
          message: 'Invalid username or password' 
        })
      return 
    }

    const storedPassword = user.password

    const isPasswordValid = await bcrypt.compare(password, storedPassword)

    if (!isPasswordValid) {
      res.status(StatusCodes.BAD_REQUEST).json(
        { 
          status: 'fail',
          message: 'Invalid username or password' 
        })
      return 
    }
    
    const token = jwt.sign({ username: user.username, userId: user.id, email: user.email, roleId: user.role_id }, process.env.JWT_SECRET as string, {
      expiresIn: "1h"
    })

    res.status(StatusCodes.OK).json({ status: 'success', message: 'Login successful', token: token })

  } catch (error) {
    console.error(error)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
      status: 'fail',
      message: 'Something went wrong'
    })
  }
};

export const registerUser = async (req: Request, res: Response): Promise<void> => {  
  try {
    const { username, email, password, firstname, lastname, phonenumber } = req.body
    
    const existUser = await checkExistUser(username, email)

    if (existUser) {
      res.status(StatusCodes.BAD_REQUEST).json(
        { 
          status: 'fail',
          message: 'This username or email already exists in the system.'
        })
      return 
    }
    await insertUserData(username, email, password, firstname, lastname, phonenumber);
    
    res.status(StatusCodes.CREATED).json({
      status: 'success',
      message: 'Registered successfully.'
    });

  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
      status: 'fail',
      message: 'Something went wrong.' });
  }
}