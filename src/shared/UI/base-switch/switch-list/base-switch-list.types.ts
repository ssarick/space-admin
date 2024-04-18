import { ISwitchListItemValue } from '@/shared/types/list.types';

export interface IBaseSwitchListProps<T = object> {
  list?: T[]
  idKey?: string
  activeKey?: string
  idKeyIsLocale?: boolean
  borderTop?: boolean
}

export interface IBaseSwitchListEmits {
  (event: 'check', value: ISwitchListItemValue)
}
