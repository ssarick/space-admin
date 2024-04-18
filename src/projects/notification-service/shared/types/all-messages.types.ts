import type { RouteParamValue } from 'vue-router';

export interface AllMessagesFiltersInput {
  id?: number | null
  channel?: string | null
  statuses?: string[] | string | null
  recipientAddress?: string | null
  messageSnippet?: string | null
  pageNum?: string | null
  pageSize?: string | null
  dateTo?: string | number | null
  dateFrom?: string | number | null
}

export interface AllMessagesClient {
  id?: number | null
  addressRecipient?: string | number | null
  text?: string | null
  title?: string | null
  sentBy?: string | null
  status?: string | null
  channel?: string | null
  error?: string | null
  additionalData?: string | null
  createdDate?: string | null
  updatedDate?: string | null
}

export interface AllMessagesDatePickerModel {
  dateTo?: number | null
  dateFrom?: number | null
}

export interface AllMessagesFiltersPayload extends
  AllMessagesFiltersInput {
  massMailingId?: RouteParamValue[] | string
}

export interface AllMessagesFiltersModel extends
  AllMessagesFiltersInput {}
