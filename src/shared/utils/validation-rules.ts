import i18n from '../plugins/i18n';
import { regExp } from './regular-expressions';

const { t } = i18n.global;

export const ruleRequired = (_, value: string | number) => {
  if (typeof value === 'number') return true;

  return !!value?.trim()
    || new Error(t('Validation-required'));
};

export const ruleRequiredArray = (_, value: []) => value.length
  ? true
  : new Error(t('Validation-required'));

export const rulePassword = (_, value: string) => {
  if (!value) {
    return new Error(t('Validation-required'));
  }

  const rules = [
    {
      rule: /[A-Z]/,
      errorMessage: 'Validation-at-least-one-uppercase'
    },
    {
      rule: /[a-zA-Z].*[a-zA-Z].*[a-zA-Z]/,
      errorMessage: 'Validation-at-least-three-letters'
    },
    {
      rule: /[0-9]/,
      errorMessage: 'Validation-at-least-one-number'
    }
  ];

  for (const { rule, errorMessage } of rules) {
    if (!rule.test(value)) {
      return new Error(t(errorMessage));
    }
  }

  return true;
};

export const ruleCurrencyValue = (_, value: string) => {
  if (value) {
    if (Number(value) === 0) {
      return new Error(t('Validation-required'));
    }
    return true;
  }
  return new Error(t('Validation-required'));
};

export const ruleSemver = (_, value: string) => {
  if (regExp.semver.test(value)) return true;

  const message = value
    ? 'Validation-semver'
    : 'Validation-required';

  return new Error(t(message));
};
