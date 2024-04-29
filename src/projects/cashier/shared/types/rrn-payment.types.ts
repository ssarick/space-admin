import { SelectOption } from 'naive-ui';

export interface HumoResponseData {
  rrn: string
  transactionDate: string
  amount: number
  commissionAmount: number
  totalAmount: number
  merchantId: string
  terminalId: string
}

export interface RrnHumoResponse {
  id: string
  data: HumoResponseData[]
}

export interface RrnUzcardResponse {
  rrn: string
  pan: string
  transactionTypeCode: number
  serviceId: number
  transactionDate: string
  amount: number
  currency: string
  actualAmount: number
  merchantId: string
  terminalId: string
  id: string
}

export interface CurrencyRate {
  baseRate: number
  buyRate: number
  buyRateCash: number
  code: string
  id: number
  lastUpdateCb: string
  lastUpdateDate: string
  scale: string
  sellRate: number
  sellRateCash: number
}

export interface Client {
  identifyCode: string
  lastName: string
  firstName: string
  patronymName: string
  passportType: string
  documentSeria: string
  documentNumber: string
  documentDateBegin: string
  documentGivePlace: string
  documentDateEnd: string
  birthDate: string
  countryId: number
  contragentTypeId: string
  phoneNumber: string
  lastNameLat: string
  firstNameLat: string
  secondNameLat: string
  birthPlace: string
  businessPartnerId: string
  address: string

}

export interface ClientInfo extends Client {
  totalCount: number
}

export interface Receipts {
  base64PdfRu: string
  base64PdfUz: string
}

export interface PrintableInquiry {
  createDateTime: string
  docSequenceId: number
  receipts: Receipts
}

export interface Country {
  code: string
  id: number
  isoId: string
  name: string
}

export interface CountrySelectOptions extends Country, SelectOption {}

export interface DocumentTypes {
  id: string
  name: string
  passportType: string
}

export interface DocumentSelectOptions extends DocumentTypes, SelectOption {}

export enum RRN_TYPE_OPTIONS {
  HUMO = '0',
  UZCARD = '1'
}
