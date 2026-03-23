import { Textarea, type TextareaProps } from '@mantine/core'
import type { FC, ReactNode } from 'react'
import { Controller, get, useFormContext } from 'react-hook-form'

type TextareaFieldProps = Omit<
  TextareaProps,
  'value' | 'onChange' | 'label'
> & {
  name: string
  label: string | ReactNode
  maxLength?: number
  warningColor?: string
  warningCondition?: boolean
}

export const TextareaField: FC<TextareaFieldProps> = ({
  name,
  label,
  maxLength = 100,
  warningColor = '#ffc107',
  warningCondition = true,
  ...props
}) => {
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext()

  const value = watch(name) ?? ''

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field }) => (
        <Textarea
          {...field}
          label={label}
          value={field.value ?? ''}
          onChange={field.onChange}
          error={get(errors, name)?.message}
          autosize
          minRows={4}
          maxLength={maxLength}
          rightSection={
            <div
              style={{
                fontSize: 12,
                color: '#888',
                position: 'absolute',
                bottom: 0,
                right: 0,
                transform: 'translate(0, 100%)',
              }}
            >
              {field.value.length}/{maxLength}
            </div>
          }
          styles={{
            input: {
              borderColor: warningCondition && !value ? warningColor : undefined,
              resize: 'vertical',
            },
          }}
          {...props}
        />
      )}
    />
  )
}
