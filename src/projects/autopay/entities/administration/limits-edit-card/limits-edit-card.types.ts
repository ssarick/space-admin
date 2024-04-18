import { ILimitWithOptions } from '@/projects/autopay/shared/types/administration.types';

export interface IProps {
  list?: ILimitWithOptions[]
  loading?: boolean
}

export interface IEmits {
  (event: 'edit', value: ILimitWithOptions)
}
