import type {
  AllMessagesFiltersInput
} from '@/projects/notification-service/shared/types/all-messages.types';

export interface AllMessagesActiveFiltersProps {
  filterItems?: Filter[];
}

export interface Filter {
  key: keyof AllMessagesFiltersInput
  value: AllMessagesFiltersInput[keyof AllMessagesFiltersInput]
}

export interface AllMessagesActiveFiltersEmits{
  (
    event: 'handleClose',
    value?: Filter | undefined
  )
}
