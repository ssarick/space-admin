import { StatusColor } from '@/shared/types/status.types.ts';
import { GroupedMessageStatuses } from '../utils/constants/enums';

export interface SendMessageInput {
  templateCode?: string | null
  language?: string | null
  priority?: number | null
  to?: string | null
  parameters?: Record<string, string>
  file?: File | null
  channel?: string | null
}

export interface MessageTemplateModel {
  id?: number | null
  code?: string | null
  name?: string | null
  description?: string | null
  channel?: string | null
  textRu?: string | null
  titleRu?: string | null
  textUz?: string | null
  titleUz?: string | null
  additionalData?: string | null
  isApprovedByProvider?: boolean
  createdDate?: string | null
  updatedDate?: string | null
}

export interface MessageTemplatesFiltersPayload {
  id?: number | null
  channelType?: string | null
  partialCode?: string | null
  partialTemplateName?: string | null
  partialTitleOrText?: string | null
  multiFieldSearchQuery?: string
  pageNum?: string | null
  pageSize?: string | null
  dateTo?: string | number | null
  dateFrom?: string | number | null
}

export interface MessageTemplateInputForm extends
  Omit<MessageTemplateModel, 'isApprovedByProvider' | 'createdDate' | 'updatedDate'> {}

export interface CreateMessageTemplatePayload extends
  MessageTemplateInputForm {}

export interface SendMessageToOneInput extends
  Omit<SendMessageInput, 'file' | 'channel'> {}

export interface SendMessageToAllInput extends
  Omit<SendMessageInput, 'to' | 'parameters'> {}

export interface SendMessageRequestPayload extends
  SendMessageInput{}

export interface MessageDateFormatted extends
  Pick<MessageTemplatesFiltersPayload, 'dateTo' | 'dateFrom'> {}

export interface SendMessageApiResponseType {
  id: number
  status: string
  createdDate: string
}

export interface ChangeMessageStatusPayload {
  massMailingId: number
  newStatus: GroupedMessageStatuses
}

export interface SendRadioInput {
  id: string | number | boolean
  name: string
  title: string
}

export interface MessagesStatusMapType {
  value: string
  color: StatusColor
}
