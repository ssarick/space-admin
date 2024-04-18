import { IconName } from '@/shared/types/icon.types';

export interface IBaseCardProps {
  title?: string | null
  loading?: boolean
  bordered?: boolean
  dense?: boolean
  hideHeader?: boolean
  icon?: IconName
  isIconReactive?: boolean
}
