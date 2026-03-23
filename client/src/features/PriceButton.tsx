import { Button, Card, Loader, Text, Title } from '@mantine/core'
import { useAiAnswers } from '../pages/edit-ads/hooks/useAiAnswers'
import type { FC } from 'react'
import type { PostItemModel } from '../shared/api/posts/types'
import { useFormContext } from 'react-hook-form'

interface PriceButtonProps {
  postData: PostItemModel
}

export const PriceButton: FC<PriceButtonProps> = ({ postData }) => {
  const { setValue } = useFormContext()
  const { message, loading, handleGenerate, resetMessage, price } =
    useAiAnswers(postData)

  const getButtonContent = () => {
    if (loading) return { text: 'Выполняется запрос' }
    if (message) return { icon: '/icons/repeat.svg', text: 'Повторить запрос' }
    return { icon: '/icons/idea.svg', text: 'Узнать рыночную цену' }
  }

  const handleAdmit = () => {
    setValue('price', price, { shouldValidate: true, shouldDirty: true })
    resetMessage()
  }

  const { icon, text } = getButtonContent()

  return (
    <div
      style={{
        position: 'relative',
        display: 'inline-block',
        marginTop: 'auto',
      }}
    >
      <Button
        onClick={() => handleGenerate()}
        bg={'#F9F1E6'}
        mt={'auto'}
        c={'#FFA940'}
        style={{ display: 'flex', alignItems: 'center' }}
        disabled={loading}
      >
        {loading && <Loader color={'#FFA940'} mr={10} size="xs" />}
        {icon && (
          <img
            src={icon}
            alt="icon"
            style={{ marginRight: 10, width: 18, height: 18 }}
          />
        )}
        {text}
      </Button>
      {message && (
        <Card
          shadow="lg"
          p={8}
          style={{
            position: 'absolute',
            bottom: 'calc(100% + 7px)',
            left: 0,
            width: 300,
            zIndex: 10,
            backgroundColor: 'white',
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
              backgroundColor: 'white',
              borderRight: '1px solid #ccc',
              borderBottom: '1px solid #ccc',
              transform: 'rotate(45deg)',
              boxShadow: '2px 2px 4px rgba(0,0,0,0.1)',
              borderRadius: '0 0 3px',
            }}
          />
          <Title order={4}>Ответ AI:</Title>
          <Text mb="sm" style={{ whiteSpace: 'pre-wrap' }}>
            {message}
          </Text>
          <div
            style={{ display: 'flex', justifyContent: 'flex-start', gap: 10 }}
          >
            <Button size="xs" variant="outline" onClick={handleAdmit}>
              Применить
            </Button>
            <Button
              size="xs"
              variant="outline"
              color="red"
              onClick={resetMessage}
            >
              Закрыть
            </Button>
          </div>
        </Card>
      )}
    </div>
  )
}
