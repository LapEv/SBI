import '@testing-library/jest-dom'
import '@testing-library/react'

global.__reanimatedWorkletInit = () => {}

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock')
  Reanimated.default.call = () => {}
  return Reanimated
})
