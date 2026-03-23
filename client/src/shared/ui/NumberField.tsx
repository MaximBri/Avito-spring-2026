import { NumberInput, type NumberInputProps } from '@mantine/core'
import { ClearButton } from '../../features/ClearButton'
import type { FC, ReactNode } from 'react'
import { Controller, get, useFormContext } from 'react-hook-form'

type NumberFieldProps = Omit<
  NumberInputProps,
  'value' | 'onChange' | 'label'
> & {
  name: string
  label: string | ReactNode
  required?: boolean
  placeholder?: string
  warningColor?: string
  warningCondition?: boolean
}

export const NumberField: FC<NumberFieldProps> = ({
  name,
  label,
  required = false,
  placeholder,
  warningColor = '#ff0000',
  warningCondition = true,
  ...props
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
      defaultValue={0}
      render={({ field }) => (
        <NumberInput
          {...field}
          value={field.value ?? 0}
          onChange={(val) => field.onChange(val)}
          label={label}
          placeholder={placeholder}
          error={get(errors, name)?.message}
          style={{ width: 456 }}
          rightSection={<ClearButton onClick={() => setValue(name, 0)} />}
          rightSectionWidth={40}
          styles={{
            input: {
              borderColor:
                warningCondition && required && !field.value
                  ? warningColor
                  : undefined,
            },
          }}
          {...props}
        />
      )}
    />
  )
}
