import { Ref, ref } from 'vue';
import { IDataTableExpose } from '@/shared/types/data-table.types';

export default function useTableRef(): Ref<IDataTableExpose | null> {
  return ref(null);
}
