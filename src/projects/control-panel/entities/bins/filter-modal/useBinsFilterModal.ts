import { useVModels } from '@vueuse/core';
import useFormRef from '@/shared/UI/base-form/useFormRef';
import { formValidate } from '@/shared/utils/functions';
import type {
  AllMessagesFiltersModelEmits,
  AllMessagesFiltersModelProps
} from './bins-filter-modal.types.ts';

export default function useBinsFilterModal(
  props: AllMessagesFiltersModelProps,
  emit: AllMessagesFiltersModelEmits
) {
  const models = useVModels(props, emit);
  const formRef = useFormRef();

  const submitFilterModal = async (event: SubmitEvent) => {
    const hasError = await formValidate(formRef.value);

    if (!hasError) {
      emit('submitFilterModal', event);
    }
  };

  return {
    ...models,
    submitFilterModal,
    formRef
  };
}
