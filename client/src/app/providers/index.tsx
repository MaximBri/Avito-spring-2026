import { MantineProvider } from '@mantine/core'
import { BrowserRouter } from 'react-router-dom'
import type { FC, ReactNode } from 'react'

interface ProvidersProps {
  children: ReactNode
}

export const Providers: FC<ProvidersProps> = ({ children }) => {
  return (
    <BrowserRouter>
      <MantineProvider>{children}</MantineProvider>
    </BrowserRouter>
  )
}
