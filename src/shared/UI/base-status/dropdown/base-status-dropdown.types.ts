import { StatusConfig } from '@/shared/types/status.types';

export interface BaseStatusDropdownProps {
  modelValue?: string | number
  options?: StatusConfig[]
}

export interface BaseStatusDropdownEmit {
  (
    event: 'update:modelValue',
    value: BaseStatusDropdownProps['modelValue']
  )
}
