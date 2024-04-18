import { InternalNotificationCreateServiceModel } from '@/projects/internal-notification/shared/types/internal-notification.types';

export interface InternalNotificationCreateServiceProps extends
  Partial<InternalNotificationCreateServiceModel> {
  deletable?: boolean
  index?: number
}

export interface InternalNotificationCreateServiceEmits {
  (
    event: 'update:service',
    value: InternalNotificationCreateServiceProps['service']
  )
  (
    event: 'update:title',
    value: InternalNotificationCreateServiceProps['title']
  )
  (
    event: 'update:text',
    value: InternalNotificationCreateServiceProps['text']
  )
  (
    event: 'update:file',
    value: InternalNotificationCreateServiceProps['file']
  )
  (event: 'delete')
}
