import { StatusColor } from '@/shared/types/status.types';

export interface IBaseStatusIndicatorProps {
  visible?: boolean
  color?: StatusColor | null
  size?: 'small' | 'medium'
}
