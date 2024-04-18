import { IListItem } from '@/shared/types/common.types';

export interface IBaseSimpleTableProps {
  data?: IListItem[]
  showNums?: boolean
  noResponsive?: boolean
  noBorderX?: boolean
  noBorderTop?: boolean
  column?: boolean
  loading?: boolean
  checkable?: boolean
  checkByKey?: string | number
  skeletonRepeat?: number
  checkedIds?: (string | number)[]
}

export interface IBaseSimpleTableEmits {
  (
    event: 'update:checkedIds',
    value: IBaseSimpleTableProps['checkedIds']
  )
}
