import {
  Country,
  DocumentTypes
} from '@/projects/cashier/shared/types/rrn-payment.types';

export interface BuyerPassportDetailsFieldsProps {
  documentType: string
  documentDateBegin: number | null
  documentGivePlace: string
  documentDateEnd: number | null
  countryId: number
  countries: Country[]
  documentTypes: DocumentTypes[]
}

export interface BuyerPassportDetailsFieldsEmit {
  (
    event: 'update:documentType',
    payload: BuyerPassportDetailsFieldsProps['documentTypes']
  )
  (
    event: 'update:documentDateBegin',
    payload: BuyerPassportDetailsFieldsProps['documentDateBegin']
  )
  (
    event: 'update:documentGivePlace',
    payload: BuyerPassportDetailsFieldsProps['documentGivePlace']
  )
  (
    event: 'update:documentDateEnd',
    payload: BuyerPassportDetailsFieldsProps['documentDateEnd']
  )
  (
    event: 'update:countryId',
    payload: BuyerPassportDetailsFieldsProps['countryId']
  )
}
