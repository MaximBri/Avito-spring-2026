import { ActionIcon } from '@mantine/core'
import { IconX } from '@tabler/icons-react'
import type { FC } from 'react'

interface ClearButtonProps {
  onClick: () => void
}

export const ClearButton: FC<ClearButtonProps> = ({ onClick }) => (
  <ActionIcon
    size="sm"
    variant="subtle"
    color="gray"
    onClick={onClick}
    style={{
      borderRadius: '50%',
      backgroundColor: '#f0f0f0',
    }}
  >
    <IconX size={14} />
  </ActionIcon>
)
