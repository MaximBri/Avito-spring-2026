import { sortMap, SortOption } from '../../constants/sort'
import { api } from '../axios'
import type { GetPostsParams, PostResponseModel, PostItemModel } from './types'

export const postsApi = {
  getPosts: async ({
    skip = 0,
    limit = 9,
    q = '',
    categories = [],
    needsRevision = false,
    sortOption = SortOption.CREATED_DESC,
  }: GetPostsParams): Promise<PostResponseModel> => {
    const sortColumn = sortMap[sortOption]?.column
    const sortDirection = sortMap[sortOption]?.direction

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

  getPost: async (id: number) => {
    const { data } = await api.get(`/items/${id}`)
    return data
  },

  updatePost: async (id: number, update: Partial<PostItemModel>) => {
    const { data } = await api.put(`/items/${id}`, update)
    return data
  },
}
