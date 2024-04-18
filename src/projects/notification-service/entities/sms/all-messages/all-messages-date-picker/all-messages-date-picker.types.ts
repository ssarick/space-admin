import type {
  AllMessagesDatePickerModel
} from '@/projects/notification-service/shared/types/all-messages.types';

export interface AllMessagesDatePickerProps extends
  AllMessagesDatePickerModel {}
export interface AllMessagesDatePickerEmits {
  (
    event: 'update:dateFrom',
    value: AllMessagesDatePickerProps['dateFrom']
  )
  (
    event: 'update:dateTo',
    value: AllMessagesDatePickerProps['dateTo']
  )
}
