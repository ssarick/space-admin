import { VNode } from 'vue';
import { IApiError, IResponseData } from './api.types';

export interface ISelectOption<T = string | number | boolean> {
  label: string
  subLabel?: string
  value: T,
  disabled?: boolean,
}

export interface ISelectResponseData {
  items: ISelectOption[]
  totalCount: number
  totalPages: number
  error: boolean | IApiError
}

interface IPhoneISO {
  short: string
  long: string
  code: string
}

export interface ISelectPhoneInputOption extends ISelectOption {
  flag: () => VNode
  iso?: IPhoneISO
  mask: string
}

export type RequestSelectOptions = () => Promise<
  IResponseData<ISelectOption>
>
