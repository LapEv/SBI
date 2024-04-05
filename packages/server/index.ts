import * as dotenv from 'dotenv'
import cors from 'cors'
const fileUpload = require('express-fileupload')
import express from 'express'
import { createServer } from 'vite'
import { dbConnect } from './db'
import { apiRouter } from './routers/index.router'
import { isDev, srcPath } from './data/app'
import staticMiddleware from './middleware/static.middleware'
import ssrMiddleware from './middleware/ssr.middleware'

async function init() {
  await dbConnect()
  dotenv.config()
  const app = express()
  app.use(
    fileUpload({
      createParentPath: true,
      limits: {
        fileSize: 200 * 1024 * 1024 * 1024, //20MB max file(s) size
      },
      tempFileDir: '/Files/',
    }),
  )
  app.use(express.json({ limit: '50mb' }))
  app.use(cors())
  app.use(express.json())
  const port = Number(process.env.SERVER_PORT) || 3001

  if (isDev) {
    const vite = await createServer({
      server: { middlewareMode: true },
      root: srcPath,
      appType: 'custom',
    })

    app.set('vite', vite)
    app.use(vite.middlewares)
  }

  app.use('/assets', staticMiddleware())
  app.use(ssrMiddleware)

  app.use('/api', apiRouter)
  app.get('/', (_, res) => {
    res.json('👋 Server ready ')
  })

  app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
  })
}

init()
