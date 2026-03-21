import type { Category } from '../../constants/category'
import { SortOption } from '../../constants/sort'
import { api } from '../axios'
import type { PostResponseModel } from './types'

interface GetPostsParams {
  skip?: number
  limit?: number
  q?: string
  categories?: Category[]
  needsRevision?: boolean
  sortOption?: SortOption
}

export const postsApi = {
  getPosts: async ({
    skip = 0,
    limit = 9,
    q = '',
    categories = [],
    needsRevision = false,
    sortOption = SortOption.CREATED_DESC,
  }: GetPostsParams = {}): Promise<PostResponseModel> => {
    const sortColumn =
      sortOption === SortOption.TITLE_ASC || sortOption === SortOption.TITLE_DESC
        ? 'title'
        : sortOption === SortOption.CREATED_ASC || sortOption === SortOption.CREATED_DESC
          ? 'createdAt'
          : undefined

    const sortDirection =
      sortOption === SortOption.TITLE_ASC || sortOption === SortOption.CREATED_ASC
        ? 'asc'
        : sortOption === SortOption.TITLE_DESC || sortOption === SortOption.CREATED_DESC
          ? 'desc'
          : undefined

    const { data } = await api.get('/items', {
      params: {
        skip,
        limit,
        q,
        categories: categories.length ? categories.join(',') : undefined,
        needsRevision: needsRevision ? 'true' : undefined,
        sortColumn,
        sortDirection,
      },
    })
    return data
  },
}
