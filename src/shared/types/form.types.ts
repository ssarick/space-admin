import { FormInst } from 'naive-ui';

export interface IFormRef extends FormInst {
  $el: HTMLFormElement
}

export interface FormInstInternal<T = void> extends
  FormInst {
  getFormData?: () => T
}

export type FormFieldValidator = (
  _, value: string | number
) => boolean | Error;