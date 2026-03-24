import { useEffect, useState, type FC } from 'react'
import { useEditAdsForm } from '../pages/edit-ads/hooks/useEditAdsForm'
import type { PostItemModel } from '../shared/api/posts/types'
import type { EditFormValues } from '../pages/edit-ads/schema'
import {
  ALL_CATEGORIES,
  CATEGORY_LABELS_RU,
  REQUIRED_PARAMS_BY_CATEGORY,
} from '../shared/constants/category'
import { Box, Button, Group, Stack, Text, Title } from '@mantine/core'
import { AiDescriptionButton } from './AiDescriptionButton'
import { TextareaField } from '../shared/ui/TextareaField'
import { FieldWrapper } from './FieldWrapper'
import { SelectField } from '../shared/ui/SelectField'
import { TextField } from '../shared/ui/TextField'
import { NumberField } from '../shared/ui/NumberField'
import { AiPriceButton } from './AiPriceButton'
import { Field } from '../shared/ui/Field'
import { RestoreDraftModal } from './RestoreDraftModal'
import { FormProvider } from 'react-hook-form'

interface AdsEditFormProps {
  id: number
  postData: PostItemModel
}

export const AdsEditForm: FC<AdsEditFormProps> = ({ id, postData }) => {
  const [modalOpened, setModalOpened] = useState(false)
  const { onSubmit, form, draft } = useEditAdsForm(id, postData)
  const {
    watch,
    handleSubmit,
    reset,
    formState: { isSubmitting, isValid },
  } = form

  const category = watch('category')
  const additionalParams = watch('category')
    ? REQUIRED_PARAMS_BY_CATEGORY[watch('category')]
    : []
  const handleRestore = (draft: EditFormValues) => form.reset(draft)
  const handleCloseModal = () => setModalOpened(false)

  useEffect(() => {
    if (draft) {
      setModalOpened(true)
    }
  }, [draft])

  return (
    <FormProvider {...form}>
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
          <FieldWrapper styles={{ display: 'flex', gap: 24 }}>
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
            <AiPriceButton postData={postData} />
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
          <TextareaField
            label="Описание"
            placeholder="Описание объявления"
            minRows={4}
            name="description"
            style={{ maxWidth: '950px' }}
          />
          <AiDescriptionButton postData={postData} />
          <Group justify="flex-start" mt="lg" gap="md">
            <Button type="submit" disabled={isSubmitting || !isValid}>
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
      <RestoreDraftModal
        opened={modalOpened}
        onClose={handleCloseModal}
        draft={draft!}
        onRestore={handleRestore}
      />
    </FormProvider>
  )
}
