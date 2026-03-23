import type {
  AutoItemParams,
  ElectronicsItemParams,
  PostItemModel,
  RealEstateItemParams,
} from '../api/posts/types'
import { Category } from '../constants/category'

export const getPostParams = (post: PostItemModel) => {
  let paramsShort = ''
  switch (post.category) {
    case Category.AUTO: {
      const p = post.params as AutoItemParams
      paramsShort = [
        p.brand,
        p.model,
        p.yearOfManufacture && `${p.yearOfManufacture} г.`,
      ]
        .filter(Boolean)
        .join(', ')
      break
    }
    case Category.REAL_ESTATE: {
      const p = post.params as RealEstateItemParams
      paramsShort = [p.type, p.address, p.area && `${p.area} м²`]
        .filter(Boolean)
        .join(', ')
      break
    }
    case Category.ELECTRONICS: {
      const p = post.params as ElectronicsItemParams
      paramsShort = [p.type, p.brand, p.model, p.condition]
        .filter(Boolean)
        .join(', ')
      break
    }
  }

  return paramsShort
}
