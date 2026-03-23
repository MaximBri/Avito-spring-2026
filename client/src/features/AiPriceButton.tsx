import { Button, Loader } from '@mantine/core'
import { useAiAnswers } from '../pages/edit-ads/hooks/useAiAnswers'
import { useState, type FC } from 'react'
import type { PostItemModel } from '../shared/api/posts/types'
import { useFormContext } from 'react-hook-form'
import { buildPricePrompt } from '../pages/edit-ads/utils/buildPricePrompt'
import { AiAnswerPopup } from './AiAnswerPopup'

interface PriceButtonProps {
  postData: PostItemModel
}

export const AiPriceButton: FC<PriceButtonProps> = ({ postData }) => {
  const { setValue } = useFormContext()

  const [message, setMessage] = useState<string | null>(null)
  const [price, setPrice] = useState<number>(0)
  const [error, setError] = useState<boolean>(false)

  const { loading, handleGenerate, isError, resetError } = useAiAnswers(() =>
    buildPricePrompt(postData),
  )

  const getButtonContent = () => {
    if (loading) return { text: 'Выполняется запрос' }
    if (message) return { icon: '/icons/repeat.svg', text: 'Повторить запрос' }
    return { icon: '/icons/idea.svg', text: 'Узнать рыночную цену' }
  }

  const handleAdmit = () => {
    setValue('price', price, { shouldValidate: true, shouldDirty: true })
    resetMessage()
  }

  const resetMessage = () => {
    resetError()
    setError(false)
    setMessage('')
    setPrice(0)
  }

  const handleClick = async () => {
    resetMessage()
    setError(false)
    const response = await handleGenerate()
    setError(false)
    try {
      const { price, recommendation } = JSON.parse(response || '')
      setMessage(recommendation)
      setPrice(price)
    } catch {
      setError(true)
    }
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
        onClick={handleClick}
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
      {(message || isError || error) && (
        <AiAnswerPopup
          handleAdmit={handleAdmit}
          isError={isError || error}
          message={message || ''}
          resetMessage={resetMessage}
        />
      )}
    </div>
  )
}
