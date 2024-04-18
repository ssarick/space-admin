import { computed, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { SelectOption, useDialog, useMessage } from 'naive-ui';
import { useAuthStore } from '@/app/store/auth/useAuthStore';
import { useClientUserOrganizationSync } from '@/projects/b2b/entities/organization-list';
import UserAccessPermissionsList from '@/projects/b2b/entities/user-access-permissions-list/UserAccessPermissionsList.vue';
import { ApiUser } from '@/projects/b2b/shared/api';
import {
  IUserOrganization,
  IUserPermission,
  IUserRole,
  UserStateId
} from '@/projects/b2b/shared/types/user.types';
import { IAccessPersmissionsTabModuleProps } from './access-permissions-tab-module.types';

export default function useUserAccessPermissionsModule(
  props: IAccessPersmissionsTabModuleProps
) {
  const { t } = useI18n();
  const route = useRoute();
  const permissionsIsLoading = ref(false);
  const userId = +(route.params.userId || 0);
  const { user } = useAuthStore();
  const relatedUserPermissions = ref<IUserPermission[]>([]);
  const toast = useMessage();
  const isSaveLoading = ref(false);
  const roleId = ref(0);
  const router = useRouter();
  const dialog = useDialog();

  const userOrgStates = computed<SelectOption[]>(() => [
    {
      label: t('Active'),
      value: UserStateId.ACTIVE
    },
    {
      label: t('Blocked'),
      value: UserStateId.BLOCKED
    }
  ]);

  const refUserAccessPermissionsList = ref<InstanceType<
    typeof UserAccessPermissionsList
  > | null>(null);

  const selectedOrganization = ref<
    IUserOrganization | null
  >(null);

  const userOrgState = computed<
    UserStateId | null
  >({
    get: () => selectedOrganization.value
      ? selectedOrganization.value.stateId
      : null,
    set: (stateId: UserStateId | null) => {
      if (selectedOrganization.value) {
        selectedOrganization.value.stateId = stateId;
      }
    }
  });

  const defaultUserRole = ref<IUserRole>({
    id: 0,
    name: ''
  });

  async function fetchClientUserRelations() {
    permissionsIsLoading.value = true;

    const { item, error } = await ApiUser.fetchRelations({
      path: {
        userId,
        branch: user?.branch!,
        businessCode: selectedOrganization.value?.clientCode || ''
      }
    });

    permissionsIsLoading.value = false;

    if (error) return;

    defaultUserRole.value.id = item.role.id;
    defaultUserRole.value.name = item.role.name;
    relatedUserPermissions.value = item.modules;
  }

  async function tryToSaveUserPermissions() {
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
        businessCode: selectedOrganization.value?.clientCode || '',
        userId
      },
      body: {
        roleId: roleId.value,
        actionIdList
      }
    });

    isSaveLoading.value = false;

    error || toast.success(t('Data-saved') + '!');
  }

  const onSelectUserRole = (value: IUserRole) =>
    (relatedUserPermissions.value = value.modules || []);

  const onCloseModule = () => router.go(-1);

  const onConfirmChangeUserOrgState = async (
    stateId: UserStateId
  ) => {
    const { error } = await ApiUser
      .changeClientUserStatus(
        {
          path: {
            userId,
            branch: user?.branch!,
            businessCode: selectedOrganization.value?.clientCode || ''
          },
          body: { stateId }
        }
      );

    if (error) return;

    userOrgState.value = stateId;

    toast.success(t('Data-saved') + '!');
  };

  const onChangeUserOrgState = (
    value: UserStateId
  ) => {
    value !== userOrgState.value
      && dialog.warning({
        title: t('Confirm-action'),
        positiveText: t('Confirm'),
        negativeText: t('Cancel'),
        positiveButtonProps: {
          type: 'error',
          ghost: true
        },
        negativeButtonProps: {
          type: 'default'
        },
        onPositiveClick: () => {
          onConfirmChangeUserOrgState(value);
        }
      });
  };

  useClientUserOrganizationSync(
    () => props.clientUser,
    selectedOrganization
  );

  watch(
    () => defaultUserRole.value.id,
    () => (roleId.value = defaultUserRole.value.id)
  );

  watch(
    () => selectedOrganization.value?.clientCode,
    fetchClientUserRelations
  );

  return {
    permissionsIsLoading,
    roleId,
    relatedUserPermissions,
    refUserAccessPermissionsList,
    tryToSaveUserPermissions,
    isSaveLoading,
    selectedOrganization,
    onSelectUserRole,
    defaultUserRole,
    onCloseModule,
    userOrgState,
    userOrgStates,
    onChangeUserOrgState,
    userId
  };
}
