import React from 'react'
import { Provider } from 'react-redux'
import App from './App'
import { render, screen } from '@testing-library/react'
import { store } from 'store'

// @ts-ignore
global.fetch = jest.fn(() =>
  Promise.resolve({ json: () => Promise.resolve('hey') })
)

test('Example test', async () => {
  const ref = React.createRef()
  render(
    <Provider store={store}>
      <App ref={ref} />
    </Provider>
  )
  expect(screen.getByTestId('App')).toBeDefined()
})
