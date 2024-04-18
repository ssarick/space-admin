import { useVModels } from '@vueuse/core';
import type {
  AllMessagesActiveFiltersEmits,
  AllMessagesActiveFiltersProps
} from './all-messages-active-filters.types';

export default function useAllMessagesActiveFilters(
  props: AllMessagesActiveFiltersProps,
  emit: AllMessagesActiveFiltersEmits
) {
  const models = useVModels(props, emit);

  return {
    ...models
  };
}
