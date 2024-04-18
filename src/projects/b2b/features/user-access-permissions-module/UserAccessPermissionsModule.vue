<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import BaseLoading from '@/shared/UI/base-loading';
import BaseSelect from '@/shared/UI/base-select';
import renderIcon from '@/shared/utils/render-icon';
import UserAccessPermissionsList from '@/projects/b2b/entities/user-access-permissions-list/UserAccessPermissionsList.vue';
import { ApiDictionary } from '@/projects/b2b/shared/api';
import useUserAccessPermissionsModule from './useUserAccessPermissionsModule';

const route = useRoute();
const router = useRouter();
const businessCode = route.params.businessCode?.toString();
const userId = route.params.userId.toString();

const {
  isLoading,
  roleId,
  userRole,
  relatedUserPermissions,
  refUserAccessPermissionsList,
  isAllSelected,
  onHandleNext,
  isSaveLoading,
  onSelectUserRole
} = useUserAccessPermissionsModule();
</script>

<template>
  <div class="access-permissions-wrap">
    <div v-if="!isLoading">
      <div class="flex align-items-center my-2">
        <p style="white-space: nowrap">{{ $t('User-role') }}</p>
        <BaseSelect
          v-model:value="roleId"
          class="ml-2"
          label-field="name"
          value-field="id"
          :default-option="userRole"
          :request="ApiDictionary.fetchUserRoles"
          @select="onSelectUserRole"
        />
      </div>
      <UserAccessPermissionsList
        ref="refUserAccessPermissionsList"
        style="height: calc(100vh - 180px); overflow-y: auto"
        :related-user-permissions="relatedUserPermissions"
      />
      <footer class="flex mt-3">
        <n-button
          ghost
          :type="isAllSelected ? 'default' : 'primary'"
          @click="
            () =>
              isAllSelected
                ? refUserAccessPermissionsList?.removeAll()
                : refUserAccessPermissionsList?.selectAll()
          "
        >
          {{ $t(isAllSelected ? 'Remove-all' : 'Select-all') }}
        </n-button>
        <n-button
          class="ml-auto"
          ghost
          @click="
            router.push({
              name: 'client-users-add',
              params: { businessCode, userId },
            })
          "
        >
          {{ $t('Back') }}
        </n-button>
        <n-button
          type="info"
          icon-placement="right"
          class="mx-2"
          ghost
          :render-icon="renderIcon('arrow-right')"
          :loading="isSaveLoading"
          @click="onHandleNext"
        >
          {{ $t('Next') }}
        </n-button>
        <n-button
          type="warning"
          ghost
          @click="router.push({ name: 'clients' })"
        >
          {{ $t('Cancel') }}
        </n-button>
      </footer>
    </div>
    <BaseLoading v-else />
  </div>
</template>
