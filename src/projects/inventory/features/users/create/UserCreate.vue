<script setup lang="ts">
import UserForm from '@/projects/inventory/entities/users/form';
import useUserCreate from './useUserCreate';

const {
  formRef,
  formModel,
  loading,
  handleSubmit
} = useUserCreate();
</script>

<template>
  <UserForm
    v-model:email="formModel.email"
    v-model:fullName="formModel.fullName"
    v-model:userName="formModel.userName"
    v-model:password="formModel.password"
    v-model:phoneNumber="formModel.phoneNumber"
    ref="formRef"
    :model="formModel"
    :loading="loading"
    :submit-locale="$t('Create')"
    @submit.prevent="handleSubmit"
  />
</template>
