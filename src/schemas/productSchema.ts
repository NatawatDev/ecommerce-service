import { z } from 'zod'

export const productItem = z.object({
  title: z.string().min(1, "title is required"),
  description: z.string().min(1, "description is required"),
  price: z.number(),
  quantity: z.number(),
})

export const productList = z.object({
  productList: z.array(productItem)
});
