import React, { useState } from 'react'
import { render, fireEvent, act } from 'test-utils'

import Dropzone from 'components/Dropzone'

const DropzoneComponent = ({ options, ...props }) => {
  const [files, setFiles] = useState([])
  const onDrop = acceptedFiles => setFiles(acceptedFiles)

  return (
    <div>
      <Dropzone
        isTesting
        dropzoneOptions={{
          onDrop,
          ...options
        }}
        {...props}
      />
      {files?.map(item => (
        <div key={item.path}>{item.path}</div>
      ))}
    </div>
  )
}

describe('Dropzone Component', () => {
  test('Render', () => {
    const { queryByTestId, queryByText, rerender } = render(<DropzoneComponent />)

    expect(queryByText('Dropzone')).toBeTruthy()
    expect(queryByTestId('input-file')).toBeTruthy()

    rerender(<DropzoneComponent disabled data-testid='disabled-dropzone' />)

    expect(queryByTestId('disabled-dropzone')).toBeTruthy()
    expect(queryByTestId('disabled-dropzone')).toHaveStyleRule('background-color', 'silver')
    expect(queryByTestId('disabled-dropzone')).toHaveStyleRule('border-color', 'silver')
  })

  test('Single file input', async () => {
    const { getByTestId, getByText } = render(<DropzoneComponent />)

    await act(async () => {
      fireEvent.change(getByTestId('input-file'), {
        target: {
          files: [new File(['foo'], 'foo.png', { type: 'image/png' })]
        }
      })
      await Promise.resolve()
    })

    expect(getByText('foo.png')).toBeTruthy()
  })

  test('Multiple files input', async () => {
    const { getByTestId, getByText } = render(<DropzoneComponent />)

    await act(async () => {
      fireEvent.change(getByTestId('input-file'), {
        target: {
          files: [
            new File(['foo'], 'foo.png', { type: 'image/png' }),
            new File(['bar'], 'bar.png', { type: 'image/png' })
          ]
        }
      })
      await Promise.resolve()
    })
    expect(getByText('foo.png')).toBeTruthy()
    expect(getByText('bar.png')).toBeTruthy()
  })

  test('Reject by format files input', async () => {
    const { getByTestId, getByText, queryByText } = render(<DropzoneComponent options={{ accept: '.png' }} />)

    await act(async () => {
      fireEvent.change(getByTestId('input-file'), {
        target: {
          files: [
            new File(['foo'], 'foo.png', { type: 'image/png' }),
            new File(['bar'], 'bar.txt', { type: 'text/plain' })
          ]
        }
      })
      await Promise.resolve()
    })

    expect(getByText('foo.png')).toBeTruthy()
    expect(queryByText('bar.txt')).toBeFalsy()
  })

  test('Reject by size files input', async () => {
    const { getByTestId, getByText, queryByText } = render(<DropzoneComponent options={{ maxSize: 3 }} />)

    await act(async () => {
      fireEvent.change(getByTestId('input-file'), {
        target: {
          files: [
            new File(['foo'], 'foo.png', { type: 'image/png' }),
            new File(['long-size-text'], 'long-size-text.txt', { type: 'text/plain' })
          ]
        }
      })
      await Promise.resolve()
    })

    expect(getByText('foo.png')).toBeTruthy()
    expect(queryByText('long-size-text.txt')).toBeFalsy()
  })
})
