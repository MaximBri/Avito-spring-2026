import { useMutation, useQueryClient } from '@tanstack/react-query'
import { postsApi } from '..'
import type { PostItemModel } from '../types'

export const useUpdatePost = (id: number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: Partial<PostItemModel>) =>
      postsApi.updatePost(id, params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['item', id] })
      queryClient.invalidateQueries({ queryKey: ['items'] })
    },
  })
}
