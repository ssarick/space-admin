import { Ref, ref } from 'vue';
import { FormInstInternal } from '@/shared/types/form.types';

export default function useFormRef<T = void>():
Ref<FormInstInternal<T> | null> {
  return ref(null);
}
