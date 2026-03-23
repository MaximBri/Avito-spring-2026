import { ActionIcon, Group, Select, TextInput } from '@mantine/core'
import { IconLayoutGrid, IconList, IconSearch } from '@tabler/icons-react'
import { SORT_OPTIONS } from '../shared/constants/sort'
import type { SortOption } from '../shared/constants/sort'
import { ViewMode } from '../shared/constants/view'
import type { ViewMode as ViewModeType } from '../shared/constants/view'
import type { FC } from 'react'

interface SearchBarProps {
  searchValue: string
  sortValue: SortOption
  viewMode: ViewModeType
  onSearchChange: (value: string) => void
  onSortChange: (value: SortOption) => void
  onViewModeChange: (mode: ViewModeType) => void
}

export const SearchBar: FC<SearchBarProps> = ({
  searchValue,
  sortValue,
  viewMode,
  onSearchChange,
  onSortChange,
  onViewModeChange,
}) => {
  return (
    <Group
      justify="space-between"
      mt="md"
      gap="xs"
      wrap="nowrap"
      p={12}
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        border: '1px solid #E9ECEF',
      }}
    >
      <TextInput
        value={searchValue}
        onChange={(event) => onSearchChange(event.currentTarget.value)}
        placeholder="Найти объявление..."
        style={{ flex: 1 }}
        rightSection={<IconSearch size={16} stroke={1.6} color="#868E96" />}
        styles={{
          input: {
            height: 40,
            backgroundColor: '#F7F5F8',
            borderColor: 'transparent',
          },
        }}
      />

      <Group
        gap={4}
        p={4}
        wrap="nowrap"
        style={{
          backgroundColor: '#F7F5F8',
          border: '1px solid transparent',
          borderRadius: 8,
        }}
      >
        <ActionIcon
          variant="subtle"
          color="gray"
          size={28}
          aria-label="Плитка"
          onClick={() => onViewModeChange(ViewMode.GRID)}
        >
          <IconLayoutGrid
            size={16}
            stroke={1.8}
            color={viewMode === ViewMode.GRID ? '#228BE6' : '#868E96'}
          />
        </ActionIcon>
        <ActionIcon
          variant="subtle"
          color="gray"
          size={28}
          aria-label="Список"
          onClick={() => onViewModeChange(ViewMode.LIST)}
        >
          <IconList
            size={16}
            stroke={1.8}
            color={viewMode === ViewMode.LIST ? '#228BE6' : '#868E96'}
          />
        </ActionIcon>
      </Group>

      <Group>
        <Select
          value={sortValue}
          onChange={(value) => {
            if (value) onSortChange(value as SortOption)
          }}
          w={260}
          allowDeselect={false}
          data={SORT_OPTIONS}
          styles={{
            input: {
              height: 40,
              backgroundColor: '#F7F5F8',
              borderColor: 'transparent',
            },
          }}
        />
      </Group>
    </Group>
  )
}
