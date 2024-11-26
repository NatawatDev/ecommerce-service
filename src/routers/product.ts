import { Router } from 'express';
import { getProducts, getProductByIdHandler, addProducts, editProduct, deleteProduct } from '@/controllers/product.controllers'
import { validateData } from '@/middlewares/validateData'
import { productItem, productList } from '@/schemas/productSchema'
import verifyToken from '@/middlewares/verifyToken'; 
import { checkPermission } from '@/middlewares/checkPermission'

const router = Router();

// Route for user registration
router.get('/', verifyToken, getProducts)
router.get('/:id', verifyToken, getProductByIdHandler)
router.post('/add', verifyToken, validateData(productList), checkPermission('Write'), addProducts)
router.put('/:id', verifyToken, validateData(productItem), checkPermission('Write'), editProduct)
router.delete('/:id', verifyToken, checkPermission('Delete'), deleteProduct)

export default router
