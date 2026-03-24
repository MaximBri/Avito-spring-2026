import { Modal, Text, Group, Button } from '@mantine/core'

interface RestoreDraftModalProps<T> {
  opened: boolean
  onClose: () => void
  onRestore: (draft: T) => void
  draft: T
}

export const RestoreDraftModal = <T,>({
  opened,
  onClose,
  onRestore,
  draft,
}: RestoreDraftModalProps<T>) => {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Восстановить черновик?"
      centered
    >
      <Text mb="md">
        Найдены несохранённые изменения. Хотите восстановить их?
      </Text>
      <Group>
        <Button variant="outline" onClick={onClose}>
          Игнорировать
        </Button>
        <Button
          onClick={() => {
            onRestore(draft)
            onClose()
          }}
        >
          Восстановить
        </Button>
      </Group>
    </Modal>
  )
}
