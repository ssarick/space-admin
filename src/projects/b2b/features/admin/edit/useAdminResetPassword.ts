import { Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useMessage } from 'naive-ui';
import useConfirmationDialog from '@/shared/composables/useConfirmationDialog';
import { ApiAdmin } from '@/projects/b2b/shared/api';
import { IAdmin } from '@/projects/b2b/shared/types/admin.types';

export default function useAdminResetPassword(
  admin: Ref<IAdmin | null>
) {
  const toast = useMessage();
  const { t } = useI18n();

  const resetAdminPassword = async () => {
    if (!admin.value?.id) return;

    const { error } = await ApiAdmin
      .resetAdminPassword(admin.value.id);

    error || toast.success(t('Admin-password-changed'));
  };

  const {
    showConfirmationDialog:
      onBeforeResetAdminPassword
  } = useConfirmationDialog(
    resetAdminPassword
  );

  return {
    onBeforeResetAdminPassword
  };
}
