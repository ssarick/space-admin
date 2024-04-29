import i18n from '@/shared/plugins/i18n';
import { ISelectOption } from '@/shared/types/select.types';
import { OPERATION_TYPES } from '@/projects/cashier/features/operation-type/operation-type.types';

const { t } = i18n.global;

export const operationTypeOptions: ISelectOption<OPERATION_TYPES>[] = [
  {
    label: t('five-one'),
    value: OPERATION_TYPES.FIVE_ONE
  }
  // {
  //   label: t('five-three'),
  //   value: OPERATION_TYPES.FIVE_THREE
  // }
  // {
  //   label: t('one-two-two'),
  //   value: OPERATION_TYPES.ONE_TWO_TWO,
  //   disabled: true
  // },
  // {
  //   label: t('one-two-seven'),
  //   value: OPERATION_TYPES.ONE_TWO_SEVEN,
  //   disabled: true
  // },
  // {
  //   label: t('one-three-two'),
  //   value: OPERATION_TYPES.ONE_THREE_TWO,
  //   disabled: true
  // },
  // {
  //   label: t('one-three-three'),
  //   value: OPERATION_TYPES.ONE_THREE_THREE,
  //   disabled: true
  // }
];

export const defaultOperationType: OPERATION_TYPES = OPERATION_TYPES.FIVE_ONE;
