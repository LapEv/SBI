import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store'
import './index.css'
import ThemeWrapper from 'themes/ThemeWrapper'
import { BrowserRouter } from 'react-router-dom'
import { FullScreen } from 'components/FullScreen'

const startServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('../sw.js')
        .then(registration => {
          console.log(
            'ServiceWorker registration successful with scope: ',
            registration.scope,
          )
        })
        .catch((error: string) => {
          console.error('ServiceWorker registration failed: ', error)
        })
    })
  }
}

if (process.env.NODE_ENV === 'production') {
  startServiceWorker()
}

console.log('main')

export const App = () => (
  <React.StrictMode>
    <Provider store={store}>
      <FullScreen>
        <BrowserRouter>
          <ThemeWrapper />
        </BrowserRouter>
      </FullScreen>
    </Provider>
  </React.StrictMode>
)
ReactDOM.hydrateRoot(document.getElementById('root') as HTMLElement, <App />)
