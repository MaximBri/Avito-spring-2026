import { PARAM_CONFIG } from '../../pages/one-ads/constants'
import { NumberField } from './NumberField'
import { SelectField } from './SelectField'
import { TextField } from './TextField'
import { PARAM_LABELS } from '../constants/category'
import type { EditFormValues } from '../../pages/edit-ads/schema'
import type { FC } from 'react'

type ParamFieldProps = {
  param: keyof typeof PARAM_CONFIG
  category: EditFormValues['category']
}

export const Field: FC<ParamFieldProps> = ({ param, category }) => {
  const label = PARAM_LABELS[param] ?? param
  const config = PARAM_CONFIG[param] || {}

  if (config.type === 'select') {
    return (
      <SelectField
        name={`params.${param}`}
        label={label}
        options={config.getOptions(category)}
        warningColor="#FFA940"
        warningCondition
        required
      />
    )
  }

  if (config.type === 'number') {
    return (
      <NumberField
        name={`params.${param}`}
        label={label}
        warningColor="#FFA940"
        warningCondition
        required
      />
    )
  }

  return (
    <TextField
      name={`params.${param}`}
      label={label}
      warningColor="#FFA940"
      required
      warningCondition
    />
  )
}
