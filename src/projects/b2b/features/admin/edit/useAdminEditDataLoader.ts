import { onMounted, Ref, ref } from 'vue';
import { DomainShortcuts } from '@/shared/types/common.types';
import { ApiAdmin } from '@/projects/b2b/shared/api';
import { IAdmin } from '@/projects/b2b/shared/types/admin.types';

export default function useAdminEditDataLoader(
  adminId: number,
  admin: Ref<IAdmin | null>
) {
  const adminDataLoading = ref(false);

  const setAdmin = (payload: IAdmin) => {
    admin.value = {
      ...(admin.value || {}),
      ...payload,
      email: payload.email?.replace(
        `@${DomainShortcuts.KAPITALBANK}`, ''
      )
    };
  };

  const fetchAdmin = async () => {
    if (!adminId) return;

    adminDataLoading.value = true;

    const { item, error } = await ApiAdmin
      .fetchAdminById(adminId);

    error || setAdmin(item);

    adminDataLoading.value = false;
  };

  onMounted(fetchAdmin);

  return {
    adminDataLoading
  };
}
