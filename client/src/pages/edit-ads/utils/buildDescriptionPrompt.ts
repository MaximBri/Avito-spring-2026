import type { PostItemModel } from '../../../shared/api/posts/types'
import { CATEGORY_LABELS_RU } from '../../../shared/constants/category'
import { getPostParams } from '../../../shared/utils/getPostParams'

export const buildDescriptionPrompt = (post: PostItemModel) => {
  const categoryName = CATEGORY_LABELS_RU[post.category] || post.category
  const paramsShort = getPostParams(post)

  return `
Ты — эксперт по созданию продающих объявлений на Авито/Юла (Россия, март 2026).

Проанализируй объявление и верни **ТОЛЬКО готовый текст описания** товара.  
Никаких кавычек, JSON, или любых других символов — просто текст.  
Не добавляй инструкции, пояснения или метки.

Объявление: ${categoryName}, ${post.title}, ${post.price} ₽
Параметры: ${paramsShort || 'нет'}
Текущее описание: ${post.description || 'нет'}

Требования:
- 3–6 предложений максимум
- конкретные характеристики товара
- без общих фраз вроде "отличный товар"
- без CAPS LOCK и эмодзи

Примеры правильного ответа:
MacBook Pro 16" M1 Pro, 16/512GB. Работает быстро, аккуратно использовался, состояние отличное, аккумулятор держит заряд.
Toyota Camry 2020 2.5л, автомат. Пробег оригинальный, без повреждений, салон чистый, технически исправна.
Стиральная машина Bosch 7 кг, аккуратная, без поломок, работает тихо и экономично.
`
}
