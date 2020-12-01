import React from 'react'
import { render, fireEvent } from 'test-utils'

import Button from 'components/Button'

describe('Button component', () => {
  test('Render', () => {
    const { getByRole } = render(<Button />)
    expect(getByRole('button')).toBeTruthy()
  })

  test('Styles', () => {
    const { getByRole, rerender } = render(<Button type='button' disabled />)

    expect(getByRole('button')).toHaveAttribute('disabled')

    rerender(<Button type='button' />)
    expect(getByRole('button')).not.toHaveAttribute('disabled')
    expect(getByRole('button')).toHaveStyle('border-radius: 4px')
  })

  test('Behavior', () => {
    const { getByRole } = render(<Button type='button' onClick={() => console.log('click')} />)

    fireEvent.click(getByRole('button'))
  })
})
