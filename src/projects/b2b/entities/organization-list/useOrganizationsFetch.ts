import { ref } from 'vue';
import { IPagination } from '@/shared/types/pagination.types';
import { useAuthStore } from '@/app/store/auth/useAuthStore';
import { ApiUser } from '@/projects/b2b/shared/api';
import { IUserOrganization } from '@/projects/b2b/shared/types/user.types';
import { IOrganizationListProps } from './organization-list.types';

export default function useOrganizationsFetch(
  props: IOrganizationListProps
) {
  const loading = ref(false);
  const organizations = ref<IUserOrganization[]>([]);
  const { user } = useAuthStore();

  const loadOrganizations = async (pagination?: IPagination) => {
    loading.value = true;

    const response = await ApiUser.fetchUserOrganizations({
      branch: user?.branch!,
      userId: props.userId || '',
      ...(pagination || {
      })
    });

    response.error || (organizations.value = response.items);

    loading.value = false;

    return response;
  };

  return {
    loadOrganizations,
    organizations,
    loading
  };
}
