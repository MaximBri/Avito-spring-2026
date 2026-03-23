import { Select } from '@mantine/core'
import type { FC, ReactNode } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

type Option = { value: string; label: string }

type SelectFieldProps = {
  name: string
  label: string | ReactNode
  options: Option[]
  clearable?: boolean
  warningColor?: string
  placeholder?: string
} & Omit<
  React.ComponentProps<typeof Select>,
  'value' | 'onChange' | 'data' | 'label'
>

export const SelectField: FC<SelectFieldProps> = ({
  name,
  label,
  options,
  clearable = true,
  warningColor = '#ff0000',
  placeholder,
  ...props
}) => {
  const { control, setValue } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field, fieldState }) => {
        const error = fieldState.error?.message
        return (
          <Select
            {...field}
            data={options}
            value={field.value || ''}
            onChange={(val) => field.onChange(val)}
            onClear={() => {
              setValue(name, '', {
                shouldValidate: true,
                shouldDirty: true,
                shouldTouch: true,
              })
            }}
            label={label}
            placeholder={placeholder}
            clearable={clearable}
            error={!field.value ? error : ''}
            style={{ width: 456 }}
            styles={{
              input: {
                borderColor: !field.value ? warningColor : undefined,
              },
            }}
            {...props}
          />
        )
      }}
    />
  )
}
