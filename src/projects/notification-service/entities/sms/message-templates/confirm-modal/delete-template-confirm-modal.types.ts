import type {
  MessageTemplateModel
} from '@/projects/notification-service/shared/types/send-message.types';

export interface DeleteTemplateConfirmModalProps {
  loading?: boolean,
  confirmModal?: boolean,
  confirmData?: MessageTemplateModel
}

export interface DeleteTemplateConfirmModalEmits {
  (
    event: 'handleConfirm',
    value: SubmitEvent
  )
}
