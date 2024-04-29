import { provide, ref } from 'vue';
import { DialogOptions } from 'naive-ui';
import { CONFIRMATION_DIALOG_INJECTION_KEYS } from '@/shared/config/confirmation-dialog';
import { ConfirmationDialogMethods } from '@/shared/types/dialog.types';

export default function useConfirmationDialogProvider() {
  const dialogIsActive = ref(false);
  const dialogOptions = ref<DialogOptions>({
  });

  const toggleDialogIsActive = () =>
    dialogIsActive.value = !dialogIsActive.value;

  const toggleDialog = (
    options: DialogOptions
  ) => {
    dialogOptions.value = options;

    toggleDialogIsActive();
  };

  const onPositiveClick = async (
    event: MouseEvent
  ) => {
    await dialogOptions.value?.onPositiveClick?.(event);
    toggleDialogIsActive();
  };

  const onNegativeClick = async (
    event: MouseEvent
  ) => {
    await dialogOptions.value?.onNegativeClick?.(event);
    toggleDialogIsActive();
  };

  provide(
    CONFIRMATION_DIALOG_INJECTION_KEYS.METHODS,
    {
      toggle: toggleDialog
    } as ConfirmationDialogMethods
  );

  return {
    dialogIsActive,
    dialogOptions,
    onPositiveClick,
    onNegativeClick
  };
}
