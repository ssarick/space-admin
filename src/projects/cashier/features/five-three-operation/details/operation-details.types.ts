import { OperationFiveThreeFields } from '@/projects/cashier/pages/five-three-operation/five-three-operation.types';
import { CURRENCIES } from '@/projects/cashier/shared/types/currency.types';
import { PAYMENT_TYPES } from '@/projects/cashier/shared/types/payment-type.types';

export interface OperationDetailFormValues {
  paymentTypeChosenOption: PAYMENT_TYPES
  currencyChosenOption: CURRENCIES
  paidSum: string
  convertedSum: string
}
export interface OperationTypeEmits {
  (event: 'moveToNextStep', payload: OperationFiveThreeFields)
  (event: 'moveToPreviousStep')
}

export interface DefaultValuesForDictionaries {
  paymentType: PAYMENT_TYPES
  currency: CURRENCIES
}
