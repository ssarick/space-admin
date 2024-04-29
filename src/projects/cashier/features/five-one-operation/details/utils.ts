import { FormRules } from 'naive-ui';
import { ruleCurrencyValue } from '@/shared/utils/validation-rules';
import { DefaultValuesForDictionaries } from '@/projects/cashier/features/five-one-operation/details/operation-details.types';
import { CURRENCIES } from '@/projects/cashier/shared/types/currency.types';
import { PAYMENT_TYPES } from '@/projects/cashier/shared/types/payment-type.types';
import { RRN_TYPE_OPTIONS } from '@/projects/cashier/shared/types/rrn-payment.types';

export const defaultValues: DefaultValuesForDictionaries = {
  paymentType: PAYMENT_TYPES.CASH,
  currency: CURRENCIES.USD,
  rrnType: RRN_TYPE_OPTIONS.HUMO
};

export const rules: FormRules = {
  formattedSellSum: {
    validator: ruleCurrencyValue
  }
};
