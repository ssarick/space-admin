import { IHumoInterval } from '@/projects/autopay/shared/types/administration.types';

export interface IHumoIntervalCardProps {
  loading?: boolean
  list?: IHumoInterval[]
  checkedId?: number | null
}

export interface IHumoIntervalCardEmits {
  (
    event: 'check',
    value: IHumoInterval
  )
  (
    event: 'update:checkedId',
    value: IHumoIntervalCardProps['checkedId']
  )
}
