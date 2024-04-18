import { computed, ref } from 'vue';
import { IAdmin } from '@/projects/b2b/shared/types/admin.types';
import { UserStateId } from '@/projects/b2b/shared/types/user.types';
import { IAdminEditProps } from './admin-edit.types';
import useAdminEditDataLoader from './useAdminEditDataLoader';
import useAdminResetPassword from './useAdminResetPassword';
import useAdminStateChanging from './useAdminStateChanging';
import useAdminUpdate from './useAdminUpdate';

export default function useAdminEdit(
  props: IAdminEditProps
) {
  const admin = ref<IAdmin>({
    stateBlockingReason: null,
    stateBlockingReasonId: null,
    phone: '',
    branch: '',
    email: '',
    fio: '',
    login: '',
    userRoleId: null,
    userRoleName: ''
  });

  const adminIsBlocked = computed(() => {
    return admin.value?.stateId ===
      UserStateId.BLOCKED;
  });

  const adminDataLoader = useAdminEditDataLoader(
    props.adminId || 0, admin
  );

  const adminResetPassword = useAdminResetPassword(
    admin
  );

  const adminStateChanging = useAdminStateChanging(
    admin
  );

  const adminUpdate = useAdminUpdate(admin);

  return {
    ...adminDataLoader,
    ...adminResetPassword,
    ...adminStateChanging,
    ...adminUpdate,
    adminIsBlocked,
    admin
  };
}
