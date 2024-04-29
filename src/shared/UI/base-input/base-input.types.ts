import { InputProps } from 'naive-ui';

export interface IBaseInputProps {
  modelValue?: string | null
  uppercase?: boolean
  size?: InputProps['size']
}

export interface IBaseInputEmits {
  (event: 'update:modelValue', value: string)
  (event: 'input', value: string)
  (event: 'change', value: string)
}

export type InputFormatter = (
  value?: string | null
) => string | undefined | null;
