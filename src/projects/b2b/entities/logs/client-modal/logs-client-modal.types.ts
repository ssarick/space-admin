export interface ILogsClientModalProps {
  modelValue?: boolean
  uploadLoading?: boolean
}

export interface ILogsClientModalEmits {
  (
    event: 'update:modelValue',
    value: ILogsClientModalProps['modelValue']
  )
  (
    event: 'upload',
    value: string[]
  )
}
