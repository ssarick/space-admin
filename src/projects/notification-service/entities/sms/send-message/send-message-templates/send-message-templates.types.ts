import type { MessageTemplateModel } from '@/projects/notification-service/shared/types/send-message.types';

export interface SendMessageTemplatesListProps extends MessageTemplateModel {
  lang?: string | null
  selectedTemplate?: MessageTemplateModel | null
}

export interface SendMessageTemplatesListEmits {
  (
    event: 'sendingTemplateCode',
    value: MessageTemplateModel
  )
  (
    event: 'handleTemplateSelectModal'
  )
}
