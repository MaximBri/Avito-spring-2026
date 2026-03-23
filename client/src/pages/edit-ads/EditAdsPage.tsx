import { Navigate, useParams } from 'react-router-dom'
import { FormProvider } from 'react-hook-form'
import { AppShell, Box, Button, Group, Stack, Text, Title } from '@mantine/core'
import { PageStatus } from '../../shared/ui/PageStatus'
import { APP_ROUTES } from '../../shared/constants/routes'
import {
  ALL_CATEGORIES,
  CATEGORY_LABELS_RU,
  REQUIRED_PARAMS_BY_CATEGORY,
} from '../../shared/constants/category'
import { useGetPost } from '../../shared/api/posts/hooks/useGetPost'
import { Field } from '../../shared/ui/Field'
import { useEditAdsForm } from './hooks/useEditAdsForm'
import { SelectField } from '../../shared/ui/SelectField'
import { TextField } from '../../shared/ui/TextField'
import { NumberField } from '../../shared/ui/NumberField'
import { TextareaField } from '../../shared/ui/TextareaField'
import { FieldWrapper } from '../../features/FieldWrapper'

export const EditAdsPage = () => {
  const { id } = useParams<{ id: string }>()
  const parsedId = +(id?.toString() || '')
  const { data: postData, isLoading, isError } = useGetPost(parsedId)

  const { onSubmit, form } = useEditAdsForm(parsedId, postData)
  const {
    watch,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = form
  const category = watch('category')
  const additionalParams = watch('category')
    ? REQUIRED_PARAMS_BY_CATEGORY[watch('category')]
    : []

  if (!id || Number.isNaN(parsedId) || isError) {
    return <Navigate to={APP_ROUTES.ADS} replace />
  }

  if (isLoading || !postData) {
    return (
      <PageStatus
        isLoading={true}
        loadingTitle="Загружаю данные для редактирования..."
      />
    )
  }

  return (
    <FormProvider {...form}>
      <AppShell bg="#FFF" style={{ minHeight: '100vh' }}>
        <Box px="10%" py={32} style={{ width: '100%', maxWidth: '100%' }}>
          <Title order={2} mb="md">
            Редактирование объявления
          </Title>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack gap="md">
              <FieldWrapper>
                <SelectField
                  name="category"
                  label="Категория"
                  options={ALL_CATEGORIES.map((value) => ({
                    value,
                    label: CATEGORY_LABELS_RU[value],
                  }))}
                />
              </FieldWrapper>
              <FieldWrapper>
                <TextField
                  label={
                    <span>
                      <span style={{ color: 'red' }}>*</span> Название
                    </span>
                  }
                  placeholder="Название"
                  name="title"
                />
              </FieldWrapper>
              <FieldWrapper>
                <NumberField
                  label={
                    <span>
                      <span style={{ color: 'red' }}>*</span> Цена
                    </span>
                  }
                  placeholder="10000"
                  name="price"
                  min={1}
                />
              </FieldWrapper>
              <FieldWrapper>
                <Box>
                  <Title order={4} mt="md">
                    Характеристики
                  </Title>
                  {!additionalParams.length ? (
                    <Text c="dimmed">
                      Выберите категорию, чтобы отобразить поля
                    </Text>
                  ) : (
                    <Stack gap="sm" mt="xs">
                      {additionalParams.map((param) => (
                        <Field key={param} param={param} category={category} />
                      ))}
                    </Stack>
                  )}
                </Box>
              </FieldWrapper>
              <FieldWrapper>
                <TextareaField
                  label="Описание"
                  placeholder="Описание объявления"
                  minRows={4}
                  name="description"
                  warningCondition
                />
              </FieldWrapper>
              <Group justify="flex-start" mt="lg" gap="md">
                <Button type="submit" disabled={isSubmitting}>
                  Сохранить
                </Button>
                <Button
                  variant="default"
                  onClick={() => reset()}
                  disabled={isSubmitting}
                  style={{ backgroundColor: '#f0f0f0', color: '#000' }}
                >
                  Отмена
                </Button>
              </Group>
            </Stack>
          </form>
        </Box>
      </AppShell>
    </FormProvider>
  )
}
