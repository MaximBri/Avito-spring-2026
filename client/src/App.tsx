import { RouterProvider } from 'react-router-dom'
import { router } from './app/router'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './app/providers/query'
import { MantineProvider } from '@mantine/core'

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider withGlobalClasses withStaticClasses withCssVariables>
        <RouterProvider router={router} />
      </MantineProvider>
    </QueryClientProvider>
  )
}

export default App
