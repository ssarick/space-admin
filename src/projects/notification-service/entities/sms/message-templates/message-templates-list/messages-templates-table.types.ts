import type {
  MessageTemplateModel
} from '@/projects/notification-service/shared/types/send-message.types';

export interface MessageTemplateTableProps {
  data?: MessageTemplateModel[]
  loading?: boolean
}

export interface MessageTemplateTableEmits{
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
