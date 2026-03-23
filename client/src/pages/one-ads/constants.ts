import {
  Category,
  ConditionType,
  ElectronicsType,
  EstateTypes,
  PARAM_VALUE_LABELS,
  TransmissionType,
} from '../../shared/constants/category'
import type { ParamConfig } from '../../shared/ui/types'

export const PARAM_CONFIG: Record<string, ParamConfig> = {
  transmission: {
    type: 'select',
    getOptions: () =>
      Object.values(TransmissionType).map((value) => {
        return { value, label: PARAM_VALUE_LABELS.transmission[value] }
      }),
  },
  type: {
    type: 'select',
    getOptions: (category: Category) => {
      const source =
        category === Category.REAL_ESTATE ? EstateTypes : ElectronicsType
      return Object.values(source).map((value) => {
        return { value, label: PARAM_VALUE_LABELS.type[value] }
      })
    },
  },
  condition: {
    type: 'select',
    getOptions: () =>
      Object.values(ConditionType).map((value) => ({
        value,
        label: PARAM_VALUE_LABELS.condition[value],
      })),
  },
  yearOfManufacture: { type: 'number' },
  mileage: { type: 'number' },
  enginePower: { type: 'number' },
  floor: { type: 'number' },
  area: { type: 'number' },
}
