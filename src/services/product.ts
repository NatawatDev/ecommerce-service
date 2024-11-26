import pool from '@/utils/database'

interface ProductItem {
  title: string, 
  description: string, 
  price: number,
  quantity: number
}

export const getProductById = async (id: string) => {
  try {
    const { rows } = await pool.query('SELECT * FROM products WHERE id = $1;', [id]);

    if (rows.length === 0) {
      return null;
    }

    return rows[0];
  } catch (error) {
    console.error('Error fetching product by id:', error);
    throw new Error('Error fetching product by id');
  }
};

export const getProductList = async (limit = 10, offset = 0): Promise<ProductItem[] | null> => {
  try {
    const { rows } = await pool.query('SELECT * FROM products LIMIT $1 OFFSET $2;', [limit, offset]);
    return rows.length > 0 ? rows : null;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Error fetching products');
  }
};

export const addProductList = async (productList: ProductItem[]) => {
  try {
    const values = productList.map(item => `('${item.title}', '${item.description}', ${item.price}, ${item.quantity}, NOW())`).join(", ");
    await pool.query(
      `INSERT INTO products (title, description, price, quantity, updated_at) VALUES ${values} RETURNING *;`
    );
  } catch (error) {
    console.error('Error adding products:', error);
    throw new Error('Error adding products');
  }
};

export const checkExistProduct = async (productId: string) => {
  try {

    const { rows } = await pool.query(
      'SELECT * FROM products WHERE id = $1',
      [productId]
    )
    return rows.length > 0

  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Error fetching products');
  }
}

export const editProductById = async (productId: string, product:ProductItem) => {
  try {

    await pool.query(
      'UPDATE products SET title = $1, description = $2, price = $3, quantity = $4, updated_at = NOW() WHERE id = $5 RETURNING *;',
      [product.title, product.description, product.price, product.quantity, productId]
    )

  } catch (error) {
    console.error('Error fetching products:', error)
    throw new Error('Error fetching products')
  }

}

export const deleteProductById = async (productId: string) => {
  try {
    await pool.query(
      'DELETE FROM products WHERE id = $1;',
      [productId]
    )
  } catch (error) {
    console.error('Error fetching products:', error)
    throw new Error('Error fetching products')
  }
}