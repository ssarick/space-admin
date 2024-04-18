import { inject, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { DialogOptions } from 'naive-ui';
import { CONFIRMATION_DIALOG_INJECTION_KEYS } from '../config/confirmation-dialog';
import { ConfirmationDialogMethods } from '../types/dialog.types';

export default function useConfirmationDialog<T = void>(
  onPositiveClick: (arg: T) => void,
  title?: string | ((arg: T) => string)
) {
  const dialog = inject<ConfirmationDialogMethods>(
    CONFIRMATION_DIALOG_INJECTION_KEYS.METHODS
  );

  const { t } = useI18n();
  const confirmationLoading = ref(false);

  const showConfirmationDialog = (
    arg: T,
    options?: DialogOptions
  ) => {
    dialog?.toggle({
      title: typeof title === 'function'
        ? title(arg)
        : (title || t('Confirm-action')),
      positiveText: t('Confirm'),
      negativeText: t('Cancel'),
      showIcon: false,
      get closeOnEsc() {
        return !confirmationLoading.value;
      },
      get maskClosable() {
        return !confirmationLoading.value;
      },
      onPositiveClick: async () => {
        confirmationLoading.value = true;

        await onPositiveClick(arg);

        confirmationLoading.value = false;
      },
      ...(options || {}),
      positiveButtonProps: {
        type: 'primary',
        get loading() {
          return confirmationLoading.value;
        },
        ...(options?.positiveButtonProps || {})
      },
      negativeButtonProps: {
        type: 'tertiary',
        textColor: '#fff',
        get disabled() {
          return confirmationLoading.value;
        },
        ...(options?.negativeButtonProps || {})
      }
    });
  };

  return {
    showConfirmationDialog,
    confirmationLoading
  };
}
