import { FormInst } from 'naive-ui';
import { IResponseData } from '@/shared/types/api.types';
import { CustomBoolean } from '@/shared/types/common.types';

export function scrollToError(form: HTMLFormElement) {
  const el = form.querySelector('[class*="--error-status"]');

  if (el) {
    el.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });
  }
}

export function pluralFunc(choice: number, choicesLength: number) {
  if (choice === 0) {
    return 0;
  }

  const teen = choice > 10 && choice < 20;
  const endsWithOne = choice % 10 === 1;

  if (choicesLength < 4) {
    return !teen && endsWithOne ? 1 : 2;
  }
  if (!teen && endsWithOne) {
    return 1;
  }
  if (!teen && choice % 10 >= 2 && choice % 10 <= 4) {
    return 2;
  }

  return choicesLength < 4 ? 2 : 3;
}

export function formatPhoneNumber(v?: string | null) {
  if (!v) return v;
  let res = v.replace(
    /(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/,
    '$1 ($2) $3-$4-$5'
  );

  if (!res?.startsWith('+')) res = '+' + res;
  return res;
}

export async function formValidate(
  form: FormInst | null
): Promise<boolean> {
  if (!form) return false;

  const errors = await form.validate().catch((e: []) => e);

  return Array.isArray(errors);
}

export function getResponseItemsFromPromiseResult<T = object>(
  promiseResult: PromiseSettledResult<IResponseData<T>>
): T[] {
  return (promiseResult.status === 'fulfilled'
    && promiseResult.value.items)
    || [];
}

export function transformCustomBoolean(
  value?: CustomBoolean | null
): boolean | undefined {
  return CustomBoolean.hasOwnProperty(value!)
    ? value === CustomBoolean.YES
    : undefined;
}
