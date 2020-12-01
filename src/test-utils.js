import React from 'react'
import { render } from '@testing-library/react'

import Theme from 'theme'
import '@testing-library/jest-dom/extend-expect'

const ProviderWrapper = ({ children }) => <Theme>{children}</Theme>

const customRender = (ui, options) => render(ui, { wrapper: ProviderWrapper, ...options })

export * from '@testing-library/react'

export { customRender as render }
