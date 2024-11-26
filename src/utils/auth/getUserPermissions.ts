import pool from '../database'

export const getUserPermissions = async (roleId: string): Promise<string[]> => {
  const { rows } = await pool.query(
    'SELECT permission FROM role_permissions WHERE role_id = $1',
    [roleId]
  )
  return rows.map(row => row.permission)
};
