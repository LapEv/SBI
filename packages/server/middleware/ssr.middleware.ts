import type { NextFunction, Request, Response } from 'express'
import type { ViteDevServer } from 'vite'
import * as fs from 'fs'
import * as path from 'path'
import { distPath, isDev, srcPath, ssrClientPath } from '../data/app'
// import createEmotionServer from '@emotion/server/create-instance'
import createEmotionCache from '../utils/createEmotionCache'

async function ssrMiddleware(req: Request, res: Response, next: NextFunction) {
  if (req.url.startsWith('/api')) {
    next()
    return
  }

  console.log('SSR')
  const vite = req.app.locals.settings.vite as ViteDevServer
  const url = req.originalUrl
  const cache = createEmotionCache()
  // const { extractCriticalToChunks, constructStyleTagsFromChunks } =
  //   createEmotionServer(cache)

  console.log('Server vite = ', vite)
  console.log('Server url = ', url)
  console.log('Server cache = ', cache)

  try {
    let template: string
    console.log('isDev = ', isDev)

    if (!isDev) {
      template = fs.readFileSync(path.resolve(distPath, 'index.html'), 'utf-8')
      console.log('!isDev template = ', template)
    } else {
      template = fs.readFileSync(path.resolve(srcPath, 'index.html'), 'utf-8')
      template = await vite!.transformIndexHtml(url, template)
    }

    console.log('url = ', url)

    let render: (url: string) => Promise<string>
    let store: { getState: () => unknown }

    if (!isDev) {
      render = (await import(ssrClientPath)).render
      console.log('!isDev render = ', render)

      store = (await import(ssrClientPath)).store
      console.log('!isDev store = ', store)
    } else {
      render = (await vite!.ssrLoadModule(path.resolve(srcPath, 'ssr.tsx')))
        .render
      store = (await vite!.ssrLoadModule(path.resolve(srcPath, 'ssr.tsx')))
        .store
    }

    // const appStore = `<script>window.__PRELOADED_STATE__ = ${JSON.stringify(
    //   store.getState(),
    // )}</script>`

    // console.log('appStore = ', appStore)

    // const appHtml = await render(url)
    // console.log('appHtml = ', appHtml)
    // const emotionChunks = extractCriticalToChunks(appHtml)
    // console.log('emotionChunks = ', emotionChunks)
    // const emotionCss = constructStyleTagsFromChunks(emotionChunks)

    // console.log('emotionCss = ', emotionCss)

    const html = template
    //   .replace(`<!--ssr-outlet-->`, appHtml)
    //   .replace(`<!--ssr-store-->`, appStore)
    //   .replace(`<!--mui-style-->`, emotionCss)

    // console.log('html = ', html)

    res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
  } catch (e) {
    if (isDev) {
      vite!.ssrFixStacktrace(e as Error)
    }
    next(e)
  }
}

export default ssrMiddleware
