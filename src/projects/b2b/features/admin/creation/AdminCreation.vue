<script setup lang="ts">
import AdminCreationForm from '@/projects/b2b/entities/admin/creation-form';
import useAdminCreation from './useAdminCreation';

const {
  formRef,
  formLoading,
  formModel,
  createAdmin
} = useAdminCreation();
</script>

<template>
  <AdminCreationForm
    v-model:phone="formModel.phone"
    v-model:branch="formModel.branch"
    v-model:email="formModel.email"
    v-model:fio="formModel.fio"
    v-model:login="formModel.login"
    v-model:role-id="formModel.roleId"
    ref="formRef"
    :data="formModel"
    :loading="formLoading"
    @submit.prevent="createAdmin"
  />
</template>
