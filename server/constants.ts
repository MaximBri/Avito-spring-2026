export const ITEM_CATEGORIES = {
  AUTO: 'auto',
  REAL_ESTATE: 'real_estate',
  ELECTRONICS: 'electronics',
} as const

export const requiredFieldsByCategory = {
  [ITEM_CATEGORIES.AUTO]: ['brand', 'model'],
  [ITEM_CATEGORIES.REAL_ESTATE]: ['address', 'type'],
  [ITEM_CATEGORIES.ELECTRONICS]: ['type', 'brand'],
} as const
