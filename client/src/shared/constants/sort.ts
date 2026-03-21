export const SortOption = {
  CREATED_DESC: 'created_desc',
  CREATED_ASC: 'created_asc',
  TITLE_ASC: 'title_asc',
  TITLE_DESC: 'title_desc',
  PRICE_ASC: 'price_asc',
  PRICE_DESC: 'price_desc',
} as const

export type SortOption = (typeof SortOption)[keyof typeof SortOption]

export const SORT_OPTIONS: Array<{ value: SortOption; label: string }> = [
  { value: SortOption.CREATED_DESC, label: 'По новизне (сначала новые)' },
  { value: SortOption.CREATED_ASC, label: 'По новизне (сначала старые)' },
  { value: SortOption.TITLE_ASC, label: 'По названию (А → Я)' },
  { value: SortOption.TITLE_DESC, label: 'По названию (Я → А)' },
  { value: SortOption.PRICE_ASC, label: 'По цене (сначала дешевле)' },
  { value: SortOption.PRICE_DESC, label: 'По цене (сначала дороже)' },
]
