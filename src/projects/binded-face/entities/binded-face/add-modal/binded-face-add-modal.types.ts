import {
  BindedFaceFormModel
} from '@/projects/binded-face/shared/types/binded-face.types';

export interface BindedFaceAddModalProps extends BindedFaceFormModel {
  modelValue?: boolean;
  model?: BindedFaceFormModel;
  loading: boolean
}

export interface BindedFaceAddModalEmits {
  (event: 'update:modelValue', value: BindedFaceAddModalProps['modelValue'])
  (
    event: 'update:contragentId',
    value: BindedFaceFormModel['contragentId']
  )
  (
    event: 'update:inn',
    value: BindedFaceFormModel['inn']
  )
  (
    event: 'update:pinfl',
    value: BindedFaceFormModel['pinfl']
  )
  (event: 'submit')
}
