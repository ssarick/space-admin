export interface MassSearchProps {
  modelValue?: boolean
}

export interface MassSearchEmits {
  (
    event: 'update:modelValue',
    value: boolean
  )
}
