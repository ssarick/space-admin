import { useVModels } from '@vueuse/core';
import type {
  SessionsConfirmModalEmits,
  SessionsConfirmModalProps
} from './session-confirm-modal.types';

export default function useSessionsConfirmModal(
  props: SessionsConfirmModalProps,
  emit: SessionsConfirmModalEmits
) {
  const models = useVModels(props, emit);

  const handleSubmitConfirmation = (event: SubmitEvent) => {
    emit('handleConfirm', event);
  };

  return {
    handleSubmitConfirmation,
    ...models
  };
}
