import React from 'react'
import { useDropzone } from 'react-dropzone'

import Row from 'components/Row'
import Text from 'components/Text'

const Dropzone = ({
  dropzoneOptions,
  disabled,
  internalTextDesktop,
  internalLinkDesktop,
  buttonTextMobile,
  isTesting,
  ...props
}) => {
  const { getRootProps, getInputProps } = useDropzone({ ...dropzoneOptions, disabled })

  return (
    <Row
      borderRadius='5px'
      border={['1px solid', '2px dashed']}
      borderColor={['purple', 'silver']}
      px={24}
      py={[10, 24]}
      alignItems='center'
      justifyContent='center'
      cursor='pointer'
      flexDirection={['row', 'column']}
      {...(disabled && { backgroundColor: 'silver', borderColor: ['silver', 'silver'] })}
      {...getRootProps()}
      {...props}
    >
      <input {...(isTesting && { 'data-testid': 'input-file' })} {...getInputProps()} />
      <Text display={['none', 'block']}>Dropzone</Text>
    </Row>
  )
}

export default Dropzone
