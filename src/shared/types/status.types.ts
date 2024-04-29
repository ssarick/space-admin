
export enum StatusColor {
  BLUE = 'blue',
  YELLOW = 'yellow',
  GREEN = 'green',
  ORANGE = 'orange',
  GRAY_DARK = 'gray-dark',
  SILVER = 'silver',
  RED = 'red'
}

export interface StatusConfig<T = string | number> {
  id?: T
  value?: string | number
  label?: string
  subLabel?: string
  visible?: boolean
  color?: StatusColor
  type?: StatusType
  bordered?: boolean
}

export type StatusType = 'default'
  | 'filled';
