import { Primitive } from '@/shared/types';

const emptyValues: Primitive[] = [
  undefined,
  null,
  ''
];

export const isEmptyValue = <T>(value: T) =>
  emptyValues.includes(value as '');

export const isEmptyObject = (
  value: object
): boolean => {
  for (const _ in value) {
    return false;
  }

  return true;
};

export const isFilledObject = <T extends object>(
  value: T,
  ...ignoreKeys: (keyof T)[]
): boolean => {
  for (const key in value) {
    if (value[key]
      && !ignoreKeys?.includes(key)
      || value[key] === false
      || value[key] === 0)
      return true;
  }

  return false;
};

export const excludeEmptyObjectValues = <T extends object>(
  payload: T
): Partial<T> => {
  const result: Partial<T> = {
    ...payload
  };

  for (const key in result) {
    isEmptyValue(result[key])
      && (delete result[key]);
  }

  return result;
};
