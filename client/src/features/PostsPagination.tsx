import { Pagination } from '@mantine/core'
import type { FC } from 'react'

interface PostsPaginationProps {
  total: number
  value: number
  onChange: (page: number) => void
}

export const PostsPagination: FC<PostsPaginationProps> = ({
  total,
  value,
  onChange,
}) => {
  if (total <= 1) return null

  return (
    <Pagination
      value={value}
      onChange={onChange}
      total={total}
      mt="md"
      siblings={2}
      withControls
      getItemProps={(page) => ({
        style:
          page === value
            ? {
                border: '1px solid #228BE6',
                backgroundColor: '#FFFFFF',
                color: '#228BE6',
                fontWeight: 600,
              }
            : undefined,
      })}
      styles={{
        root: { justifyContent: 'center' },
        control: {
          minWidth: 32,
          height: 32,
          borderRadius: 8,
          border: '1px solid #DAD7E0',
          backgroundColor: '#F1F0F3',
          color: '#2A2A2A',
          '&[data-disabled]': {
            opacity: 0.45,
            cursor: 'not-allowed',
          },
        },
      }}
    />
  )
}
