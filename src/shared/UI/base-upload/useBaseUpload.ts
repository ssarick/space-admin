import { computed } from 'vue';
import { BaseUploadProps } from './base-upload.types';

export default function useBaseUpload(
  props: BaseUploadProps
) {
  const accept = computed<string | undefined>(
    () => props.accept?.toString()
  );

  return {
    accept
  };
}
