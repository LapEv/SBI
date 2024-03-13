import dotenv from 'dotenv'
import cors from 'cors'
const fileUpload = require('express-fileupload')
import express from 'express'
import { dbConnect } from './db'
import { apiRouter } from './routers/index.router'

dotenv.config()

const app = express()
app.use(
  fileUpload({
    createParentPath: true,
    limits: {
      fileSize: 20 * 1024 * 1024 * 1024, //2MB max file(s) size
    },
    tempFileDir: '/Files/',
  })
)
app.use(express.json({ limit: '50mb' }))
app.use(cors())
app.use(express.json())
const port = Number(process.env.SERVER_PORT) || 3001

async function init() {
  await dbConnect()
  app.use('/api', apiRouter)
  app.get('/', (_, res) => {
    res.json('👋 Server ready ')
  })

  app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
  })
}

init()
