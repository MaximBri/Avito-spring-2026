import z from 'zod'

export const editSchema = z.object({
  category: z.enum(['auto', 'electronics', 'real_estate'], {
    error: 'Выберите категорию',
  }),
  title: z.string().min(1, 'Название должно быть заполнено'),
  description: z.string().optional(),
  price: z
    .number('Цена должна быть больше 0')
    .min(1, 'Цена должна быть больше 0'),
  params: z.record(z.string(), z.any()).optional(),
})

export type EditFormValues = z.infer<typeof editSchema>
