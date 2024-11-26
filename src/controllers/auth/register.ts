import { Request, Response } from "express";
import pool from '../../utils/database';
import bcrypt from 'bcrypt';

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password, name, lastname, phonenumber } = req.body

    // ตรวจสอบว่า username หรือ email ซ้ำกันหรือไม่
    const { rows: existingUser } = await pool.query(
      'SELECT * FROM users WHERE username = $1 OR email = $2',
      [username, email]
    )

    if (existingUser.length > 0) {
      return res.status(400).json({
        status: 'fail',
        message: 'This username or email already exists in the system.'
      })
    }

    const defultRole = 1 //role_code 1 = Customer, role_code 2 = Admin

    const { rows: roleRows } = await pool.query(
      'SELECT * FROM roles WHERE role_code = $1',
      [defultRole]
    ) 

    const role_id = roleRows[0].id

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      'INSERT INTO users (username, email, password, first_name, last_name, phone_number, role_id) VALUES ($1, $2, $3, $4, $5, $6, $7)',
      [username, email, hashedPassword, name, lastname, phonenumber, role_id]
    );

    res.status(201).json({
      status: 'success',
      message: 'Registered successfully.'
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong.' })
  }
};
