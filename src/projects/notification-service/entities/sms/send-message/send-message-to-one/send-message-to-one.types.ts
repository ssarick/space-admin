import type {
  MessageTemplateModel,
  SendMessageToOneInput
} from '@/projects/notification-service/shared/types/send-message.types';

export interface SendMessageToOneProps extends SendMessageToOneInput {
  formValue?: SendMessageToOneInput
  loading?: boolean
  selectedTemplate?: MessageTemplateModel | null
}

export interface SendMessageToOneEmits {
  (
    event: 'update:priority',
    value: SendMessageToOneProps['priority']
  )
  (
    event: 'update:language',
    value: SendMessageToOneProps['language']
  )
  (
    event: 'update:to',
    value: SendMessageToOneProps['to']
  )
  (
    event: 'update:parameters',
    value: SendMessageToOneProps['parameters']
  )
  (
    event: 'changeValuesForParameters',
    key: string | number,
    value: string
  )
}
