import { NumberInput, type NumberInputProps } from '@mantine/core'
import { ClearButton } from '../../features/ClearButton'
import type { FC, ReactNode } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

type NumberFieldProps = Omit<
  NumberInputProps,
  'value' | 'onChange' | 'label'
> & {
  name: string
  label: string | ReactNode
  placeholder?: string
  warningColor?: string
  warningCondition?: boolean
}

export const NumberField: FC<NumberFieldProps> = ({
  name,
  label,
  placeholder,
  warningColor = '#ff0000',
  warningCondition = true,
  ...props
}) => {
  const { control, setValue } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={0}
      render={({ field, fieldState }) => {
        const error = fieldState.error?.message
        return (
          <NumberInput
            {...field}
            value={field.value ?? 0}
            onChange={(val) => field.onChange(val)}
            label={label}
            placeholder={placeholder}
            error={!field.value ? error : ''}
            style={{ width: 456 }}
            rightSection={
              <ClearButton
                onClick={() =>
                  setValue(name, 0, { shouldValidate: true, shouldDirty: true })
                }
              />
            }
            rightSectionWidth={40}
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
