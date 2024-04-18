import { useVModels } from '@vueuse/core';
import {
  BuyerPersonalDataFormEmits,
  BuyerPersonalDataFormProps
} from '@/projects/cashier/entities/buyer-personal-data-fields/buyer-personal-data-fields.types';

export function useBuyerPersonalDataFields(
  props: BuyerPersonalDataFormProps,
  emit: BuyerPersonalDataFormEmits
) {
  const models = useVModels(props, emit);

  return {
    ...models
  };
}
