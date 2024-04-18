import { useVModels } from '@vueuse/core';
import type {
  DeleteTemplateConfirmModalEmits,
  DeleteTemplateConfirmModalProps
} from './delete-template-confirm-modal.types';

export default function useDeleteTemplateConfirmModal(
  props: DeleteTemplateConfirmModalProps,
  emit: DeleteTemplateConfirmModalEmits
) {
  const models = useVModels(props, emit);

  const handleSubmitConfirmation = (event: SubmitEvent) => {
    emit('handleConfirm', event);
  };

  return {
    ...models,
    handleSubmitConfirmation
  };
}
