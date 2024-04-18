export const inputAllowOnlyNumber = (value: string) =>
  !value || /^\d+$/.test(value);

export const inputAllowOnlyNumberAndDot = (value: string) =>
  !value || /^\d+(\.?)(\d+)?$/.test(value);

export const inputAllowAuthCredential = (value: string) =>
  !/[а-я:]/ig.test(value);

export const inputAllowOnlyLatinic = (value: string) =>
  !value || /^[a-z]+$/i.test(value);

export const inputAllowLatinicAndNumber = (value: string) =>
  !value || /^[a-z0-9]+$/i.test(value);

export const inputAllowPassword = (value: string) =>
  !value || /^[a-z0-9-_]+$/i.test(value);

export const inputAllowLogin = inputAllowPassword;

export const inputAllowEmail = (value: string) =>
  !value || !/[а-я]+/i.test(value);

export const inputDisallowEmail = (value: string) =>
  (!value || !value.includes('@'))
    && inputAllowEmail(value);

export const inputAllowOnlyZeroAndOne = (value: string) =>
  !value || /[0,1]/.test(value);
