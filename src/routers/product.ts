import { Router } from 'express';
import { getProducts } from '@/controllers/product.controllers'
import verifyToken from '@/middlewares/verifyToken'; 

const router = Router();

// Route for user registration
router.get('/get-product', verifyToken, getProducts)

export default router
