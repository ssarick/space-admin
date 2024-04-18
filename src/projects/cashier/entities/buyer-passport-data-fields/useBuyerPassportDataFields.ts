import { useVModels } from '@vueuse/core';
import {
  BuyerPassportDataFormEmits,
  BuyerPassportDataFormProps
} from '@/projects/cashier/entities/buyer-passport-data-fields/buyer-passport-data-fields.types';

export function useBuyerPassportDataFields(
  props: BuyerPassportDataFormProps,
  emit: BuyerPassportDataFormEmits
) {
  const models = useVModels(props, emit);

  const onPassportFilled = () => {
    emit('passportFilled');
  };

  const onClientChoose = () => {
    emit('clientChoose');
  };

  return {
    ...models,
    onPassportFilled,
    onClientChoose
  };
}
