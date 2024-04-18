import {
  IDebitControlItem,
  IDebitControlItemValue
} from '@/projects/autopay/shared/types/administration.types';

export interface IProps {
  list?: IDebitControlItem[]
  loading?: boolean
}

export interface IEmits {
  (event: 'check', value: IDebitControlItemValue)
}
