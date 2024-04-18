import { VNode, VNodeChild } from 'vue';
import { CommonSize } from '@/shared/types/common.types';

export interface IBaseModalProps {
  modelValue?: boolean
  title?: string | (() => VNode | VNodeChild)
  size?: CommonSize
}

export interface IBaseModalEmits {
  (
    event: 'update:modelValue',
    value: IBaseModalProps['modelValue']
  )
}
