import { IPagination } from '@/shared/types/pagination.types';
import {
  IUntrustedModalFilterValues
} from '@/projects/autopay/entities/untrusted-card/untrusted-card-filter-modal/untrusted-cards-filter-modal.types';

export interface ICard {
  id: number,
  contractId: number,
  clientId: number,
  clientName: string,
  genesisName: number,
  similarity: number,
  status: string,
  check: number,
}

export interface ICardsListFetchPayload extends
  IPagination, IUntrustedModalFilterValues {
  search?: string
}

export interface IHumoCard {
  cardHolderId: number
  processingType: string
  panMasked: string
  nameOnCard: string
  nameOnBank: string
  pinfl: string
  id: number
  similarity: number
  status: string
  check: number
}

export interface UntrustedCardStatus {
  cardId?: number
  error?: string
  isSuccessful?: boolean
}
