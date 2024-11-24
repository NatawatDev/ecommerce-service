import express, { urlencoded, json } from "express";
import cors from 'cors'
import env from 'dotenv'

const app = express()
const port = 3000

env.config()
app.use(cors())
app.use(urlencoded({ extended: true }))
app.use(json())

app.get('/', (req,res) => {
  res.send('hello world')
})

app.post('/test', (req,res) => {
  res.json(req.body)
})

app.listen(port,()=> {
  console.log(`now running in port ${port}`)
})