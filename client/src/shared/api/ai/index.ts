import { apiV2 } from '../axios'
import type { AiResponseModel } from './types'

export const aiApi = {
  sendMessage: async (prompt: string): Promise<AiResponseModel> => {
    const { data } = await apiV2.post('/api/generate', {
      model: 'llama3',
      prompt,
      max_tokens: 200,
      stream: false,
    })
    return data
  },
}
