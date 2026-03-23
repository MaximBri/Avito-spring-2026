import type {
  Category,
  ConditionType,
  ElectronicsType,
  EstateTypes,
  TransmissionType,
} from '../../constants/category'
import type { SortOption } from '../../constants/sort'

export type AutoItemParams = {
  brand?: string
  model?: string
  yearOfManufacture?: number
  transmission?: keyof typeof TransmissionType
  mileage?: number
  enginePower?: number
}

export type RealEstateItemParams = {
  type?: keyof typeof EstateTypes
  address?: string
  area?: number
  floor?: number
}

export type ElectronicsItemParams = {
  type?: keyof typeof ElectronicsType
  brand?: string
  model?: string
  condition?: keyof typeof ConditionType
  color?: string
}

export type ItemUpdateIn = {
  category: Category
  title: string
  description?: string
  price: number
  params: AutoItemParams | RealEstateItemParams | ElectronicsItemParams
}

export interface PostResponseModel {
  items: PostModel[]
  total: number
}

export interface PostModel {
  id: number
  category: Category
  needsRevision: boolean
  price: number
  title: string
}

export interface PostItemModel extends ItemUpdateIn {
  id: number
  needsRevision: boolean
  createdAt: string
  updatedAt: string
}

export interface UseGetPostsParams {
  q?: string
  categories?: Category[]
  needsRevision?: boolean
  sortOption?: SortOption
}

export interface GetPostsParams {
  skip?: number
  limit?: number
  q?: string
  categories?: Category[]
  needsRevision?: boolean
  sortOption?: SortOption
}
