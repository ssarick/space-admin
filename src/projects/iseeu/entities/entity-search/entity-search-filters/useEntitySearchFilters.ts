import { useVModels } from '@vueuse/core';
import { FormRules } from 'naive-ui';
import useFormRef from '@/shared/UI/base-form/useFormRef';
import {
  IEntitySearchFiltersEmits,
  IEntitySearchFiltersProps
} from './entity-search-filters.types';

export default function useEntitySearchFilters(
  props: IEntitySearchFiltersProps,
  emit: IEntitySearchFiltersEmits
) {
  const models = useVModels(props, emit);
  const formRef = useFormRef();

  const rules: FormRules = {};

  const onOpenMassSearch = () =>
    emit('openMassSearch');

  return {
    ...models,
    rules,
    formRef,
    onOpenMassSearch
  };
}
