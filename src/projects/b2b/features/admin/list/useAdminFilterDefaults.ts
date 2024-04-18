import { IAdminSearchModel } from '@/projects/b2b/shared/types/admin.types';
import { AdminRole } from '@/projects/b2b/shared/types/permission.types';
import { AdminFiltersStoreKey } from './admin-list.types';

export default function useAdminFilterDefaults() {
  const role = Number(sessionStorage
    .getItem(AdminFiltersStoreKey.ROLE));

  const saveAdminFiltersRole = (
    value: AdminRole
  ) => sessionStorage.setItem(
    AdminFiltersStoreKey.ROLE,
    String(value)
  );

  return {
    defaults: {
      Login: '',
      Fio: '',
      Phone: '',
      RoleId: AdminRole.hasOwnProperty(role)
        ? role
        : AdminRole.CALL_CENTER
    } as IAdminSearchModel,
    saveAdminFiltersRole
  };
}
