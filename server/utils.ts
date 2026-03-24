import { ITEM_CATEGORIES, requiredFieldsByCategory } from 'constants.ts'
import type { Item } from './types.ts'

export const doesItemNeedRevision = (item: Item): boolean => {
  if (!item.description) return true

  const params = item.params ?? {}

  if (item.category === ITEM_CATEGORIES.AUTO) {
    return requiredFieldsByCategory[ITEM_CATEGORIES.AUTO].some(
      (key) => !params[key as keyof typeof params],
    )
  }

  if (item.category === ITEM_CATEGORIES.REAL_ESTATE) {
    return requiredFieldsByCategory[ITEM_CATEGORIES.REAL_ESTATE].some(
      (key) => !params[key as keyof typeof params],
    )
  }

  return requiredFieldsByCategory[ITEM_CATEGORIES.ELECTRONICS].some(
    (key) => !params[key as keyof typeof params],
  )
}
