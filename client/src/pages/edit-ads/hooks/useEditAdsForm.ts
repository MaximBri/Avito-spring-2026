import { useForm, useFormContext } from 'react-hook-form'
import type { PostItemModel } from '../../../shared/api/posts/types'
import { editSchema, type EditFormValues } from '../schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { APP_ROUTES } from '../../../shared/constants/routes'
import { postsApi } from '../../../shared/api/posts'
import {
  Category,
  REQUIRED_PARAMS_BY_CATEGORY,
} from '../../../shared/constants/category'
import { useUpdatePost } from '../../../shared/api/posts/hooks/useUpdatePost'

export const useEditAdsForm = (id: number, postData?: PostItemModel) => {
  const navigate = useNavigate()
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

    updatePost({
      category: values.category,
      title: values.title,
      description: values.description || '',
      price: values.price,
      params,
    })

    navigate(APP_ROUTES.ONE_ADS.replace(':id', id.toString()), {
      replace: true,
    })
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
