import { TextInput } from '@mantine/core'
import { ClearButton } from '../../features/ClearButton'
import type { FC, ReactNode } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

type TextFieldProps = {
  name: string
  label: string | ReactNode
  placeholder?: string
  warningColor?: string
}

export const TextField: FC<TextFieldProps> = ({
  name,
  label,
  placeholder,
  warningColor = '#ff0000',
}) => {
  const {
    control,
    setValue,
  } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field, fieldState }) => {
        const error = fieldState.error?.message
        return (
          <TextInput
            label={label}
            value={field.value || ''}
            onChange={field.onChange}
            placeholder={placeholder}
            error={!field.value ? error : ''}
            style={{ width: 456 }}
            onBlur={field.onBlur}
            rightSection={
              <ClearButton
                onClick={() => {
                  setValue(name, '', {
                    shouldValidate: true,
                    shouldDirty: true,
                    shouldTouch: true,
                  })
                }}
              />
            }
            rightSectionWidth={40}
            styles={{
              input: {
                borderColor: !field.value ? warningColor : undefined,
              },
            }}
          />
        )
      }}
    />
  )
}
