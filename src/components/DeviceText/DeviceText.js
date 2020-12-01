import React, { useState, useEffect } from 'react'

import Text from 'components/Text'

const DeviceText = () => {
  const [device, setDevice] = useState('desktop')

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        return setDevice('mobile')
      }
      if (window.innerWidth < 1200) {
        return setDevice('tablet')
      }
      return setDevice('desktop')
    }
    handleResize()

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return <Text>{device}</Text>
}

export default DeviceText
