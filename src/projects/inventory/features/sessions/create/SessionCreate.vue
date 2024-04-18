<script setup lang="ts">
import SessionForm from '@/projects/inventory/entities/sessions/form';
import { ApiInventorySessions } from '@/projects/inventory/shared/api';
import useSessionCreate from './useSessionCreate';

const {
  formRef,
  formModel,
  loading,
  officeOptions,
  handleSubmit
} = useSessionCreate();
</script>

<template>
  <SessionForm
    v-model:name="formModel.name"
    v-model:office-id="formModel.officeId"
    v-model:inventory-user-ids="formModel.inventoryUserIds"
    ref="formRef"
    :request-users-options="ApiInventorySessions.fetchInventoryUsersList"
    :office-options="officeOptions"
    :model="formModel"
    :loading="loading"
    @submit.prevent="handleSubmit"
  />
</template>
