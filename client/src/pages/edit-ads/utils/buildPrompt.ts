import type {
  AutoItemParams,
  ElectronicsItemParams,
  PostItemModel,
  RealEstateItemParams,
} from '../../../shared/api/posts/types'
import {
  Category,
  CATEGORY_LABELS_RU,
} from '../../../shared/constants/category'

export const buildPrompt = (post: PostItemModel) => {
  const categoryName = CATEGORY_LABELS_RU[post.category] || post.category

  let paramsShort = ''
  switch (post.category) {
    case Category.AUTO: {
      const p = post.params as AutoItemParams
      paramsShort = [
        p.brand,
        p.model,
        p.yearOfManufacture && `${p.yearOfManufacture} г.`,
      ]
        .filter(Boolean)
        .join(', ')
      break
    }
    case Category.REAL_ESTATE: {
      const p = post.params as RealEstateItemParams
      paramsShort = [p.type, p.address, p.area && `${p.area} м²`]
        .filter(Boolean)
        .join(', ')
      break
    }
    case Category.ELECTRONICS: {
      const p = post.params as ElectronicsItemParams
      paramsShort = [p.type, p.brand, p.model, p.condition]
        .filter(Boolean)
        .join(', ')
      break
    }
  }

  return `
Ты — краткий оценщик цен на Авито/Юла (Россия, март 2026).
Проанализируй объявление и верни **ТОЛЬКО** валидный JSON-объект, без единого символа текста вне него.

Объявление: ${categoryName}, ${post.title}, ${post.price} ₽
Параметры: ${paramsShort || 'нет'}
Описание: ${post.description || 'нет'}

Требуемый формат ответа (строго соблюдай):
{
  "recommendation": "строка до 100 символов, в стиле: Средняя цена на ... : X–Y тыс. ₽ — состояние",
  "price": число — рекомендуемая цена в рублях (целое число, без пробелов и символов ₽)
}
ВАЖНО: не ориентируйся на ту цену которая есть, предлагай свою на основе всех её характеристик и описания
price должна быть **строго** из того предела который ты указал в recommendation

Примеры правильного ответа:
{"recommendation":"Средняя цена на MacBook Pro 16\" M1 Pro: 75–85 тыс. ₽ — хорошее состояние","price":80000}
{"recommendation":"Toyota Camry 2020 2.5л: 2.1–2.4 млн ₽ — идеал","price":2200000}
{"recommendation":"1-комн. 40 м² Москва центр: 11–12.5 млн ₽ — свежий ремонт","price":11800000}

Верни **только JSON**. Без \`\`\`json, без объяснений, без лишних строк.
Важно: ТВОЙ ОТВЕТ ДОЛЖЕН СОДЕРЖАТЬ ТОЛЬКО ВАЛИДНЫЙ JSON И НИЧЕГО БОЛЬШЕ.
НИКАКИХ \`\`\`json

Начинай СРАЗУ с {
Заканчивай СТРОГО на }
`.trim()
}
