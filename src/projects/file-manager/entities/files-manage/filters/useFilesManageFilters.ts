import { useVModels } from '@vueuse/core';
import { IFilesManageFilersProps, IFilesManageFiltersEmits } from './files-manage-filters.types';

export default function useFilesManageFilters(
  props: IFilesManageFilersProps,
  emit: IFilesManageFiltersEmits
) {
  const models = useVModels(props, emit);

  return {
    ...models
  };
}
