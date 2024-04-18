import { IPagination } from '@/shared/types/pagination.types';

export enum BindedFaceStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE'
}

export interface BindedFace {
  contragentId: string | null
  inn: string | null
  pinfl: string | null
  status?: BindedFaceStatus | null
}

export interface BindedFaceFormModel {
  contragentId: string | null
  inn: string | null
  pinfl: string | null
}

export interface BindedFaceFetchPayload extends
  IPagination {
  contragentId?: string | null
  pinfl?: string | null
  inn?: string
  status?: string
}