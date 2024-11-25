import { z } from 'zod'

export const userRegister = z.object({
  name: z.string().min(1, "Name is required"),
  lastname: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  phonenumber: z.string().regex(/^(08|09|06)\d{8}$/, "Phone number must start with 08, 09, or 06 and have 10 digits"),
  username: z.string().min(3, "Username must be at least 3 characters long"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
})

export const userLogin = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long"),
  password: z.string().min(8, "Password must be at least 8 characters long")
})
