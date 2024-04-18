import i18n from '../plugins/i18n';

export { regExp } from './regular-expressions.ts';

export const checkMinLength = (
  value: string | null | undefined,
  min: number
) => (value?.length || 0) >= min
  || new Error(i18n.global.t('Min-length', [ min ]));

export const checkByRegex = (
  value: string,
  regex: RegExp,
  errorMessage?: string
) => regex.test(value)
  || new Error(errorMessage || i18n.global.t('Please-fill-field-correct'));
