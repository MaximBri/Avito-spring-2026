import type { PostItemModel, PostModel } from '../../shared/api/posts/types'
import {
  PARAM_LABELS,
  PARAM_VALUE_LABELS,
  REQUIRED_PARAMS_BY_CATEGORY,
} from '../../shared/constants/category'

export const getParamLabel = (key: string) => PARAM_LABELS[key] ?? key

export const getParamValue = (key: string, value: unknown) => {
  if (!value) return '-'

  const valueMap = PARAM_VALUE_LABELS[key]
  if (valueMap && typeof value === 'string') {
    return valueMap[value] ?? value
  }

  return String(value)
}

export const getMissingFields = (item: PostItemModel): string[] => {
  const missing: string[] = []

  if (!item.description || !String(item.description).trim()) {
    missing.push('Описание')
  }

  const requiredFields = REQUIRED_PARAMS_BY_CATEGORY[item.category] || []
  const params: Record<string, unknown> = item.params || {}

  requiredFields.forEach((field) => {
    if (!params[field]) {
      missing.push(getParamLabel(field))
    }
  })

  return missing
}

export const formatDateTime = (rawDate?: string) => {
  if (!rawDate) return '-'
  const date = new Date(rawDate)
  const dateStr = date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
  })
  const timeStr = date.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  })
  return `${dateStr} ${timeStr}`
}
