import { Grid } from '@mantine/core'
import { PostItem } from './PostItem'
import { POSTS_PAGE_SIZE, useGetPosts } from '../shared/api/posts/hooks/useGetPosts'
import { useEffect, useMemo, useRef, useState } from 'react'
import { PostsPagination } from './PostsPagination'
import { PostItemSkeleton } from './PostItemSkeleton'
import type { Category } from '../shared/constants/category'
import { SortOption } from '../shared/constants/sort'
import type { SortOption as SortOptionType } from '../shared/constants/sort'
import { ViewMode } from '../shared/constants/view'
import type { ViewMode as ViewModeType } from '../shared/constants/view'

interface PostsProps {
  searchQuery: string
  categories: Category[]
  needsRevision: boolean
  sortOption: SortOptionType
  viewMode: ViewModeType
}

export const Posts = ({
  searchQuery,
  categories,
  needsRevision,
  sortOption,
  viewMode,
}: PostsProps) => {
  const { data: posts, fetchNextPage, isLoading } = useGetPosts({
    q: searchQuery,
    categories,
    needsRevision,
    sortOption,
  })
  const [page, setPage] = useState(1)

  const totalItems = posts?.pages[0]?.total ?? 0
  const totalPages = Math.max(1, Math.ceil(totalItems / POSTS_PAGE_SIZE))
  const loadedPages = posts?.pages.length ?? 0

  const pageItems = posts?.pages[page - 1]?.items
  const items = useMemo(() => {
    const baseItems = pageItems ?? []

    if (sortOption === SortOption.PRICE_ASC) {
      return baseItems.toSorted((a, b) => a.price - b.price)
    }

    if (sortOption === SortOption.PRICE_DESC) {
      return baseItems.toSorted((a, b) => b.price - a.price)
    }

    return baseItems
  }, [pageItems, sortOption])
  const shouldShowSkeletons = isLoading || !pageItems
  const skeletonCount = Math.max(1, POSTS_PAGE_SIZE)
  const colSpan = viewMode === ViewMode.GRID ? 4 : 12
  const listContainerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    setPage(1)
  }, [searchQuery, categories, needsRevision, sortOption])

  const handlePageChange = async (nextPage: number) => {
    setPage(nextPage)
    listContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' })

    if (nextPage > loadedPages) {
      for (let pageToLoad = loadedPages; pageToLoad < nextPage; pageToLoad += 1) {
        const result = await fetchNextPage()
        if (!result.data) break
      }
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, width: '100%', overflow: 'hidden' }}>
      <div
        ref={listContainerRef}
        style={{
          flex: 1,
          minHeight: 0,
          minWidth: 0,
          overflowY: 'auto',
          overflowX: 'hidden',
        }}
      >
        <Grid align="stretch" style={{ width: '100%', maxWidth: '100%' }}>
          {shouldShowSkeletons
            ? Array.from({ length: skeletonCount }).map((_, index) => (
                <Grid.Col span={colSpan} key={`skeleton-${index}`} style={{ display: 'flex' }}>
                  <PostItemSkeleton />
                </Grid.Col>
              ))
            : items.map((item, index) => (
                <Grid.Col span={colSpan} key={index} style={{ display: 'flex' }}>
                  <PostItem item={item} viewMode={viewMode} />
                </Grid.Col>
              ))}
        </Grid>
      </div>
      <div style={{ flexShrink: 0, paddingTop: 8, overflowX: 'hidden' }}>
        <PostsPagination total={totalPages} value={page} onChange={handlePageChange} />
      </div>
    </div>
  )
}
