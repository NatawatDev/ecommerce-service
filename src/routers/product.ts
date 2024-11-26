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
router.post('/add', verifyToken, validateData(productList), checkPermission('write'), addProducts)
router.put('/:id', verifyToken, validateData(productItem), checkPermission('write'), editProduct)
router.delete('/:id', verifyToken, checkPermission('delete'), deleteProduct)

export default router
