import pool from '@/utils/database'
import bcrypt from 'bcrypt'

export const getUserRoleById = async (roleId: string) => {
  try {
    const { rows } = await pool.query('SELECT role_code, description FROM roles WHERE id = $1', [roleId])

    return rows.length > 0 ? rows[0] : null

  } catch (error) {
    console.error('Error fetching user role:', error);
    throw new Error('Error fetching user role');
  }
}

export const getUserByUsername = async (username: string) => {
  try {
    const { rows } = await pool.query('SELECT * FROM users WHERE username = $1', [username])

    return rows.length > 0 ? rows[0] : null
    
  } catch (error) {
    console.error('Error fetching username:', error);
    throw new Error('Error fetching username');
  }
}

export const checkExistUser = async (username: string, email: string): Promise<boolean> => {
  try {

    const { rows } = await pool.query('SELECT * FROM users WHERE username = $1 OR email = $2', [username, email])

    return rows.length > 0

  } catch (error) {
    console.error('Error fetching username:', error);
    throw new Error('Error fetching username');
  }
  
}

export const insertUserData = async (username: string, email: string, password: string, firstname: string, lastname: string, phonenumber: string) => {
  try {
    const defultRole = 1 //role_code 1 = Customer, role_code 2 = Admin

    const { rows: roleRows } = await pool.query(
      'SELECT * FROM roles WHERE role_code = $1',
      [defultRole]
    ) 
    if (roleRows.length === 0) return

    const role_id = roleRows[0].id

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      'INSERT INTO users (username, email, password, first_name, last_name, phone_number, role_id) VALUES ($1, $2, $3, $4, $5, $6, $7)',
      [username, email, hashedPassword, firstname, lastname, phonenumber, role_id]
    )
    
  } catch (error) {
    console.error('Error fetching username:', error);
    throw new Error('Error fetching username');
  }

}
