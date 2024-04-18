import { useVModels } from '@vueuse/core';
import { MassSearchEmits, MassSearchProps } from './mass-search.types';

export default function useMassSearch(
  props: MassSearchProps,
  emit: MassSearchEmits
) {
  const models = useVModels(props, emit);

  return {
    ...models
  };
}
