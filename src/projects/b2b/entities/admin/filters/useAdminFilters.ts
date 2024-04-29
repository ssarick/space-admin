import { useVModels } from '@vueuse/core';
import { FIELD_MASK } from '@/shared/utils/constants/field-mask';
import {
  IAdminFiltersEmits,
  IAdminFiltersProps
} from './admin-filters.types';

export default function useAdminFilters(
  props: IAdminFiltersProps,
  emit: IAdminFiltersEmits
) {
  const models = useVModels(props, emit);
  const phoneFieldMask = FIELD_MASK.phone;

  return {
    ...models,
    phoneFieldMask
  };
}
