import { Ref } from 'vue';
import { SelectProps } from 'naive-ui';
import { Value } from 'naive-ui/es/select/src/interface';
import { ISelectOption } from '@/shared/types/select.types';

export type ModelValueType =
  | Ref<string | null | undefined | number>
  | Value
  | null;

export interface BaseSelectAttrs {
  filterable?: boolean;
  remote?: boolean;
  disabled?: boolean;
  'value-field'?: string;
}

export interface BaseSelectProps {
  request?: Function
  autoRequest?: boolean
  params?: object
  options?: object[]
    | ISelectOption[]
    | unknown[]
    | null
  modelValue?: ModelValueType
  defaultOption?: object | null
  searchString?: string | null
  searchFieldName?: string
  resetMenuOnOptionsChange?: boolean
  allowInput?: Function
  maxlength?: number
  optionsIsReactive?: boolean
  modelModifiers?: {
    uppercase: boolean;
  }
  size?: SelectProps['size']
}

export interface BaseSelectEmits {
  (event: 'update:modelValue', value: ModelValueType): void;
  <T = object>(event: 'select', value: T extends object ? T : never): void;
  (event: 'reset'): void;
  (event: 'input', value: string): void;
}
