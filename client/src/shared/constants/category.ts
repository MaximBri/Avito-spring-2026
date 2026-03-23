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

export const TransmissionType = {
  AUTO: 'automatic',
  MANUAL: 'manual',
}

export const EstateTypes = {
  FLAT: 'flat',
  HOUSE: 'house',
  ROOM: 'room',
}

export const ElectronicsType = {
  PHONE: 'phone',
  LAPTOP: 'laptop',
  MISC: 'misc',
}

export const ConditionType = {
  NEW: 'new',
  USED: 'used',
}

export const ALL_CATEGORIES: Category[] = [
  Category.AUTO,
  Category.ELECTRONICS,
  Category.REAL_ESTATE,
]

export const PARAM_LABELS: Record<string, string> = {
  brand: 'Бренд',
  model: 'Модель',
  yearOfManufacture: 'Год выпуска',
  transmission: 'Коробка передач',
  mileage: 'Пробег',
  enginePower: 'Мощность',
  type: 'Тип',
  address: 'Адрес',
  area: 'Площадь',
  floor: 'Этаж',
  condition: 'Состояние',
  color: 'Цвет',
}

export const PARAM_VALUE_LABELS: Record<string, Record<string, string>> = {
  transmission: {
    automatic: 'Автомат',
    manual: 'Механика',
  },
  type: {
    flat: 'Квартира',
    house: 'Дом',
    room: 'Комната',
    phone: 'Телефон',
    laptop: 'Ноутбук',
    misc: 'Другое',
  },
  condition: {
    new: 'Новый',
    used: 'Б/у',
  },
}

export const REQUIRED_PARAMS_BY_CATEGORY: Record<Category, string[]> = {
  auto: [
    'brand',
    'model',
    'yearOfManufacture',
    'transmission',
    'mileage',
    'enginePower',
  ],
  real_estate: ['type', 'address', 'area', 'floor'],
  electronics: ['type', 'brand', 'model', 'condition', 'color'],
}
