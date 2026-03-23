import { useState, type FC } from 'react'
import type { PostItemModel } from '../shared/api/posts/types'
import { useFormContext } from 'react-hook-form'
import { useAiAnswers } from '../pages/edit-ads/hooks/useAiAnswers'
import { Button, Loader } from '@mantine/core'
import { buildDescriptionPrompt } from '../pages/edit-ads/utils/buildDescriptionPrompt'
import { AiAnswerPopup } from './AiAnswerPopup'

interface AiDescriptionButtonProps {
  postData: PostItemModel
}

export const AiDescriptionButton: FC<AiDescriptionButtonProps> = ({
  postData,
}) => {
  const [message, setMessage] = useState<string>('')
  const { setValue } = useFormContext()
  const { loading, handleGenerate, isError, resetError } = useAiAnswers(() =>
    buildDescriptionPrompt(postData),
  )

  const getButtonContent = () => {
    if (loading) return { text: 'Выполняется запрос' }
    if (message) return { icon: '/icons/repeat.svg', text: 'Повторить запрос' }
    return { icon: '/icons/idea.svg', text: 'Улучшить описание' }
  }

  const handleAdmit = () => {
    setValue('description', message, {
      shouldValidate: true,
      shouldDirty: true,
    })
    resetMessage()
  }

  const handleClick = async () => {
    setMessage('')
    const response = await handleGenerate()
    setMessage(response || '')
  }

  const resetMessage = () => {
    setMessage('')
    resetError()
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
      {(message || isError) && (
        <AiAnswerPopup
          isError={isError}
          message={message}
          handleAdmit={handleAdmit}
          resetMessage={resetMessage}
        />
      )}
    </div>
  )
}
