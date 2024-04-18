import { ILinkListItem } from '@/shared/types/list.types';

export interface IBaseCardLinkListProps {
  list?: ILinkListItem[]
}

export interface IBaseCardLinkListEmits {
  (
    event: 'select',
    value: ILinkListItem
  )
}
