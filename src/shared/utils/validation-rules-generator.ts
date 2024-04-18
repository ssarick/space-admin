import { ComputedRef } from 'vue';
import { FormRules } from 'naive-ui';
import { FormFieldValidator } from './../types/form.types';

export const ruleMaxLength = (length: number) =>
  (_, value: string | number) => value &&
    String(value).length > length ?
    new Error(`Максимальная длина ${length}`) : true;

export const ruleMatchLength = (length: number) =>
  (_, value: string | number) => value &&
  String(value).length !== length ?
    new Error(`Длина должна быть равна ${length}`) : true;

export const ruleRangeLength = (start: number, end: number) =>
  (_, value: string | number) => {
    const { length } = String(value || '');

    return start <= length && length <= end
      || new Error(`Длина должна быть между ${start} и ${end}`);
  };

export const ruleInRange = (start: number, end: number) =>
  (_, value: string | number) => value &&
    !(Number(value) > start && Number(value) <= end) ?
    new Error(`Значение должно быть больше чем ${start} и меньше или равнятся ${end}`) : true;

export const rulesMix = (
  ...rules: FormFieldValidator[]
): FormFieldValidator => (_, value: string | number) => {
  for (let index = 0; index < rules.length; index++) {
    const result = rules[index](_, value);

    if (result !== true) return result;
  }

  return true;
};

export const createRulesByArray = <T extends object>(
  list: T[],
  rules: FormRules
): FormRules => list.reduce<FormRules>(
  (acc, item, index) => {
    const rulesWithIndex: FormRules = {};

    for (const key in rules) {
      rulesWithIndex[`${key}.${index}`] = {
        ...rules[key],
        transform: () => item[key]
      };
    }

    return {
      ...acc,
      ...rulesWithIndex
    };
  },
  {}
);

export const createComputedRulesByArray = <T extends object>(
  list: T[],
  rules: FormRules
): ComputedRef<FormRules> => computed<FormRules>(
  () => createRulesByArray(list, rules)
);
