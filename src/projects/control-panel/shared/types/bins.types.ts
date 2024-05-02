
export interface BinsInfo {
  terminalId?: string | null
  merchantId?: string | null
  name?: string | null
  port?: string | null
  operationType?: string | null
  partner?: string | null
  createdDate?: string | null
  updatedDate?: string | null
}

export interface BinsInfoCreatePayload extends
  Omit<BinsInfo, 'terminalId' | 'createdDate' | 'updatedDate'> {}

export interface BinsInfoFormModel extends
  Partial<BinsInfoCreatePayload> {}
