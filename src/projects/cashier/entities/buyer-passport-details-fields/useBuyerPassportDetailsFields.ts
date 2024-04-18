import { useVModels } from '@vueuse/core';
import {
  BuyerPassportDetailsFieldsEmit,
  BuyerPassportDetailsFieldsProps
} from '@/projects/cashier/entities/buyer-passport-details-fields/buyer-passport-details-fields.types';

export function useBuyerPassportDetailsFields(
  props: BuyerPassportDetailsFieldsProps,
  emit: BuyerPassportDetailsFieldsEmit
) {
  const models = useVModels(props, emit);

  return {
    ...models
  };
}
