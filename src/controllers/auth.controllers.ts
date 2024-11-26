import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import pool from '@/utils/database';
import bcrypt from 'bcrypt'

export const loginUser = async (req: Request, res: Response):Promise<any> => {
  try {
    const { username, password } = req.body

    const { rows } = await pool.query('SELECT * FROM users WHERE username = $1', [username])

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Invalid username or password' })
    }

    const user = rows[0]

    const storedPassword = user.password

    const isPasswordValid = await bcrypt.compare(password, storedPassword)

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username or password' })
    }
    const token = jwt.sign({ username: user.username, userId: user.id, email: user.email, role: user.role_code }, process.env.JWT_SECRET as string, {
      expiresIn: "1h"
    })

    res.status(200).json({ message: 'Login successful', token: token })

  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
};

export const registerUser = async (req: Request, res: Response) => {  
  try {
    const { username, email, password, name, lastname, phonenumber } = req.body;

    const { rows } = await pool.query(
      'SELECT * FROM users WHERE username = $1 OR email = $2',
      [username, email]
    );

    if (rows.length > 0) {
      res.status(400).json({
        status: 'fail',
        message: 'This username or email already exists in the system.'
      });
      return 
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      'INSERT INTO users (username, email, password, name, lastname, phonenumber) VALUES ($1, $2, $3, $4, $5, $6)',
      [username, email, hashedPassword, name, lastname, phonenumber]
    );


    res.status(201).json({
      status: 'success',
      message: 'Registered successfully.'
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong.' });
  }
}