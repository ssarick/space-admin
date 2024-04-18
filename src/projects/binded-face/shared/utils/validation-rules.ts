import { ruleMatchLength } from '@/shared/utils/validation-rules-generator';
import { bindedFaceLimits } from './constants';

export const rulePinfl = ruleMatchLength(
  bindedFaceLimits.pinfl.length
);

export const ruleContrAgent = ruleMatchLength(
  bindedFaceLimits.contragentId.length
);

export const ruleInn = ruleMatchLength(
  bindedFaceLimits.inn.length
);