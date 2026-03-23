import {
  Accordion,
  Button,
  Card,
  Checkbox,
  Divider,
  Group,
  Stack,
  Switch,
  Text,
} from '@mantine/core'
import {
  ALL_CATEGORIES,
  CATEGORY_LABELS_RU,
} from '../shared/constants/category'
import type { Category } from '../shared/constants/category'
import type { FC } from 'react'

interface FiltersProps {
  selectedCategories: Category[]
  onlyNeedsRevision: boolean
  onCategoryChange: (category: Category, checked: boolean) => void
  onNeedsRevisionChange: (checked: boolean) => void
  onResetFilters: () => void
}

export const Filters: FC<FiltersProps> = ({
  selectedCategories,
  onlyNeedsRevision,
  onCategoryChange,
  onNeedsRevisionChange,
  onResetFilters,
}) => {
  return (
    <Stack gap="xs">
      <Card radius={10} p={16} bg="#FFFFFF">
        <Text fw={700} fz={16} lh={1.15}>
          Фильтры
        </Text>

        <Accordion
          mt="md"
          defaultValue="category"
          chevronPosition="right"
          styles={{
            item: {
              border: 'none',
            },
            control: {
              padding: 0,
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: 'transparent',
              boxShadow: 'none',
              '&:hover, &[data-active], &:focus, &:focus-visible': {
                backgroundColor: 'transparent',
                boxShadow: 'none',
              },
            },
            label: { fontSize: 16, fontWeight: 400, color: '#2A2A2A' },
            panel: { padding: 0 },
            content: { padding: 0 },
            chevron: {
              width: 16,
              height: 16,
            },
          }}
        >
          <Accordion.Item value="category" style={{ padding: 0 }}>
            <Accordion.Control p={0}>Категория</Accordion.Control>
            <Accordion.Panel style={{ padding: 0 }}>
              {ALL_CATEGORIES.map((category, index) => (
                <Checkbox
                  key={category}
                  checked={selectedCategories.includes(category)}
                  onChange={(event) =>
                    onCategoryChange(category, event.currentTarget.checked)
                  }
                  p={0}
                  size="md"
                  radius="sm"
                  c="#2A2A2A"
                  mt={index === 0 ? 0 : 'xs'}
                  label={CATEGORY_LABELS_RU[category]}
                />
              ))}
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>

        <Divider my="md" color="#DEDCE3" />

        <Group justify="space-between" align="center">
          <Text fw={700} fz={14} lh={1.15} maw={170}>
            Только требующие доработок
          </Text>
          <Switch
            checked={onlyNeedsRevision}
            onChange={(event) =>
              onNeedsRevisionChange(event.currentTarget.checked)
            }
            variant="default"
            size="lg"
            color="gray"
          />
        </Group>
      </Card>

      <Button
        fullWidth
        h={56}
        radius={10}
        variant="subtle"
        bg="#FFFFFF"
        c="#848388"
        onClick={onResetFilters}
      >
        Сбросить фильтры
      </Button>
    </Stack>
  )
}
