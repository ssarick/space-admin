import type { MessageTemplateModel } from '@/projects/notification-service/shared/types/send-message.types';

export interface SendMessageTemplateTableProps {
  data?: MessageTemplateModel[]
  loading?: boolean
}

export interface SendMessageTemplateTableEmits {
  (
    event: 'confirmModalShow',
    value: boolean
  )
  (
    event: 'confirmModalData',
    value: MessageTemplateModel
  )
  (
    event: 'searchValueChange',
    value?: string
  )
}
