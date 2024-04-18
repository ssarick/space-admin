import {
  IAdminResetPasswordFormEmits
} from './admin-reset-password-form.types';

export default function useAdminResetPasswordForm(
  emit: IAdminResetPasswordFormEmits
) {
  const onReset = () =>
    emit('reset');

  return {
    onReset
  };
}
