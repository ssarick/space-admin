import { useVModels } from '@vueuse/core';
import { FormRules } from 'naive-ui';
import useFormRef from '@/shared/UI/base-form/useFormRef';
import {
  IIndividualSearchFiltersEmits,
  IIndividualSearchFiltersProps
} from './individual-search-filters.types';

export default function useIndividualSearchFilters(
  props: IIndividualSearchFiltersProps,
  emit: IIndividualSearchFiltersEmits
) {
  const models = useVModels(props, emit);
  const formRef = useFormRef();

  const rules: FormRules = {
  };

  const onOpenMassSearch = () =>
    emit('openMassSearch');

  return {
    ...models,
    rules,
    formRef,
    onOpenMassSearch
  };
}
