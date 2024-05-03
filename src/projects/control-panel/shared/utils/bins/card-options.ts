import i18n from '@/shared/plugins/i18n.ts';
import { ISelectOption } from '@/shared/types/select.types';
import { BINS_CARD_TYPES } from '@/projects/control-panel/shared/utils/constants/bins-enums';

const { t } = i18n.global;

export const cardTypeOptions: ISelectOption<BINS_CARD_TYPES>[] = [
  {
    label: t('UZCARD'),
    value: BINS_CARD_TYPES.UZCARD
  },
  {
    label: t('HUMO'),
    value: BINS_CARD_TYPES.HUMO
  },
  {
    label: t('VISA'),
    value: BINS_CARD_TYPES.VISA
  },
  {
    label: t('MASTERCARD'),
    value: BINS_CARD_TYPES.MASTERCARD
  }
];
