<script setup lang="ts">
import { NGrid, NGridItem, NSpace, NSpin } from 'naive-ui';
import BaseSelect from '@/shared/UI/base-select';
import OrganizationList from '@/projects/b2b/entities/organization-list/OrganizationList.vue';
import UserAccessPermissionsList from '@/projects/b2b/entities/user-access-permissions-list/UserAccessPermissionsList.vue';
import { ApiDictionary } from '@/projects/b2b/shared/api';
import { IAccessPersmissionsTabModuleProps } from './access-permissions-tab-module.types';
import useAccessPermissionsTabModule from './useAccessPermissionsTabModule';

const props = defineProps<
  IAccessPersmissionsTabModuleProps
>();

const {
  roleId,
  defaultUserRole,
  relatedUserPermissions,
  refUserAccessPermissionsList,
  selectedOrganization,
  isSaveLoading,
  tryToSaveUserPermissions,
  onSelectUserRole,
  permissionsIsLoading,
  onCloseModule,
  userOrgState,
  userOrgStates,
  onChangeUserOrgState,
  userId
} = useAccessPermissionsTabModule(props);
</script>

<template>
  <n-grid
    x-gap="40"
    y-gap="22"
    responsive="screen"
    item-responsive
    :cols="2"
  >
    <n-grid-item>
      <p class="my-2">{{ $t('Organization') }}</p>

      <OrganizationList
        v-model:organization="selectedOrganization"
        :single-organization="!!props.businessCode"
        :loading="props.clientUserLoading"
        :user-id="userId"
      />
    </n-grid-item>

    <n-grid-item v-if="selectedOrganization">
      <div class="flex align-items-center my-2">
        <p style="white-space: nowrap">{{ $t('Status') }}</p>

        <BaseSelect
          class="ml-2"
          :value="userOrgState"
          :disabled="!props.isEdit"
          :show-on-focus="false"
          :options="userOrgStates"
          @update:model-value="onChangeUserOrgState as never"
        />
      </div>

      <div class="flex align-items-center my-2">
        <p style="white-space: nowrap">{{ $t('User-role') }}</p>

        <BaseSelect
          v-model:value="roleId"
          class="ml-2"
          label-field="name"
          value-field="id"
          :disabled="!props.isEdit"
          :default-option="defaultUserRole"
          :request="ApiDictionary.fetchUserRoles"
          @select="onSelectUserRole"
        />
      </div>

      <n-space
        v-if="permissionsIsLoading"
        justify="center"
      >
        <n-spin size="small" />
      </n-space>

      <UserAccessPermissionsList
        v-else
        ref="refUserAccessPermissionsList"
        style="height: calc(100vh - 300px); overflow-y: auto"
        :disabled="!props.isEdit"
        :related-user-permissions="relatedUserPermissions"
      />

      <n-space
        justify="end"
        class="mt-3"
      >
        <n-button
          v-if="props.isEdit"
          type="default"
          ghost
          :loading="isSaveLoading"
          @click="tryToSaveUserPermissions"
        >
          {{ $t('Save') }}
        </n-button>

        <n-button
          type="default"
          ghost
          @click="onCloseModule"
        >
          {{ $t('Close') }}
        </n-button>
      </n-space>
    </n-grid-item>
  </n-grid>
</template>
