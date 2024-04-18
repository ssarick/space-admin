import i18n from '@/shared/plugins/i18n';
import { ISelectOption } from '@/shared/types/select.types';
import { PAYMENT_TYPES } from '@/projects/cashier/shared/types/payment-type.types';

const {
  t
} = i18n.global;

export const paymentTypeOptions: ISelectOption<PAYMENT_TYPES>[] = [
  {
    label: t('cash'),
    value: PAYMENT_TYPES.CASH
  },
  {
    label: t('terminal'),
    value: PAYMENT_TYPES.TERMINAL
  }
];
