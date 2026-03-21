import { Card, Skeleton } from '@mantine/core'

export const PostItemSkeleton = () => {
  return (
    <Card shadow="sm" radius="md" withBorder style={{ width: '100%' }}>
      <Skeleton height={120} />
      <Skeleton mt="sm" height={24} width={90} radius="md" />
      <Skeleton mt="xs" height={20} width="75%" />
      <Skeleton mt={6} height={18} width={110} />
      <Skeleton mt="xs" height={28} width={160} radius="xl" />
    </Card>
  )
}
