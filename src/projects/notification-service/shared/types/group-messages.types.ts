import { GroupedMessageStatuses, MessageStatuses } from '../utils/constants/enums';

export interface GroupMessagesFiltersInput {
  id?: string | null
  channel?: string | null
  dateTo?: string | number | null
  dateFrom?: string | number | null
  pageNum?: string | null
  pageSize?: string | null
}

export interface GroupMessagesStatus {
  status: MessageStatuses
  count: number
}

export interface GroupMessagesClient {
  id?: number | null
  initiator?: string | null
  titlePattern?: string | null
  textPattern?: string | null
  massMailingStatus?: GroupedMessageStatuses | null
  messageStatuses?: GroupMessagesStatus[] | null
  createdDate?: string | null
}

export interface GroupMessagesClientInternal extends
  GroupMessagesClient {
  isStopLoading?: boolean
  isPlayOrPauseLoading?: boolean
}

export interface GroupMessagesDatePickerModel {
  dateTo?: number | null
  dateFrom?: number | null
}

export interface GroupMessagesFiltersPayload extends
  GroupMessagesFiltersInput {}

type MessagesStatusGroupMapKey = 'error'
  | 'done'
  | 'inProgress'

export type MessagesStatusGroupMap = Record<
  MessagesStatusGroupMapKey, MessageStatuses[]
>
