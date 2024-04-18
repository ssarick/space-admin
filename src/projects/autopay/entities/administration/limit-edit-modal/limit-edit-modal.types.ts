import { ILimit, ILimitWithOptions } from '@/projects/autopay/shared/types/administration.types';

export interface IProps {
  modelValue?: boolean
  limit?: ILimitWithOptions | null
}

export interface IEmits {
  (event: 'edit', value: ILimit)
  (event: 'update:modelValue', value: boolean)
}

export interface ILimitEditFormModel {
  limit: string
}
