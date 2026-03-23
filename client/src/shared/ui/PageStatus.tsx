import { AppShell, Group, Loader, Text } from '@mantine/core'
import type { FC } from 'react'

interface PageStatusProps {
  isLoading: boolean
  loadingTitle: string
}

export const PageStatus: FC<PageStatusProps> = ({
  isLoading,
  loadingTitle,
}) => {
  if (!isLoading) {
    return null
  }

  return (
    <AppShell
      bg="#FFF"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Group>
        <Loader />
        <Text>{loadingTitle}</Text>
      </Group>
    </AppShell>
  )
}
