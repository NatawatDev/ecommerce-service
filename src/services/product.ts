import pool from '@/utils/database'
import { IProductItem } from '@/types/product';

export const getProductList = async (limit = 10, offset = 0): Promise<IProductItem[] | null> => {
  try {
    const { rows } = await pool.query('SELECT * FROM products WHERE deleted_at IS NULL LIMIT $1 OFFSET $2;', [limit, offset]);
    return rows.length > 0 ? rows : null;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Error fetching products');
  }
};

export const getProductById = async (id: string) => {
  try {
    const { rows } = await pool.query('SELECT * FROM products WHERE id = $1 AND deleted_at IS NULL;', [id]);

    if (rows.length === 0) {
      return null;
    }

    return rows[0];
  } catch (error) {
    console.error('Error fetching product by id:', error);
    throw new Error('Error fetching product by id');
  }
};

export const addProductList = async (productList: IProductItem[], email: string) => {
  try {
    const values = productList.map(item => 
      `('${item.title}', '${item.description}', ${item.price}, ${item.quantity}, NOW(), '${email}')`
    ).join(", ");

    await pool.query(
      `INSERT INTO products (title, description, price, quantity, updated_at, update_by) VALUES ${values} RETURNING *;`
    );
  } catch (error) {
    console.error('Error adding products:', error);
    throw new Error('Error adding products');
  }
};

export const checkExistProduct = async (productId: string) => {
  try {

    const { rows } = await pool.query(
      'SELECT * FROM products WHERE id = $1 AND deleted_at IS NULL',
      [productId]
    )
    return rows.length > 0

  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Error fetching products');
  }
}

export const editProductById = async (productId: string, product: IProductItem, email: string) => {
  try {

    await pool.query(
      'UPDATE products SET title = $1, description = $2, price = $3, quantity = $4, updated_at = NOW(), update_by = $5 WHERE id = $6 RETURNING *;',
      [product.title, product.description, product.price, product.quantity, email, productId]
    )

  } catch (error) {
    console.error('Error fetching products:', error)
    throw new Error('Error fetching products')
  }

}

export const deleteProductById = async (productId: string) => {
  try {
    await pool.query(
      'UPDATE products SET deleted_at = NOW() WHERE id = $1;',
      [productId]
    )
  } catch (error) {
    console.error('Error fetching products:', error)
    throw new Error('Error fetching products')
  }
}