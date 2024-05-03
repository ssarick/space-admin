export interface BinsInfo {
  id?: number | null
  bankId?: number | null
  cardBin?: number | null
  processing?: string | null
  legalType?: string | null
  cardType?: string | null
  processingBankId?: string | null
  processingBinCentreId?: string | null
}

export interface BinsInfoPaginationPayload {
  page: number
  size: number
  sort?: string[] | null
}

export interface BinsInfoFormModel extends
  Omit<BinsInfo, 'id' | 'processingBinCentreId' | 'cardBin'> {
  cardBin?: string | null
}

export interface BinsInfoCreatePayload extends BinsInfoFormModel {}

