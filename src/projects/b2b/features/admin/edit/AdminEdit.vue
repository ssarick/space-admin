<script setup lang="ts">
import { NGi, NGrid, NSpace } from 'naive-ui';
import BaseLoading from '@/shared/UI/base-loading';
import AdminEditForm from '@/projects/b2b/entities/admin/edit-form';
import AdminResetPasswordForm from '@/projects/b2b/entities/admin/reset-password-form';
import AdminStateForm from '@/projects/b2b/entities/admin/state-form';
import { IAdminEditProps } from './admin-edit.types';
import useAdminEdit from './useAdminEdit';

const props = defineProps<IAdminEditProps>();

const {
  adminDataLoading,
  adminIsBlocked,
  adminDataFormRef,
  adminStateFormRef,
  adminEditLoading,
  onBeforeChangeAdminState,
  onBeforeResetAdminPassword,
  onBeforeUpdateAdminData,
  admin
} = useAdminEdit(props);
</script>

<template>
  <n-grid
    x-gap="22"
    y-gap="22"
    cols="12"
    responsive="screen"
    item-responsive
  >
    <n-gi span="12 m:8">
      <BaseLoading v-if="adminDataLoading" />

      <AdminEditForm
        v-else
        v-model:phone="admin.phone"
        v-model:branch="admin.branch"
        v-model:email="admin.email"
        v-model:fio="admin.fio"
        v-model:login="admin.login"
        v-model:role-id="admin.userRoleId"
        ref="adminDataFormRef"
        is-edit
        :data="admin"
        :admin-is-blocked="adminIsBlocked"
        :admin="admin"
      />
    </n-gi>

    <n-gi span="12 m:4">
      <div
        class="flex flex-column justify-space-between h-100"
      >
        <div>
          <AdminStateForm
            v-model:state-blocking-reason="admin.stateBlockingReason"
            v-model:state-blocking-reason-id="admin.stateBlockingReasonId"
            ref="adminStateFormRef"
            :data="admin"
            :loading="adminDataLoading"
            :admin-is-blocked="adminIsBlocked"
            @change-state="onBeforeChangeAdminState"
          />

          <AdminResetPasswordForm
            @reset="onBeforeResetAdminPassword"
          />
        </div>

        <n-space justify="end">
          <n-button
            type="default"
            ghost
            :loading="adminEditLoading"
            @click="onBeforeUpdateAdminData"
          >
            {{ $t('Save') }}
          </n-button>
        </n-space>
      </div>
    </n-gi>
  </n-grid>
</template>
