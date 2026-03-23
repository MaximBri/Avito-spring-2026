import { Select } from '@mantine/core'
import type { FC, ReactNode } from 'react'
import { Controller, get, useFormContext } from 'react-hook-form'

type Option = { value: string; label: string }

type SelectFieldProps = {
  name: string
  label: string | ReactNode
  options: Option[]
  required?: boolean
  clearable?: boolean
  warningColor?: string
  placeholder?: string
  warningCondition?: boolean
} & Omit<
  React.ComponentProps<typeof Select>,
  'value' | 'onChange' | 'data' | 'label'
>

export const SelectField: FC<SelectFieldProps> = ({
  name,
  label,
  options,
  required = false,
  clearable = true,
  warningColor = '#ff0000',
  placeholder,
  warningCondition = true,
  ...props
}) => {
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext()

  const value = watch(name)

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field }) => (
        <Select
          {...field}
          data={options}
          value={field.value || ''}
          onChange={(val) => field.onChange(val)}
          label={label}
          placeholder={placeholder}
          clearable={clearable}
          error={get(errors, name)?.message}
          style={{ width: 456 }}
          styles={{
            input: {
              borderColor:
                warningCondition && required && !value ? warningColor : undefined,
            },
          }}
          {...props}
        />
      )}
    />
  )
}
