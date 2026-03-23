import { useQuery } from '@tanstack/react-query'
import { postsApi } from '..'
import type { PostItemModel } from '../types'

export const useGetPost = (id?: number) => {
  return useQuery<PostItemModel, Error>({
    queryKey: ['item', id],
    queryFn: async () => {
      return postsApi.getPost(id!)
    },
    enabled: !!id,
  })
}
