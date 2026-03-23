import type { Category } from '../constants/category'

export type ParamConfig =
  | {
      type: 'select'
      getOptions: (category: Category) => any
    }
  | {
      type: 'number'
    }
