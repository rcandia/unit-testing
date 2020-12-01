import React from 'react'
import { render, fireEvent, act } from 'test-utils'

import DeviceText from 'components/DeviceText'

// DEFAULT WIDTH 1024

describe('DeviceText Component', () => {
  test('Render', () => {
    const { queryByText } = render(<DeviceText />)
    expect(queryByText('desktop')).toBeFalsy()
    expect(queryByText('tablet')).toBeTruthy()
    expect(queryByText('mobile')).toBeFalsy()
  })

  test('Behavior', () => {
    const { queryByText, getByText } = render(<DeviceText />)
    expect(getByText('tablet')).toBeTruthy()

    act(() => {
      window.innerWidth = 320

      fireEvent(window, new Event('resize'))
    })
    expect(queryByText('mobile')).toBeTruthy()

    act(() => {
      window.innerWidth = 1280

      fireEvent(window, new Event('resize'))
    })
    expect(queryByText('desktop')).toBeTruthy()
  })
})
