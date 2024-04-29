import { RRNData } from '@/projects/cashier/pages/five-one-operation/five-one-operation.types';
import { CURRENCIES } from '@/projects/cashier/shared/types/currency.types';
import { PAYMENT_TYPES } from '@/projects/cashier/shared/types/payment-type.types';
import { RRN_TYPE_OPTIONS } from '@/projects/cashier/shared/types/rrn-payment.types';

export interface OperationDetailFormValues {
  paymentTypeChosenOption: PAYMENT_TYPES
  currencyChosenOption: CURRENCIES
  chosenRnnOption: RRN_TYPE_OPTIONS
  rrnNumber: string
  manualPayment: boolean
  paidSum: string
  formattedSellSum: string
}
export interface OperationTypeEmits {
  (event: 'moveToNextStep', payload: RRNData)
  (event: 'moveToPreviousStep')
}

export interface DefaultValuesForDictionaries {
  paymentType: PAYMENT_TYPES
  currency: CURRENCIES
  rrnType: RRN_TYPE_OPTIONS
}
