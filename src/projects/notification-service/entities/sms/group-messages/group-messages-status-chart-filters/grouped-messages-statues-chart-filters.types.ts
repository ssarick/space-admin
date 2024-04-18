import type { IconName } from '@/shared/types/icon.types';

export interface GroupMessagesStatusChartFilterProps{
  data: GroupMessagesToggleStatusItem[],
  loading?: boolean
}
export interface GroupMessagesStatusChartFilterEmits{
  (
    event: 'onSelectStatuses',
    value: string | string[] | null
  )
}

export interface GroupMessagesToggleStatusItem{
  icon: IconName,
  color: string,
  number: number,
  title?: string,
  active?: boolean,
  status: string | string[] | null
}

export interface GroupMessagesToggledClass{
  color?: string,
  alpha?: string
}

export interface ChartItem extends
  Pick<GroupMessagesToggleStatusItem, 'status' | 'number' | 'color' | 'title' >{}
