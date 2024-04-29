import { Client } from '@/projects/cashier/shared/types/rrn-payment.types';

export interface BuyerPassportDataFormProps {
  documentSeria: string
  documentNumber: string
  currentUser: string | undefined
  availableUsers: Client[]
}

export interface BuyerPassportDataFormEmits {
  (event: 'passportFilled')
  (event: 'clientChoose')
  (event: 'update:documentNumber', payload: BuyerPassportDataFormProps['documentNumber'])
  (event: 'update:documentSeria', payload: BuyerPassportDataFormProps['documentSeria'])
}
