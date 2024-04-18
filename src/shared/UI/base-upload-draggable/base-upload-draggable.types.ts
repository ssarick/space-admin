import { UploadFileEvent } from '@/shared/types/common.types';
import { FileMimeType } from '@/shared/utils/constants/file-mime-types';

export interface BaseUploadDraggableProps {
  accept?: FileMimeType[],
  label?: string,
  maxFilesSize?: number
  max?: number
  modelValue?: null | File | File[]
}

export interface BaseUploadDraggableEmits {
  (
    event: 'update:modelValue',
    value: BaseUploadDraggableProps['modelValue']
  )
  (
    event: 'change',
    value: UploadFileEvent
  )
}
