import type {
  MessageTemplateInputForm
} from '@/projects/notification-service/shared/types/send-message.types';

export interface MessageTemplateCreateFormProps extends MessageTemplateInputForm {
  model?: MessageTemplateInputForm,
  loading?: boolean
}
export interface MessageTemplateCreateFormEmits {
  (
    event: 'update:name',
    value: MessageTemplateCreateFormProps['name']
  )
  (
    event: 'update:description',
    value: MessageTemplateCreateFormProps['description']
  )
  (
    event: 'update:code',
    value: MessageTemplateCreateFormProps['code']
  )
  (
    event: 'update:titleRu',
    value: MessageTemplateCreateFormProps['titleRu']
  )
  (
    event: 'update:titleUz',
    value: MessageTemplateCreateFormProps['titleUz']
  )
  (
    event: 'update:textRu',
    value: MessageTemplateCreateFormProps['textRu']
  )
  (
    event: 'update:textUz',
    value: MessageTemplateCreateFormProps['textUz']
  )
}
