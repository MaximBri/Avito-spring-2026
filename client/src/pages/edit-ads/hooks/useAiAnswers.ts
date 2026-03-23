import { useState } from 'react'
import { aiApi } from '../../../shared/api/ai'
import type { PostItemModel } from '../../../shared/api/posts/types'
import { buildPrompt } from '../utils/buildPrompt'

export const useAiAnswers = (postData: PostItemModel) => {
  const [message, setMessage] = useState<string | null>(null)
  const [price, setPrice] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)

  const handleGenerate = async () => {
    try {
      resetMessage()
      setLoading(true)
      const { response } = await aiApi.sendMessage(buildPrompt(postData))
      const { price, recommendation } = JSON.parse(response)
      setMessage(recommendation)
      setPrice(price)
    } catch (e) {
    } finally {
      setLoading(false)
    }
  }

  const resetMessage = () => {
    setMessage('')
    setPrice(0)
  }

  return { message, loading, handleGenerate, resetMessage, price }
}
