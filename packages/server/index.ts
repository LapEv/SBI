import * as dotenv from 'dotenv'
import cors from 'cors'
import express from 'express'
import { createServer } from 'vite'
import { dbConnect } from './db'
import { apiRouter } from './routers/index.router'
import { isDev, srcPath } from './data/app'
import staticMiddleware from './middleware/static.middleware'
import ssrMiddleware from './middleware/ssr.middleware'
import fileUpload from 'express-fileupload'

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
  console.log('Server env = ', process.env)
  const corsOptions = {
    origin: [
      `http://127.0.0.1:${process.env.CLIENT_PORT}`,
      `http://localhost:${process.env.CLIENT_PORT}`,
      `http://127.0.0.1:${process.env.SERVER_PORT}`,
      `http://localhost:${process.env.SERVER_PORT}`,
      `http://${process.env.SERVER_PROD_HOST}:${process.env.CLIENT_PORT}`,
      `http://${process.env.SERVER_PROD_HOST}:${process.env.SERVER_PORT}`,
      `http://${process.env.SERVER_PROD_DOMAIN}:${process.env.CLIENT_PORT}`,
      `http://${process.env.SERVER_PROD_DOMAIN}:${process.env.SERVER_PORT}`,
    ],
    credentials: true,
    optionSuccessStatus: 200,
  }
  app.use(cors(corsOptions))
  app.use(express.json())
  const port = Number(process.env.SERVER_PORT) || 3000

  console.log('Server SERVER_PORT = ', port)
  app.use('/api', apiRouter)

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

  app.get('/', (_, res) => {
    res.json('👋 Server ready ')
  })

  app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
  })
}

init()
