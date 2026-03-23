import { Button, Card, Text, Title } from '@mantine/core'
import type { FC } from 'react'

interface AiAnswerPopupProps {
  isError: boolean
  message: string
  handleAdmit: () => void
  resetMessage: () => void
}

export const AiAnswerPopup: FC<AiAnswerPopupProps> = ({
  isError,
  message,
  handleAdmit,
  resetMessage,
}) => {
  return (
    <Card
      shadow="lg"
      p={8}
      style={{
        position: 'absolute',
        bottom: 'calc(100% + 7px)',
        left: 0,
        width: 300,
        zIndex: 10,
        backgroundColor: isError ? '#FEE9E7' : 'white',
        borderRadius: 4,
        border: '1px solid #ccc',
        gap: 8,
        overflow: 'visible',
      }}
    >
      <div
        style={{
          position: 'absolute',
          bottom: -6,
          left: 20,
          width: 12,
          height: 12,
          backgroundColor: isError ? '#FEE9E7' : 'white',
          borderRight: '1px solid #ccc',
          borderBottom: '1px solid #ccc',
          transform: 'rotate(45deg)',
          boxShadow: '2px 2px 4px rgba(0,0,0,0.1)',
          borderRadius: '0 0 3px',
        }}
      />
      <Title order={4}>
        {isError ? 'Произошла ошибка при запросе к AI' : 'Ответ AI:'}
      </Title>
      <Text mb="sm" style={{ whiteSpace: 'pre-wrap' }}>
        {isError
          ? 'Попробуйте повторить запрос или закройте уведомление'
          : message}
      </Text>
      <div style={{ display: 'flex', justifyContent: 'flex-start', gap: 10 }}>
        {!isError && (
          <Button size="xs" variant="outline" onClick={handleAdmit}>
            Применить
          </Button>
        )}
        <Button
          size="xs"
          variant="outline"
          color="red"
          onClick={resetMessage}
          style={isError ? { color: 'black', background: '#FCB3AD' } : {}}
        >
          Закрыть
        </Button>
      </div>
    </Card>
  )
}
