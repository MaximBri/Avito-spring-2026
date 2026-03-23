import { Badge, Card, Group, Text } from '@mantine/core'
import { CATEGORY_LABELS_RU } from '../shared/constants/category'
import type { PostModel } from '../shared/api/posts/types'
import type { FC } from 'react'
import { ViewMode } from '../shared/constants/view'
import type { ViewMode as ViewModeType } from '../shared/constants/view'
import { Link } from 'react-router-dom'

interface PostItemProps {
  item: PostModel
  viewMode: ViewModeType
}

export const PostItem: FC<PostItemProps> = ({ item, viewMode }) => {
  const hasCategory = Boolean(item.category)
  const hasTitle = Boolean(item.title?.trim())
  const hasPrice = typeof item.price === 'number'
  const shouldShowRevisionBadge = !(hasCategory && hasTitle && hasPrice)
  const imageHeight = viewMode === ViewMode.LIST ? 240 : 120

  return (
    <Link
      to={`/ads/${item.id}`}
      style={{
        display: 'block',
        textDecoration: 'none',
        width: '100%',
        height: '100%',
      }}
      aria-label={`Открыть объявление ${item.title}`}
    >
      <Card
        shadow="sm"
        radius="md"
        withBorder
        style={{ width: '100%', height: '100%', minWidth: 0, minHeight: 0 }}
      >
        <Card.Section>
          <img
            src="/images/default_img.png"
            alt="Изображение объявления"
            style={{
              width: '100%',
              height: imageHeight,
              objectFit: 'cover',
              display: 'block',
            }}
          />
        </Card.Section>

        <Text mt="xs" fw={500}>
          {item.title}
        </Text>

        <Text c="dimmed">{item.price} ₽</Text>

        {shouldShowRevisionBadge && (
          <Badge
            mt="xs"
            radius="xl"
            variant="light"
            color="orange"
            styles={{
              root: {
                backgroundColor: '#FFF3E5',
                paddingInline: 10,
                height: 28,
              },
              label: {
                textTransform: 'none',
                color: '#F08C00',
                fontSize: 14,
                fontWeight: 500,
              },
            }}
          >
            <Group gap={6} wrap="nowrap">
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  backgroundColor: '#F08C00',
                  display: 'inline-block',
                  flexShrink: 0,
                }}
              />
              <span>Требует доработок</span>
            </Group>
          </Badge>
        )}
      </Card>
    </Link>
  )
}
