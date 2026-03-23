import { Link, Navigate, useParams } from 'react-router-dom'
import {
  Alert,
  AppShell,
  Box,
  Button,
  Container,
  Grid,
  Group,
  Stack,
  Text,
  Title,
} from '@mantine/core'
import { useGetPost } from '../../shared/api/posts/hooks/useGetPost'
import { PageStatus } from '../../shared/ui/PageStatus'
import { APP_ROUTES } from '../../shared/constants/routes'
import { formatDateTime, getMissingFields, getParamLabel, getParamValue } from './helpers'

export const OneAds = () => {
  const { id } = useParams<{ id: string }>()
  const { data, isLoading, isError } = useGetPost(+(id || ''))
  const isEdited = data?.updatedAt && data?.updatedAt !== data?.createdAt

  if (!id || Number.isNaN(+id) || isError)
    return <Navigate to={APP_ROUTES.ADS} replace />

  if (isLoading)
    return (
      <PageStatus isLoading={isLoading} loadingTitle="Загружаю объявление..." />
    )

  const params = data?.params ?? {}
  const characteristics = Object.entries(params)

  return (
    <AppShell bg="#FFF" style={{ minHeight: '100vh' }}>
      <Container size={1200} p={32}>
        <Stack
          align="flex-start"
          style={{ borderBottom: '1px solid #F0F0F0', paddingBottom: 30 }}
        >
          <Button component={Link} to={APP_ROUTES.ADS} variant="subtle">
            ← Вернуться к списку
          </Button>
          <Group align="center" justify="space-between" w="100%">
            <Title order={2} style={{ fontSize: 30 }}>
              {data?.title}
            </Title>
            <Text size="lg" fw={700} style={{ fontSize: 30 }}>
              {data?.price.toLocaleString('ru-RU')} ₽
            </Text>
          </Group>
          <Group align="center" justify="space-between" w="100%">
            <Button
              component={Link}
              to={APP_ROUTES.EDIT_ADS.replace(':id', data?.id.toString() ?? '')}
              color="white"
              variant="outline"
              bg={'blue'}
              radius={8}
              style={{ fontWeight: 400 }}
            >
              Редактировать
              <img
                src="/icons/edit.svg"
                alt="edit"
                style={{
                  marginLeft: 10,
                }}
              />
            </Button>
            <Stack align="flex-end" gap={4}>
              <Text c="dimmed">
                Опубликовано: {formatDateTime(data?.createdAt)}
              </Text>
              {isEdited && (
                <Text c="dimmed">
                  Отредактировано: {formatDateTime(data?.updatedAt)}
                </Text>
              )}
            </Stack>
          </Group>
        </Stack>

        <Stack mt="md">
          <Grid>
            <Grid.Col span={6}>
              <img
                src="/images/default_img.png"
                alt="Изображение объявления"
                style={{
                  width: '100%',
                  height: 320,
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
              <Box mt="lg">
                <Title order={3}>Описание</Title>
                <Text mt="xs">{data?.description || 'Отсутствует'}</Text>
              </Box>
            </Grid.Col>

            <Grid.Col span={6}>
              {data?.needsRevision && (
                <Alert
                  color="yellow"
                  variant="light"
                  title="Требуются доработки"
                  icon={<img src="/icons/warning.svg" />}
                  style={{
                    color: '#000',
                    marginBottom: 32,
                    borderRadius: 8,
                    boxShadow: '0 0.3rem 0.5rem rgba(0,0,0,0.15)',
                  }}
                >
                  У объявления не заполнены поля:
                  <ul
                    style={{
                      margin: 0,
                      paddingLeft: 12,
                      listStyleType: 'disc',
                      listStylePosition: 'inside',
                    }}
                  >
                    {getMissingFields(data).map((field) => (
                      <li key={field} style={{ color: '#6c757d' }}>
                        {field}
                      </li>
                    ))}
                  </ul>
                </Alert>
              )}
              <Title order={3} m={'0 0 16px 0'}>
                Характеристики
              </Title>
              <Group align="start" style={{ width: '100%' }}>
                {!!characteristics.length ? (
                  <Stack style={{ width: '100%' }} gap={6}>
                    {characteristics.map(([key, value]) => (
                      <Group key={key} style={{ width: '100%' }}>
                        <Text c="dimmed">{getParamLabel(key)}</Text>
                        <Text fw={600}>{getParamValue(key, value)}</Text>
                      </Group>
                    ))}
                  </Stack>
                ) : (
                  <Text c="dimmed">Характеристики отсутствуют</Text>
                )}
              </Group>
            </Grid.Col>
          </Grid>
        </Stack>
      </Container>
    </AppShell>
  )
}
