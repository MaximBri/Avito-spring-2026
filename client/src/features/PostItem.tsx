import { Badge, Card, Group, Text } from '@mantine/core'
import type { PostModel } from '../shared/api/posts/types'
import type { FC } from 'react'
import { ViewMode } from '../shared/constants/view'
import type { ViewMode as ViewModeType } from '../shared/constants/view'
import { Link } from 'react-router-dom'
import { APP_ROUTES } from '../shared/constants/routes'
import { CATEGORY_LABELS_RU } from '../shared/constants/category'

interface PostItemProps {
  item: PostModel
  viewMode: ViewModeType
}

export const PostItem: FC<PostItemProps> = ({ item, viewMode }) => {
  const hasCategory = Boolean(item.category)
  const hasTitle = Boolean(item.title?.trim())
  const hasPrice = typeof item.price === 'number'
  const isListMode = viewMode === ViewMode.LIST
  const shouldShowRevisionBadge = !(hasCategory && hasTitle && hasPrice)
  const imageHeight = isListMode ? 180 : 120

  return (
    <Link
      to={`${APP_ROUTES.ADS}/${item.id}`}
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
        p={0}
        style={{
          width: '100%',
          height: '100%',
          minWidth: 0,
          minHeight: 0,
          display: 'flex',
          flexDirection: isListMode ? 'row' : 'column',
        }}
      >
        <img
          src="/images/default_img.png"
          alt="Изображение объявления"
          style={{
            width: isListMode ? 'auto' : '100%',
            height: isListMode ? '100%' : imageHeight,
            objectFit: 'cover',
            display: 'block',
          }}
        />

        <div style={{ padding: '22px 16px', position: 'relative' }}>
          <Text
            px={isListMode ? 0 : 6}
            style={
              isListMode
                ? {}
                : {
                    position: 'absolute',
                    top: -10,
                    border: '1px solid #D9D9D9',
                    borderRadius: 6,
                  }
            }
            fw={isListMode ? 400 : 500}
          >
            {CATEGORY_LABELS_RU[item.category]}
          </Text>
          <Text fw={500}>{item.title}</Text>

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
        </div>
      </Card>
    </Link>
  )
}
