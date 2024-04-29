import { fieldLimits } from '@/shared/utils/constants/field-limits';
import {
  checkByRegex,
  checkMinLength,
  regExp
} from '@/shared/utils/validation-base';
import { ruleRequired } from '@/shared/utils/validation-rules';
import { PassportType } from '@/projects/b2b/shared/types/document.types';
import { getPassportSeriesMinLength } from './validation-rules-generator';

export const ruleRequiredWithNumber = (
  _, value: string | number
) => value === 0 || ruleRequired(_, value);

export const ruleEmail = (
  _, value: string
) => checkByRegex(value, regExp.email);

export const rulePhone = (
  _, value: string
) => checkByRegex(value, regExp.phone);

export const rulePidNum = (
  _, value: string
) => checkMinLength(
  value, fieldLimits.pidNum.minLength
);

export const checkPidSn = (
  value: string,
  passportType: PassportType | null
) => checkMinLength(
  value,
  getPassportSeriesMinLength(
    passportType
  )
);

export const rulePhrase = (
  _, value: string
) => checkMinLength(
  value, fieldLimits.phrase.minLength
);

export const ruleLogin = (
  _, value: string
) => checkMinLength(
  value, fieldLimits.login.minLength
);
