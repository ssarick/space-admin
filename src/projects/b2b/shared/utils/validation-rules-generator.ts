import { fieldLimits } from '@/shared/utils/constants/field-limits';
import { PassportType } from '@/projects/b2b/shared/types/document.types';

export const getPassportSeriesMinLength = (
  passportType: PassportType | null
): number => passportType === PassportType.ID_CARD
  ? fieldLimits.pidSnIdCard.minLength
  : fieldLimits.pidSnOther.minLength;
