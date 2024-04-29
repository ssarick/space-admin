import i18n from '@/shared/plugins/i18n';
import { fieldLimits } from '@/shared/utils/constants/field-limits';
import {
  ruleInRange,
  ruleMatchLength,
  ruleMaxLength
} from '@/shared/utils/validation-rules-generator';

export const ruleRequired = (_, value: string | number) => value
  ? true
  : new Error(i18n.global.t('Validation-required'));

export const ruleProperSum = (_, value: string) =>
  value
    && !new RegExp('^(\\d+(\\.\\d{1,2})?)?$')
      .test(value.replace(/\s/g, ''))
    ? new Error('Enter the proper amount')
    : true;

export const rulePassportSeriesAndNumber = (_, value : string) =>
  value && !new RegExp('^[a-zA-Z]{2}[0-9]{7}$').test(value) ?
    new Error('Enter the passport series properly') : true;

export const ruleBorrowerId = ruleMaxLength(fieldLimits.borrowerId.maxLength);
export const ruleOwnerId = ruleMaxLength(fieldLimits.ownerId.maxLength);
export const ruleContractId = ruleMaxLength(fieldLimits.contractId.maxLength);
export const rulePanMaskedLastNumbers = ruleMatchLength(fieldLimits.panMaskedLastNumbers.maxLength);
export const ruleCoincidence = ruleInRange(fieldLimits.coincidence.min, fieldLimits.coincidence.max);
