import { Router } from 'express';
import { loginUser, registerUser } from '@/controllers/auth.controllers'
import { validateData } from '@/middlewares/validateData'
import { userRegister, userLogin } from '@/schemas/authSchema'

const router = Router();

// Route for user registration
router.post('/login', validateData(userLogin), loginUser)
router.post('/register', validateData(userRegister), registerUser)

export default router;
