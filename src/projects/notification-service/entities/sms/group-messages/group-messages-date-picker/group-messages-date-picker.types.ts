import {
  GroupMessagesDatePickerModel
} from '@/projects/notification-service/shared/types/group-messages.types';

export interface GroupMessagesDatePickerProps extends GroupMessagesDatePickerModel {}

export interface GroupMessagesDatePickerEmits {
  (
    event: 'update:dateFrom',
    value: GroupMessagesDatePickerProps['dateFrom']
  )
  (
    event: 'update:dateTo',
    value: GroupMessagesDatePickerProps['dateTo']
  )
}
