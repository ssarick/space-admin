import { Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useMessage } from 'naive-ui';
import useConfirmationDialog from '@/shared/composables/useConfirmationDialog';
import useFormRef from '@/shared/UI/base-form/useFormRef';
import { formValidate } from '@/shared/utils/functions';
import { ApiAdmin } from '@/projects/b2b/shared/api';
import { IAdmin } from '@/projects/b2b/shared/types/admin.types';
import { UserStateId } from '@/projects/b2b/shared/types/user.types';

export default function useAdminStateChanging(
  admin: Ref<IAdmin | null>
) {
  const adminStateFormRef = useFormRef();
  const toast = useMessage();
  const { t } = useI18n();

  const changeAdminState = async () => {
    if (!admin.value?.id) return;

    const newStateId = admin.value.stateId ===
      UserStateId.ACTIVE
      ? UserStateId.BLOCKED
      : UserStateId.ACTIVE;

    const { error } = await ApiAdmin
      .updateAdminState({
        adminId: admin.value.id,
        stateId: newStateId,
        adminBlockingReasonId: admin.value.stateBlockingReasonId!
      });

    if (error) return;

    admin.value.stateId = newStateId;

    toast.success(t('Success'));
  };

  const {
    showConfirmationDialog
  } = useConfirmationDialog(
    changeAdminState
  );

  const onBeforeChangeAdminState = async () => {
    const hasError = await formValidate(
      adminStateFormRef.value
    );

    hasError || showConfirmationDialog();
  };

  return {
    adminStateFormRef,
    onBeforeChangeAdminState
  };
}
