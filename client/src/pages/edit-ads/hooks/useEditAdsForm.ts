import { useForm } from 'react-hook-form'
import type { PostItemModel } from '../../../shared/api/posts/types'
import { editSchema, type EditFormValues } from '../schema'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Category,
  REQUIRED_PARAMS_BY_CATEGORY,
} from '../../../shared/constants/category'
import { useUpdatePost } from '../../../shared/api/posts/hooks/useUpdatePost'
import { notifications } from '@mantine/notifications'
import { useNavigate } from 'react-router-dom'
import { APP_ROUTES } from '../../../shared/constants/routes'
import { useLocalStorageDraft } from './useLocalStorageDraft'

export const useEditAdsForm = (id: number, postData?: PostItemModel) => {
  const navigate = useNavigate()
  const { mutate: updatePost } = useUpdatePost(id)
  const DRAFT_KEY = `edit-post-${id}`
  const form = useForm<EditFormValues>({
    resolver: zodResolver(editSchema),
    defaultValues: initializeForm(postData),
  })
  const { draft, clearDraft } = useLocalStorageDraft(form, postData, DRAFT_KEY)

  const { watch } = form
  const category = watch('category')
  const additionalParams = category ? REQUIRED_PARAMS_BY_CATEGORY[category] : []

  const onSubmit = async (values: EditFormValues) => {
    const params: Record<string, unknown> = {}
    additionalParams.forEach((param) => {
      const value = values.params?.[param]
      if (value !== undefined && value !== null && value !== '') {
        params[param] = value
      }
    })

    updatePost(
      {
        category: values.category,
        title: values.title,
        description: values.description || '',
        price: values.price,
        params,
      },
      {
        onSuccess: () => {
          notifications.show({
            title: 'Изменения сохранены',
            message: '',
            color: 'green',
          })
          clearDraft()
          navigate(`${APP_ROUTES.ADS}/${id}`)
        },
        onError: () => {
          notifications.show({
            title: 'Ошибка сохранения',
            message:
              'При попытке сохранить изменения произошла ошибка. Попробуйте ещё раз или зайдите позже.',
            color: 'red',
          })
        },
      },
    )
  }

  function initializeForm(data?: PostItemModel) {
    return {
      category: data?.category || Category.AUTO,
      title: data?.title || '',
      description: data?.description ?? '',
      price: data?.price || 0,
      params: data?.params ?? {},
    }
  }

  return { form, onSubmit, draft }
}
