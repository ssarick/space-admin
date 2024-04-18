import { AuthPanel } from '@/shared/types/auth.types';
import { IPagination } from '@/shared/types/pagination.types';

export interface InternalNotificationCreatePayload {
  service: AuthPanel | string
  version: string
  title: string
  text: string
}

export interface InternalNotificationUploadPayload {
  id: number
  file: File
}

export interface InternalNotificationCreateServiceModel extends
  Omit<InternalNotificationCreatePayload, 'version'
    | 'service'> {
  file: File | null
  service: AuthPanel | null
}

export interface InternalNotificationReadPayload {
  ids: number[]
}

export interface InternalNotificationGetPayload extends
  IPagination {}

export interface InternalNotificationCount {
  count?: number | null
}

export interface InternalNotification extends
  Partial<InternalNotificationCreatePayload> {
  id: number
  createdAt?: string | null
  updatedAt?: string | null
  isRead?: boolean | null
  hasFile?: boolean | null
}
