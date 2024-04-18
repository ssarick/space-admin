export interface IBaseSwitchListItemProps {
  modelValue: boolean
  label?: string
  loading?: boolean
}

export interface IBaseSwitchListItemEmits {
  (event: 'update:modelValue', value: boolean)
}
