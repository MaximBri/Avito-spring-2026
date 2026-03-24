import { Navigate, useParams } from 'react-router-dom'
import { AppShell, Box, Title } from '@mantine/core'
import { APP_ROUTES } from '../../shared/constants/routes'
import { useGetPost } from '../../shared/api/posts/hooks/useGetPost'
import { AdsEditForm } from '../../features/AdsEditForm'

export const EditAdsPage = () => {
  const { id } = useParams<{ id: string }>()
  const parsedId = +(id?.toString() || '')
  const { data: postData, isLoading, isError } = useGetPost(parsedId)

  if (!id || Number.isNaN(parsedId) || isError) {
    return <Navigate to={APP_ROUTES.ADS} replace />
  }

  if (isLoading || !postData) return

  return (
    <>
      <AppShell bg="#FFF" style={{ minHeight: '100vh' }}>
        <Box px="10%" py={32} style={{ width: '100%', maxWidth: '100%' }}>
          <Title order={2} mb="md">
            Редактирование объявления
          </Title>
          <AdsEditForm id={parsedId} postData={postData} />
        </Box>
      </AppShell>
    </>
  )
}
