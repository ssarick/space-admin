import { RRNData } from '@/projects/cashier/pages/five-one-operation/five-one-operation.types';

export interface OperationTypeEmits {
  (event: 'moveToNextStep')
  (event: 'moveToPreviousStep')
  (event: 'pdfData', value: string)
}

export interface OperationTypeProps {
  rrnFields: RRNData
}

export interface BuyerFormValues {
  isResident: string,
  documentSeria: string,
  documentNumber: string,
  lastNameLat: string,
  firstName: string,
  patronymName: string,
  birthDate: number | null,
  birthPlace: string,
  address: string,
  documentType: string,
  documentName?: string,
  documentDateBegin: number | null,
  documentGivePlace: string,
  documentDateEnd: number | null,
  countryId: number,
  phoneCode?: string,
  phoneNumber: string,
  documentTypeName?: string,
  residencyCountry?: number,
  citizenship?: string,
  document?: string,
}

export interface BuyerFormPayload {
  isResident: string,
  documentSeria: string,
  documentNumber: string,
  lastNameLat: string,
  firstName: string,
  patronymName: string,
  birthDate: string,
  birthPlace: string,
  address: string,
  documentName?: string,
  documentDateBegin: string,
  documentGivePlace: string,
  documentDateEnd: string,
  phoneCode?: string,
  phoneNumber: string,
  documentTypeName?: string,
  residencyCountry?: number,
  citizenship?: string,
  document?: string,
}
