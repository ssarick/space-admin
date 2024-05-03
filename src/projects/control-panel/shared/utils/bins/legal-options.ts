import i18n from '@/shared/plugins/i18n.ts';
import { ISelectOption } from '@/shared/types/select.types';
import { BINS_LEGAL_TYPE } from '@/projects/control-panel/shared/utils/constants/bins-enums';

const { t } = i18n.global;

export const legalTypeOptions: ISelectOption<BINS_LEGAL_TYPE>[] = [
  {
    label: t('PHYSICAL'),
    value: BINS_LEGAL_TYPE.PHYSICAL
  },
  {
    label: t('CORPORATE'),
    value: BINS_LEGAL_TYPE.CORPORATE
  },
  {
    label: t('INSTALLMENT'),
    value: BINS_LEGAL_TYPE.INSTALLMENT
  },
  {
    label: t('RETIREMENT'),
    value: BINS_LEGAL_TYPE.RETIREMENT
  },
  {
    label: t('UNDEFINED'),
    value: BINS_LEGAL_TYPE.UNDEFINED
  }
];
