import type {
  SendMessageToAllInput
} from '@/projects/notification-service/shared/types/send-message.types';

export interface SendMessageToAllProps extends
  SendMessageToAllInput {
  formValue?: SendMessageToAllInput,
  loading?: boolean
}

export interface SendMessageToAllEmits {
  (
    event: 'update:priority',
    value: SendMessageToAllProps['priority']
  )
  (
    event: 'update:language',
    value: SendMessageToAllProps['language']
  )
  (
    event: 'update:file',
    value: SendMessageToAllProps['file']
  )
}
