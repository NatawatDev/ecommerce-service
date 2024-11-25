import { Router } from 'express';
import authController from '../controllers/auth'
import { validateData } from '@/middlewares/validateData'
import { userRegister, userLogin } from '@/schemas/authSchema'

const router = Router();

// Route for user registration
router.post('/login', validateData(userLogin), authController.login.loginUser)
router.post('/register', validateData(userRegister), authController.register.registerUser)

export default router;
