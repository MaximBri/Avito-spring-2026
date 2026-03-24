import { useEffect, useState } from 'react'
import { type FieldValues, type UseFormReturn } from 'react-hook-form'

export const useLocalStorageDraft = <T extends FieldValues, K>(
  form: UseFormReturn<T>,
  initialData: K,
  key: string,
) => {
  const [draft, setDraft] = useState<T | null>(null)

  const { watch, reset } = form

  const clearDraft = () => localStorage.removeItem(key)

  const isFormValuesEqual = <T>(formValues: T, initialData: any) => {
    return Object.keys(formValues as {}).every((key) => {
      const v = (formValues as any)[key]
      const init = initialData[key]
      if (typeof v === 'object' && v !== null) {
        return JSON.stringify(v) === JSON.stringify(init)
      }
      return v === init
    })
  }

  const getDraft = (): T | null => {
    const stored = localStorage.getItem(key) || ''
    if (!stored || isFormValuesEqual(watch(), initialData)) return null
    try {
      return JSON.parse(stored)
    } catch {
      return null
    }
  }

  useEffect(() => {
    const value = localStorage.getItem(key)
    setDraft(value ? JSON.parse(value) : '')
  }, [])

  useEffect(() => {
    const subscription = watch((values) => {
      if (draft === null) return
      localStorage.setItem(key, JSON.stringify(values))
    })
    return () => subscription.unsubscribe()
  }, [watch, key, draft])

  return { clearDraft, getDraft, reset, draft }
}
