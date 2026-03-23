import { TextInput } from '@mantine/core'
import { ClearButton } from '../../features/ClearButton'
import type { FC, ReactNode } from 'react'
import { Controller, get, useFormContext } from 'react-hook-form'

type TextFieldProps = {
  name: string
  label: string | ReactNode
  placeholder?: string
  required?: boolean
  warningColor?: string
  warningCondition?: boolean
}

export const TextField: FC<TextFieldProps> = ({
  name,
  label,
  placeholder,
  required = false,
  warningColor = '#ff0000',
  warningCondition = true,
}) => {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field }) => (
        <TextInput
          label={label}
          value={field.value || ''}
          onChange={field.onChange}
          placeholder={placeholder}
          error={get(errors, name)?.message}
          style={{ width: 456 }}
          rightSection={<ClearButton onClick={() => setValue(name, '')} />}
          rightSectionWidth={40}
          styles={{
            input: {
              borderColor:
                warningCondition && required && !field.value
                  ? warningColor
                  : undefined,
            },
          }}
        />
      )}
    />
  )
}
