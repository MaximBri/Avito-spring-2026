import { useState } from 'react'
import { aiApi } from '../../../shared/api/ai'

export const useAiAnswers = (promptBuilder: () => string) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)

  const handleGenerate = async () => {
    try {
      setLoading(true)
      setIsError(false)
      const { response } = await aiApi.sendMessage(promptBuilder())
      return response
    } catch (e) {
      setIsError(true)
    } finally {
      setLoading(false)
    }
  }

  const resetError = () => setIsError(false)

  return { loading, handleGenerate, isError, resetError }
}
