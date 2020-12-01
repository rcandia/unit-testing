import 'jest-styled-components'

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
}
global.localStorage = localStorageMock

global.window = Object.create(window)
Object.defineProperty(window, 'location', {
  value: {
    href: '',
    reload: jest.fn()
  }
})
