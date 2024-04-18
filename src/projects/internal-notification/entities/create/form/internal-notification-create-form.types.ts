import { InternalNotificationCreatePayload } from '@/projects/internal-notification/shared/types/internal-notification.types';

interface InternalNotificationCreateFormModel extends
  Partial<Pick<InternalNotificationCreatePayload, 'version'>> {}

export interface InternalNotificationCreateFormProps extends
  InternalNotificationCreateFormModel {
  model?: InternalNotificationCreateFormModel
  loading?: boolean
}

export interface InternalNotificationCreateFormEmits {
  (
    event: 'update:version',
    value: InternalNotificationCreateFormProps['version']
  )
  (event: 'addService')
  (event: 'submit')
}
