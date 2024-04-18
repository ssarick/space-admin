<script lang="ts" setup>
import { NSpace } from 'naive-ui';
import LogsClientModal from '@/projects/b2b/entities/logs/client-modal';
import LogsClientTable from '@/projects/b2b/entities/logs/client-table';
import LogsFilter from '@/projects/b2b/entities/logs/filter';
import LogsUserModal from '@/projects/b2b/entities/logs/user-modal';
import LogsUserTable from '@/projects/b2b/entities/logs/user-table';
import OrganizationList from '@/projects/b2b/entities/organization-list/OrganizationList.vue';
import { LogEntityType } from '@/projects/b2b/shared/types/log.types';
import useLogs from './useLogs';

const {
  logsModel,
  clients,
  clientsLoading,
  users,
  usersLoading,
  tableIsVisible,
  logsClientSelected,
  logsUserSelected,
  logsUploadable,
  onBeforeUploadLogs,
  usersTableRef,
  fetchUsers,
  organizationsModal,
  organizationsModalLoading,
  onUploadUserLogs,
  onUploadClientLogs,
  usersModal,
  usersModalLoading,
  clientUsersTableRef,
  clientUsersLoading,
  clientUsersFetch,
  clientUsers
} = useLogs();
</script>

<template>
  <LogsFilter
    v-model:log-type="logsModel.logType"
    v-model:log-entity-type="logsModel.logEntityType"
    v-model:any-code="logsModel.anyCode"
    v-model:date-period="logsModel.datePeriod"
    v-model:user-login="logsModel.userLogin"
    v-model:user-name="logsModel.userName"
    v-model:user-phone="logsModel.userPhone"
    v-model:user-pid-number="logsModel.userPidNumber"
    v-model:user-pid-s-n="logsModel.userPidSN"
    class="mb-3"
  />

  <template v-if="tableIsVisible">
    <LogsClientTable
      v-if="logsModel.logEntityType === LogEntityType.CLIENT"
      v-model:selected="logsClientSelected"
      :data="clients"
      :loading="clientsLoading"
    />

    <LogsUserTable
      v-else
      v-model:selected="logsUserSelected"
      ref="usersTableRef"
      :data="users"
      :loading="usersLoading"
      @on-update="fetchUsers"
    />
  </template>

  <n-space class="mt-3">
    <n-button
      type="primary"
      ghost
      :disabled="!logsUploadable"
      @click="onBeforeUploadLogs"
    >
      Выгрузить
    </n-button>
  </n-space>

  <LogsClientModal
    v-model="organizationsModal"
    :upload-loading="organizationsModalLoading"
    @upload="onUploadUserLogs"
  >
    <template
      #default="{
        organizationIds,
        selectOrganizationIds
      }"
    >
      <OrganizationList
        multiple
        :organization-ids="organizationIds"
        :user-id="logsUserSelected?.userId"
        @update:organization-ids="selectOrganizationIds"
      />
    </template>
  </LogsClientModal>

  <LogsUserModal
    v-model="usersModal"
    ref="clientUsersTableRef"
    :users="clientUsers"
    :users-loading="clientUsersLoading"
    :upload-loading="usersModalLoading"
    @fetch-users="clientUsersFetch"
    @upload="onUploadClientLogs"
  />
</template>
