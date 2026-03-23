import { Textarea, type TextareaProps } from '@mantine/core'
import type { FC, ReactNode } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

type TextareaFieldProps = Omit<
  TextareaProps,
  'value' | 'onChange' | 'label'
> & {
  name: string
  label: string | ReactNode
  maxLength?: number
  warningColor?: string
}

export const TextareaField: FC<TextareaFieldProps> = ({
  name,
  label,
  maxLength = 1000,
  warningColor = '#ffc107',
  ...props
}) => {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field, fieldState }) => {
        const error = fieldState.error?.message
        return (
          <Textarea
            {...field}
            label={label}
            value={field.value ?? ''}
            onChange={field.onChange}
            error={!field.value ? error : ''}
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
                borderColor: !field.value ? warningColor : undefined,
                resize: 'vertical',
              },
            }}
            {...props}
          />
        )
      }}
    />
  )
}
