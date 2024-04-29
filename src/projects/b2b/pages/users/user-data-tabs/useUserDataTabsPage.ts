import {
  computed,
  onMounted,
  ref
} from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { IResponseData } from '@/shared/types/api.types';
import { useAuthStore } from '@/app/store/auth/useAuthStore';
import { usePermissionsStore } from '@/projects/b2b/app/store/permission/usePermissionsStore';
import { ApiUser } from '@/projects/b2b/shared/api';
import { PermissionAction, PermissionTarget } from '@/projects/b2b/shared/types/permission.types';
import { ClientUserDataTabName, IClientUser } from '@/projects/b2b/shared/types/user.types';

export default function useUserDataTabsPage() {
  const router = useRouter();
  const route = useRoute();
  const userId = +(route.params?.userId || 0);
  const businessCode = String(route.query?.clientId || '');
  const clientUser = ref<IClientUser | null>(null);
  const clientUserLoading = ref(false);
  const { user } = useAuthStore();
  const permissionsStore = usePermissionsStore();

  const currentTab = computed({
    get: () => (route.params.tabName as ClientUserDataTabName)
      || ClientUserDataTabName.PERSONAL_DATA,
    set: (tabName: ClientUserDataTabName) => router
      .replace({
        params: {
          ...route.params,
          tabName
        },
        query: route.query
      })
  });

  const hasFullAccess = computed(() =>
    permissionsStore.has(
      PermissionAction.UPDATE,
      PermissionTarget.USER
    ));

  const fetchUser = async () => ApiUser
    .getById(userId);

  const fetchClientUser = async () => {
    if (!user?.branch) return;

    return ApiUser
      .getClientUserById({
        path: {
          businessCode,
          branch: user.branch,
          userId
        }
      });
  };

  const loadClientUser = async (): Promise<
    IResponseData<IClientUser> | undefined
  > => {
    clientUserLoading.value = true;

    const response = await (businessCode
      ? fetchClientUser
      : fetchUser)();

    if (response && !response.error)
      clientUser.value = response.item;

    clientUserLoading.value = false;

    return response;
  };

  onMounted(() => {
    loadClientUser();
  });

  return {
    currentTab,
    loadClientUser,
    clientUserLoading,
    clientUser,
    businessCode,
    userId,
    hasFullAccess
  };
}
