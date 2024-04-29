import { SelectOption } from 'naive-ui';
import type {
  AllMessagesFiltersInput,
  AllMessagesFiltersModel
} from '@/projects/notification-service/shared/types/all-messages.types';

export interface AllMessagesFiltersModelProps extends
  AllMessagesFiltersModel {
  showModal?: boolean
  formValue?: AllMessagesFiltersInput
  statusOptions?: SelectOption[]
}

export interface AllMessagesFiltersModelEmits {
  (
    event: 'closeModal'
  )
  (
    event: 'submitFilterModal',
    value: SubmitEvent
  )
  (
    event: 'update:showModal',
    value: AllMessagesFiltersModelProps['showModal']
  )
  (
    event: 'update:statuses',
    value: AllMessagesFiltersModelProps['statuses']
  )
  (
    event: 'update:recipientAddress',
    value: AllMessagesFiltersModelProps['recipientAddress']
  )
  (
    event: 'update:messageSnippet',
    value: AllMessagesFiltersModelProps['messageSnippet']
  )
}
