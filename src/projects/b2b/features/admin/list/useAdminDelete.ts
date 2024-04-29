import { Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import useConfirmationDialog from '@/shared/composables/useConfirmationDialog';
import { ApiAdmin } from '@/projects/b2b/shared/api';
import { IAdmin } from '@/projects/b2b/shared/types/admin.types';

export default function useAdminDelete(
  admins: Ref<IAdmin[]>
) {
  const { t } = useI18n();

  const deleteAdminLocal = (
    id: number
  ) => {
    for (let index = 0; index < admins.value.length; index++) {
      const admin = admins.value[index];

      if (admin.id === id)
        return admins.value.splice(index, 1);
    }
  };

  const findAdminById = (
    id: number
  ): IAdmin | undefined => admins.value.find(
    admin => admin.id === id
  );

  const deleteAdmin = async (
    id: number
  ) => {
    const { error } = await ApiAdmin
      .deleteAdmin(id);

    error || deleteAdminLocal(id);
  };

  const { showConfirmationDialog } = useConfirmationDialog(
    deleteAdmin,
    id => t('Confirm-admin-delete', [
      findAdminById(id)?.login
    ])
  );

  return {
    showConfirmationDialog
  };
}
