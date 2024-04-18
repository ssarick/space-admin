import { FileInfo } from 'naive-ui/es/upload/src/interface';
import { UploadFileEvent } from '@/shared/types/common.types';
import { FileMimeType } from '@/shared/utils/constants/file-mime-types';
import { BaseUploadDraggableEmits, BaseUploadDraggableProps } from './base-upload-draggable.types';

export default function useBaseUploadDraggable(
  props: BaseUploadDraggableProps,
  emit: BaseUploadDraggableEmits
) {
  const accept = computed<string | undefined>(
    () => props.accept?.toString()
  );

  const acceptFileExtensions = computed<string>(
    () => {
      return Object.keys(FileMimeType)
        .filter(key => props.accept?.includes(FileMimeType[key]))
        .join(', ')
        .toUpperCase();
    }
  );

  const label = computed<string | undefined>(
    () => `${props.label || acceptFileExtensions.value}`
  );

  const maxFilesSize = computed<number | undefined>(
    () => props.maxFilesSize ? props.maxFilesSize : 10
  );

  const getFileByInfo = (
    info: FileInfo
  ): File | null => (info.status === 'removed' || !info.file)
    ? null
    : info.file;

  const getFilesByEvent = (
    event: UploadFileEvent
  ): BaseUploadDraggableProps['modelValue'] => {
    const max = props.max || 1;

    if (max === 1) return getFileByInfo(event.file);

    return event
      .fileList
      .filter(getFileByInfo)
      .map(({ file }) => file!);
  };

  const handleChange = (event: UploadFileEvent) => {
    emit('update:modelValue', getFilesByEvent(event));
    emit('change', event);
  };

  return {
    accept,
    label,
    maxFilesSize,
    handleChange
  };
}
