import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { store } from './src/store'
import ThemeWrapper from './src/themes/ThemeWrapper'

export function render(url: string) {
  return renderToString(
    <Provider store={store}>
      <ThemeWrapper />
    </Provider>
  )
}

export { store }
