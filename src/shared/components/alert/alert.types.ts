export interface AlertProps {
  title?: string
  text?: string
  closable?: boolean
  actionText?: string
  isNew?: boolean
}

export interface AlertEmits {
  (event: 'actionClick')
  (event: 'close')
}
