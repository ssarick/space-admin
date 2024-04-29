import {
  computed,
  onMounted,
  ref
} from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { useMessage } from 'naive-ui';
import { useAuthStore } from '@/app/store/auth/useAuthStore';
import UserAccessPermissionsList from '@/projects/b2b/entities/user-access-permissions-list/UserAccessPermissionsList.vue';
import { ApiUser } from '@/projects/b2b/shared/api';
import { IUserPermission, IUserRole } from '@/projects/b2b/shared/types/user.types';

export default function useUserAccessPermissionsModule() {
  const { t } = useI18n();
  const route = useRoute();
  const router = useRouter();
  const roleId = ref(0);
  const isLoading = ref(true);
  const userId = +(route.params.userId || 0);
  const { user } = useAuthStore();
  const businessCode = route.params.businessCode.toString();
  const userRole = ref<IUserRole | null>(null);
  const relatedUserPermissions = ref<IUserPermission[]>([]);
  const toast = useMessage();
  const isSaveLoading = ref(false);

  const refUserAccessPermissionsList = ref<InstanceType<
    typeof UserAccessPermissionsList
  > | null>(null);

  async function fetchClientUserRelations() {
    isLoading.value = true;
    const { item, error } = await ApiUser.fetchRelations({
      path: {
        userId,
        branch: user?.branch!,
        businessCode
      }
    });
    isLoading.value = false;
    if (error) return;

    userRole.value = item.role;
    roleId.value = userRole.value.id;
    relatedUserPermissions.value = item.modules;
  }

  const isAllSelected = computed(() => {
    return refUserAccessPermissionsList.value?.actionsModulesList?.every(
      (eModule) => {
        return (
          eModule.allChecked &&
          eModule.actions.every((eAction) => eAction.checked)
        );
      }
    );
  });

  async function onHandleNext() {
    const actionIdList: number[] = [];

    refUserAccessPermissionsList.value?.actionsModulesList.forEach(
      (fModule) => {
        fModule.actions.forEach((fAction) => {
          fAction.checked && actionIdList.push(fAction.id);
        });
      }
    );

    isSaveLoading.value = true;

    const { error } = await ApiUser.updateRelations({
      path: {
        branch: user?.branch!,
        businessCode,
        userId
      },
      body: {
        roleId: roleId.value,
        actionIdList
      }
    });
    isSaveLoading.value = false;

    if (error) return;

    toast.success(t('Data-saved') + '!');
    router.push({
      name: 'client-user-access-accounts',
      params: {
        businessCode,
        userId
      }
    });
  }

  const onSelectUserRole = (value: IUserRole) => {
    relatedUserPermissions.value = value.modules || [];
    userRole.value = value;
  };

  onMounted(() => {
    fetchClientUserRelations();
  });

  return {
    isLoading,
    roleId,
    userRole,
    relatedUserPermissions,
    refUserAccessPermissionsList,
    isAllSelected,
    onHandleNext,
    isSaveLoading,
    onSelectUserRole
  };
}
