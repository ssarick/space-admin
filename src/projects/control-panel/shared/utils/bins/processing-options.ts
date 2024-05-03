import i18n from '@/shared/plugins/i18n.ts';
import { ISelectOption } from '@/shared/types/select.types';
import { BINS_PROCESSING_TYPES } from '@/projects/control-panel/shared/utils/constants/bins-enums';

const { t } = i18n.global;

export const processingTypeOptions: ISelectOption<BINS_PROCESSING_TYPES>[] = [
  {
    label: t('TIETO'),
    value: BINS_PROCESSING_TYPES.TIETO
  },
  {
    label: t('UZCARD'),
    value: BINS_PROCESSING_TYPES.UZCARD
  },
  {
    label: t('HUMO'),
    value: BINS_PROCESSING_TYPES.HUMO
  }
];
