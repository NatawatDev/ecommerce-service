import { Request, Response } from 'express'
import pool from '../../utils/database';
import bcrypt from 'bcrypt'

export const loginUser = (req: Request, res: Response) => {
  try {
    res.status(200).json(req.body)    
  } catch (error) { 
    console.log(error)
  }
} 