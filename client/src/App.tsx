import { RouterProvider } from 'react-router-dom'
import { router } from './app/router'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './app/providers/query'
import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import '@mantine/notifications/styles.css'

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider withGlobalClasses withStaticClasses withCssVariables>
        <Notifications position="top-right" />
        <RouterProvider router={router} />
      </MantineProvider>
    </QueryClientProvider>
  )
}

export default App
