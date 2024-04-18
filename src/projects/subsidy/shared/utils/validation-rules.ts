import { ruleMatchLength, ruleRangeLength } from '@/shared/utils/validation-rules-generator';
import { subsidyFieldLimits } from './constants/field-limits';

export const rulePinfl = ruleMatchLength(
  subsidyFieldLimits.pinfl.length
);

export const ruleAccount = ruleRangeLength(
  subsidyFieldLimits.account.minLength,
  subsidyFieldLimits.account.maxLength
);

export const ruleMfo = ruleMatchLength(
  subsidyFieldLimits.mfo.maxLength
);
