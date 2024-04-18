import { ISelectOption } from '@/shared/types/select.types';
import { RRN_TYPE_OPTIONS } from '@/projects/cashier/shared/types/rrn-payment.types';

export const rnnTypeOptions: ISelectOption<RRN_TYPE_OPTIONS>[] = [
  {
    label: 'HUMO',
    value: RRN_TYPE_OPTIONS.HUMO
  },
  {
    label: 'UZCARD',
    value: RRN_TYPE_OPTIONS.UZCARD
  }
];
