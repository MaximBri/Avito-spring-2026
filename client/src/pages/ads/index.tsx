import { AppShell, Container, Text, Title } from '@mantine/core'
import { SearchBar } from '../../features/SearchBar'
import { Filters } from '../../features/Filters'
import { Posts } from '../../features/Posts'
import { useGetPosts } from '../../shared/api/posts/hooks/useGetPosts'
import { useState } from 'react'
import { useDebouncedValue } from '@mantine/hooks'
import type { Category } from '../../shared/constants/category'
import { SortOption } from '../../shared/constants/sort'
import type { SortOption as SortOptionType } from '../../shared/constants/sort'
import { ViewMode } from '../../shared/constants/view'
import type { ViewMode as ViewModeType } from '../../shared/constants/view'

export default function AdsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([])
  const [onlyNeedsRevision, setOnlyNeedsRevision] = useState(false)
  const [sortOption, setSortOption] = useState<SortOptionType>(
    SortOption.CREATED_DESC,
  )
  const [viewMode, setViewMode] = useState<ViewModeType>(ViewMode.GRID)
  const [debouncedSearchQuery] = useDebouncedValue(searchQuery, 300)
  const { data: posts } = useGetPosts({
    q: debouncedSearchQuery,
    categories: selectedCategories,
    needsRevision: onlyNeedsRevision,
    sortOption,
  })
  const postsCount = posts?.pages[0]?.total ?? 0

  const handleCategoryChange = (category: Category, checked: boolean) => {
    setSelectedCategories((prev) =>
      checked ? [...prev, category] : prev.filter((item) => item !== category),
    )
  }

  const handleResetFilters = () => {
    setSelectedCategories([])
    setOnlyNeedsRevision(false)
    setSortOption(SortOption.CREATED_DESC)
  }

  return (
    <AppShell bg="#F7F5F8" style={{ height: '100vh', overflow: 'hidden' }}>
      <Container
        size={1400}
        py={12}
        px={32}
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          overflowX: 'hidden',
        }}
      >
        <div>
          <Title order={2}>Мои объявления</Title>
          <Text c="dimmed">{postsCount} объявления</Text>
        </div>
        <SearchBar
          searchValue={searchQuery}
          sortValue={sortOption}
          viewMode={viewMode}
          onSearchChange={setSearchQuery}
          onSortChange={setSortOption}
          onViewModeChange={setViewMode}
        />
        <div
          style={{
            display: 'flex',
            gap: 16,
            flex: 1,
            minHeight: 0,
            marginTop: 16,
            alignItems: 'stretch',
            justifyContent: 'space-between'
          }}
        >
          <aside
            style={{
              flex: '0 0 22%',
              maxWidth: 250,
              minWidth: 0,
              overflowY: 'auto',
              overflowX: 'hidden',
            }}
          >
            <Filters
              selectedCategories={selectedCategories}
              onlyNeedsRevision={onlyNeedsRevision}
              onCategoryChange={handleCategoryChange}
              onNeedsRevisionChange={setOnlyNeedsRevision}
              onResetFilters={handleResetFilters}
            />
          </aside>
          <main
            style={{
              flex: 1,
              minWidth: 0,
              minHeight: 0,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            <Posts
              searchQuery={debouncedSearchQuery}
              categories={selectedCategories}
              needsRevision={onlyNeedsRevision}
              sortOption={sortOption}
              viewMode={viewMode}
            />
          </main>
        </div>
      </Container>
    </AppShell>
  )
}
