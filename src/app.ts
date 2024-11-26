import express, { urlencoded, json, type Express  } from "express"
import cors from 'cors'
import errorHandler from './middlewares/errorHandler'
import limiter from "./middlewares/rateLimit"
import malier from './utils/mailer'
import dotenv from 'dotenv'
import authRouter from "@/routers/auth"
import productRouter from "@/routers/product"

dotenv.config()

const app: Express = express()

app.use(limiter)
app.use(cors())
app.use(urlencoded({ extended: true }))
app.use(json())
// app.use(errorHandler)

app.use('/api/v1', authRouter)
app.use('/api/v1/products', productRouter)

app.get('/', (req,res) => {
  res.send('hello world')
})

app.get('/mail', async (req, res) => {
  try {
    await malier()
    res.status(200).json({
      message: 'send email successfully.'
    })
  } catch (error) {
    console.log(error)
    res.status(400).json({
      message: 'something went wrong cannot send mail.'
    })
  }
  
})

app.post('/test', (req,res) => {
  res.json(req.body)
})

export default app