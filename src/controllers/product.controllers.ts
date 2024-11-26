import { Request, Response } from "express"
import pool from "@/utils/database"

export const getProducts = async (req: Request, res: Response) => {
  const { rows: productList } = await pool.query('SELECT * FROM products;')
  
  res.status(200).json({
    products: productList
  })
}