import { useForm } from 'react-hook-form'
import type { PostItemModel } from '../../../shared/api/posts/types'
import { editSchema, type EditFormValues } from '../schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import {
  Category,
  REQUIRED_PARAMS_BY_CATEGORY,
} from '../../../shared/constants/category'
import { useUpdatePost } from '../../../shared/api/posts/hooks/useUpdatePost'
import { notifications } from '@mantine/notifications'

export const useEditAdsForm = (id: number, postData?: PostItemModel) => {
  const { mutate: updatePost } = useUpdatePost(id)
  const form = useForm<EditFormValues>({
    resolver: zodResolver(editSchema),
    defaultValues: initializeForm(postData),
  })
  const { watch, reset } = form
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
            title: 'Объявление обновлено',
            message: '',
            color: 'green',
          })
        },
        onError: () => {
          notifications.show({
            title: 'Ошибка при обновлении',
            message: '',
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

  useEffect(() => {
    if (postData) {
      reset(initializeForm(postData), {
        keepValues: false,
        keepDirty: false,
      })
    }
  }, [postData])

  return { form, onSubmit }
}
