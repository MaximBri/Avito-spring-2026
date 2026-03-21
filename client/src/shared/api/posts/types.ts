import type { Category } from '../../constants/category'

export interface PostResponseModel {
  items: PostModel[]
  total: number
}

export interface PostModel {
  category: Category
  needsRevision: boolean
  price: number
  title: string
}
