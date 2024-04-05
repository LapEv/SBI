import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { store } from './src/store'
import ThemeWrapper from './src/themes/ThemeWrapper'
import { StaticRouter } from 'react-router-dom/server'
import createEmotionCache from './src/themes/createEmotionCache'
import { CacheProvider } from '@emotion/react'

export function render(url: string) {
  console.log('client url = ', url)
  const cache = createEmotionCache()
  console.log('Client cache = ', cache)

  return renderToString(
    <Provider store={store}>
      <StaticRouter location={url}>
        <CacheProvider value={cache}>
          <ThemeWrapper />
        </CacheProvider>
      </StaticRouter>
    </Provider>,
  )
}

export { store }
