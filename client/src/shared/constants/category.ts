export const Category = {
  AUTO: 'auto',
  ELECTRONICS: 'electronics',
  REAL_ESTATE: 'real_estate',
} as const

export type Category = (typeof Category)[keyof typeof Category]

export const CATEGORY_LABELS_RU: Record<Category, string> = {
  [Category.AUTO]: 'Авто',
  [Category.ELECTRONICS]: 'Электроника',
  [Category.REAL_ESTATE]: 'Недвижимость',
}

export const ALL_CATEGORIES: Category[] = [
  Category.AUTO,
  Category.ELECTRONICS,
  Category.REAL_ESTATE,
]
