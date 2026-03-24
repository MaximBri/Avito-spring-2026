import { useInfiniteQuery } from '@tanstack/react-query'
import { postsApi } from '..'
import type { UseGetPostsParams } from '../types'

export const POSTS_PAGE_SIZE = 10

export const useGetPosts = ({
  q = '',
  categories = [],
  needsRevision = false,
  sortOption,
}: UseGetPostsParams = {}) => {
  const categoriesKey = categories.slice().sort().join(',')

  return useInfiniteQuery({
    queryKey: ['items', q, categoriesKey, needsRevision, sortOption],
    initialPageParam: 0,
    queryFn: ({ pageParam }) =>
      postsApi.getPosts({
        skip: pageParam,
        limit: POSTS_PAGE_SIZE,
        q,
        categories,
        needsRevision,
        sortOption,
      }),
    getNextPageParam: (lastPage, allPages) => {
      const loadedItemsCount = allPages.reduce(
        (acc, page) => acc + page.items.length,
        0,
      )
      return loadedItemsCount < lastPage.total ? loadedItemsCount : undefined
    },
  })
}
