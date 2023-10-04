import '@testing-library/jest-dom'
import '@testing-library/react'

// eslint-disable-next-line @typescript-eslint/no-empty-function
global.__reanimatedWorkletInit = () => {}

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  Reanimated.default.call = () => {}
  return Reanimated
})
