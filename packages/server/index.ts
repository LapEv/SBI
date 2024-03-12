import dotenv from 'dotenv'
import cors from 'cors'
const fileUpload = require('express-fileupload')
import express from 'express'
import { dbConnect } from './db'
import { apiRouter } from './routers/index.router'

const result = dotenv.config({ path: '../../.env' })

if (result.error) {
  throw result.error
}

console.log(result.parsed)

const {
  CLIENT_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_PORT,
} = process.env
console.log('CLIENT_PORT = ', CLIENT_PORT)
console.log('POSTGRES_USER = ', POSTGRES_USER)
console.log('POSTGRES_PASSWORD = ', POSTGRES_PASSWORD)
console.log('POSTGRES_DB = ', POSTGRES_DB)
console.log('POSTGRES_PORT = ', POSTGRES_PORT)

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
console.log('process.env.SERVER_PORT = ', process.env.SERVER_PORT)
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
